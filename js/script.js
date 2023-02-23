/*Para la entrega final, y como idea de proyecto, se trabaja bajo la necesidad de contar con una plataforma
que dependiendo la elección de gasto que la persona desea realizar,
la plataforma le recomienda posibilidades de pagar con tarjeta, en una cuota o más o elegir invertir en un fondo común de inversión*/

//creo clase para definir el plan
class Plan {
    //nombre del plan
    //tipo: 1 para Viaje, 2 para Electronica, 3 para Ropa, 4 para Otro
    //monto: importe
    //financiacion: 1 para 1 cuota sin interes, 2 para 6 cuotas con un interes, 3 para 12 cuotas
    constructor(nombre, tipo, deseo, monto, financiacion) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.deseo = deseo;
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
        this.planesUsuario = [];
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
    setPlanesUsuario(planesUsuario) {
        this.planesUsuario = planesUsuario;
        return this.planesUsuario
    }
}

document.getElementById("loader").style.display = "none";

//busco en localStorage el objeto y hago un parse para que Javascript me devuelva un objeto
//eso es porque si guardo el nombre, brindo una mejor experiencia al inicio nuevamente
let usurioLocalStorage = JSON.parse(localStorage.getItem("usuario"))

if (usurioLocalStorage) {
    let usuario = new Usuario(usurioLocalStorage.nombre)
    asignarValoresInputs(usuario)
} else {
    let usuario = new Usuario('')
    asignarValoresInputs(usuario)
}

llenarCombo("tasas-select", tasasInversion);

document.getElementById("impCheckDatos").addEventListener('change', almacenamientoDatos)

let botonEliminarTasa = document.getElementById("btn-eliminar-tasa");
botonEliminarTasa.addEventListener("click", () => {
    let combo = document.getElementById("tasas-select");
    let valorEliminar = combo.value;
    let textoEliminar = combo.options[combo.selectedIndex].innerText;
    //utilizo sweetalert2 como mensaje para validar
    Swal.fire({
        title: 'Está seguro de borrar la tasa de nombre ' + textoEliminar + '?',
        text: "Una vez eliminada, no se puede recuperar la acción",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#7c95b8',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar!'
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarTasa(tasasInversion, textoEliminar);
        }
    })
})

let botonAgregarTasa = document.getElementById("btn-agregar-tasa");
botonAgregarTasa.addEventListener("click", () => {
    let tasaNum = Number(document.getElementById("nueva-tasa-number").value);
    let tasaText = document.getElementById("nueva-tasa-text").value;
    //utilizo sweetalert2 como mensaje para validar
    Swal.fire({
        title: 'Está seguro de crear la tasa?',
        text: "La tasa se utilizará en próximas simulaciones",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#7c95b8',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, agregar!'
    }).then((result) => {
        if (result.isConfirmed) {
            nuevaTasa(tasaNum, tasaText, tasasInversion);
        }
    })
})

document.getElementById("btn-traer-ultima-simulacion").addEventListener("click", () => {
    if (document.getElementById("impNomPersona").value.trim() != "") {
        let nomPersona = student + document.getElementById("impNomPersona").value
        buscarUsuario(nomPersona)
    } else {
        mensajeAlerta("Debe ingresar un nombre en el formulario", false);
    }
});

document.getElementById("btn-borrar-ultima-simulacion").addEventListener("click", () => {
    if (document.getElementById("impNomPersona").value.trim() != "") {
        let nomPersona = student + document.getElementById("impNomPersona").value
        deleteUsuario(nomPersona);
        borrarStorage();
        document.getElementById('form-simulacion').reset();
    } else {
        mensajeAlerta("Debe ingresar un nombre en el formulario", false);
    }
})

let simulaForm = document.getElementById("form-simulacion");
simulaForm.addEventListener("submit", validarFormulario);
