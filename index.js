window.addEventListener("load",async ( ) =>{
    console.log("dom loaded")

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    const fontLoader = new FontLoader();
    const font = await fontLoader.loadAsync('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json')

    const geometry = new THREE.BoxGeometry( 5, 5, 5 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    console.log(font)
    const text = new TextGeometry( "hello canvas", {
        font: font,

        size: 50,
        height: 10,
        curveSegments: 12,
    
        bevelThickness: 1,
        bevelSize: 1,
        bevelEnabled: true
    });
    /*
    const textMat = new THREE.MeshBasicMaterial({color: 0x00ff00});
    new THREE.Mesh( text )
    scene.add();
    */

    var textMaterial = new THREE.MeshPhongMaterial( 
        { color: 0xff0000, specular: 0xffffff }
    );
    
    var mesh = new THREE.Mesh( text, textMaterial )
    console.log(mesh)
    scene.add( mesh );
    //scene.add( cube );
    console.log(scene)
    camera.position.z = 5;

    function animate() {
        requestAnimationFrame( animate );
        
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        
        renderer.render( scene, camera );
    }
    animate();
})