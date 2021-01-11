var x = sessionStorage.getItem("resultado");
if(x!=1){
    location.href="../";
   
};
$('#alerta-no-existe').hide();
$('#alerta-dentro').hide();
$('#salida-correcto').hide();
$("#cerrar-sesion").html("Cerrar la sesion de " + sessionStorage.getItem("nombre"));
$(function(){
   var formuEntrada = new Formulario('formuEntrada');
    actualizarGarage();
    formuEntrada.limpiarAlertaInputKeyUp();
$('#btnEntrada').click(function(){
    if(formuEntrada.comprobar()==false){
        let matricula = $('#matriculaEntrada').val();

        $.post('../php/existencia.php', {matricula}, function(respuesta){
            
           if(respuesta==1){
            let matricula = $('#matriculaEntrada').val();
            $.post('../php/dentroGaraje.php', {matricula}, function(respuesta){
                if(respuesta==1){
                    $('#alerta-dentro').show();
                    setTimeout(function(){
                         $('#alerta-dentro').hide(); 
                    },2000);
                }else{
                    $.post('../php/extraerCoche.php', {matricula}, function(respuesta){
                        console.log(respuesta);
                        var coches = JSON.parse(respuesta);
                        var matricula = coches.matricula;
                        var marca = coches.marca;
                        var modelo = coches.modelo;
                        var color = coches.color;
                        $.post('../php/introducirCoche.php',{matricula,marca, modelo,color},function(respuesta){
                            console.log(respuesta);
                                actualizarGarage();
                                $('#matriculaEntrada').val("");
                                $('#salida-correcto').show();
                     setTimeout(function(){
                            $('#salida-correcto').hide(); 
                    },2000);
                        });
                    });
                }

            });
           }else{
               $('#alerta-no-existe').show();
               setTimeout(function(){
                $('#alerta-no-existe').hide(); 
               },2000);
           }

        });
    };
});



    $(document).on('click','.salida', function(){//Sacar
        console.log($(this)[0].parentElement);
        if(confirm("¿Estas seguro que deseas sacar el coche?")){
            let elemento = $(this)[0].parentElement.parentElement;
            console.log(elemento);
            let matricula = $(elemento).attr('matricula');
        
        $.post('../php/salida.php',{matricula},function(respuesta){
            actualizarGarage();
            $('#salida-correcto').show();
            setTimeout(function(){
                $('#salida-correcto').fadeOut();   
            },2000);
        })
        };
        
        
    });
    function contador(){
        $.ajax({
            url: "../php/contador",
            type: "GET",
            success : function(resultado){
                $('#contador').html(resultado);
            }
        })
    }

    function actualizarGarage(){

        $.ajax({
            url: "../php/listado.php",
            type: "GET",
            success : function(resultado){
                let coches = JSON.parse(resultado);
                let plantilla= '';
                
                coches.forEach(coche => {
                    contador();
                plantilla += `<tr matricula = "${coche.matricula}">
                    <td>${coche.matricula} </td>
                    <td>${coche.modelo} </td>
                    <td>${coche.marca} </td>
                    <td>${coche.color} </td>
                    <td><button class="btn btn-danger salida">Salir</button></td>
                    </tr>`;
                });
                $('#cuerpo-tabla').html(plantilla);
            }
        })
        


    }

});