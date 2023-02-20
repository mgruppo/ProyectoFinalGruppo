//Archivo de variables y arrays
const planes = []; //array de planes para que en proxima version pueda tener varios planes
const inflacion = 0.95; //anual, en version final, puede ser un atributo nuevo en pantalla
const student = 'marianogruppo'

//agrego el arrays días para comparar, los días sabado y domingo no se permite realizar inversiones, por eso tienen en inversion false
const dias = [{
    descripcion: "lunes",
    valor: 1,
    inversion: true
}, {
    descripcion: "martes",
    valor: 2,
    inversion: true
}, {
    descripcion: "miércoles",
    valor: 3,
    inversion: true
}, {
    descripcion: "jueves",
    valor: 4,
    inversion: true
}, {
    descripcion: "viernes",
    valor: 5,
    inversion: true
}, {
    descripcion: "sábado",
    valor: 6,
    inversion: false
}, {
    descripcion: "domingo",
    valor: 0,
    inversion: false
}];

//muestro las opciones de inversion
let tasasInversion = [{
    descripcion: "Plazo Fijo",
    valor: 0.75
}, {
    descripcion: "Fondo Común",
    valor: 0.62
}];
//muestro las opciones de financiamiento en tarjeta
const tasasTarjetas = [{
    descripcion: "1 Cuota",
    cantidad: 1,
    valor: 0
}, {
    descripcion: "6 Cuotas",
    cantidad: 6,
    valor: 0.15
}, {
    descripcion: "12 Cuotas",
    cantidad: 12,
    valor: 0.24
}];

//variables de eleccion de viaje
let nombre = "";
let eleccion = 0;
let eleccionLetras = "";
let nombrePlan = "";
let cantidadCuotas = 0;
let eleccionCuotas = "";
let montoGasto = 0;