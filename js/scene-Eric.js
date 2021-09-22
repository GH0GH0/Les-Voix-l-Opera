

const container = document.body
const tooltip = document.querySelector('.tooltipUP')
// const Crash = document.getElementsByClassName('Crash')

let spriteActive =false;
// Crash.style.display = 'none'
class Scene {
    constructor (image,camera){
        this.image = image
        this.points = []
        this.sprites = []
        this.scene = null
        this.camera = camera
    }

    creatScene (scene){
        this.scene = scene
        const geometry = new THREE.SphereGeometry( 50, 32, 32 )
        const texture = new THREE.TextureLoader().load(this.image)
        texture.wrapS = THREE.RepaetWraping
        texture.repeat.x = -1
        const material = new THREE.MeshBasicMaterial( {
            map: texture,
            side: THREE.DoubleSide
        } )
        material.transparent =false
        this.sphere = new THREE.Mesh( geometry, material )
        this.scene.add(this.sphere )
        this.points.forEach(this.addTooltip.bind(this))
        
    }
    addPoint (point){
        this.points.push(point)
    }
    addTooltip (point){
        let spriteMap = new THREE.TextureLoader().load('images/scene1-1/Chaise/Elements-lumineux.png' )
        let spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } )
        let sprite = new THREE.Sprite( spriteMaterial )
        sprite.position.copy(point.position.clone().normalize().multiplyScalar(30))
        sprite.scale.multiplyScalar(10)
        this.scene.add( sprite )
        
        this.sprites.push(sprite)
        
        sprite.onClick = () => {
           // Wrap every letter in a span
             var textWrapper = document.querySelector('.ml10 .letters');
             
              textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
            dark = document.querySelector('.dark')
            dark.style.display='block'
             dark.style.zIndex=10
             Fantom.play();
//   Eric.style.animation ="Eric 2s ease-in-out 0s forwards"
//   qui.style.animation ="Eric 2s ease-in-out 0s forwards"
setInterval(textWrapper.style.display='block', 500); 

anime.timeline({loop: false})
    .add({
      targets: '.ml10 .letter',
      rotateY: [-90, 0],
      duration: 2000,
      delay: (el, i) => 45 * i
    });
        }
        
    }
   
   
}

//scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 )
camera.position.set( 0, 0, 0 )

//sphere & texture

let s = new Scene('images/scene1-1/Chaise/Chaise-13- 360°.jpg', camera)

s.creatScene(scene)
s.addPoint({
    position :new THREE.Vector3( -302.71205548678539, 10,0),
   
    
})



s.creatScene(scene)
s.appear
camera.position.z = 5;
      
        
//rendu
const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
container.appendChild( renderer.domElement )

//controls
const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.rotateSpeed = 0.2
controls.minDistance = 20;
controls.maxDistance = 40;

controls.update()





function animate() {
    requestAnimationFrame( animate )
   


    renderer.render( scene, camera )
    
}
animate()
function onResize(){
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerHeight / window.innerHeight

}
const  rayCaster = new THREE.Raycaster()
function onClick (e){
let mouse = new THREE.Vector2(
    (e.clientX / window.innerWidth) * 2 - 1,
    - (e.clientY / window.innerHeight) * 2 + 1
    )
    
    rayCaster.setFromCamera(mouse, camera)
    let intersects= rayCaster.intersectObjects(scene.children)
    
    intersects.forEach(function (intersect){
        if(intersect.object.type === 'Sprite'){
            intersect.object.onClick()
        }
        

    })
   
    /** script pour la detection de position d'un click de souris **/
 
    if (intersects.length > 0){
        console.log(intersects[0].point)
    }
    
}

function onMouseMove(e){
    let mouse = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        - (e.clientY / window.innerHeight) * 2 + 1
        )
        rayCaster.setFromCamera(mouse, camera)
        let foundSprite = false
        let intersects= rayCaster.intersectObjects(scene.children)
        intersects.forEach(function (intersect){
        if(intersect.object.type === 'Sprite'){
            intersect.object.material.color.setHex( 0xffff00 );
                    // play the audio
                    //  oceanAmbientSound.play()
        }
    })
    
    if(foundSprite===false && spriteActive){
        tooltip.classList.remove('is-active')

        spriteActive= false
    }
}


window.addEventListener('resize', onResize)
container.addEventListener('click', onClick)
container.addEventListener('mousemove',onMouseMove)
document.addEventListener('DOMContentLoaded',function(){
    //traitement le dom est accessible
    textWrapper = document.querySelector('.ml10 .letters').style.display='none'
    dark = document.querySelector('.dark').style.display='none'
    Eric = document.querySelector('#Eric')
    qui = document.querySelector('#Follow-Emma')
    Fantom = document.querySelector('#Fantom')
   
  });