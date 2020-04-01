class Conexion_bd {
    constructor(nombre) {
        this.nombre = nombre;
    }

    saludar() {
        return "Hola mi nombre es " + this.nombre;
    }
}

export default Conexion_bd;