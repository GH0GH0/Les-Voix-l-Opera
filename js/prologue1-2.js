

const container = document.body
const tooltip = document.querySelector('.tooltip')

let spriteActive =false;

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
        // sprite.name = point.name
        sprite.position.copy(point.position.clone().normalize().multiplyScalar(30))
        sprite.scale.multiplyScalar(2)
        // sprite.add(sound)
        this.scene.add( sprite )
        
        this.sprites.push(sprite)
        sprite.onmouseover = () => {
           this.scale.x = 1
           console.log("oulaaaaaaaaaaaaaaaaaach")
        }
        sprite.onClick = () => {
            this.destroy()
            point.scene.creatScene(scene)
            point.scene.appear()
        }
        
    }
    
    destroy(){
        TweenLite.to(this.camera, 0.5 ,{
            zoom:2,
            onUpdate: () => {
                this.camera.updateProjectionMatrix()
            }
            
        })
        TweenLite.to(this.sphere.material, 1 ,{
            opacity:0,
            onComplete: () => {
                this.scene.remove(this.sphere)
            }
        })
        this.sprites.forEach((sprite) => {
            TweenLite.to(sprite.scale, 1 ,{
                x:0,
                y:0,
                z:0,
                onComplete: () => {
                    this.scene.remove(sprite)
                }
            })
        })
    }

    appear(){
        TweenLite.to(this.camera, 0.5 ,{
            zoom:1,
            onUpdate: () => {
                this.camera.updateProjectionMatrix()
            }
            
        }).delay(0.5)
        this.sphere.material.opacity = 0
        TweenLite.to(this.sphere.material, 1 ,{
            opacity:1
            
        })
        this.sprites.forEach((sprite) => {
            sprite.scale.set(0,0,0)
            TweenLite.to(sprite.scale, 1 ,{
                x:2,
                y:2,
                z:2,
                
            })
        })
    }
}

//scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 )
camera.position.set( 0, 0, 0 )

//sphere & texture

let s = new Scene('images/Prologue_1-2/Grand_escalier_1.jpg', camera)
let s2 = new Scene('images/Prologue_1-2/Grand_escalier_2.jpg', camera)
s.creatScene(scene)
s.addPoint({
    position :new THREE.Vector3(  48.76436454747427, 8.770088707699635, -4.273733765178496),
    scene :s2
})

s2.addPoint({
    position :new THREE.Vector3( 42.1115223449268,  -26.599583607164366,  -1.7116318025789619),
    scene :s
    
})
s.creatScene(scene)
s.appear
camera.position.z = 5;






       const geometry = new THREE.BoxGeometry();
			const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
            const cube = new THREE.Mesh( geometry, material );
            const position = new THREE.Vector3( 0,40,0)
            cube.position.copy(position)
            cube.scale.multiplyScalar(3)
         
            scene.add(cube)
            // cube.position.y +=  speed * delta;
            console.log(cube.position.x);

           

            // const animate = function () {
			// 	requestAnimationFrame( animate );

				

			// 	renderer.render( scene, camera );
            // };
            
            // animate();
            //create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );

// create the PositionalAudio object (passing in the listener)
const sound = new THREE.PositionalAudio( listener );

// load a sound and set it as the PositionalAudio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'audio/Prologue 1-2 Audio Guide.wav', function( buffer ) {
	sound.setBuffer( buffer );
    sound.setRefDistance(30 );
    // sound.setDirectionalCone( 180, 230, 0.1 );
  sound.play();
});
cube.add(sound)
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





function animate() {
    requestAnimationFrame( animate )
  //  cube.position.y -= 0.09;
    // console.log(cube.position.y)
    // console.log(camera.position)
     //camera.rotation.x +=  9 * Math.PI / 180
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
        if(intersect.object.type == 'Sprite'){
          
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
