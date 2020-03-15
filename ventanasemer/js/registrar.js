const {
    electron
} = require('electron');
const remote = require('electron').remote;
const {
    ipcRenderer
} = require('electron');
const bingresa = document.querySelector('#ingresar');
const biniciar = document.querySelector('#iniciar');
const bloqueinfo = document.querySelector('#bloque_info');
var myVar;


const ingresar_login = () => {
    let dato = "Hacer conexion con index";
    ipcRenderer.send('ingresarlogin', dato);
}


const ingresar_registro = () => {
    info = `
<h4 style="color: black; font-weight: bold;margin-top:2%;">Nombre: Usuario desconocido.</h4>
<h6 style="color: rgb(58, 58, 58);margin-top:7%;">Error, su huella no esta en la base de datos o hubo un error inesperado, vuelva a intentarlo.</h6>
       `
    bloqueinfo.innerHTML = info;
    myVar = setInterval(volver_normalidad, 4000);
}

function volver_normalidad() {
    info = `
        <h4 style="color: black; font-weight: bold;margin-top:2%;">Nombre: no hay ingresos.</h4>
        <h6 style="color: rgb(58, 58, 58);margin-top:7%;">Porfavor, Ingrese su asistencia con el lector de huellas y luego haga click en "Ingresar Registro".</h6>
       `
    bloqueinfo.innerHTML = info;
    clearInterval(myVar);
}

bingresa.addEventListener('click', ingresar_registro);
biniciar.addEventListener('click', ingresar_login);