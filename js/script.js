/*Para la pre entrega 1, y como idea de proyecto, se trabaja bajo la necesidad de contar con una plataforma
que dependiendo la elección de gasto que la persona desea realizar,
la plataforma le recomienda posibilidades de pagar con tarjeta, tomar credito o elegir cuotas*/

//primero declaro constantes y variables globales e inicializo, puedo inicializar despues
/*defino como constante la tasa de referencia para el plazo fijo, debido a que no cambia en el presente programa,
al igual que el fondo comun de Mercado Libre, se deberia tomar de algun servicio web a futuro, de lo contrario quedan como constante*/
const tasaPlazoFijo = 0.75; //tasa de plazo fijo (Tasa Nominal Anual)
const tasaFondoComun = 0.62; //tasa de fondo comun (Tasa Nominal Anual)
const mensajeSalida = "salir" //para salir de la ejecucion
const planes = [];
//agrego los días para comparar, los días sabado y domingo no se permite realizar inversiones
const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]

let tasaTarjeta6 = 0.15;
let tasaTarjeta12 = 0.24;

//muestro las opciones de inversion
const tasasInversion = [{
    id: 1,
    descripcion: "Plazo Fijo",
    valor: 0.75
}, {
    id: 2,
    descripcion: "Fondo Común",
    valor: 0.62
}];
//muestro las opciones de financiamiento en tarjeta
const tasasTarjetas = [{
    descripcion: "1 Cuota",
    cantidad: 1,
    valor: 0
}, {
    descripcion: "3 Cuotas",
    cantidad: 3,
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
let cantidadCorrecta = false;
let cantidadCuotas = 0;
let eleccionCuotas = "";
let montoGasto = 0;

//funciones
//función anónima
//para devolver la tasa de interes necesaria, debido a que pueden ser muchas en un futuro
let valorInteres = (opcion) => {
    switch (opcion) {
        case 1:
            return tasaPlazoFijo
        case 2:
            return tasaFondoComun
        case 3:
            return tasaTarjeta6
        case 4:
            return tasaTarjeta12
        default:
            return 0
    }
}
//como el calculo de interes es igual, se utiliza para gasto, como para ganancia
function interes(importe, interes, cantidadMeses) {
    let valorResultado = 0
    for (let i = 1; i <= cantidadMeses; i++) {
        valorResultado = valorResultado + (importe * (interes / 12))
    }
    return valorResultado
}

function calcular(cantidadCuotas, montoGasto) {
    /*la idea es que: no importa las cuotas que seleccione el usuario
    pero en base a las opciones, mostrarle al usuario las ventajas de invertir el dimero un plazo fijo
    o en un fondo común de inversión y con el valor de los intereses pagar la cuota.
    Esto es recomendable, siempre y cuando el valor de las cuotas no supere el valor de inflación (próximo paso en próximas entregas)*/
    //calculamos el interese que cobra la tarjeta en 6 cuotas
    let valorCuotas6 = interes(montoGasto, valorInteres(3), 6);
    console.log("El valor de intereses para 6 cuotas es: " + valorCuotas6)
    valorCuotas6 = valorCuotas6 + montoGasto
    console.log("El costo total en 6 cuotas es de : " + valorCuotas6)
    //calculamos el interese que cobra la tarjeta en 12 cuotas
    let valorCuotas12 = interes(montoGasto, valorInteres(4), 12);
    console.log("El valor de intereses para 12 cuotas es: " + valorCuotas12)
    valorCuotas12 = valorCuotas12 + montoGasto
    console.log("El costo total en 12 cuotas es de : " + valorCuotas12)
    //calculamos el interes ganado en plazo fijo y fondo comun en 6 meses
    let valorPlazoFijo6 = interes(montoGasto, valorInteres(1), 6);
    let valorFondoComun6 = interes(montoGasto, valorInteres(2), 6);
    console.log("El valor que ganarias de intereses en un plazo fijo de 6 meses es: " + valorPlazoFijo6)
    console.log("El valor que ganarias de intereses en un fondo comun de 6 meses es: " + valorFondoComun6)
    let valorPlazoFijo12 = interes(montoGasto, valorInteres(1), 12);
    let valorFondoComun12 = interes(montoGasto, valorInteres(2), 12);
    console.log("El valor que ganarias de intereses en un plazo fijo de 12 meses es: " + valorPlazoFijo12)
    console.log("El valor que ganarias de intereses en un fondo comun de 12 meses es: " + valorFondoComun12)

    //puede ser una funcion generar presupuesto o informe

    let mensajeFinal = `Elegiste pagar en ` + eleccionCuotas + `, pero sabias que pagando en ` + `\n 1 cuota, el gasto te saldría 1 desembolso unico de $` + montoGasto + `\n En 6 cuotas, te saldría $` + valorCuotas6 + ` y podrías descontar los intereses de un Fondo Común de Inversión $` + valorFondoComun6 + ` o los intereses de un Plazo Fijo $` + valorPlazoFijo6 + ` que podrias descontar en las cuotas mensualmente reinvirtiendo el capital únicamente` + `\n En 12 cuotas, te saldría $` + valorCuotas12 + ` y podrías descontar los intereses de un Fondo Común de Inversión $` + valorFondoComun12 + ` o los intereses de un Plazo Fijo $` + valorPlazoFijo12 + ` que podrias descontar en las cuotas mensualmente reinvirtiendo el capital únicamente`
    alert(mensajeFinal)
    console.log(mensajeFinal)

    informe(mensajeFinal);
}

function informe(mensajeFinal) {
    

    
    alert(mensajeFinal)
    console.log(mensajeFinal)


}

//creo clase para definir el plan
class Plan {
    //nombre del plan
    //tipo: 1 para Viaje, 2 para Electronica, 3 para Ropa, 4 para Otro
    //monto: importe
    //financiacion: 1 para 1 cuota sin interes, 2 para 6 cuotas con un interes, 3 para 12 cuotas
    constructor(nombre, tipo, monto, financiacion) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.monto = parseFloat(monto);
        this.financiacion = financiacion;
        this.activo = true;
    }
    //agrego un metodo
    cambiarActivo(activo) {
        this.activo = activo;
        return this.activo
    }
    cambiarFinanciacion(financiacion) {
        this.financiacion = financiacion
        return this.financiacion
    }
}


//logica de codigo
//saludo
alert("Bienvenido a la plataforma de decisión financiera");
//solicitud de nombre, para pertenencia en el resultado
//validacion de nombre de la persona con do while



do {
    nombre = prompt(`Por favor, ingresa tu nombre para continuar \nEscriba ${mensajeSalida} para abandonar el programa`);
    if (nombre == "") {
        alert(`Por favor, ingresa un nombre válido para continuar \nEscriba ${mensajeSalida} para abandonar el programa`);
    } else if (nombre.toLowerCase() == mensajeSalida) {
        //para salir de la condicion
        break
    }
} while (nombre == "");
if ((nombre != "") && (nombre.toLowerCase() != mensajeSalida)) {
    console.log("nombre" + " " + nombre);
    //casteo el numero de la eleccion, por defecto es el valor 0 (sin eleccion) y se asigna nombre otros, de lo contrario se establece entre las opciones
    eleccion = Number(prompt("Contanos " + nombre + ", ¿cuál es tu deseo financiero? Ingresa el número de la opción para continuar \nIngresa 1 para Viaje, \nIngresa 2 para Electronica, \nIngresa 3 para Ropa, \nIngresa 4 para Otro"));
    switch (eleccion) {
        case 1:
            eleccionLetras = "Viaje";
            break;
        case 2:
            eleccionLetras = "Electronica";
            break;
        case 3:
            eleccionLetras = "Ropa";
            break;
        case 4:
            eleccionLetras = "Otro";
            break;
        default:
            //por el momento dejo la opcion por defecto, puede ser una categoria otros e ingresar algun nombre o cambiar la logica para elegir entre el combo anterior
            eleccionLetras = "Otra opción";
            break;
    }
    if (eleccion >= 1 && eleccion <= 4) {
        //definir un nombre del plan para hacerlo mas personalizado
        nombrePlan = prompt(`1 - Necesitamos un poco más de información ¿Cómo llamarías a tu plan de la categoría: ${eleccionLetras}?`);
        while (nombrePlan == "") {
            nombrePlan = prompt(`2 - Necesitamos un poco más de información ¿Cómo llamarías a tu plan de la categoría: ${eleccionLetras}?`);
            console.log("nombrePlan ", nombrePlan)
        }
        //validacion de monto con do while, por defecto el programa funcionara si el valor es entre 1000 y 2 millones, de lo contrario no continua
        //se establece el supuesto que mayor a 2 millones debe contratar un plan personalizado que no se plantea es esta etapa
        do {
            montoGasto = Number(prompt("¿Cuál es el monto total del gasto que deseas para " + nombrePlan + "? \nRecorda que solamente podemos ayudarte, si ingresas valores entre 1000 (mil) y 2 millones"));
            //console.log(typeof (montoGasto))
            if (typeof (montoGasto) != "number") {
                alert("Ingrese un valor de tipo numerico")
            } else if (montoGasto >= 1000 && montoGasto <= 2000000) {
                console.log("esta entre 1000 y 2000000")
                //puedo trabajar en el asesoramiento
                do {
                    cantidadCuotas = Number(prompt("Contanos, ¿en cuantas cuotas pensas financiarlo? Ingresa el número de la opción para continuar \nIngresa 1 para 1 cuota sin interes, \nIngresa 2 para 6 cuotas con un interes anual de " + tasaTarjeta6 + "\nIngresa 3 para 12 cuotas con un interes anual de " + tasaTarjeta12));
                    switch (cantidadCuotas) {
                        case 1:
                            eleccionCuotas = "1 Cuota";
                            cantidadCorrecta = true;
                            break;
                        case 2:
                            eleccionCuotas = "6 Cuotas";
                            cantidadCorrecta = true;
                            break;
                        case 3:
                            eleccionCuotas = "12 Cuotas";
                            cantidadCorrecta = true;
                            break;
                        default:
                            eleccionCuotas = "Cantidad incorrecta, por favor vuelva a selecionar entre las opciones correctas";
                            cantidadCorrecta = false;
                            break;
                    }
                }
                while (cantidadCorrecta == false);
                console.log(eleccionCuotas, " - ", cantidadCorrecta)
                alert("Perfecto, vamos a ayudarte en tu plan " + eleccionLetras + " por un total de " + montoGasto.toString() + " y en " + eleccionCuotas);

                //cargo la informacion y creo el plan, podría crear varios, estilo carrito de compras y calcular varios planes y un plan general.
                planes.push(new Plan(nombre, eleccion, montoGasto, cantidadCuotas));
                console.log(planes)
                
                planes.toString();

                for (let index = 0; index < planes.length; index++) {
                    //alert (numeros[index]);
                    console.log(planes[index]);
                }

                //controlar
                // for(const plan1 of plan){
                //     console.log(plan1.descripcion)
                // }

                calcular(cantidadCuotas, montoGasto);
            } else {
                //incluir variable boolenas
                let esMayor = (montoGasto > 2000000)
                if (esMayor) {
                    alert("Lamentamos no poder ayudarte, estamos trabajando para lograr asesorarte en montos grandes de dinero, superiores a 2 millones");
                } else {
                    alert("Lamentamos no poder ayudarte, el monto es menor a $1000 \nRecorda que podemos ayudarte en valores mayores o iguales a 1000 y menor o igual a 2 millones");
                    console.log("No esta entre 1000 y 2000000")
                }
            }
        }
        while (montoGasto == 0);
    } else {
        alert("Seleccionaste una opción incorrecta, por lo que no podemos ayudarte");
    }
}