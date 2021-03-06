import { Scene,PerspectiveCamera,WebGLRenderer,BoxGeometry,MeshBasicMaterial,Mesh, AmbientLight,AudioLoader,AudioListener, Audio, Vector3,TextureLoader } from 'three';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

window.addEventListener("load",async()=>{
    const domLoadedTimestamp = new Date()
    console.log("dom has loaded",debugTimeStamp())

    function debugTimeStamp(){
        return `${(new Date()-domLoadedTimestamp) / 1000} Sec`
    }
    function debugTimeStampCompare(compareToTime, timeName = ""){
        return timeName === ""? `${(new Date()-domLoadedTimestamp) / 1000} Sec and ${((new Date()-domLoadedTimestamp) - (new Date()-compareToTime)) / 1000} Sec` : `${(new Date()-domLoadedTimestamp) / 1000} Sec and ${((new Date()-domLoadedTimestamp) - (new Date()-compareToTime)) / 1000} Sec ${timeName}`
    }
    
    window.addEventListener('resize',()=>{setCanvasToScreen(renderer)})
    const setCanvasToScreen = (renderer)=>{
        renderer.setSize(window.innerWidth, window.innerHeight)
    }
    /*
    TEXT
    CONSUMER
    SoftProducts
    The Authority on Life...
    */
    const resourcesList = []
    const resourceEvent = []

    const scene = new Scene()
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    
    const listener = new AudioListener()
    camera.add(listener)

    const sound = new Audio(listener)
    const audioLoader = new AudioLoader()
    
    resourcesList.push(audioLoader.loadAsync('./audio/SteroidLegend.m4a'))
    resourceEvent.push((buffer)=>{
        sound.setBuffer(buffer)
        sound.setLoop(true)
        sound.setVolume(0.5)
        sound.play()
    })

    const textureLoader = new TextureLoader()
    resourcesList.push(textureLoader.loadAsync("./images/background.png"))
    resourceEvent.push((texture)=>{
        scene.background = texture
    })

    const renderer = new WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    document.body.appendChild(renderer.domElement)
    
    //adding debug camera
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target = new Vector3(0,0,-40)
    controls.update()

    const fontLoader = new FontLoader()
    
    resourcesList.push(fontLoader.loadAsync('./fonts/mingliu.json'))
    resourceEvent.push((font)=>{
        const text = new TextGeometry("CONSUMER", {
            font: font,
            size: 50,
            height: 10,
        })
    
        const textMat = new MeshBasicMaterial({color: 0x00ff00})
        const textMesh = new Mesh(text,textMat)
        scene.add(textMesh)
    })

    const geometry = new BoxGeometry(1, 1, 1 )
    const material = new MeshBasicMaterial({color: 0x00ff00 })
    const cube = new Mesh(geometry, material)
    scene.add(cube)
    scene.add(new AmbientLight(0xffffff,0.5))
    camera.position.z = 5
    
    console.log("waiting for all the resources to load",debugTimeStamp())
    //wait for resources to load
    const resources = await Promise.all(resourcesList,debugTimeStamp())
    const timeSinceResourcesLoaded = new Date()
    console.log("all the resources have loaded",debugTimeStamp())
    document.getElementById("playButton").addEventListener("click",PlayEvent)

    function PlayEvent(e){        
        //remove play
        const playButton = document.getElementById("playButton")
        playButton.removeEventListener("click",PlayEvent)
        playButton.parentNode.removeChild(playButton)

        let iterator = 0
        resources.forEach(resource => {
            resourceEvent[iterator](resource)
            iterator++
        })

        console.log("starting animate loop",debugTimeStampCompare(timeSinceResourcesLoaded,"without waiting on user gesture"))
        animate()
    }

    function animate() {
        requestAnimationFrame( animate );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;    
        renderer.render( scene, camera );
    }
})