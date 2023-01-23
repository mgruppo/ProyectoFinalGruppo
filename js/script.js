/*Para la pre entrega 1, y como idea de proyecto, se trabaja bajo la necesidad de contar con una plataforma
que dependiendo la elección de gasto que la persona desea realizar,
la plataforma le recomienda posibilidades de pagar con tarjeta, tomar credito o elegir cuotas*/

//primero declaro constantes y variables globales e inicializo, puedo inicializar despues
/*defino como constante la tasa de referencia para el plazo fijo, debido a que no cambia en el presente programa,
al igual que el fondo comun de Mercado Libre, se deberia tomar de algun servicio web a futuro, de lo contrario quedan como constante*/
const tasaPlazoFijo = 0.75; //tasa de plazo fijo (Tasa Nominal Anual)
const tasaFondoComun = 0.62; //tasa de fondo comun (Tasa Nominal Anual)
const mensajeSalida = "salir" //para salir de la ejecucion
const planes = []; //array de planes para que en proxima version pueda tener varios planes

//agrego los días para comparar, los días sabado y domingo no se permite realizar inversiones
const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]

let tasaTarjeta6 = 0.15;
let tasaTarjeta12 = 0.24;

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

//ver si tiene sentido o se borra el proposito
const proposito = [{
    id: 1,
    tipo: "Viaje"
}, {
    id: 2,
    tipo: "Electronica"
}, {
    id: 3,
    tipo: "Ropa"
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
//estaria bueno incluir el calculo mensual en un arrays en plan
let interes = (importe, interes, cantidadMeses) => {
    let valorResultado = 0
    for (let i = 1; i <= cantidadMeses; i++) {
        valorResultado += (importe * (interes / 12))
    }
    return valorResultado
}

let calcular = (cantidadCuotas, montoGasto) => {
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
    //imprimo informe final
    informe(mensajeFinal);
}

let informe = (mensajeFinal) => {
    alert(mensajeFinal)
    console.log(mensajeFinal)
}

//AGREGAR
//funciones de orden superior
//podria utilizar para calcular si la ganancia mensual es mayor que la inflacion
function mayorQue(n) {
    return (m) => m > n
}

//si con la ganancia de los intereses le gano a la inflacion mensual
let inflacion = 0.4
let mayorQueInflacion = mayorQue(inflacion)

//recibir funciones por parametro
//por cada uno de los calculos del array valido si es mayor a la inflacion
//puedo mostrar cuando le gano o no a la inflacion
function porCadaUno(arr, fn) {
    for (const iterator of arr) {
        /*for (let index = 0; index < array.length; index++) {
            const element = array[index];
        }*/
        fn(iterator)
    }
}


//podria ser, la funcion no lleva parentesis
//porCadaUno(array,mayorQueInflacion)
//porCadaUno(numeros, console.log)
let total = 0

function acumular(num) {
    total += num
}
numero = [1, 2, 3, 4, 5]
porCadaUno(numero, acumular)
//console.log(total)

const duplicado = []
porCadaUno(numero, (el) => {
    duplicado.push(el * 2)
})
//console.log(duplicado)

//for each
// tasasInversion.forEach((tasa) => {
//     console.log(tasa.descripcion)
// })

//find para buscar, recorre y cuando encuentra uno corta, no recorre todo
const resultadoInflacion = planes.find((plan) => plan.descripcion == "eeuu")
//console.log("resultadoInflacion " + resultadoInflacion)

//filter me devuelve un nuevo array
const resultado2 = planes.filter((plan) => plan.activo == true)
//console.log(resultado2)

//some es igual a filter pero devuelve true o false
//console.log("some " + planes.some((plan) => plan.activo == true))

//map me devuelve un nuevo array con los elementos del original pero con la transformacion
const resultado3 = planes.map((plan) => plan.descripcion)
//console.log(resultado3)

//reduce, me devuelve un unico valor, no se utiliza tanto
numero = [1, 2, 3, 4, 5]
const resultado4 = numero.reduce((acumulador, elemento) => acumulador + elemento, 0)
//console.log("reduce " + resultado4)

//sort para ordenar un array, el metodo es destructivo, luego del orden cambia el lugar
numero = [40, 1, 5, 200]
numero.sort((a, b) => a - b); //ascendente
numero.sort((a, b) => b - a); //descendente
//console.log("sort  " + numero.sort((a, b) => a - b))
//console.log("sort  " + numero.sort((a, b) => b - a))

//ordenar por descripcion
tasasTarjetas.sort((a, b) => {
    if (a.descripcion > b.descripcion) {
        return 1;
    } else if (a.descripcion < b.descripcion) {
        return -1;
    } else {
        return 0;
    }
})
//console.log(tasasTarjetas.toString())

//Math, son metodos matematicos para trabajar en javascript
/*
console.log("Math")
console.log(Math.max(1, 2, 3, 4, 5));
console.log(Math.min(1, 2, 3, 4, 5));
console.log(Math.round(Math.PI));
*/

//Date
const hoy = new Date();
/*
console.log(new Date())
console.log(hoy.getDay()) //1 es lunes y 7 domingo
*/
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
        //agregar un arrays con el detalle de la financiacion, mes, interes, ganancia, pago cuota
        //esto se va a poder ordenar y visualizar entre ellos
        this.detalleFinanciacion = {
            mesNumero: 0,
            interesTarjeta: 0,
            interesInversion: 0,
            valorTotal: 0
        };

    }
    //agrego un metodo de activo, para que cuando tenga varios planes, poder simular entre los activos
    cambiarActivo(activo) {
        this.activo = activo;
        return this.activo
    }
    cambiarFinanciacion(financiacion) {
        this.financiacion = financiacion
        return this.financiacion
    }
}

//for para mostrar los valores por defecto de las tasas
let tasaMensaje = (tasaReferencia) => {
    let mensajeAuxiliar = ""
    for (let index = 0; index < tasaReferencia.length; index++) {
        if (mensajeAuxiliar.trim() == "") {
            mensajeAuxiliar += (tasaReferencia[index].descripcion + " " + (tasaReferencia[index].valor * 100) + "%")
        } else {
            mensajeAuxiliar += ("\n" + tasaReferencia[index].descripcion + " " + (tasaReferencia[index].valor * 100) + "%")
        }
    }
    return mensajeAuxiliar
}

let nuevaTasa = (tasaReferencia) => {
    do {
        nuevaTasaPorcentaje = Number(prompt(`Por favor, en el rango de 0 (cero) a 100(cien), ingrese el valor de la tasa de refencia, correspondiente a la Tasa Nominal Anual (TNA)`));
    } while (!((nuevaTasaPorcentaje / 100) >= 0 && (nuevaTasaPorcentaje / 100) <= 1));
    do {
        nuevaTasaDescripcion = prompt(`Por favor, ingrese el nombre que identifica a la tasa de refencia`);
    } while (nuevaTasaDescripcion.trim() == "");
    tasaReferencia.push({
        descripcion: nuevaTasaDescripcion,
        valor: (nuevaTasaPorcentaje / 100)
    })
    //alert("Pefecto, la nueva tasa se agrego correctamente")
}

let eliminarTasa = (tasaReferencia) => {
    let mensajeEleccion = tasaMensaje(tasaReferencia)
    let contadorBorrado = 0
    do {
        tasaEliminar = prompt(`Por favor, de las siguientes tasas:\n ${mensajeEleccion} \nIngrese el nombre de la tasa a eliminar, \nDe lo contrario, escriba ${mensajeSalida} para abandonar el borrado y continuar`);
    } while (tasaEliminar.trim() == "");

    if (tasaEliminar.toLowerCase() != mensajeSalida) {
        //let index = tasaReferencia.indexOf({descripcion: tasaEliminar.trim()})
        index = tasaReferencia.findIndex(i => i.descripcion === tasaEliminar)
        //si existe, o sea, es distinto a -1, lo borro con splice
        if (index != -1) {
            tasaReferencia.splice(index, 1)
            contadorBorrado++
        }
        //alert("Perfecto, la tasa se borro correctamente")
    }

    if (contadorBorrado > 0) {
        alert("Perfecto, la tasa se borro correctamente")
    } else {
        alert("No se encontró la tasa a borrar")
    }

    // mensajeEleccion = tasaMensaje(tasaReferencia)
    // alert(`Continuamos con las siguientes tasas:\n ${mensajeEleccion}`)
    return tasaReferencia
}

let controlTasaInversion = (tasasInversion) => {
    let mensajeEleccion = tasaMensaje(tasasInversion)
    let control = false;
    do {
        eleccionTasa = Number(prompt(`Para la siguiente simulación, vamos a trabajar con los siguientes valores de inversión\n${mensajeEleccion}\nEscriba\n1 - Para continuar\n2 - Para agregar una nueva tasa al listado\n3 - Para eliminiar una tasa del listado anterior`));
        switch (eleccionTasa) {
            case 1:
                //continuo con las dos tasas ingresadas por defecto
                control = true;
                break;
            case 2:
                //agrego una nueva tasa
                control = true;
                nuevaTasa(tasasInversion);
                break;
            case 3:
                //elimino una de las tasas - si o si, debe existir una tasa, para la simulacion
                control = true;
                tasasInversion = eliminarTasa(tasasInversion);
                break;
            default:
                //opcion incorrecta, debe ingresar un valor correcto
                break;
        }
    } while ((control == false));
    mensajeEleccion = tasaMensaje(tasasInversion)
    alert(`Continuamos con las siguientes tasas:\n ${mensajeEleccion}`)
}


//logica de codigo
//saludo
alert("Bienvenido a la plataforma de decisión financiera");
//solicitud de nombre, para pertenencia en el resultado
//validacion de nombre de la persona con do while

do {
    nombre = prompt(`Por favor, ingresa tu nombre para continuar \nEscriba ${mensajeSalida} para abandonar el programa`);
    if (nombre.trim() == "") {
        alert(`Por favor, ingresa un nombre válido para continuar \nEscriba ${mensajeSalida} para abandonar el programa`);
    } else if (nombre.toLowerCase() == mensajeSalida) {
        //para salir de la condicion
        break
    }
} while (nombre.trim() == "");
if ((nombre.trim() != "") && (nombre.toLowerCase() != mensajeSalida)) {
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
        nombrePlan = prompt(`Necesitamos un poco más de información ¿Cómo llamarías a tu plan de la categoría: ${eleccionLetras}?`);
        while (nombrePlan.trim() == "") {
            nombrePlan = prompt(`Necesitamos un poco más de información ¿Cómo llamarías a tu plan de la categoría: ${eleccionLetras}?`);
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
                alert("Perfecto, vamos a ayudarte en tu plan " + eleccionLetras + " de nombre " + nombrePlan + " por un total de " + montoGasto.toString() + " y en " + eleccionCuotas);

                //cargo la informacion y creo el plan, podría crear varios, estilo carrito de compras y calcular varios planes y un plan general.
                planes.push(new Plan(nombre, eleccion, montoGasto, cantidadCuotas));
                console.log("Imprimimos los planes")
                console.log(planes);
                console.log("Imprimimos los planes con toString")
                planes.toString();

                for (let index = 0; index < planes.length; index++) {
                    //alert (numeros[index]);
                    console.log(planes[index]);
                }

                //Para controlar si el usuario desea agregar una nueva tasa o eliminar otra
                controlTasaInversion(tasasInversion);

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
