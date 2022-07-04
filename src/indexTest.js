import { Scene,PerspectiveCamera,WebGLRenderer,BoxGeometry,MeshBasicMaterial,Mesh, AmbientLight, Color, Vector3 } from 'three';
import {FontLoader} from './lib/FontLoader'
import {TextGeometry} from './lib/TextGeometry'
import {OrbitControls} from './lib/OrbitControls'

()=>{
    console.log("test")
}

const mainFunc =  async ()=>{
    const setCanvasToScreen = (renderer) =>{
        //console.log(window.innerHeight,window.innerWidth)
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    /*
    Consumer
    SoftProducts
    The Authority on Life...
    */
    const scene = new Scene();
    scene.background = new Color(0xffffff)
    const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    const renderer = new WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    document.body.appendChild( renderer.domElement );
    
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target = new Vector3(0,0,-40)
    controls.update()

    const fontLoader = new FontLoader();
    fontLoader.load('./fonts/MingLiU_Regular3.json',(font)=>{
        console.log(font,"font")
        //Consumer\nSoftProducts\nThe Authority on Life...
        const text = new TextGeometry("Consumer\nSoftProducts\nThe Authority on Life...", {
            font: font,
            size: 50,
            height: 10,
        });
        console.log(text,"text")
        const textMat = new MeshBasicMaterial({color: 0x00ff00});
        const textMesh = new Mesh(text,textMat)
        scene.add(textMesh)
    })

    /*
    const font = await fontLoader.loadAsyn('./fonts/MingLiU_Regular.json',(font)=>{console.log(font)})
    console.log(font)
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
    */
    const geometry = new BoxGeometry( 1, 1, 1 );
    const material = new MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new Mesh( geometry, material );
    scene.add( cube );
    scene.add(new AmbientLight(0xffffff,0.5))
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