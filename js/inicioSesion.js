$('#alerta-usuario').hide();
$('#alerta-no-existe').hide();
$('#alerta-pass').hide(); //escondemos todo lo que no uqeremos que se quiera ver
$(function(){
    
    sessionStorage.clear();//Se limpia el sesion storage para el valor de resultado.
    var formu = new Formulario("formularioInicioSesion");
    formu.limpiarAlertaInputKeyUp();// limpia los iconos de los inputs

    $('#btn-entrar').click(function(){
        if(formu.comprobar()==false){//si retorna false es que no hay errores
            let user = $('#usuario').val();
            let pass = $('#pass').val();
            $.ajax({
                
                url: "php/inicioSesion.php",
                type: "POST",
                data:{user, pass},
                success : function(respuesta){
                     console.log(respuesta);
                     if(respuesta == 1){
                         sessionStorage.setItem("nombre", user);
                         sessionStorage.setItem("resultado", 1);
                         location.href= "html/entrada.html";
                     }else{
                        Animaciones.mostrarAlertaRoja('alerta-usuario-existente');
                         Animaciones.inputInvalido('usuario');
                         Animaciones.inputInvalido('pass');
                         
                         $('#usuario').val("");
                         $('#pass').val("");
                         
                     };
                }

            });
        }else{
            
        };
    });



});