import { Scene,PerspectiveCamera,WebGLRenderer,BoxGeometry,MeshBasicMaterial,Mesh, AmbientLight,AudioLoader,AudioListener, Audio, Vector3 } from 'three';
import {FontLoader} from './lib/FontLoader'
import {TextGeometry} from './lib/TextGeometry'
import {OrbitControls} from './lib/OrbitControls'

window.addEventListener("load",async () =>{
    let now = new Date();
    console.log("dom has loaded",debugTimeStamp(now))

    function debugTimeStamp(now){
        return `${(new Date()-now) / 1000}Sec`
    }
    
    window.addEventListener('resize',()=>{setCanvasToScreen(renderer)})
    const setCanvasToScreen = (renderer) =>{
        //console.log(window.innerHeight,window.innerWidth)
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    const PlayEvent = (e)=>{        
        //remove play
        const playButton = document.getElementById("playButton")
        playButton.removeEventListener("click",PlayEvent)
        playButton.parentNode.removeChild(playButton)

        let iterator = 0
        resources.forEach(resource => {
            resourceEvent[iterator](resource)
            iterator++
        });

        console.log("starting animate loop",debugTimeStamp(now))
        animate();
    }
    /*
    TEXT
    Consumer
    SoftProducts
    The Authority on Life...
    */

    const resourcesList = []
    const resourceEvent = []

    const scene = new Scene();
    const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    const listener = new AudioListener();
    camera.add(listener)

    const sound = new Audio(listener)
    const audioLoader = new AudioLoader()
    
    resourcesList.push(audioLoader.loadAsync('./audio/SteroidLegend.m4a'))
    resourceEvent.push((buffer)=>{
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
    })
    

    const renderer = new WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    document.body.appendChild( renderer.domElement );
    
    //adding debug camera
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target = new Vector3(0,0,-40)
    controls.update()

    const fontLoader = new FontLoader();
    
    resourcesList.push(fontLoader.loadAsync('./fonts/mingliu.json'))
    resourceEvent.push((font)=>{
        const text = new TextGeometry("Consumer", {
            font: font,
            size: 50,
            height: 10,
        });
    
        const textMat = new MeshBasicMaterial({color: 0x00ff00});
        const textMesh = new Mesh(text,textMat)
        scene.add(textMesh)
    })

    const geometry = new BoxGeometry( 1, 1, 1 );
    const material = new MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new Mesh( geometry, material );
    scene.add( cube );
    scene.add(new AmbientLight(0xffffff,0.5))
    camera.position.z = 5;
    
    
    
    console.log("waiting for all the resources to load",debugTimeStamp(now))
    //wait for resources to load
    const resources = await Promise.all(resourcesList,debugTimeStamp(now))
    console.log("all the resources have loaded",debugTimeStamp(now))
    document.getElementById("playButton").addEventListener("click",PlayEvent)

    function animate() {
        requestAnimationFrame( animate );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;    
        renderer.render( scene, camera );
    }
})
//getEventListeners(document.getElementById("playButton"))