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

const boton1 = document.querySelector('#salir');
const boton2 = document.querySelector('#generarinforme');
const outpdf = document.querySelector('#to-pdf');

function cerrar() {
    let dato = "Hacer conexion con index";
    ipcRenderer.send('salirinfo', dato);
}

function geninforme() {
    var pdf = new jsPDF();
    pdf.addHTML(outpdf, function() {
        pdf.save('Informe:trabajador.pdf');
    });
}

boton1.addEventListener('click', cerrar);
boton2.addEventListener('click', geninforme);

ipcRenderer.send('tablainfo', "Conexion");
ipcRenderer.on('tablainfo1', (e, row) => {
    document.getElementById("imagen_usuario").src = "" + row[0].imagen;
    nombreR.innerHTML = row[0].Nombre;
    apellidoR.innerHTML = row[0].Apellido;
    rutR.innerHTML = row[0].Rut;
    areaR.innerHTML = row[0].Area;
    exigidasR.innerHTML = row[0].Volumen_de_horas;

    var i = 0;
    while (i < row.length) {

        var fecha = format(new Date(row[i].Inicio), 'dd/MM/yyyy');
        var Hora_inicio = format(new Date(row[i].Inicio), 'kk:mm:ss');
        var Hora_fin = format(new Date(row[i].Fin), 'kk:mm:ss');
        var Horasextras = (format(new Date(row[i].Fin), 'kk') - format(new Date(row[i].Inicio), 'kk') - row[i].Volumen_de_horas);
        var SumaHorasExtras = 0;
        if (Horasextras > 0) {
            SumaHorasExtras = SumaHorasExtras + Horasextras;
        }
        var lista_trabajadores = `
										<td class="column1" style='text-align:center;'>${row[i].Nombre}</td>
										<td class="column2" style='text-align:center;'>${row[i].Apellido}</td>
										<td class="column4" style='text-align:center;'>${row[i].Area}</td>
										<td class="column6" style='text-align:center;'>${Hora_inicio}</td>
										<td class="column7" style='text-align:center;'>${Hora_fin}</td>
										<td class="column8" style='text-align:center;'>${fecha}</td>
										`;
        trabaja.innerHTML += lista_trabajadores;
        extrasR.innerHTML = SumaHorasExtras;
        i = i + 1;
    }
});