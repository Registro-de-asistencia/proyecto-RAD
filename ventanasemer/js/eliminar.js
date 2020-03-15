const { electron } = require('electron');
const { ipcRenderer } = require('electron');
const { format } = require('date-fns');

const formulario = document.querySelector('#formulario');
const trabaja = document.querySelector('#trabaja');
const boton1 = document.querySelector('#botonvolver');


const enviar = () => {
    let dato = "Hacer conexion con index";
    ipcRenderer.send('salireliminar', dato);
}


const util = require('util');

const enviarid = (id_trabajadorin) => {
    r = confirm("¿Realmente quiere eliminarlo?");
    if (r == true) {
        ipcRenderer.send('outputelimina', id_trabajadorin);
        alert("Se ha eliminado un trabajador.")
    } else {

    }
}


const filtrar = () => {


    noencontrado.innerHTML = '';
    let dato = "Hacer conexion con index";
    ipcRenderer.send('alertaeliminar1', dato);

    ipcRenderer.on('alertaeliminar', (e, row) => {
        console.log(row);
        trabaja.innerHTML = '';
        var texto = formulario.value.toLowerCase();
        var i = 0;
        while (i < row.length) {
            var nombret = row[i].Nombre.toLowerCase();
            var apellidot = row[i].Apellido.toLowerCase();
            var areat = row[i].Area.toLowerCase();
            var rutt = row[i].Rut.toLowerCase();

            if (nombret.indexOf(texto) !== -1 || apellidot.indexOf(texto) !== -1 || areat.indexOf(texto) !== -1 || rutt.indexOf(texto) !== -1) {
                lista_trabajadores = `
													<td class="column1" style='text-align:center;'>${row[i].Nombre}</td>
													<td class="column2" style='text-align:center;'>${row[i].Apellido}</td>
													<td class="column3" style='text-align:center;'>${row[i].Rut}</td>
													<td class="column4" style='text-align:center;'>${row[i].Area}</td>
													<td class="column11" style='text-align:center;'><button style='margin-left:35px;' onclick="enviarid(${row[i].id_trabajador})" class="btn btn-danger glyphicon glyphicon-remove"></button></td>
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

boton1.addEventListener('click', enviar);