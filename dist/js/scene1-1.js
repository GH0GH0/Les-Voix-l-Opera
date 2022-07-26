DragTime =0;
ZIndex = -10;


function allowDrop(event) {
   event.preventDefault();
   
 }
 function drag(event) {
   event.dataTransfer.setData("text", event.target.id);
   document.getElementById('Verre2').play();
  
 }
 function drop(event) {
    if(event.target.id== "dropBox"+event.dataTransfer.getData("text") && event.dataTransfer.getData("text")){
      var data = event.dataTransfer.getData("text");
      event.target.appendChild(document.getElementById(data));
      document.getElementById('Verre1').play();
      document.getElementById(data).style.width="70%"
      document.getElementById(data).style.opacity=0.8
      event.target.style.zIndex = ZIndex;
       DragTime++ ;
       ZIndex ++ ;
    }else{
      document.getElementById('Verre3').play();
      
    }
    
   if(DragTime == 4){
   GameFinish();
  }
 }
 function GameFinish(){
  document.getElementById('Finish').style.display='block'
  
 }
 document.addEventListener('DOMContentLoaded',function(){
  //traitement le dom est accessible
  document.getElementById('Finish').style.display='none'

});