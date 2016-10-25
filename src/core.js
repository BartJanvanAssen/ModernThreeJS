//https://github.com/mrdoob/three.js/pull/9310
import * as THREE from 'three';

//var backgroundColor = 0xffffff;
var backgroundColor = 0x000000;
var loading = false;


var scene = new THREE.Scene();
scene.background = new THREE.Color(backgroundColor); // background-color
scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

var camera = new THREE.PerspectiveCamera( 150, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.autoClear = true;

window.addEventListener( 'resize', onWindowResize, false );
document.body.appendChild( renderer.domElement );

var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

// create a point light
var pointLight =
  new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);


var helper = new THREE.GridHelper( 1000, 100 );
helper.position.y = - 199;
helper.material.opacity = 0.25;
helper.material.transparent = true;
scene.add( helper );



var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshLambertMaterial( { 
  backgroundColor: 0x00ff00 
} );
var cube = new THREE.Mesh( geometry, material );


var PageGeometry = new THREE.BoxGeometry( window.innerWidth, window.innerHeight, 1 );
var HomeScreen = new THREE.Mesh( PageGeometry, material );

scene.add( cube );
scene.add( HomeScreen );

camera.position.z = 2;
var counter = new THREE.Clock();
counter.start();
function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
  if(loading){
    HomeScreen.visible = false;
    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;
  }
  else{
    cube.visible = false;
  }
  counter++;
  console.log(counter.getElapsedTime);
  if(counter.getElapsedTime > 2500){
    loading = true;
  }
}
render();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}
