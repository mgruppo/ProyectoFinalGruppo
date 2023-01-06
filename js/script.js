/*Para la pre entrega 1, y como idea de proyecto, se trabaja bajo la necesidad de contar con una plataforma
que dependiendo la elección de gasto que la persona desea realizar,
la plataforma le recomienda posibilidades de pagar con tarjeta, tomar credito o elegir cuotas*/

//primero declaro constantes y variables globales e inicializo, puedo inicializar despues
/*defino como constante la tasa de referencia para el plazo fijo, debido a que no cambia en el presente programa,
al igual que el fondo comun de Mercado Libre, se deberia tomar de algun servicio web a futuro*/
const tasaPlazoFijo = 0.75; //tasa de plazo fijo (Tasa Nominal Anual)
const tasaMercadoLibre = 0.62; //tasa de fondo comun (Tasa Nominal Anual)
const mensajeSalida = "salir" //para salir de la ejecucion
let tasaTarjeta6 = 0.15;
let tasaTarjeta12 = 0.24;
let nombre = "";
let eleccion = 0;
let eleccionLetras = "";
let cantidadCorrecta = false;
let cantidadCuotas = 0;
let eleccionCuotas = "";
let nombrePlan = "";
let montoGasto = 0;

//funciones
function esTextoVacio(texto) {
    if (texto != "") {
        //console.log("true", "-", texto)
        return true
    } else {
        //console.log("false", "-", texto)
        return false
    }
}


//funciones anonimas

//logica de codigo
//saludo
console.log("Bienvenido a la plataforma de decisión financiera");
alert("Bienvenido a la plataforma de decisión financiera");
//solicitud de nombre, para pertenencia en el resultado


//validacion de nombre con do while
do {
    nombre = prompt("Por favor, ingresa tu nombre para continuar \nEscriba salir para abandonar el programa");
    if (nombre == "") {
        alert("Por favor, ingresa un nombre válido para continuar \nEscriba salir para abandonar el programa")
    } else if (nombre.toLowerCase() == mensajeSalida) {
        //para salir de la condicion
        break
    }
} while (nombre == "");

if ((nombre != "") && (nombre.toLowerCase() != mensajeSalida)) {
    console.log("nombre" + " " + nombre);
    //casteo el numero de la eleccion, por defecto 0 es sin eleccion y debe elegir
    eleccion = Number(prompt("Contanos, ¿cual es tu deseo financiero? Ingresa el número de la opción pra continuar \nIngresa 1 para Viaje, \nIngresa 2 para Electronica, \nIngresa 3 para Ropa, \nIngresa 4 para Otro"));
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
        default:
            eleccionLetras = "Otro";
            break;
    }

    nombrePlan = prompt(`1 - Necesitamos un poco más de información ¿Cómo llamarías a tu plan de la categoría: ${eleccionLetras}?`);
    while (esTextoVacio(nombrePlan) == false) {
        nombrePlan = prompt(`2 - Necesitamos un poco más de información ¿Cómo llamarías a tu plan de la categoría: ${eleccionLetras}?`);
        console.log("nombrePlan ", nombrePlan)
    }

    //validacion de monto con do while
    do {
        montoGasto = Number(prompt("¿Cuál es el monto total del gasto que deseas?"));
        console.log(typeof (montoGasto))
        if (typeof (montoGasto) != "number") {
            alert("Ingrese un valor de tipo numerico")
        } else if (montoGasto >= 1000 && montoGasto <= 2000000) {
            console.log("esta entre 1000 y 2000000")
            //puedo trabajar en el asesoramiento
            do {
            cantidadCuotas = Number(prompt("Contanos, ¿en cuantas cuotas pensas financiarlo? Ingresa el número de la opción pra continuar \nIngresa 1 para 1 cuota, \nIngresa 2 para 6 cuotas, \nIngresa 3 para 12 cuotas"));
            switch (cantidadCuotas) {
                case 1:
                    eleccionCuotas = "1 Cuota";
                    cantidadCorrecta = true;
                    break;
                case 2:
                    eleccionCuotas = "6 Cuota";
                    cantidadCorrecta = true;
                    break;
                case 3:
                    eleccionCuotas = "12 Cuota";
                    cantidadCorrecta = true;
                    break;
                default:
                    eleccionCuotas = "Cantidad incorrecta";
                    cantidadCorrecta = false;
                    break;
                }
            }
            while (cantidadCorrecta == false);
            console.log(eleccionCuotas, " - ", cantidadCorrecta)  
        } else {
            //incluir variable boolenas
            let esMayor = (montoGasto > 2000000)
            if (esMayor) {
                alert("Lamentamos no poder ayudarte, estamos trabajando para lograr asesorarte en montos grandes de dinero");
            } else {
                console.log("No esta entre 1000 y 2000000")
            }
        }
    }
    while (montoGasto == 0);

    //agregar for para armar cuotas, el primer mes, el segundo, el tercero, se paga x monto, utilizando el i del for
    //con continue salto la iteracion del for, puede servir para un descuento
}