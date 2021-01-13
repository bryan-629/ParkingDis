var x = sessionStorage.getItem("resultado");
if(x!=1){
    location.href="../";
   
};
$('#alerta-no-existe').hide();
$('#alerta-dentro').hide();
$('#salida-correcto').hide();
$('.documento1').hide();//ocultamos el formulario de alta;
$('#alerta-roja-alta').hide();
$('#alerta-verde-alta').hide();
$(".cerrar-sesion").html("Cerrar la sesion de " + sessionStorage.getItem("nombre"));




$(function(){//Cuando el documento esta cargado....
   var formuEntrada = new Formulario('formuEntrada'); // Creamos los objetos de la clase formularios, nos ayuda a la gestion de ellos
   var formuAlta= new Formulario('formuAlta');
    actualizarGarage();//Refresca la lista de la derecha, mostrando los coches que hay dentro del parking
    formuEntrada.limpiarAlertaInputKeyUp(); //limpia el input invalid cuando se hace keyup
    formuAlta.limpiarAlertaInputKeyUp();// RT ^


//Control del menu:
$('#menu-entrada-btnAlta').click(function(){
    $('.documento').hide();
    $('.documento1').show();
    formuEntrada.limpiar();
});
$('#menu-alta-btnEntrada').click(function(){
    $('.documento').show();
    $('.documento1').hide();
    formuAlta.limpiar();
})




$('#btnEntrada').click(function(){ // escuchamos el evento click del formulario de la entrada
    if(formuEntrada.comprobar()==false){ //Si la funcion comprobar retorna false, es que no hay ningun error con los datos introducidos
        let matricula = $('#matriculaEntrada').val();//Recogemos el valor

        $.post('../php/existencia.php', {matricula}, function(respuesta){//y lo mandamos mediante un post para ver si existe el cliente
            
           if(respuesta==1){//Si existe el cliente retorna 1;
            let matricula = $('#matriculaEntrada').val();//Entonces volvemos a recoger el dato y preguntamos si esta dentro del garage
            $.post('../php/dentroGaraje.php', {matricula}, function(respuesta){
                if(respuesta==1){//Si esta dentro... entonces no puede volver a entrar, primero tiene que salir. 
                    $('#alerta-dentro').show();//entonces le mostramos la alerta de que ya esta dentro
                    setTimeout(function(){
                         $('#alerta-dentro').hide(); 
                    },2000);
                }else{
                    $.post('../php/extraerCoche.php', {matricula}, function(respuesta){//Si no esta dentro...
                //Extraemos los datos del coche que va a entrar
                        var coches = JSON.parse(respuesta);
                        var matricula = coches.matricula;
                        var marca = coches.marca;
                        var modelo = coches.modelo;
                        var color = coches.color;
                        $.post('../php/introducirCoche.php',{matricula,marca, modelo,color},function(respuesta){
                            //Y lo introducimos en el parking 
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
           }else{//En caso de que el cliente no exista... mostramos una alerta
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



    function contador(){// lleva el conteo de los vehiculos que hay dentro del parking
        $.ajax({
            url: "../php/contador",
            type: "GET",
            success : function(resultado){
                $('#contador').html(resultado);
            }
        });
    };

    function actualizarGarage(){// esta funcion se encarga de actualizar el listado

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
        });
        


    };


    $('#btnAlta').click(function(e){
        
       e.preventDefault();

        if(formuAlta.comprobar()==false){ //si retorna false, es decir si no hay errores..
            let matricula = $('#matriculaAlta').val();
            let color = $('#colorAlta').val();
            let marca = $('#marcaAlta').val();
            let modelo = $('#modeloAlta').val();
            let nombre = $('#nombreAlta').val();
            let apellido = $('#apellidoAlta').val();
            let email = $('#emailAlta').val();

            $.ajax({
                url: "../php/existencia.php",
                type : "POST",
                data : {matricula},
                success : function(respuesta){
                    console.log(respuesta);
                    if(respuesta==0){
                        $.ajax({
                            url :"../php/alta.php",
                            type: "POST",
                            data: {matricula,color,email, marca, modelo, nombre, apellido},
                            success : function(respuesta){
        
                                if (respuesta == 1) {
                                    formuAlta.limpiar();
                                    Animaciones.mostrarAlertaRoja('alerta-verde-alta');
                                    setTimeout(function(){
                                        Animaciones.ocultarAlertaRoja('alerta-verde-alta');
                                    },3000);
                                };
                            }
                        });
                    }else{
                        formuAlta.limpiar();
                        Animaciones.mostrarAlertaRoja('alerta-roja-alta');
                        setTimeout(function(){
                            Animaciones.ocultarAlertaRoja('alerta-roja-alta');
                        },3000);
                    };
                }

            });
        };
    });

});