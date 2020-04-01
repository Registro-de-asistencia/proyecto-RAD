//////////////////////////////////////////////CONSTANTES///////////////////////////////////////////////// 

let mainWindows;
let ventanaingreso;
let ventanalogin;
let ventanaagregar;
let ventanaeditar;
let ventanaeliminar;
let ventanainfo;
let idbotoned;
let idbotonel;
let idbotoninfo;
const util = require('util');


const { app, BrowserWindow, ipcRenderer, ipcMain, Menu, globalShortcut } = require('electron');
const { webContents } = require("electron");
const mysql = require('mysql');
const path = require('path');
const url = require('url')
const { format } = require('date-fns');

///////////////////////////////////////////////////////////////////////////////////////////////////////// 

///////////////////////////////// CREAR CONEXION CON LA BASE DE DATOS //////////////////////////////////

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "basededatos_rad"
});


///////////////////////////////////////////////////////////////////////////////////////////////////////// 

//////////////////////////////////////APLICACION EN EJECUCION ////////////////////////////////////////// 

app.on('ready', () => {
    slashes: true;
    crearventana_ingreso();

    globalShortcut.register('CommandOrControl+R', function() {
        mainWindows.reload()
    });

    ipcMain.on('ingresarlogin', (e, row) => {
        crearventana_login();
        ventanaingreso.close();
    });

    ipcMain.on('volverinicio', (e, row) => {
        crearventana_ingreso();
        ventanalogin.close();
    });

    ipcMain.on('logearse', (e, row) => {
        crearventana_dueño();
        ventanalogin.close();
    });

    ipcMain.on('logearse_admin', (e, row) => {
        crearventana_admin();
        ventanalogin.close();
    });


    ipcMain.on('Cierrasesion', (e, row) => {
        mainWindows.close();
        app.relaunch();
    });
    /*
    ipcMain.on('ingreso_periodo_de_tiempo', (e, row) => {
        mainWindows.close();
        app.relaunch();
    });
*/
    ipcMain.on('Prueba2', (e, row) => {
        crearventana_agregar();
    });

    ipcMain.on('eliminar', (e, row) => {
        crearventana_eliminar();
    });

    ipcMain.on('Prueba6', (e, row) => {
        crearventana_info();
        idbotoninfo = row;
    });

    ipcMain.on('Prueba3', (e, row) => {
        crearventana_editar();
        idbotoned = row;

    });

    ipcMain.on('enviarid', (e, row) => {
        e.reply('editarid', idbotoned);
    });

    ipcMain.on('infoid', (e, row) => {
        e.reply('infoid', idbotoninfo);
    });

    ipcMain.on('salir', (e, row) => {
        ventanaagregar.close();
    });

    ipcMain.on('salireditar', (e, row) => {
        ventanaeditar.close();
    });

    ipcMain.on('salireliminar', (e, row) => {
        ventanaeliminar.close();
    });

    ipcMain.on('salirinfo', (e, row) => {
        ventanainfo.close();
    });

    //registrarjs


});

const template = [{
    label: 'Console',
    submenu: [{
        label: 'Mostrar devTOOLS',
        role: 'toggledevtools'
    }]
}];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);


///////////////////////////////////////////////////////////////////////////////////////////////////////// 

//////////////////////////////////////  CREAR VENTANAS ADICIONALES  ////////////////////////////////////////// 

function crearventana_ingreso() {

    ventanaingreso = new BrowserWindow({
        title: "Registro de Asistencia digital",
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        },

        width: 1280,
        height: 720,
        fullscreen: false,
        icon: __dirname + '/images/icons/icono.ico'
    });

    ventanaingreso.loadURL(url.format({
        pathname: path.join(__dirname, `ventanasemer/registrar.html`),
        protocol: 'file',
        slashes: true
    }));
    ventanaingreso.on('closed', () => {
        ventanaingreso = null;
    });
}

function crearventana_login() {

    ventanalogin = new BrowserWindow({
        title: "Registro de Asistencia digital",
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        },

        width: 1280,
        height: 720,
        fullscreen: false,
        icon: __dirname + '/images/icons/icono.ico'
    });

    ventanalogin.loadURL(url.format({
        pathname: path.join(__dirname, `ventanasemer/login.html`),
        protocol: 'file',
        slashes: true
    }));
    ventanalogin.on('closed', () => {
        ventanalogin = null;
    });
}

function crearventana_dueño() {

    mainWindows = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        },
        width: 1280,
        height: 1024,
        fullscreen: false,
        icon: __dirname + '/images/icons/icono.ico'
    });

    mainWindows.loadURL(url.format({
        pathname: path.join(__dirname, `index.html`),
        protocol: 'file',
        slashes: true
    }));

    mainWindows.on('closed', () => {
        app.quit();
    });
}

function crearventana_admin() {

    mainWindows = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        },
        width: 1280,
        height: 1024,
        fullscreen: true,
        icon: __dirname + '/images/icons/icono.ico'
    });

    mainWindows.loadURL(url.format({
        pathname: path.join(__dirname, `index_admin.html`),
        protocol: 'file',
        slashes: true
    }));
    mainWindows.on('closed', () => {
        app.quit();
    });
}


function crearventana_agregar() {

    ventanaagregar = new BrowserWindow({
        title: "Agregar un Trabajador",
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        },

        width: 500,
        height: 830,
        fullscreen: false,
        frame: true,
        icon: __dirname + '/images/icons/icono.ico'
    });

    ventanaagregar.loadURL(url.format({
        pathname: path.join(__dirname, `ventanasemer/agregar.html`),
        protocol: 'file',
        slashes: true
    }));
    ventanaagregar.on('closed', () => {
        ventanaagregar = null;
    });
}

function crearventana_editar() {

    ventanaeditar = new BrowserWindow({
        title: "Agregar un Trabajador",
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        },

        width: 500,
        height: 830,
        fullscreen: false,
        frame: true,
        icon: __dirname + '/images/icons/icono.ico'
    });

    ventanaeditar.loadURL(url.format({
        pathname: path.join(__dirname, `ventanasemer/editar.html`),
        protocol: 'file',
        slashes: true
    }));
    ventanaeditar.on('closed', () => {
        ventanaeditar = null;
    });
}

function crearventana_eliminar() {

    ventanaeliminar = new BrowserWindow({
        title: "Agregar un Trabajador",
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        },

        width: 1150,
        height: 640,
        fullscreen: false,
        frame: false,
        icon: __dirname + '/images/icons/icono.ico'
    });

    ventanaeliminar.loadURL(url.format({
        pathname: path.join(__dirname, `ventanasemer/eliminar.html`),
        protocol: 'file',
        slashes: true
    }));
    ventanaeliminar.on('closed', () => {
        ventanaeliminar = null;
    });
}

function crearventana_info() {

    ventanainfo = new BrowserWindow({
        title: "Agregar un Trabajador",
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        },

        width: 1150,
        height: 640,
        fullscreen: true,
        frame: false,
        icon: __dirname + '/images/icons/icono.ico'
    });

    ventanainfo.loadURL(url.format({
        pathname: path.join(__dirname, `ventanasemer/infotra.html`),
        protocol: 'file',
        slashes: true
    }));
    ventanainfo.on('closed', () => {
        ventanainfo = null;
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////// 


/////////////////////////////////  VERIFICAR CONEXION CON LA BASE DE DATOS   ////////////////////////////////////

connection.connect(function(err) {
    // in case of error
    if (err) {
        console.log(err.code);
        console.log(err.fatal);
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////// 

////////////////////////// FUNCION PARA IMPRIMIR PRIMERA TABLA EN VENTANA MAIN ///////////////////////// 

function imprimirtabla() {
    let query = 'SELECT * FROM trabajadores inner join Periodo_de_Trabajo on trabajadores.id_trabajador = Periodo_de_Trabajo.id_trabajador where eliminado=0';
    connection.query(query, function(err, rows, fields) {
        if (err) {
            console.log("Error al hacer la consulta");
            console.log(err.fatal);
            return
        }

        ipcMain.on('Prueba1', (e, row) => {
            mainWindows.webContents.send('Prueba1', rows);
        });
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////// FUNCION PARA IMPRIMIR PRIMERA TABLA EN VENTANA ELIMINAR ///////////////////////// 

function imprimirtablaeliminar() {
    let query = 'SELECT * FROM trabajadores where eliminado=0';
    connection.query(query, function(err, rows, fields) {
        if (err) {
            console.log("Error al hacer la consulta");
            console.log(err.fatal, "holaaaaaaa");
            return
        }

        ipcMain.on('alertaeliminar1', (e, row) => {
            e.reply('alertaeliminar', rows);
        });
    })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////



////////////// FUNCION PARA AGREGAR EN BD LO QUE RECIBE DE VENTANA AGREGAR TRABAJADOR ///////////////// 

ipcMain.on('outputagrega', (e, row) => {

    let itemInfo = {
        Nombre: row[0],
        Apellido: row[1],
        Rut: row[2],
        Huella: 'asjdasdh',
        Area: row[3],
        Volumen_de_horas: row[4],
        eliminado: 0,
        imagen: row[5]
    };

    connection.query('INSERT INTO trabajadores SET ?', itemInfo);

    let consulta = 'select * from trabajadores where Nombre="' + row[0] + '"';
    connection.query(consulta, function(err, rows, fields) {
        if (err) {
            console.log("Error al hacer la consulta");
            console.log(err.fatal);
            return
        }
        connection.query('INSERT INTO Periodo_de_Trabajo(Inicio, Fin, id_trabajador) VALUES (NOW(), NOW(), ' + rows[0].id_trabajador + ')');
        imprimirtabla();
        imprimirtablaeliminar();
        ventanaagregar.close();
        mainWindows.reload();
    });

});

///////////////////////////////////////////////////////////////////////////////////////////////////////

////////////// FUNCION PARA EDITAR TRABAJADORES ///////////////// 

ipcMain.on('outputedita', (e, row) => {

    let id = row[0];
    let itemInfo = {
        Nombre: row[1],
        Apellido: row[2],
        Rut: row[3],
        Huella: 'asjdasdh',
        Area: row[4],
        Volumen_de_horas: row[5],
        eliminado: 0,
        imagen: row[6]
    };

    let consulta = 'UPDATE trabajadores SET ? where id_trabajador="' + row[0] + '"';
    connection.query(consulta, itemInfo);
    imprimirtabla();
    imprimirtablaeliminar();
    ventanaeditar.close();
    mainWindows.reload();

});

///////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////// FUNCION PARA ELLIMINAR TRABAJADORES /////////////////////////// 

ipcMain.on('outputelimina', (e, row) => {

    let id = row;
    console.log(id);

    let itemInfo = {
        eliminado: 1
    };

    let consulta = 'UPDATE trabajadores SET ? where id_trabajador="' + id + '"';
    connection.query(consulta, itemInfo);
    imprimirtabla();
    imprimirtablaeliminar();
    mainWindows.reload();
    ventanaeliminar.reload();

});


///////////////////////consulta por rut///////////////////////
/*
ipcMain.on('search_rut', (e, row) => {
    let rut = row[2];
    let consulta = 'select * from trabajadores where Nombre="' + rut + '"';

});*/





///////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////// FUNCION VER TABLA EN INFORMACION DEL TRABAJADOR /////////////////////////// 

ipcMain.on('tablainfo', (e, row) => {
    let consulta = 'select * from trabajadores inner join Periodo_de_Trabajo on trabajadores.id_trabajador = Periodo_de_Trabajo.id_trabajador where Periodo_de_Trabajo.id_trabajador="' + idbotoninfo + '"';
    connection.query(consulta, function(err, rows, fields) {
        if (err) {
            console.log("Error al hacer la consulta");
            console.log(err.fatal);
            return
        }
        e.reply('tablainfo1', rows);
    });

});

//////////////////////////////////////// MENSAJES DE ALERTAS  ////////////////////////////////////////

ipcMain.on('alertaxd', (e, row) => {
    mainWindows.webContents.send('ALERTA', "HOLI");
});


ipcMain.on('alertaeditar', (e, row) => {
    mainWindows.webContents.send('ALERTAEDIT', "HOLI");
});

ipcMain.on('recargar_login', (e, row) => {
    ventanalogin.reload();
});

ipcMain.on('recargar_agregar', (e, row) => {
    ventanaagregar.reload();
});



ipcMain.on('recargar_editar', (e, row) => {
    ventanaeditar.reload();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////

imprimirtabla();
imprimirtablaeliminar();