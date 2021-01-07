var x = sessionStorage.getItem("resultado");
if(x!=1){
    location.href="../";
   
};
$("#cerrar-sesion").html("Cerrar sesion de " + sessionStorage.getItem("nombre"));
$(function(){

})