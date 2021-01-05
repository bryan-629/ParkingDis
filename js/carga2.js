$('#fila1').hide();
$('#carga').hide(); 
$('.documento').hide(); 

carga();
setTimeout(function(){
        $('.containerCarga').fadeOut("",cargaDocumento); 
},2000);
       
function carga(){
        $('#carga').fadeIn(); 
        $('#carga').animate({left: "50px"},"slow");
        $('#carga').animate({left: "-50px"},"slow",carga);  
}
/*REALIZAMOS LA ANIMACION DE LA CARGA, QUE LA BARRIA SE MUEVA DE UN LADO PARA OTRO */

function cargaDocumento(){
        $('.documento').fadeIn("", function(){
                
        }); 
}
   

        
        
        
        


    
    




    



    



