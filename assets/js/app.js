
//variables
let scene, camera, renderer, stars, starGeo, cube;
let playing = false;
let rotationCounter = 0.01;
let cameraCounter = 0.01;
let particleCount = 0;
let positionValues = []

//audio initializations
let listener = new THREE.AudioListener();
let sound = new THREE.Audio(listener);
let audioLoader = new THREE.AudioLoader();
audioLoader.load('assets/sounds/sample.mp3', function (buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(1);
  sound.play();
});
let analyser = new THREE.AudioAnalyser(sound, 32);

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.y = 100;
  scene.background = (new THREE.TextureLoader().load( 'assets/textures/cyberpunk.jpg' ));
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //geometries and objects
  starGeo = new THREE.Geometry();
  for (let i = 0; i < 13; i++) {
    star = new THREE.Vector3(
      Math.sin(rotationCounter) * 150,
      Math.cos(rotationCounter) * 150,
      0
    );
    starGeo.vertices.push(star);
    positionValues.push(star.x);
    positionValues.push(star.y);
    rotationCounter += 0.485;
  }
  let sprite = new THREE.TextureLoader().load('assets/textures/star.png');
  let starMaterial = new THREE.PointsMaterial({
    color: 0xafc3cc,
    size: 50,
    map: sprite
  });
  stars = new THREE.Points(starGeo, starMaterial);
  let cubeTexture = new THREE.TextureLoader().load('assets/textures/cube.jpg');
  let cubeGeom = new THREE.BoxBufferGeometry(100, 100, 100);
  cube = new THREE.Mesh(cubeGeom, new THREE.MeshBasicMaterial({ map: cubeTexture}));

  scene.add(stars, cube);
  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

//particle sequence with frequency data 
function animate() {
  let data = analyser.getFrequencyData();
  starGeo.verticesNeedUpdate = true;
  starGeo.vertices.forEach(p => {
    if(particleCount == 0){
      p.y = ((data[particleCount]/6) + positionValues[1]);
      particleCount ++;
    }else if(particleCount == 1){
      p.x = ((data[particleCount]/8) + positionValues[2])
      p.y = ((data[particleCount]/6) + positionValues[3]);
      particleCount ++;
    }else if(particleCount == 2){
      p.x = ((data[particleCount]/5) + positionValues[4])
      p.y = ((data[particleCount]/5) + positionValues[5]);
      particleCount ++;
    }else if(particleCount == 3){
      p.x = ((data[particleCount]/4) + positionValues[6])
      particleCount ++;
    }else if(particleCount == 4){
      p.x = ((data[particleCount]/4) + positionValues[8])
      p.y = (-(data[particleCount]/4) + positionValues[9]);
      particleCount ++;
    }else if(particleCount == 5){
      p.x = ((data[particleCount]/4) + positionValues[10])
      p.y = (-(data[particleCount]/4) + positionValues[11]);
      particleCount ++;
    }else if(particleCount == 6){
      p.x = ((data[particleCount]/8) + positionValues[12])
      p.y = (-(data[particleCount]/4) + positionValues[13]);
      particleCount ++;
    }else if(particleCount == 7){
      p.x = (-(data[particleCount]/8) + positionValues[14])
      p.y = (-(data[particleCount]/4) + positionValues[15]);
      particleCount ++;
    }else if(particleCount == 8){
      p.x = (-(data[particleCount]/4) + positionValues[16])
      p.y = (-(data[particleCount]/4) + positionValues[17]);
      particleCount ++;
    }else if(particleCount == 9){
      p.x = (-(data[particleCount]/4) + positionValues[18])
      p.y = (-(data[particleCount]/4) + positionValues[19]);
      particleCount ++;
    }else if(particleCount == 10){
      p.x = (-(data[particleCount]/4) + positionValues[20])
      particleCount ++;
    }else if(particleCount == 11){
      p.x = (-(data[particleCount]/2.5) + positionValues[22])
      p.y = ((data[particleCount]/2.5) + positionValues[23]);
      particleCount ++;
    }else if(particleCount == 12){
      p.x = (-(data[particleCount]/1.5) + positionValues[24])
      p.y = ((data[particleCount]/1.5) + positionValues[25]);
      particleCount = 0;
    }
  });
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  //camera rotation
  cameraCounter += 0.006;
  camera.lookAt(cube.position);
  camera.position.x = Math.sin(cameraCounter) * 600;
  camera.position.z = Math.cos(cameraCounter) * 600;


  starGeo.verticesNeedUpdate = true;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

init();
