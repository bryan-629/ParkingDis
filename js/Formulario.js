function Formulario(idFormulario){
    this.idFormulario = idFormulario;
    this.inputs = document.querySelectorAll(`#${idFormulario} input`); //Recogemos los inputs;

    this.comprobar = function(){
        
       let patronTexto = /^[A-Za-z]{1,15}\s?[A-Za-z]{1,15}$/;
       let patronPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
       let patronMatricula = /^[0-9]{4}[A-Za-z]{3}$/;
       let patronNum = /^\s?[0-9]{1,15}$/;
        let patronAlfaNum1 = /^[0-9]{1,15}\s?[A-Za-z]{0,15}$/;
        let patronEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
        let error = false;
        this.inputs.forEach(element =>{
            
            switch(element.name){
                case "usuario":
                    if(patronTexto.test(element.value)){
                       
                    }else{
                        Animaciones.inputInvalido(element.id);
                        error=true;
                    };
                break;
                case "pass":
                    if(patronPass.test(element.value)){
                       
                    }else{
                        Animaciones.inputInvalido(element.id);
                        
                        error=true;
                    };
                break;
                case "matricula":
                    if(patronMatricula.test(element.value)){

                    }else{
                        Animaciones.inputInvalido(element.id);
                        error=true;
                    };
                break;
                case "nombre":
                    if(patronTexto.test(element.value)){

                    }else{
                        Animaciones.inputInvalido(element.id);
                        error=true;
                    };
                break;
                case "apellido":
                    if(patronTexto.test(element.value)){

                    }else{
                        Animaciones.inputInvalido(element.id);
                        error=true;
                    };
                break;
                case "dni":
                    if(patronDni.test(element.value)){

                    }else{
                        Animaciones.inputInvalido(element.id);
                        error=true;
                    };
                break;
                case "modelo":
                    if(patronTexto.test(element.value) || patronNum.test(element.value || patronAlfaNum1.test(element.value))){

                    }else{
                        Animaciones.inputInvalido(element.id);
                        error=true;
                    };
                break;
                case "marca":
                    if(patronTexto.test(element.value)){

                    }else{
                        Animaciones.inputInvalido(element.id);
                        error=true;
                    };
                break;
                case "color":
                    if(patronTexto.test(element.value)){

                    }else{
                        Animaciones.inputInvalido(element.id);
                        error=true;
                    };
                    
                break;
                    case "email":
                    if(patronEmail.test(element.value)){

                    }else{
                        Animaciones.inputInvalido(element.id);
                        error=true;
                    };
                break;

            }
        });
        
        if(error==true){
            return true;
        }else{
            return false;
        }

    }

    this.limpiarAlertaInputKeyUp = function(){
        this.inputs.forEach(element=>{
            $(`#${element.id}`).keyup(function(){
                Animaciones.inputBlanco(element.id);
                
            });
    });

    }

    this.limpiar =function(){
        this.inputs.forEach(element=>{
               element.value = "";
    });
    };



}