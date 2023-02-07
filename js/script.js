/*Para la pre entrega 3, y como idea de proyecto, se trabaja bajo la necesidad de contar con una plataforma
que dependiendo la elección de gasto que la persona desea realizar,
la plataforma le recomienda posibilidades de pagar con tarjeta, en una cuota o más o elegir invertir en un fondo común de inversión*/

const planes = []; //array de planes para que en proxima version pueda tener varios planes
const inflacion = 0.95; //anual, en version final, puede ser un atributo nuevo en pantalla

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


//funciones
//como el calculo de interes es igual, se utiliza para gasto, como para ganancia
let interes = (importe, interes, cantidadMeses) => {
    let valorResultado = 0
    for (let i = 1; i <= cantidadMeses; i++) {
        valorResultado += (importe * (interes / 12))
    }
    return valorResultado
}

//funciones de orden superior
//para calcular si la ganancia es mayor que la inflacion
function mayorQue(n) {
    return (m) => m > n
}
//si con la ganancia de los intereses le gano a la inflacion
let mayorQueInflacion = mayorQue(inflacion)

//llenado de tasas
let llenarCombo = (elementoID, arrayReferencia) => {
    let select = document.getElementById(elementoID);
    for (let index = 0; index < arrayReferencia.length; index++) {
        let option = document.createElement("option");
        option.value =  arrayReferencia[index].valor;
        option.innerText =  arrayReferencia[index].descripcion;
       select.appendChild(option);
    }
}

let calcular = () => {
    /*la idea es que: no importa las cuotas que seleccione el usuario
    pero en base a las opciones, mostrarle al usuario las ventajas de invertir el dinero en un plazo fijo
    o en un fondo común de inversión o la opción que agregue y con el valor de los intereses pagar la cuota.
    Esto es recomendable, siempre y cuando el valor de las cuotas no supere el valor de inflación*/
    mensaje = ""
    let totalMenor = 0;
    let mejorTasaValor = 0;
    let mejorTasaDescripcion = "";
    for (const planCalculo of planes) {
        if (planCalculo.activo) {
            //tengo un plan activo, el cual debo calcular el interes y el costo de las tasas de inversion y de tarjeta
            //primero calculo las tarjetas, las tasas estan en el array tasasTarjetas
            let valorCuota = [];
            for (let index = 0; index < tasasTarjetas.length; index++) {
                valorCuota[index] = interes(parseFloat(planCalculo.monto), parseFloat(tasasTarjetas[index].valor), parseFloat(tasasTarjetas[index].cantidad));
                //por cada cantidad de cuotas, recorro la inversion y calculo cuanto ganaria de interes, salvo para 1 cuota que no tiene intereses
                for (const tasa of tasasInversion) {
                    valorInversion = interes(parseFloat(planCalculo.monto), parseFloat(tasa.valor), parseFloat(tasasTarjetas[index].cantidad));
                    let detalleFinanciacion = {
                        cuotas: tasasTarjetas[index].cantidad,
                        interesTarjeta: valorCuota[index],
                        detalleTarjeta: tasasTarjetas[index].descripcion,
                        interesInversion: valorInversion,
                        detalleInversion: tasa.descripcion,
                        valorTotal: valorCuota[index] + planCalculo.monto - valorInversion
                    };
                    planCalculo.agregaDetalle(detalleFinanciacion);
                    if (totalMenor == 0) {
                        totalMenor = (valorCuota[index] + planCalculo.monto - valorInversion)
                        mejorTasaValor = tasa.valor;
                        mejorTasaDescripcion = tasa.descripcion;
                        mensaje = `La mejor alternativa es la opción de abonar con <span>` + tasasTarjetas[index].descripcion + `</span> y realizando la inversion de: <span>` + tasa.descripcion + `</span>, si restamos las ganancias el total pagado es de <span>` + totalMenor + `</span> y realizando la inversion de: <span>` + tasa.descripcion + `</span>`
                    } else if ((valorCuota[index] + planCalculo.monto - valorInversion) < totalMenor) {
                        totalMenor = (valorCuota[index] + planCalculo.monto - valorInversion)
                        mejorTasaValor = tasa.valor;
                        mejorTasaDescripcion = tasa.descripcion;
                        mensaje = `La mejor alternativa es la opción de abonar con <span>` + tasasTarjetas[index].descripcion + `</span> y realizando la inversion de: <span>` + tasa.descripcion + `</span>, si restamos las ganancias el total pagado es de <span>` + totalMenor + `</span> y realizando la inversion de: <span>` + tasa.descripcion + `</span>`
                    }
                }
            }
        }
    }
    let valorCondicion = mayorQueInflacion(mejorTasaValor)
    if (valorCondicion == true) {
        mensaje += `\nCon esta inversión además, <span>le estás ganando a la inflación</span> proyectada del año que es del <span>` + (inflacion * 100) + `%</span>. <span>Excelente noticia!!</span>`;
    } else {
        mensaje += `\nCon esta inversión, <span>No le estás ganando a la inflación</span> proyectada del año que es del <span>` + (inflacion * 100) + `%</span>, <span>pero te das un gusto :D</span>`;
    }
    informe(mensaje);
}

let informe = (mensajeFinal) => {
    //Date para buscar el día de hoy
    let mensajeDia = "";
    const hoy = new Date();
    const hoyDia = hoy.getDay(hoy); //1 es lunes y 7 domingo
    let diaAptoInversion = dias.find((dia) => dia.valor === hoyDia);
    if (diaAptoInversion.inversion == true) {
        mensajeDia =`Recorda que hoy es <span>` + diaAptoInversion.descripcion + `</span> y es un <span> día hábil </span> para invertir tu dinero`;
    } else {
        mensajeDia =`Recorda que hoy es <span>` + diaAptoInversion.descripcion + `</span> y <span> No podes invertir tu dinero </span>, agenda la inversión para el próximo día hábil`;
    }
    if (mensajeFinal.trim() != "") {
        let classEvento = "parrafo-secundario";
        datosResultados = document.getElementById("resultado-simulacion");
        datosResultados.innerHTML = `<div class=${classEvento}>` + mensajeFinal+ `<div class=${classEvento}>` + mensajeDia;

    }
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
        this.detalleFinanciacion = [];
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
    agregaDetalle(detalle) {
        this.detalleFinanciacion.push({
            cuotas: detalle.cuotas,
            interesTarjeta: detalle.interesTarjeta,
            detalleTarjeta: detalle.detalleTarjeta,
            interesInversion: detalle.interesInversion,
            detalleInversion: detalle.detalleInversion,
            valorTotal: detalle.valorTotal
        })
        return
    }
}

//class Usuario, para gestionar al perfil del inversor o cliente
class Usuario {
    constructor(nombre) {
        this.nombre = nombre;
        this.activo = true;
    }
    setNombre(nuevoNombre) {
        if (nombre != '') {
            this.nombre = nuevoNombre
            return this.nombre
        }
    }
    setActivo(activo) {
        this.activo = activo;
        return this.activo
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

let limpiarCombo = () => {
    let options = document.querySelectorAll('#tasas-select option');
    options.forEach(o => o.remove());
}

let nuevaTasa = (nuevaTasaPorcentaje, nuevaTasaDescripcion, tasaReferencia) => {
    let mensajeError = "";
    let mensajeCorrecto = "";
    if (!((nuevaTasaPorcentaje / 100) >= 0 && (nuevaTasaPorcentaje / 100) <= 1)) {
        mensajeError = `Por favor, en el rango de 0 (cero) a 100(cien), ingrese el valor de la tasa de refencia, correspondiente a la Tasa Nominal Anual (TNA)`   
    } else {          
        if ((nuevaTasaDescripcion.trim != "") && (nuevaTasaPorcentaje>0 && nuevaTasaPorcentaje<=100)) {
            tasaReferencia.push({
                descripcion: nuevaTasaDescripcion,
                valor: (nuevaTasaPorcentaje / 100)
            })
            mensajeCorrecto = "Perfecto, la tasa se creo correctamente";
            document.getElementById("nueva-tasa-number").value = 0;
            document.getElementById("nueva-tasa-text").value = "";
            limpiarCombo();
            llenarCombo("tasas-select",tasasInversion);   
        } else {
            mensajeError = `Por favor, verifique los valores ingresados`;
        }
    }
    if (mensajeError.trim() != "") {
        let classEvento = "parrafo-secundario-error";
        datosResultados = document.getElementById("resultado-tasas");
        datosResultados.innerHTML = `<div class=${classEvento}>` + mensajeError;
    } else if (mensajeCorrecto.trim() != "") {
        let classEvento = "parrafo-secundario";
        datosResultados = document.getElementById("resultado-tasas");
        datosResultados.innerHTML = `<div class=${classEvento}>` + mensajeCorrecto;
    }
}

let eliminarTasa = (tasaReferencia, textoEliminar) => {
    let mensajeError = "";
    let mensajeCorrecto = "";
    let contadorBorrado = 0;
    //necesito una tasa para poder simular
    if (tasaReferencia.length<=1) {
        mensajeError = `No se puede eliminar la tasa, se necesita una tasa para la simulación`;
    } else {
        index = tasaReferencia.findIndex(i => i.descripcion === textoEliminar)
        //si existe, o sea, es distinto a -1, lo borro con splice
        if (index != -1) {
            tasaReferencia.splice(index, 1)
            contadorBorrado++
        }
        if (contadorBorrado > 0) {
            mensajeCorrecto = "Perfecto, la tasa se borro correctamente";
            limpiarCombo();
            llenarCombo("tasas-select",tasasInversion); 
        } else {
            mensajeError = "No se encontró la tasa a borrar";
        }
        }

    if (mensajeError.trim() != "") {
        let classEvento = "parrafo-secundario-error";
        datosResultados = document.getElementById("resultado-tasas");
        datosResultados.innerHTML = `<div class=${classEvento}>` + mensajeError;
    } else if (mensajeCorrecto.trim() != "") {
        let classEvento = "parrafo-secundario";
        datosResultados = document.getElementById("resultado-tasas");
        datosResultados.innerHTML = `<div class=${classEvento}>` + mensajeCorrecto;
    }
}

//busco en localStorage el objeto y hago un parse para que Javascript me devuelva un objeto
//eso es porque si guardo el nombre, brindo una mejor experiencia al inicio nuevamente
let usurioLocalStorage = JSON.parse(localStorage.getItem("usuario"))

if (usurioLocalStorage) { //Si Nombre tiene contenido, entonces lo muestro
    let usuario = new Usuario(usurioLocalStorage.nombre)
    asignarValoresInputs(usuario)
} else {
    let usuario = new Usuario('')
    asignarValoresInputs(usuario)
}

//para completar el combobox de tasas de intereses
llenarCombo("tasas-select",tasasInversion);


function asignarValoresInputs(usuario) {
    if (usuario.nombre != '') {
        document.getElementById("bienvenida").innerHTML = `Bienvenido ${usuario.nombre}, nos alegra volverte a ver, para ayudarte a elegir la mejor manera de financiar tus gastos`
        document.getElementById("impNomPersona").value = usuario.nombre
        document.getElementById("impCheckDatos").checked = true;
    }
}

function grabarStorage() {
    let nomPersona = document.getElementById("impNomPersona").value
    let checkDatos = document.getElementById("impCheckDatos").checked;
    localStorage.setItem("usuario", JSON.stringify({
        nombre: nomPersona
    }))    
}

function borrarStorage() {
    localStorage.removeItem("usuario")    
}

//desgrabado de los datos, si destilda el recordar
function almacenamientoDatos() {
    if (document.getElementById("impCheckDatos").checked) {
        grabarStorage(); 
    } else {
        borrarStorage();
    }
}

document.getElementById("impCheckDatos").addEventListener('change', almacenamientoDatos)

let botonEliminarTasa = document.getElementById("btn-eliminar-tasa");
botonEliminarTasa.addEventListener("click", () => {
    //recupero valor del combo    
    let combo = document.getElementById("tasas-select");  
    let valorEliminar = combo.value; //El valor seleccionado
    let textoEliminar = combo.options[combo.selectedIndex].innerText; //El texto de la opción seleccionada
    eliminarTasa(tasasInversion, textoEliminar);
})

let botonAgregarTasa = document.getElementById("btn-agregar-tasa");
botonAgregarTasa.addEventListener("click", () => {
    let tasaNum = Number(document.getElementById("nueva-tasa-number").value);
    let tasaText = document.getElementById("nueva-tasa-text").value;
    nuevaTasa(tasaNum, tasaText, tasasInversion);
})

let simulaForm = document.getElementById("form-simulacion");
simulaForm.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
    e.preventDefault();
    datos(e);
    //grabado de los datos, si pone recordar
    let checkDatos = document.getElementById("impCheckDatos".value)
    if (document.getElementById("impCheckDatos").checked) {
         grabarStorage() 
     }
}

function datos(e) {
    let mensajeError = ""
    //inicializo en vacío donde iría la carga del resultado
    let datosResultados = document.getElementById("resultado-simulacion");
    datosResultados.innerHTML = '';

    nombre = e.srcElement[0].value;
    if (nombre.trim() != "") {
        //casteo el numero de la eleccion, se debe elegir una de las opciones para continuar
        eleccion = Number(e.srcElement[1].value);
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
            nombrePlan = e.srcElement[2].value;
            if (nombrePlan.trim() == "") {
                mensajeError = `Necesitamos un poco más de información ¿Cómo llamarías a tu plan de la categoría: ${eleccionLetras}?`
            } else {
                //validacion de monto, por defecto el programa funcionara si el valor es entre 1000 y 2 millones, de lo contrario no continua
                //se establece el supuesto que mayor a 2 millones debe contratar un plan personalizado que no se plantea es esta etapa
                montoGasto = Number(e.srcElement[3].value);
                if (typeof (montoGasto) != "number") {
                    mensajeError = "Ingrese un valor de tipo numerico";
                } else if (montoGasto >= 1000 && montoGasto <= 2000000) {
                    //puedo trabajar en el asesoramiento
                    cantidadCuotas = Number(e.srcElement[4].value);
                    switch (cantidadCuotas) {
                        case 1:
                            eleccionCuotas = "1 Cuota";
                            break;
                        case 2:
                            eleccionCuotas = "6 Cuotas";
                            break;
                        case 3:
                            eleccionCuotas = "12 Cuotas";
                            break;
                        default:
                            mensajeError = "Cantidad de cuotas incorrecta, por favor seleciona entre las opciones correctas";
                            break;
                    }
                    if (cantidadCuotas >= 1 && cantidadCuotas <= 3) {
                        //"Perfecto, vamos a ayudarte en tu plan " + eleccionLetras + " de nombre " + nombrePlan + " por un total de " + montoGasto.toString() + " y en " + eleccionCuotas
                        //cargo la informacion y creo el plan, podría crear varios, estilo carrito de compras y calcular varios planes y un plan general.
                        planes.push(new Plan(nombre, eleccion, montoGasto, cantidadCuotas));
                        //procedo a calcular
                        calcular();
                    }
                } else {
                    let esMayor = (montoGasto > 2000000)
                    if (esMayor) {
                        mensajeError = "Lamentamos no poder ayudarte, estamos trabajando para lograr asesorarte en montos grandes de dinero, superiores a 2 millones";
                    } else if (montoGasto == 0) {
                        mensajeError = "Por favor, ingresá un monto del gasto, para que podamos ayudarte";
                    } else {
                        mensajeError = "Lamentamos no poder ayudarte, el monto es menor a $1000" + "\nRecorda que podemos ayudarte en valores mayores o iguales a 1000 y menor o igual a 2 millones";
                    }
                }
            }
        } else {
            mensajeError = "Por favor, selecciona el deseo financiero, para que te podamos ayudarte";
        }
    } else if (nombre.trim() == "") {
        mensajeError = "Por favor, ingresa un nombre válido para continuar";
    } else {
        mensajeError = "Seleccionaste una opción incorrecta, por lo que no podemos ayudarte";
    }
    if (mensajeError.trim() != "") {
        let classEvento = "parrafo-secundario-error";
        datosResultados = document.getElementById("resultado-simulacion");
        datosResultados.innerHTML = `<div class=${classEvento}>` + mensajeError;
    }
}