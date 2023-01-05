/*Para la pre entrega 1, y como idea de proyecto, se trabaja bajo la necesidad de contar con una plataforma
que dependiendo la elección de gasto que la persona desea realizar,
la plataforma le recomienda posibilidades de pagar con tarjeta, tomar credito o elegir cuotas*/

//primero declaro constantes y variables globales e inicializo, puedo inicializar despues
//defino como constante la tasa de referencia para el plazo fijo, debido a que no cambia
const tasaPlazoFijo = 0.75;
let tasaTarjeta18 = 0.24;
let tasaTarjeta24 = 0.35;
let nombre = "";
let eleccion = 0;
let eleccionLetras = "";
let nombrePlan = "";
let montoGasto = 0;


//funciones

//funciones anonimas

//logica de codigo
//saludo
console.log("Bienvenido a la plataforma de decisión financiera");
alert("Bienvenido a la plataforma de decisión financiera");
//solicitud de nombre, para pertenencia en el resultado


//validacion de nombre con do while
do {
    nombre = prompt("Por favor, ingresa tu nombre para continuar");
    if (nombre == "") {
        alert("Por favor, ingresa un nombre válido para continuar")
    } else if (nombre.toLowerCase == "salir") {
        //para salir de la condicion
        break
    }
} while (nombre == "");

if ((nombre != "") && (nombre != "salir")) {
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

    nombrePlan = prompt(`¿Cómo llamarías a tu plan de la categoría: ${eleccionLetras}?`);

    montoGasto = Number(prompt("¿Cuál es el monto total del gasto que deseas?"));
    if (montoGasto >= 1000 && montoGasto <= 2000000) {
        console.log("esta entre 1000 y 2000000")
    } else if (typeof montoGasto != "Number") {
        alert("Ingrese un valor de tipo numerico")
    } else {
        console.log("No esta entre 1000 y 2000000")

        //incluir variable boolenas
        /*
        let esMayor = (montoGasto>2000000)
        if (esMayor) {
            alert("Lamentamos no poder ayudarte, estamos trabajando para lograr asesorarte en montos grandes de dinero");
        }
        */
    }

    //agregar for para armar cuotas, el primer mes, el segundo, el tercero, se paga x monto, utilizando el i del for
    //con continue salto la iteracion del for, puede servir para un descuento
}