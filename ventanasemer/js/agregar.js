const {
    electron
} = require('electron');
const {
    ipcRenderer
} = require('electron');
const {
    format
} = require('date-fns');

const path = require('path');
const url = require ('url');

const boton1 = document.querySelector('#salir');
const boton2 = document.querySelector('#guardar');


// if (error_nom.innerHTML === 'NOMBRE INVÁLIDO.' || error_ape.innerHTML === 'APELLIDO INVÁLIDO.' || error_rut.innerHTML === 'RUT INVÁLIDO.' || error_imagen.innerHTML === 'POR FAVOR COLOQUE UNA IMAGEN.' || error_horas === 'DEBE INGRESAR UN NUMERO POSITIVO DE HORAS.' ){


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
    var imagenformulario = document.querySelector('#Input_Imagen');


    console.log(imagenformulario.value);
    if (imagenformulario.value == ''){
        imagenformulario = new Image();
        imagenformulario.src = path.join(__dirname, `/js/plantilla.jpg`);

        const output = [
            nombreout.value,
            apellidoout.value,
            rutout.value,
            areaout.value,
            exigidasout.value,
            imagenformulario.src
        ];

        if(output[0] == '' ||output[1] == '' ||output[2] == '' ||output[3] == '' || output[4] == '' || output[5] == '' || error_nom.innerHTML === 'NOMBRE INVÁLIDO.' || error_ape.innerHTML === 'APELLIDO INVÁLIDO.' || error_rut.innerHTML === 'RUT INVÁLIDO.' || error_imagen.innerHTML === 'POR FAVOR COLOQUE UNA IMAGEN.' || error_horas === 'DEBE INGRESAR UN NUMERO POSITIVO DE HORAS.'){
            alert("Ha dejado uno o varios espacios sin rellenar o no ha cumplido con el formato de la entrada de información, vuelva a intentarlo.");
            ipcRenderer.send('recargar_agregar', "output");
    
        }
        else{
            console.log(output);
            ipcRenderer.send('outputagrega', output);
            enviar3();
        }

    }

    else{
        const output = [
            nombreout.value,
            apellidoout.value,
            rutout.value,
            areaout.value,
            exigidasout.value,
            imagenformulario.files[0].path
        ];

        if(output[0] == '' ||output[1] == '' ||output[2] == '' ||output[3] == '' || output[4] == '' || output[5] == '' || error_nom.innerHTML === 'NOMBRE INVÁLIDO.' || error_ape.innerHTML === 'APELLIDO INVÁLIDO.' || error_rut.innerHTML === 'RUT INVÁLIDO.' || error_imagen.innerHTML === 'POR FAVOR COLOQUE UNA IMAGEN.' || error_horas === 'DEBE INGRESAR UN NUMERO POSITIVO DE HORAS.'){
            alert("Ha dejado uno o varios espacios sin rellenar o no ha cumplido con el formato de la entrada de información, vuelva a intentarlo.");
            ipcRenderer.send('recargar_agregar', "output");
    
        }
        else{
            ipcRenderer.send('outputagrega', output);
            enviar3();
        }
    }

    
}


boton1.addEventListener('click', enviar);
boton2.addEventListener('click', function() {
    agrega_trab_formu();
});