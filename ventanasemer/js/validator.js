var nombreout = document.querySelector('#Input_Nombre');
var apellidoout = document.querySelector('#Input_Apellido');
var rutout = document.querySelector('#Input_Rut');
var areaout = document.querySelector('#Input_Area');
var exigidasout = document.querySelector('#Input_Exijidas');
var imagenformulario = document.querySelector('#Input_Imagen');
var errores_nombre = document.querySelector('#errornom');
var errores_apellido = document.querySelector('#errorape');
var errores_horas = document.querySelector('#errorhoras');
const boton_guardar = document.querySelector('#guardar');
var a,b,c,d,e;
//var formulario = document.querySelector('#form').value;


boton_guardar.disabled=true;

/*name validation!*/
nombreout.addEventListener('blur', function() {
    name = nombreout.value;

    const val = new RegExp('^[A-Z]+$', 'i');

    if (name.null == 0 || name.length == 0 || !val.test(name)) {
        errores_nombre.innerHTML = `<span id="error_nombre">NOMBRE INVÁLIDO.</span>`;
        a=0;
    
    } else {

        errores_nombre.innerHTML = '';
        a=1;
    }
});

/*apellido validation!*/
apellidoout.addEventListener('blur', function() {
    apellido = apellidoout.value;
    const val = new RegExp('^[A-Z]+$', 'i');

    if (apellido.null == 0 || apellido.length == 0 || !val.test(apellido)) {
        errores_apellido.innerHTML = `<span id="error_apellido">APELLIDO INVÁLIDO.</span>`;
        b=0;
        callback(b);
    } else {
        errores_apellido.innerHTML = '';
        b=1;
    }
});

/*required time*/
exigidasout.addEventListener('blur', function() {
    required_time = Number(exigidasout.value);

    if (required_time <= 0) {
        e=0;
        errores_horas.innerHTML = `<span id="error_hora">DEBE INGRESAR UN NUMERO POSITIVO DE HORAS.</span>`;
    } else {
        errores_horas.innerHTML = '';
        e=1;

    }

});

console.log("test",a,b,e);
if (a==1 && b==1 && e==1){
    console.log("hola");
    boton_guardar.disabled=false;
}