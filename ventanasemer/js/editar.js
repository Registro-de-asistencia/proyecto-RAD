const {
    electron
} = require('electron');
const {
    ipcRenderer
} = require('electron');
const {
    format
} = require('date-fns');
const mysql = require('mysql');
const path = require('path');
var id_boton = 1;
var urlimagen = 'jj';

const boton1 = document.querySelector('#salir');
const boton2 = document.querySelector('#guardar');

const enviar = () => {
    let dato = "Hacer conexion con index";
    ipcRenderer.send('salireditar', dato);
}

const enviar3 = () => {
    let dato = "Hacer conexion con index";
    ipcRenderer.send('alertaeditar', dato);
}

ipcRenderer.send('enviarid', "HOLA");
ipcRenderer.on('editarid', (e, row) => {
    id_boton = row;
    sacadatos(id_boton);
});



function sacadatos(id_boton) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '241522',
        database: 'Basededatos_Rad'
    });

    connection.connect(function(err) {
        // in case of error
        if (err) {
            console.log(err.code);
            console.log(err.fatal);
        }
    });

    let consulta = 'select * from trabajadores where id_trabajador="' + id_boton + '"';
    connection.query(consulta, function(err, rows, fields) {
        if (err) {
            console.log("Error al hacer la consulta");
            console.log(err.fatal);
            return
        }
        document.getElementById("Input_Nombre").value = "" + rows[0].Nombre;
        document.getElementById("Input_Apellido").value = "" + rows[0].Apellido;
        document.getElementById("Input_Rut").value = "" + rows[0].Rut;
        document.getElementById("Input_Exijidas").value = "" + rows[0].Volumen_de_horas;
        document.getElementById("Input_Area").value = "" + rows[0].Area;
        urlimagen = rows[0].imagen;


    });
}

function envia2() {

    const nombreout = document.querySelector('#Input_Nombre');
    const apellidoout = document.querySelector('#Input_Apellido');
    const rutout = document.querySelector('#Input_Rut');
    const areaout = document.querySelector('#Input_Area');
    const exijidasout = document.querySelector('#Input_Exijidas');
    const imagenformulario = document.querySelector('#Input_Imagen');

    var output = [];

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '241522',
        database: 'Basededatos_Rad'
    });

    connection.connect(function(err) {
        // in case of error
        if (err) {
            console.log(err.code);
            console.log(err.fatal);
        }
    });

    let consulta = 'select * from trabajadores where Rut="' + rutout.value + '"';
    connection.query(consulta, function(err, rows, fields) {
        if (err) {
            console.log("Error al hacer la consulta");
            console.log(err.fatal);
            return
        }


    });


    if (imagenformulario.files.length === 0) {

        output = [
            id_boton,
            nombreout.value,
            apellidoout.value,
            rutout.value,
            areaout.value,
            exijidasout.value,
            urlimagen
        ];
        console.log(output);

    } else {

        output = [
            id_boton,
            nombreout.value,
            apellidoout.value,
            rutout.value,
            areaout.value,
            exijidasout.value,
            imagenformulario.files[0].path
        ];
    }
    ipcRenderer.send('outputedita', output);
}


boton1.addEventListener('click', enviar);
boton2.addEventListener('click', enviar3);
boton2.addEventListener('click', envia2);