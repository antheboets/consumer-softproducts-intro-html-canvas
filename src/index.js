import { Scene,PerspectiveCamera,WebGLRenderer,BoxGeometry,MeshBasicMaterial,Mesh } from 'three';
import {FontLoader} from './lib/FontLoader'
import {TextGeometry} from './lib/TextGeometry'

const mainFunc =  async ()=>{
    const setCanvasToScreen = (renderer) =>{
        //console.log(window.innerHeight,window.innerWidth)
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    
    const scene = new Scene();
    const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    const renderer = new WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    const fontLoader = new FontLoader();
    const font = await fontLoader.loadAsync('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json')
    
    const text = new TextGeometry( "hello canvas zzaazaza", {
        font: font,

        size: 50,
        height: 10,
        curveSegments: 12,
    
        bevelThickness: 1,
        bevelSize: 1,
        bevelEnabled: true
    });

    const textMat = new MeshBasicMaterial({color: 0x00ff00});
    const textMesh = new Mesh(text,textMat)
    scene.add(textMesh)
    const geometry = new BoxGeometry( 1, 1, 1 );
    const material = new MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new Mesh( geometry, material );
    scene.add( cube );
    
    camera.position.z = 5;
    
    window.addEventListener('resize',()=>{setCanvasToScreen(renderer)})
    
    function animate() {
        requestAnimationFrame( animate );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;    
        renderer.render( scene, camera );
    }
    animate();
}
mainFunc()