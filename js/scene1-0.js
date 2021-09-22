

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
        let spriteMap = new THREE.TextureLoader().load('images/Prologue_1-2/360°_suivante.png' )
        let spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } )
        let sprite = new THREE.Sprite( spriteMaterial )
        sprite.position.copy(point.position.clone().normalize().multiplyScalar(30))
        sprite.scale.multiplyScalar(2)
        this.scene.add( sprite )
        
        this.sprites.push(sprite)
        
        sprite.onClick = () => {
            camera.rotation.y +=  8 * Math.PI / 90
            
            console.log('ROTATION =',camera.rotation.y)
        }
        
    }
    addCrash (point){
        let spriteMap = new THREE.TextureLoader().load('images/Scene_1-0/éléments/test-gif.gif' )
        let spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } )
        let sprite = new THREE.Sprite( spriteMaterial )
        sprite.position.copy(point.position.clone().normalize().multiplyScalar(30))
        sprite.scale.multiplyScalar(2)
        this.scene.add( sprite )
        
        this.sprites.push(sprite)
        
        
    }
   
}

//scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 )
camera.position.set( 0, 0, 0 )

//sphere & texture

let s = new Scene('images/Scene_1-0/éléments/Salle_360°_3.jpg', camera)

s.creatScene(scene)
s.addPoint({
    position :new THREE.Vector3(39.131476167050714, -31.05307570386406, 0.13628913589116926),
   
    
})



s.creatScene(scene)
s.appear
camera.position.z = 5;







       const geometry = new THREE.SphereGeometry( 2.1, 32, 32 );
			const material = new THREE.MeshBasicMaterial( { color: 'rgba(240, 170, 65, 0.466)',clearCoatRoughness :2.6 } );
            const cube = new THREE.Mesh( geometry, material );
            const position = new THREE.Vector3( 0,60,0)
            cube.position.copy(position)
            cube.scale.multiplyScalar(3)
            cube.name='lustre'
            console.log('CLICK', cube)
            scene.add(cube)
            
            // cube.position.y +=  speed * delta;
            console.log(cube.position.x);


         //create an AudioListener and add it to the camera
         const listener = new THREE.AudioListener();
         camera.add( listener );
         
         // create the PositionalAudio object (passing in the listener)
         const sound = new THREE.PositionalAudio( listener );
         
        //  // load a sound and set it as the PositionalAudio object's buffer
        //  const audioLoader = new THREE.AudioLoader();
        //  audioLoader.load( 'audio/SCENE 1-0 et amb 1-1 Audio Guide.wav', function( buffer ) {
        //      sound.setBuffer( buffer );
        //      sound.setRefDistance(30 );
        //     //  // sound.setDirectionalCone( 180, 230, 0.1 );
        //    sound.play();
        //  });
        //  scene.add(sound)
//rendu
const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
container.appendChild( renderer.domElement )

//controls
const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.rotateSpeed = 0.2
controls.minDistance = 20;
controls.maxDistance = 40;
// controls.minAzimuthAngle = - 0.2; // radians
// controls.maxAzimuthAngle = 0.2; // radians
controls.update()


setInterval(function(){ document.location.assign("scene1-1.html") }, 43000);


function animate() {
    requestAnimationFrame( animate )
   
    // console.log(cube.position.y)
    // console.log(camera.position)
    setInterval(function(){ cube.position.y -= 3; }, 37000);
    

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
            let p = intersect.object.position.clone().project(camera)
          
            tooltip.style.top =  ((-1 * p.y + 1) * window.innerHeight / 2) + 'px'
            tooltip.style.left = (( p.x + 1) * window.innerWidth / 2) + 'px'
            tooltip.classList.add('is-active')
            tooltip.innerHTML = intersect.object.name;
            
            spriteActive = intersect.object
            foundSprite = true
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
