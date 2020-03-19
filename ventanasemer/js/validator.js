var nombreout = document.querySelector('#Input_Nombre');
var apellidoout = document.querySelector('#Input_Apellido');
var rutout = document.querySelector('#Input_Rut');
var areaout = document.querySelector('#Input_Area');
var exigidasout = document.querySelector('#Input_Exijidas');
var imagenformulario = document.querySelector('#Input_Imagen');

//var formulario = document.querySelector('#form').value;


/*name validation*/
nombreout.addEventListener('blur', function() {
    name = nombreout.value;
    if (name.null == 0 || name.length == 0) {
        console.log(name + " nada");

    } else {

        console.log(name);
    }
});