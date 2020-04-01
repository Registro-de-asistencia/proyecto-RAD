const {
    electron
} = require('electron');
const remote = require('electron').remote;
const {
    ipcRenderer
} = require('electron');
const mysql = require('mysql');
const bingresa = document.querySelector('#ingresar');
const biniciar = document.querySelector('#iniciar');
const bloqueinfo = document.querySelector('#bloque_info');

var myVar;




const ingresar_login = () => {
    let dato = "Hacer conexion con index";
    ipcRenderer.send('ingresarlogin', dato);
}

bingresa.addEventListener('click', () => {
    const user_enter = document.querySelector('#Input_Rut');
    console.log("hola");
    value_rut = user_enter.value;
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '241522',
        database: 'basededatos_rad'
    });

    connection.connect(function(err) {
        // in case of error
        if (err) {
            console.log(err.code);
            console.log(err.fatal);
        }
    });


    let consulta = 'select * from trabajadores where rut="' + value_rut + '"';
    console.log(consulta);
    connection.query(consulta, function(err, rows, fields) {
        if (err) {
            alert("Error al hacer la consulta");
            console.log(err.fatal);
            return
        }
        connection.query('INSERT INTO Periodo_de_Trabajo(Inicio, Fin, id_trabajador) VALUES (NOW(), NOW(), ' + rows[0].id_trabajador + ')');
        let dato = "Hacer conexion con index";
        ipcRenderer.send('newdato', dato);
        alert("Se ha ingresado un nuevo registro.");

    });





});

function volver_normalidad() {
    info = `
        <h4 style="color: black; font-weight: bold;margin-top:2%;">Nombre: no hay ingresos.</h4>
        <h6 style="color: rgb(58, 58, 58);margin-top:7%;">Porfavor, Ingrese su asistencia con el lector de huellas y luego haga click en "Ingresar Registro".</h6>
       `
    bloqueinfo.innerHTML = info;
    clearInterval(myVar);
}


biniciar.addEventListener('click', ingresar_login);