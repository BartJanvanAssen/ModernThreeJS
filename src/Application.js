import Statistics from './helpers/Stats/stats'
import { Clock, WebGLRenderer, Scene, PerspectiveCamera, CubeGeometry, MeshLambertMaterial, Mesh, PlaneGeometry, ImageUtils, DirectionalLight, AdditiveBlending } from 'three'
import Smoke from './modules/Smoke/smoke'
export default class Application {
    constructor(){
        this.stats = new Statistics();
        this.clock = new Clock();
        this.renderer = new WebGLRenderer();
        this.scene = new Scene();
        this.camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        this.scene.add(this.camera);
        this.geometry = new CubeGeometry( 200, 200, 200 );
        this.material = new MeshLambertMaterial( { color: 0xaa6666, wireframe: false } );
        this.mesh = new Mesh(this.geometry, this.material );


        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.camera.position.z = 1000;

        this.cubeSineDriver = 0;
    
        let textGeo = new PlaneGeometry(300,300);
        ImageUtils.crossOrigin = ''; //Need this to pull in crossdomain images from AWS
        let textTexture = ImageUtils.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/quickText.png');
        let textMaterial = new MeshLambertMaterial({color: 0x00ffffff, opacity: 1, map: textTexture, transparent: true, blending: AdditiveBlending})
        let text = new Mesh(textGeo,textMaterial);
        text.position.z = 800;
        this.scene.add(text);

        let light = new DirectionalLight(0xffffff,0.5);
        light.position.set(-1,0,1);
        this.scene.add(light);

        this.smoke = new Smoke()
        this.smoke.setParticles(150)
        this.smoke.getParticles().map((p) => this.scene.add(p))

        document.body.appendChild( this.renderer.domElement );

        this.animate()
    }
    animate() {
    
        // note: three.js includes requestAnimationFrame shim
        this.stats.begin();
        const delta = this.clock.getDelta();
        requestAnimationFrame(() => this.animate() );
        this.smoke.evolveSmoke(delta);
        this.render();
        this.stats.end();
    }
    render(){
        this.mesh.rotation.x += 0.005;
        this.mesh.rotation.y += 0.01;
        this.cubeSineDriver += .01;
        this.mesh.position.z = 100 + (Math.sin(this.cubeSineDriver) * 500);
        this.renderer.render( this.scene, this.camera );   
    }
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
}
