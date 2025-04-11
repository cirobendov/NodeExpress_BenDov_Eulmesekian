export default class Alumno {
    constructor(Username, DNI, Edad) { 
    this.username = Username;
    this.dni = DNI;
    this.edad = Edad

    }

    toString() {
        return `Nombre de usuario:${this.username}, DNI:${this.dni}, edad:${this.edad}`;
    }
}