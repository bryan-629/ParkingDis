const Animaciones= {
    inputInvalido : function(inputInvalido){
        $(`#${inputInvalido}`).addClass('is-invalid');
        $(`#${inputInvalido}`).removeClass('is-valid');
    },
    inputValido : function(inputValido){
        $(`#${inputValido}`).removeClass('is-invalid');
        $(`#${inputValido}`).addClass('is-valid');
    },
    inputBlanco : function(inputBlanco){
        $(`#${inputBlanco}`).removeClass('is-invalid');
        $(`#${inputBlanco}`).removeClass('is-invalid');
    },
    mostrarAlertaRoja : function(idAlerta,idTexto,Texto){
        $(`#${idAlerta}`).show();
        $(`#${idTexto}`).html(texto);
    },
    limpiarAlertaRoja : function(idAlerta,idTexto){
        $(`#${idAlerta}`).show();
        $(`#${idTexto}`).html(texto);
    }
    
};