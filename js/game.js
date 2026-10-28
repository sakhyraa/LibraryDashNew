/* Library Dash - prototype runner 3D using Three.js */
(() => {
  const wrap = document.getElementById('gameCanvasWrap');
  const scoreEl = document.getElementById('scoreValue');
  const coinsEl = document.getElementById('runCoins');
  const pauseOverlay = document.getElementById('pauseOverlay');
  const overOverlay = document.getElementById('gameOverOverlay');
  let renderer, scene, camera, player, clock, animationId;
  let running = false, paused = false, gameOver = false;
  let lane = 0, jumpY = 0, jumpVelocity = 0;
  let score = 0, runCoins = 0, elapsed = 0, spawnTimer = 0;
  let obstacles = [], coins = [], mysteryBoxes = [], levelPickups = [], scenery = [], roadSegments = [];
  let boxSpawnTimer = 5.5, coinSpawnTimer = 0.35, coinLane = 0, coinChain = 0;
  let missionMode = false, levelMode = false;
  let distanceMeters = 0, nextCheckpoint = 200, checkpointNumber = 0, checkpointPending = false;
  let missionDistance = 2000, checkpointEvery = 200;
  let levelTargetType='books', levelTargetCount=10, levelTargetWord='BUKU', levelCollected=0, levelPickupTimer=0.2, levelPhasePaused=false, levelTargetsSpawned=0;
  const laneX = [-2.15, 0, 2.15];
  const mat = {};
  const random = (a,b) => a + Math.random()*(b-a);

  function material(color, roughness=0.8, metalness=0) {
    return new THREE.MeshStandardMaterial({color, roughness, metalness});
  }
  function box(w,h,d, m, x=0,y=0,z=0) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);
    mesh.position.set(x,y,z); mesh.castShadow=true; mesh.receiveShadow=true; return mesh;
  }
  function buildWorld() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#bdeaff');
    scene.fog = new THREE.Fog('#bdeaff', 38, 95);
    camera = new THREE.PerspectiveCamera(60, wrap.clientWidth/wrap.clientHeight, .1, 120);
    camera.position.set(0,5.2,10.5); camera.lookAt(0,1,-5);
    scene.add(new THREE.HemisphereLight('#ffffff','#c4d8a8',2.3));
    const sun = new THREE.DirectionalLight('#fff3c4',3.0);
    sun.position.set(-5,10,4); sun.castShadow=true; sun.shadow.mapSize.set(1024,1024); scene.add(sun);
    mat.floor=material('#f4e7c8'); mat.road=material('#e6d4ad'); mat.edge=material('#45bce8');
    mat.line=material('#fff8e8'); mat.shelf=material('#f4b95f'); mat.shelf2=material('#3c83b8');
    mat.gold=material('#ffc83d',.28,.15); mat.red=material('#f06f75'); mat.blue=material('#39b9eb');
    mat.green=material('#49c783'); mat.book1=material('#ffad42'); mat.book2=material('#ff7182');
    mat.book3=material('#54c98b'); mat.skin=material('#e8ae83'); mat.shirt=material('#ffca3a');
    const floor=box(60,.2,100,mat.floor,0,-.25,-30); scene.add(floor);
    const road=box(7.3,.16,100,mat.road,0,-.12,-30); scene.add(road);
    [-3.75,3.75].forEach(x=>{const edge=box(.16,.22,100,mat.edge,x,-.06,-30);scene.add(edge)});
    for(let z=2;z>-100;z-=5){
      const line=box(.045,.02,3.0,mat.line,0,-.025,z-2.5);scene.add(line);roadSegments.push(line);
    }
    // Library shelves flank the runner. Individual books make the environment readable.
    for(let z=2;z>-85;z-=8){
      [-1,1].forEach(side=>{
        const x=side*5.2;
        const shelf=box(1.55,3.9,5.4,mat.shelf,x,1.8,z-2.6);scene.add(shelf);scenery.push(shelf);
        for(let level=0;level<3;level++){
          const plank=box(1.68,.12,5.55,mat.shelf2,x,0.45+level*1.15,z-2.6);scene.add(plank);scenery.push(plank);
          for(let b=0;b<8;b++){
            const colors=[mat.book1,mat.book2,mat.book3,mat.gold,mat.blue];
            const book=box(random(.12,.19),random(.55,.9),.35,colors[Math.floor(Math.random()*colors.length)],x+random(-.62,.62),.78+level*1.15,z-4.8+b*.62);
            scene.add(book);scenery.push(book);
          }
        }
      });
      // Clear the center sightline: no floating center-lane decorative lamps.
    }
    // Decorative end wall far in the distance is outside active view.
    player=new THREE.Group();
    const torso=box(.78,.95,.46,mat.shirt,0,.98,0);
    const head=box(.52,.53,.5,mat.skin,0,1.72,-.02);
    const hair=box(.56,.18,.53,mat.shelf2,0,2.02,-.02);
    const leg1=box(.24,.62,.28,mat.shelf2,-.2,.3,0),leg2=box(.24,.62,.28,mat.shelf2,.2,.3,0);
    const arm1=box(.19,.7,.22,mat.skin,-.52,1.0,0),arm2=box(.19,.7,.22,mat.skin,.52,1.0,0);
    [torso,head,hair,leg1,leg2,arm1,arm2].forEach(o=>player.add(o));
    player.position.set(0,0,3);scene.add(player);
  }
  function createObstacle() {
    const laneIndex=Math.floor(Math.random()*3), z=-42;
    const isLow=Math.random()>.52;
    const group=new THREE.Group();
    if(isLow){
      // A small table/desk: recognizable as an obstacle that can be jumped over or avoided.
      group.add(box(1.22,.16,.88,mat.shelf,0,1.02,0));
      group.add(box(1.28,.1,.94,mat.shelf2,0,1.12,0));
      group.add(box(.12,.88,.12,mat.shelf2,-.48,.52,-.32));
      group.add(box(.12,.88,.12,mat.shelf2,.48,.52,-.32));
      group.add(box(.12,.88,.12,mat.shelf2,-.48,.52,.32));
      group.add(box(.12,.88,.12,mat.shelf2,.48,.52,.32));
    }else{
      group.add(box(1.2,.25,.75,mat.blue,0,1.65,0));
      group.add(box(.12,1.6,.65,mat.shelf2,-.5,.8,0));
      group.add(box(.12,1.6,.65,mat.shelf2,.5,.8,0));
    }
    group.position.set(laneX[laneIndex],0,z);scene.add(group);
    obstacles.push({mesh:group,lane:laneIndex,z,kind:isLow?'crate':'barrier',passed:false});
  }
  function createCoin() {
    // A single readable gold coin collectible, placed in one of the three lanes.
    if (coinChain <= 0) {
      coinLane = Math.floor(Math.random() * 3);
      coinChain = 3 + Math.floor(Math.random() * 3);
    } else if (Math.random() < 0.22) {
      coinLane = Math.max(0, Math.min(2, coinLane + (Math.random() < 0.5 ? -1 : 1)));
    }
    coinChain--;
    const coinMat = material('#ffd447', 0.24, 0.55);
    const edgeMat = material('#d88a19', 0.32, 0.45);
    const mesh = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.31, 0.105, 20), coinMat);
    body.rotation.x = Math.PI / 2;
    mesh.add(body);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.255, 0.035, 6, 20), edgeMat);
    mesh.add(rim);
    mesh.position.set(laneX[coinLane], 0.92, -42);
    scene.add(mesh);
    coins.push({ mesh, lane: coinLane, z: -42, taken: false });
  }

  function createLevelPickup(forceTarget=false) {
    if (!levelMode || levelCollected >= levelTargetCount) return;
    const laneIndex=Math.floor(Math.random()*3), z=-42;
    const group=new THREE.Group();
    const isTarget = forceTarget && levelTargetsSpawned < levelTargetCount;
    let type='decoy', letter='';
    if(levelTargetType==='books' && isTarget){
      type='book';
      levelTargetsSpawned++;
    }
    if(levelTargetType==='letters' && isTarget){
      type='letter'; letter=levelTargetWord[levelTargetsSpawned]||levelTargetWord[levelTargetWord.length-1];
      levelTargetsSpawned++; 
      const canvas=document.createElement('canvas');canvas.width=128;canvas.height=128;
      const ctx=canvas.getContext('2d');ctx.clearRect(0,0,128,128);ctx.fillStyle='#fff0a8';ctx.strokeStyle='#8b4b14';ctx.lineWidth=8;
      ctx.beginPath();ctx.roundRect(12,12,104,104,18);ctx.fill();ctx.stroke();ctx.font='900 76px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#173e67';ctx.fillText(letter,64,66);
      const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
      const face=new THREE.Mesh(new THREE.PlaneGeometry(.9,.9),new THREE.MeshBasicMaterial({map:texture,transparent:true,side:THREE.DoubleSide}));group.add(face);
      const glow=new THREE.Mesh(new THREE.TorusGeometry(.58,.045,8,24),new THREE.MeshBasicMaterial({color:'#ffdf57'}));group.add(glow);
    } else {
      const cover=material(type==='book'?'#e63946':'#4d8bcb',.48,.08);
      group.add(box(.72,.88,.22,cover,0,.7,0));
      group.add(box(.58,.72,.035,material('#fff3d2'),.035,.7,.13));
      group.add(box(.07,.78,.05,material('#f7d16a'),-.28,.7,.16));
      const page=box(.52,.035,.035,material('#7c91aa'),.04,.82,.16);group.add(page);
    }
    group.position.set(laneX[laneIndex],.12,-42);scene.add(group);
    levelPickups.push({mesh:group,lane:laneIndex,z:-42,type,letter,taken:false});
  }

  function createMysteryBox() {
    const laneIndex=Math.floor(Math.random()*3), z=-42;
    const group=new THREE.Group();
    const boxMat=material('#7c4dff',.35,.2), trimMat=material('#ffcf40',.3,.25), frontMat=material('#ffcf40',.4,.1);
    group.add(box(1.0,.92,.82,boxMat,0,.62,0));
    group.add(box(1.08,.18,.9,trimMat,0,1.13,0));
    group.add(box(.16,1.15,.94,trimMat,0,.62,.02));
    const canvas=document.createElement('canvas');canvas.width=128;canvas.height=128;
    const ctx=canvas.getContext('2d');ctx.clearRect(0,0,128,128);ctx.font='900 100px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineWidth=8;ctx.strokeStyle='#4a258e';ctx.strokeText('?',64,66);ctx.fillStyle='#fff8d8';ctx.fillText('?',64,66);
    const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
    const label=new THREE.Mesh(new THREE.PlaneGeometry(.55,.58),new THREE.MeshBasicMaterial({map:texture,transparent:true,side:THREE.DoubleSide}));
    label.position.set(0,.65,.424);group.add(label);
    // Bright halo makes this collectible visually distinct from obstacles.
    const halo=new THREE.Mesh(new THREE.TorusGeometry(.78,.075,8,32),new THREE.MeshBasicMaterial({color:'#ffe45c'}));
    halo.rotation.x=Math.PI/2;halo.position.set(0,.09,0);group.add(halo);
    const glow=new THREE.Mesh(new THREE.CircleGeometry(.82,32),new THREE.MeshBasicMaterial({color:'#ffe45c',transparent:true,opacity:.2,side:THREE.DoubleSide}));
    glow.rotation.x=-Math.PI/2;glow.position.y=.035;group.add(glow);
    group.position.set(laneX[laneIndex],0,z);scene.add(group);
    mysteryBoxes.push({mesh:group,halo,glow,lane:laneIndex,z,opened:false});
  }
  function resetWorld() {
    obstacles.forEach(o=>scene.remove(o.mesh));coins.forEach(c=>scene.remove(c.mesh));mysteryBoxes.forEach(b=>scene.remove(b.mesh));levelPickups.forEach(p=>scene.remove(p.mesh));
    obstacles=[];coins=[];mysteryBoxes=[];levelPickups=[];lane=0;jumpY=0;jumpVelocity=0;score=0;runCoins=0;elapsed=0;spawnTimer=0;boxSpawnTimer=11;coinSpawnTimer=0.35;coinLane=0;coinChain=0;
    distanceMeters=0;nextCheckpoint=checkpointEvery;checkpointNumber=0;checkpointPending=false;
    player.position.set(0,0,3); scoreEl.textContent='0';coinsEl.textContent='0';
    const distanceEl=document.getElementById('distanceValue');if(distanceEl)distanceEl.textContent='0 m';
    pauseOverlay.classList.add('hidden');overOverlay.classList.add('hidden');const mystery=document.getElementById('mysteryOverlay');if(mystery)mystery.classList.add('hidden');
  }
  function start(options={}) {
    if(!window.THREE){throw new Error('Three.js belum termuat. Pastikan internet aktif lalu muat ulang halaman.');}
    if(!renderer) initRenderer();
    resetWorld();
    resize();
    running=true;paused=false;gameOver=false;
    missionMode=!!options.mission;
    levelMode=!!options.level;
    levelTargetType=options.targetType||'books';levelTargetCount=Number(options.targetCount)||10;levelTargetWord=options.targetWord||'BUKU';levelCollected=0;levelTargetsSpawned=0;levelPickupTimer=0.15;
    missionDistance=Number(options.distance)||2000;
    checkpointEvery=Number(options.checkpointEvery)||(levelMode?missionDistance:200);
    nextCheckpoint=checkpointEvery;
    if(!missionMode){const hud=document.getElementById('missionHud');if(hud)hud.classList.add('hidden');}
    const mystery=document.getElementById('mysteryOverlay');if(mystery)mystery.classList.add('hidden');
    if(!animationId) animate();
  }
  function initRenderer() {
    const width=Math.max(1,wrap.clientWidth),height=Math.max(1,wrap.clientHeight);
    renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.8));
    renderer.setSize(width,height);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    renderer.outputColorSpace=THREE.SRGBColorSpace;wrap.appendChild(renderer.domElement);
    buildWorld();clock=new THREE.Clock();
    window.addEventListener('resize',resize);
  }
  function resize() {
    if(!renderer||!camera)return;
    const w=Math.max(1,wrap.clientWidth),h=Math.max(1,wrap.clientHeight);
    camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);
  }
  function move(dir) { if(!running||paused||gameOver)return;lane=Math.max(-1,Math.min(1,lane+dir)); }
  function jump() { if(!running||paused||gameOver)return;if(jumpY<=0.001){jumpVelocity=7.4;} }
  function endGame() {
    running=false;gameOver=true;
    document.getElementById('finalScore').textContent=Math.floor(score);
    document.getElementById('finalCoins').textContent=runCoins;
    if(missionMode){
      const hud=document.getElementById('missionHud');
      if(hud){
        hud.classList.remove('hidden');
        document.getElementById('missionQuestion').textContent='Ups! Kamu menabrak rintangan. Coba lagi dan selesaikan objektifnya.';
        document.getElementById('missionAnswers').innerHTML=levelMode?'<button class="mission-answer" data-action="level-retry">Coba Level Lagi</button><button class="mission-answer" data-action="level-result">Kembali ke Level</button>':'<button class="mission-answer" data-action="mission-retry">Coba Misi Lagi</button><button class="mission-answer" data-action="mission-result-menu">Kembali ke Menu</button>';
        document.getElementById('missionProgress').textContent=levelMode?'LEVEL TERHENTI':'RUNNER BERHENTI';
        document.getElementById('missionFeedback').textContent=levelMode?'Target level belum selesai. Tidak ada hadiah yang diberikan.':'Progres 10 soal belum selesai.';
      }
    }else{
      overOverlay.classList.remove('hidden');
    }
    if(window.LibraryDashApp)window.LibraryDashApp.onRunComplete(Math.floor(score),runCoins);
  }
  function animate() {
    animationId=requestAnimationFrame(animate);
    const dt=Math.min(clock?clock.getDelta():.016,.045);
    if(running&&!paused&&!gameOver){
      elapsed+=dt;score+=dt*7;spawnTimer+=dt;boxSpawnTimer+=dt;coinSpawnTimer+=dt;levelPickupTimer+=dt;
      const speed=12+Math.min(elapsed*.18,7);
      if(missionMode){
        distanceMeters=Math.min(missionDistance,distanceMeters+speed*dt*1.7);
        const distanceEl=document.getElementById('distanceValue');if(distanceEl)distanceEl.textContent=`${Math.floor(distanceMeters)} / ${missionDistance} m`;
      }
      if(spawnTimer>1.55){createObstacle();spawnTimer=0;}
      if(!levelMode && coinSpawnTimer>0.48){createCoin();coinSpawnTimer=0;}
      if(levelMode && levelCollected<levelTargetCount){
        // Sebarkan target sepanjang lintasan, bukan menumpuk di awal.
        const targetCollisionDistance = levelTargetCount <= 1 ? missionDistance * 0.5 : 45 + (levelTargetsSpawned * (Math.max(90, missionDistance - 90) / (levelTargetCount - 1)));
        // Objek perlu waktu untuk bergerak dari horizon ke pemain. Munculkan sekitar 72 m lebih awal agar dapat dipungut di titik yang direncanakan.
        const targetSpawnDistance = Math.max(0, targetCollisionDistance - 72);
        if(levelTargetsSpawned < levelTargetCount && distanceMeters >= targetSpawnDistance){
          createLevelPickup(true);
          levelPickupTimer=0;
        } else if(levelPickupTimer > 0.95){
          // Objek pengalih perhatian muncul di sela-sela target.
          createLevelPickup(false);
          levelPickupTimer=0;
        }
      }
      if(!missionMode && boxSpawnTimer>random(18,24)){createMysteryBox();boxSpawnTimer=0;}
      // Keep runner path moving toward the camera.
      roadSegments.forEach(seg=>{seg.position.z+=speed*dt;if(seg.position.z>5)seg.position.z-=100;});
      scenery.forEach(obj=>{obj.position.z+=speed*dt;if(obj.position.z>8)obj.position.z-=88;});
      obstacles.forEach(o=>{o.mesh.position.z+=speed*dt;o.z=o.mesh.position.z;});
      coins.forEach(c=>{c.mesh.position.z+=speed*dt;c.z=c.mesh.position.z;c.mesh.rotation.y+=dt*2.8;});
      levelPickups.forEach(p=>{p.mesh.position.z+=speed*dt;p.z=p.mesh.position.z;p.mesh.rotation.y+=dt*1.6;});
      mysteryBoxes.forEach(b=>{b.mesh.position.z+=speed*dt;b.z=b.mesh.position.z;b.mesh.rotation.y=Math.sin(elapsed*2.2)*.08;const pulse=1+Math.sin(elapsed*5)*.08;if(b.halo)b.halo.scale.setScalar(pulse);if(b.glow)b.glow.material.opacity=.14+((Math.sin(elapsed*5)+1)*.07);});
      player.position.x+=(laneX[lane+1]-player.position.x)*Math.min(1,dt*12);
      if(jumpY>0||jumpVelocity>0){jumpVelocity-=19*dt;jumpY=Math.max(0,jumpY+jumpVelocity*dt);if(jumpY===0)jumpVelocity=0;}
      player.position.y=jumpY;
      player.children[3].rotation.x=Math.sin(elapsed*13)*.28;player.children[4].rotation.x=-Math.sin(elapsed*13)*.28;
      for(const o of obstacles){
        if(!o.passed&&o.z>2.15&&o.z<4.1&&Math.abs(player.position.x-laneX[o.lane])<.9){
          const cleared=jumpY>(o.kind==='crate'?.95:1.75);
          if(!cleared){endGame();break;}o.passed=true;
        }
      }
      if(!gameOver){
        for (const c of coins) {
          if (!c.taken && c.z > 2.0 && c.z < 4.1 && Math.abs(player.position.x - laneX[c.lane]) < 0.9) {
            c.taken = true;
            runCoins += 1;
            score += 2;
            coinsEl.textContent = runCoins;
            scoreEl.textContent = Math.floor(score);
            if (window.LibraryDashApp && !missionMode) window.LibraryDashApp.onCoinCollected(1);
            if (window.LibraryDashApp && levelMode) window.LibraryDashApp.onLevelCoinCollected(1);
          }
        }
        for(const p of levelPickups){if(!p.taken&&p.z>2.0&&p.z<4.1&&Math.abs(player.position.x-laneX[p.lane])<.95){p.taken=true;if((levelTargetType==='books'&&p.type==='book')||(levelTargetType==='letters'&&p.type==='letter'&&p.letter===levelTargetWord[levelCollected])){levelCollected++;if(window.LibraryDashApp)window.LibraryDashApp.onLevelCollectibleCollected(p.type,p.letter);}else if(levelTargetType==='letters'&&p.type==='letter'&&window.LibraryDashApp)window.LibraryDashApp.onLevelCollectibleCollected('wrong-letter',p.letter);}}
        obstacles=obstacles.filter(o=>{if(o.z>7){scene.remove(o.mesh);return false;}return true;});
        levelPickups=levelPickups.filter(p=>{if(p.z>7||p.taken){scene.remove(p.mesh);return false;}return true;});
        coins=coins.filter(c=>{if(c.z>7||c.taken){scene.remove(c.mesh);return false;}return true;});
        mysteryBoxes=mysteryBoxes.filter(b=>{
          if(!b.opened&&b.z>2.0&&b.z<4.1&&Math.abs(player.position.x-laneX[b.lane])<.95){
            b.opened=true;paused=true;
            if(window.LibraryDashApp)window.LibraryDashApp.onMysteryBox();
          }
          if(b.z>7||b.opened){scene.remove(b.mesh);return false;}return true;
        });
        scoreEl.textContent=Math.floor(score);
        if(missionMode&&!checkpointPending&&distanceMeters>=nextCheckpoint){
          checkpointPending=true;paused=true;checkpointNumber++;
          if(window.LibraryDashApp)window.LibraryDashApp.onCheckpoint(Math.min(nextCheckpoint,missionDistance),checkpointNumber,missionDistance);
        }
        if(missionMode&&!gameOver&&!checkpointPending&&distanceMeters>=missionDistance){
          running=false;paused=true;
          if(window.LibraryDashApp)window.LibraryDashApp.onMissionDistanceComplete();
        }
      }
    }
    if(renderer&&scene&&camera)renderer.render(scene,camera);
  }
  function pause(){if(!running||gameOver)return;paused=true;pauseOverlay.classList.remove('hidden');}
  function resume(){if(gameOver)return;paused=false;checkpointPending=false;pauseOverlay.classList.add('hidden');}
  function continueCheckpoint(){if(gameOver)return;nextCheckpoint+=checkpointEvery;checkpointPending=false;const hud=document.getElementById('missionHud');if(hud)hud.classList.add('hidden');paused=false;}
  // Pause the runner at a distance checkpoint to show a level question.
  function pauseForLevelQuestion(){if(gameOver||!levelMode)return;paused=true;checkpointPending=false;}
  function continueLevelPhase(){if(gameOver)return;nextCheckpoint=missionDistance+1;paused=false;checkpointPending=false;const hud=document.getElementById('missionHud');if(hud)hud.classList.add('hidden');}
  function continueMystery(){if(gameOver)return;const overlay=document.getElementById('mysteryOverlay');if(overlay)overlay.classList.add('hidden');paused=false;}
  function stop(){running=false;paused=false;checkpointPending=false;pauseOverlay.classList.add('hidden');}
  function addRunCoins(amount){runCoins+=amount;score+=amount*2;coinsEl.textContent=runCoins;scoreEl.textContent=Math.floor(score);}
  window.LibraryDashGame={start,move,jump,pause,resume,stop,continueCheckpoint,pauseForLevelQuestion,continueLevelPhase,continueMystery,addRunCoins,getState:()=>({score:Math.floor(score),coins:runCoins,distance:Math.floor(distanceMeters),levelCollected}),isMission:()=>missionMode,isLevel:()=>levelMode};
})();