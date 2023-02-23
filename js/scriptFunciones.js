//funciones
//como el calculo de interes es igual, se utiliza para gasto, como para ganancia
let interes = (importe, interes, cantidadMeses) => {
    let valorResultado = 0
    for (let i = 1; i <= cantidadMeses; i++) {
        valorResultado += (importe * (interes / 12))
    }
    return valorResultado
}

//para calcular si la ganancia es mayor que la inflacion
function mayorQue(n) {
    return (m) => m > n
}
//si con la ganancia de los intereses le gano a la inflacion
let mayorQueInflacion = mayorQue(inflacion)

let llenarCombo = (elementoID, arrayReferencia) => {
    let select = document.getElementById(elementoID);
    for (let index = 0; index < arrayReferencia.length; index++) {
        let option = document.createElement("option");
        option.value = arrayReferencia[index].valor;
        option.innerText = arrayReferencia[index].descripcion;
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
    valorCondicion == true ? mensaje += `\nCon esta inversión además, <span>le estás ganando a la inflación</span> proyectada del año que es del <span>` + (inflacion * 100) + `%</span>. <span>Excelente noticia!!</span>` : mensaje += `\nCon esta inversión, <span>No le estás ganando a la inflación</span> proyectada del año que es del <span>` + (inflacion * 100) + `%</span>, <span>pero te das un gusto :D</span>`

    informe(mensaje);
}

let informe = (mensajeFinal) => {
    let mensajeDia = "";
    const hoy = new Date();
    const hoyDia = hoy.getDay(hoy);
    let diaAptoInversion = dias.find((dia) => dia.valor === hoyDia);
    if (diaAptoInversion.inversion == true) {
        mensajeDia = `Recorda que hoy es <span>` + diaAptoInversion.descripcion + `</span> y es un <span> día hábil </span> para invertir tu dinero`;
    } else {
        mensajeDia = `Recorda que hoy es <span>` + diaAptoInversion.descripcion + `</span> y <span> No podes invertir tu dinero </span>, agenda la inversión para el próximo día hábil`;
    }
    if (mensajeFinal.trim() != "") {
        let classEvento = "parrafo-secundario";
        datosResultados = document.getElementById("resultado-simulacion");
        datosResultados.innerHTML = `<div class=${classEvento}>` + mensajeFinal + `<div class=${classEvento}>` + mensajeDia;

    }
}

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
        if ((nuevaTasaDescripcion.trim != "") && (nuevaTasaPorcentaje > 0 && nuevaTasaPorcentaje <= 100)) {
            tasaReferencia.push({
                descripcion: nuevaTasaDescripcion,
                valor: (nuevaTasaPorcentaje / 100)
            })
            mensajeCorrecto = "Perfecto, la tasa se creo correctamente";
            document.getElementById("nueva-tasa-number").value = 0;
            document.getElementById("nueva-tasa-text").value = "";
            limpiarCombo();
            llenarCombo("tasas-select", tasasInversion);
        } else {
            mensajeError = `Por favor, verifique los valores ingresados`;
        }
    }
    if (mensajeError.trim() != "") {
        let classEvento = "parrafo-secundario-error";
        datosResultados = document.getElementById("resultado-tasas");
        datosResultados.innerHTML = `<div class=${classEvento}>` + mensajeError;
        mensajeAlerta("Controle los errores", false);
    } else if (mensajeCorrecto.trim() != "") {
        let classEvento = "parrafo-secundario";
        datosResultados = document.getElementById("resultado-tasas");
        datosResultados.innerHTML = `<div class=${classEvento}>` + mensajeCorrecto;
        mensajeAlerta("Tasa creada", true);
    }
}

let eliminarTasa = (tasaReferencia, textoEliminar) => {
    let mensajeError = "";
    let mensajeCorrecto = "";
    let contadorBorrado = 0;
    if (tasaReferencia.length <= 1) {
        mensajeError = `No se puede eliminar la tasa, se necesita una tasa para la simulación`;
    } else {
        index = tasaReferencia.findIndex(i => i.descripcion === textoEliminar)
        if (index != -1) {
            tasaReferencia.splice(index, 1)
            contadorBorrado++
        }
        if (contadorBorrado > 0) {
            mensajeCorrecto = "Perfecto, la tasa se borro correctamente";
            limpiarCombo();
            llenarCombo("tasas-select", tasasInversion);
        } else {
            mensajeError = "No se encontró la tasa a borrar";
        }
    }

    if (mensajeError.trim() != "") {
        let classEvento = "parrafo-secundario-error";
        datosResultados = document.getElementById("resultado-tasas");
        datosResultados.innerHTML = `<div class=${classEvento}>` + mensajeError;
        mensajeAlerta("Error al eliminar la tasa", false);
    } else if (mensajeCorrecto.trim() != "") {
        let classEvento = "parrafo-secundario";
        datosResultados = document.getElementById("resultado-tasas");
        datosResultados.innerHTML = `<div class=${classEvento}>` + mensajeCorrecto;
        mensajeAlerta("Tasa eliminada", true);
    }
}

let mensajeAlerta = (textoMensaje, estado) => {
    let colorFondo = "linear-gradient(to right, #eb0000, #e50026, #dc003b, #ce004c, #be005a)";
    estado == true && (colorFondo = "linear-gradient(to right top, #06c698, #00c49e, #00c2a4, #00c0a9, #00bead)");
    Toastify({
        text: textoMensaje,
        duration: 3000,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: colorFondo
        }
    }).showToast();
}

function mostrarMensaje(mensaje) {
    Swal.fire({
        title: mensaje.titulo,
        text: mensaje.comentario,
        icon: mensaje.icono,
        showCancelButton: false,
        showConfirmButton: true
    })
}

function asignarValoresInputs(usuario) {
    if (usuario.nombre != '') {
        document.getElementById("bienvenida").innerHTML = `Bienvenido ${usuario.nombre}, nos alegra volverte a ver, para ayudarte a elegir la mejor manera de financiar tus gastos`
        document.getElementById("impNomPersona").value = usuario.nombre
        document.getElementById("impCheckDatos").checked = true;
        tasasInversion = JSON.parse(localStorage.getItem("tasasInversion"));
    }
}

function grabarStorage() {
    let nomPersona = document.getElementById("impNomPersona").value
    localStorage.setItem("usuario", JSON.stringify({
        nombre: nomPersona
    }))
    //grabo ademas las tasas que utiliza, para mantener las opciones que trabaja
    localStorage.setItem("tasasInversion", JSON.stringify(tasasInversion));
}

let grabarServer = () => {
    //grabo datos en el server
    let nomPersona = document.getElementById("impNomPersona").value
    let usuario = new Usuario(nomPersona);
    usuario.setPlanesUsuario(planes);
    grabarDatosServer(usuario);
}

function borrarStorage() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("tasasInversion");
    document.getElementById("bienvenida").innerHTML = `Bienvenido, te ayudamos a elegir la mejor manera de financiar tus gastos`
}

//desgrabado de los datos, si destilda el recordar
function almacenamientoDatos() {
    if (document.getElementById("impCheckDatos").checked) {
        grabarStorage();
    } else {
        borrarStorage();
    }
}

function validarFormulario(e) {
    e.preventDefault();
    datos(e);
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
                        planes.push(new Plan(nombre, eleccion, nombrePlan, montoGasto, cantidadCuotas));
                        calcular();
                        if (document.getElementById("impCheckDatos").checked) {
                            //almaceno los datos de tasa y usuario en local
                            grabarStorage()
                            //grabo la simulacion en el servidor con el usuario
                            grabarServer()
                        }
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
        mensajeAlerta("El simulador, necesita más datos", false);
    }
}

let asignarValoresPlan = (usuario) => {
    for (let index = 0; index < usuario.planesUsuario.length; index++) {
        item = usuario.planesUsuario[index];
        document.getElementById("impSelDeseo").value = item.tipo;
        document.getElementById("impNomPlan").value = item.deseo
        document.getElementById("impPrecioPlan").value = item.monto;
        document.getElementById("impSelCantCuotas").value = item.financiacion;
    }
}