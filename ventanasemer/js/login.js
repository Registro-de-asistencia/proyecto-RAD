const {
    electron
} = require('electron');
const {
    ipcRenderer
} = require('electron');
const contra = document.querySelector('#contra');
const boton = document.querySelector('#initia');
const volver_ini = document.querySelector('#volver');


const volver_inicio = () => {
    let dato = "Hacer conexion con index";
    ipcRenderer.send('volverinicio', dato);
}

const logearse = () => {

    if (contra.value === "1") {
        let dato = "Hacer conexion con index";
        ipcRenderer.send('logearse', dato);
    } else if (contra.value === "2") {
        let dato = "Hacer conexion con index";
        ipcRenderer.send('logearse_admin', dato);
    } else {
        alert("Contraseña erronea.")
    }
}


boton.addEventListener('click', logearse);
volver_ini.addEventListener('click', volver_inicio);