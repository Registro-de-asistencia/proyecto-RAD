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
    
    if(error_rut.innerHTML === 'RUT INVÁLIDO.' ){
        alert("Ha intentado ingresar un rut inválido o no está en la base de datos.")
        let dato = "Hacer conexion con index";
        ipcRenderer.send('recargar_ventana_ingreso', dato);
    }
    else{

        const user_enter = document.querySelector('#Input_Rut');
        console.log("hola");
        value_rut = user_enter.value;
        

        let consulta = 'select * from trabajadores where rut="' + value_rut + '"';
        console.log(consulta);
        connection.query(consulta, function(err, rows, fields) {
            if (err) {
                alert("Error al hacer la consulta");
                console.log(err.fatal);
                return
            }
            if (rows.length == 0){
                alert("El rut ingresado no está en la base de datos, porfavor vuelta a intentarlo.")
                let dato = "Hacer conexion con index";
                ipcRenderer.send('recargar_ventana_ingreso', dato);
            }
            else{
                connection.query('INSERT INTO Periodo_de_Trabajo(Inicio, Fin, id_trabajador) VALUES (NOW(), NOW(), ' + rows[0].id_trabajador + ')');
                let dato = "Hacer conexion con index";
                ipcRenderer.send('newdato', dato);
                alert("Se ha ingresado un nuevo registro.");
            }

        });
    }


});



biniciar.addEventListener('click', ingresar_login);