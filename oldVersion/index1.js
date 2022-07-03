window.addEventListener("load",()=>{
    console.log("dom loaded")

    const setCanvasToScreen = (cnvs) =>{
        //console.log(window.innerHeight,window.innerWidth)
        cnvs.height = window.innerHeight
        cnvs.width = window.innerWidth
    }

    
    const canvas = document.getElementById("canvas")
   
    setCanvasToScreen(canvas)
    window.addEventListener('resize',()=>{setCanvasToScreen(canvas)})
    canvas.addEventListener('')

    const ctx = canvas.getContext("webgl")

})