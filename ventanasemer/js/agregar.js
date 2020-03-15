const {
    electron
} = require('electron');
const {
    ipcRenderer
} = require('electron');
const {
    format
} = require('date-fns');

const boton1 = document.querySelector('#salir');
const boton2 = document.querySelector('#guardar');

const enviar = () => {
    let dato = "Hacer conexion con index";
    ipcRenderer.send('salir', dato);
}

const enviar3 = () => {
    let dato = "Hacer conexion con index";
    ipcRenderer.send('alertaxd', dato);
}

const agrega_trab_formu = () => {

    const nombreout = document.querySelector('#Input_Nombre');
    const apellidoout = document.querySelector('#Input_Apellido');
    const rutout = document.querySelector('#Input_Rut');
    const areaout = document.querySelector('#Input_Area');
    const exigidasout = document.querySelector('#Input_Exijidas');
    const imagenformulario = document.querySelector('#Input_Imagen');

    const output = [
        nombreout.value,
        apellidoout.value,
        rutout.value,
        areaout.value,
        exigidasout.value,
        imagenformulario.files[0].path
    ];

    ipcRenderer.send('outputagrega', output);
}


boton1.addEventListener('click', enviar);
boton2.addEventListener('click', function() {
    agrega_trab_formu();
    enviar3();
});
//boton2.addEventListener('click', enviar3);*/