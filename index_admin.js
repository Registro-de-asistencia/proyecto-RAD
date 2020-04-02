const {
    electron
} = require('electron');
const {
    ipcRenderer
} = require('electron');
const {
    format
} = require('date-fns');

const formulario = document.querySelector('#formulario');
const trabaja = document.querySelector('#trabaja');
const botonecerrar = document.querySelector('#botoncerrar');

const util = require('util');

const enviarcerrar = () => {
    r = confirm("¿Realmente quiere cerrar sesión?");
    if (r == true) {
        ipcRenderer.send('Cierrasesion', "Hacer");
    } else {

    }
}


const agregar_trabajador = () => {
    ipcRenderer.send('Prueba2', "Hacer");
}

const enviarid = (id_trabajadorin) => {
    ipcRenderer.send('Prueba3', id_trabajadorin);
}
const enviarid2 = (id_trabajadorin) => {
    ipcRenderer.send('Prueba6', id_trabajadorin);
}

const enviareliminar = () => {
    ipcRenderer.send('eliminar', "eliminar");
}



botonecerrar.addEventListener('click', enviarcerrar);

ipcRenderer.on('ALERTA', (e, row) => {
    alert("Se ha agregado un nuevo trabajador.")
});

ipcRenderer.on('ALERTAEDIT', (e, row) => {
    alert("Se ha editado un trabajador.")
});


const filtrar = () => {


    noencontrado.innerHTML = '';
    let dato = "Hacer conexion con index";
    ipcRenderer.send('Prueba1', dato);

    ipcRenderer.on('Prueba1', (e, row) => {
        trabaja.innerHTML = '';
        var texto = formulario.value.toLowerCase();
        var i = 0;
        while (i < row.length) {
            var nombret = row[i].Nombre.toLowerCase();
            var apellidot = row[i].Apellido.toLowerCase();
            var areat = row[i].Area.toLowerCase();

            if (nombret.indexOf(texto) !== -1 || apellidot.indexOf(texto) !== -1 || areat.indexOf(texto) !== -1) {
                var fecha = format(new Date(row[i].Inicio), 'dd/MM/yyyy');
                var Hora_inicio = format(new Date(row[i].Inicio), 'kk:mm:ss');
                lista_trabajadores = `
													<td class="column1" style='text-align:center;'>${row[i].Nombre}</td>
													<td class="column2" style='text-align:center;'>${row[i].Apellido}</td>
													<td class="column4" style='text-align:center;'>${row[i].Area}</td>
													<td class="column6" style='text-align:center;'>${Hora_inicio}</td>
													<td class="column8" style='text-align:center;'>${fecha}</td>
													<td class="column10"><button onclick="enviarid2(${row[i].id_trabajador})" style='text-align:center;margin-left:25px;' class="btn btn-warning glyphicon glyphicon-user"></button></td>
													
													`;
                trabaja.innerHTML += lista_trabajadores;
            }
            i = i + 1;
        }
        if (trabaja.innerHTML === '') {
            noencontrado.innerHTML = `<div class="btn btn-warning">Trabajador no encontrado.</div>`;
        }
    });
}
formulario.addEventListener('keyup', filtrar);
filtrar();