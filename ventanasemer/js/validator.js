var nombreout = document.querySelector('#Input_Nombre');
var apellidoout = document.querySelector('#Input_Apellido');
//var rutout = document.querySelector('#Input_Rut');
var areaout = document.querySelector('#Input_Area');
var exigidasout = document.querySelector('#Input_Exijidas');
var imagenformulario = document.querySelector('#Input_Imagen');
var errores_nombre = document.querySelector('#errornom');
var errores_apellido = document.querySelector('#errorape');
//var errores_rut = document.querySelector('#errorrut');
var errores_horas = document.querySelector('#errorhoras');
var errores_imagen = document.querySelector('#errorimagen');
var boton_guardar = document.querySelector('#guardar');

/*
//función para verificar rut que luego se ocupara
function checkRut(rut) {
    // Despejar Puntos
    console.log(rut);
    var valor = rut.value.replace('.', '');
    // Despejar Guión
    valor = valor.replace('-', '');

    // Aislar Cuerpo y Dígito Verificador
    cuerpo = valor.slice(0, -1);
    dv = valor.slice(-1).toUpperCase();

    // Formatear RUN
    rut.value = cuerpo + '-' + dv

    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if (cuerpo.length < 7) { rut.setCustomValidity("RUT Incompleto"); return false; }

    // Calcular Dígito Verificador
    suma = 0;
    multiplo = 2;

    // Para cada dígito del Cuerpo
    for (i = 1; i <= cuerpo.length; i++) {

        // Obtener su Producto con el Múltiplo Correspondiente
        index = multiplo * valor.charAt(cuerpo.length - i);

        // Sumar al Contador General
        suma = suma + index;

        // Consolidar Múltiplo dentro del rango [2,7]
        if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

    }

    // Calcular Dígito Verificador en base al Módulo 11
    dvEsperado = 11 - (suma % 11);

    // Casos Especiales (0 y K)
    dv = (dv == 'K') ? 10 : dv;
    dv = (dv == 0) ? 11 : dv;

    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado != dv) { rut.setCustomValidity("RUT Inválido"); return false; }

    // Si todo sale bien, eliminar errores (decretar que es válido)
    rut.setCustomValidity('');
}

*/


/*name validation!*/
nombreout.addEventListener('blur', function() {
    name = nombreout.value;

    const val = new RegExp('^[a-zA-Z ]+$', 'i');

    if (name.null == 0 || name.length == 0 || !val.test(name)) {
        errores_nombre.innerHTML = `<span id="error_nombre">NOMBRE INVÁLIDO.</span>`;

    } else {

        errores_nombre.innerHTML = '';
    }
});

/*apellido validation!*/
apellidoout.addEventListener('blur', function() {
    apellido = apellidoout.value;
    const val = new RegExp('^[a-zA-Z ]+$', 'i');

    if (apellido.null == 0 || apellido.length == 0 || !val.test(apellido)) {
        errores_apellido.innerHTML = `<span id="error_apellido">APELLIDO INVÁLIDO.</span>`;
    } else {
        errores_apellido.innerHTML = '';
    }
});






/*rut validation!
rutout.addEventListener('blur', function() {
    rut = rutout;
    const testrut = checkRut(rut);
    if (testrut == false) {
        errores_rut.innerHTML = `<span id="error_rut">RUT INVÁLIDO.</span>`;
    } else {
        errores_rut.innerHTML = '';
    }
});

*/



//imagen validation!
imagenformulario.addEventListener('blur', function() {
    form_image = imagenformulario.value;
    if (form_image.null == 0 || form_image.length == 0) {
        errores_imagen.innerHTML = `<span id="error_imagen">POR FAVOR COLOQUE UNA IMAGEN.</span>`;
    } else {
        errores_imagen.innerHTML = '';
    }
});

//horas trabajadas validation!
exigidasout.addEventListener('blur', function() {
    required_time = Number(exigidasout.value);

    if (required_time <= 0) {
        errores_horas.innerHTML = `<span id="error_hora">DEBE INGRESAR UN NUMERO POSITIVO DE HORAS.</span>`;
    } else {
        errores_horas.innerHTML = '';

    }

});