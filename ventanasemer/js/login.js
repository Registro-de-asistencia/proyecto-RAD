const {
    electron
} = require('electron');
const {
    ipcRenderer
} = require('electron');

const mysql = require('mysql');
const user = document.querySelector('#user')
const contra = document.querySelector('#contra');
const boton = document.querySelector('#initia');
const volver_ini = document.querySelector('#volver');


const volver_inicio = () => {
    let dato = "Hacer conexion con index";
    ipcRenderer.send('volverinicio', dato);
}

//Aca se hace la conexion con la bd
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


function comprobar(objeto) {

    if (user.value.trim() == "dueño" && contra.value == objeto[0].password) {
        let dato = "Hacer conexion con index";
        ipcRenderer.send('logearse', dato);

    } else if (user.value.trim() == "observador" && contra.value == objeto[0].password) {
        let dato = "Hacer conexion con index";
        ipcRenderer.send('logearse_admin', dato);
    } else {
        alert("Contraseña erronea.")
        ipcRenderer.send('recargar_login', "hacer conexion con index");
    }
}

const logearse = () => {

    let consulta = 'select * from administrador where user="' + user.value.trim() + '"';
    connection.query(consulta, function(err, rows, fields) {
        if (err) {
            console.log("Error al hacer la consulta");
            console.log(err.fatal);
            return
        }
        comprobar(rows);
    });

}


boton.addEventListener('click', logearse);
volver_ini.addEventListener('click', volver_inicio);