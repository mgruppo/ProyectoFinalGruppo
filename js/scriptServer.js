const grabarDatosServer = async (user) => {
    document.getElementById("loader").style.display = "";
    document.getElementById("main").style.display = "none";    
    const resp = await fetch('https://api.fabianjanuszewski.com/34165/user/', {
        method: 'POST',
        body: JSON.stringify({
            userId: student+user.nombre,
            planes: user.planesUsuario,
        })
    })
    const data = await resp.json()
    if (resp.ok) {
        mostrarMensaje({
            titulo: "¡Usuario grabado con exito!",
            comentario: `¡El usuario ${user.nombre} fue grabado con exito`,
            icono: "success"
        })
    } else {
        console.log(data)
        mostrarMensaje({
            titulo: "¡El usuario no fue grabado!",
            comentario: `respuesta del servidor: ${data.error.message}`,
            icono: "error"
        })
        actualizarUsuario(user);
    }
    document.getElementById("loader").style.display = "none";
    document.getElementById("main").style.display = "";
    return data
}

document.getElementById("traerUsuario").addEventListener("click", () => {
    let nomPersona = student+document.getElementById("impNomPersona").value
    console.log(nomPersona)
    buscarUsuario(nomPersona)
});

const buscarUsuario = async (userId) => {
    document.getElementById("loader").style.display = "";
    document.getElementById("main").style.display = "none";
    const resp = await fetch(`https://api.fabianjanuszewski.com/34165/user/${userId}`)
    const data = await resp.json()
    if (!resp.ok) {
        mostrarMensaje({
            titulo: "¡El usuario no existe!",
            comentario: `respuesta del servidor: ${data.error.message}`,
            icono: "warning"
        })
        document.getElementById("loader").style.display = "none";
        document.getElementById("main").style.display = "";
        return
    }
    //console.log(data);
    //console.log(data.userId.slice(student.length,data.userId.length));
    let usuario = new Usuario(data.userId.slice(student.length,data.userId.length));
    usuario.setPlanesUsuario(data.planes);
    asignarValoresAlosInputs(usuario)
    document.getElementById("loader").style.display = "none";
    document.getElementById("main").style.display = "";
}


function asignarValoresAlosInputs(usuario) {
    let table = document.getElementById("items-simulacion");
    for (let index = 0; index < usuario.planesUsuario.length; index++) {
        item = usuario.planesUsuario[index];
        let row = table.insertRow(1);
        row.setAttribute("id", `fila-${index}`)
        let deseo = row.insertCell(0);
        let nombre = row.insertCell(1);
        let monto = row.insertCell(2);
        let acciones = row.insertCell(3);
        deseo.innerHTML = nombreDeseo(Number(item.tipo));
        nombre.innerHTML = item.deseo;
        monto.innerHTML = item.monto;
        acciones.innerHTML = `<i id="cargar-${index}" class="large material-icons cargar-lista">reply_all</i>`
    }
}

let nombreDeseo = (eleccion) => {
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
            eleccionLetras = "Otra opción";
            break;
    }
    return eleccionLetras;
}

const actualizarUsuario = async (user) => {
    document.getElementById("loader").style.display = "";
    document.getElementById("main").style.display = "none";
    const resp = await fetch('https://api.fabianjanuszewski.com/34165/user/', {
        method: 'PUT',
        body: JSON.stringify({
            userId: student+user.nombre,
            planes: user.planesUsuario,
        })
    })
    const data = await resp.json()
    if (resp.ok) {
        mostrarMensaje({
            titulo: "¡Usuario actualizado con exito!",
            comentario: `El usuario ${user.nombre} fue actualizado con exito`,
            icono: "success"
        })
    } else {
        console.log(data)
        mostrarMensaje({
            titulo: "¡El usuario no fue actualizado!",
            comentario: `respuesta del servidor: ${data.error.message}`,
            icono: "error"
        })
    }
    document.getElementById("loader").style.display = "none";
    document.getElementById("main").style.display = "";
    return data
}

document.getElementById("actualizarUsuario").addEventListener("click", () => {
    let nomPersona = student+document.getElementById("impNomPersona").value
    console.log(nomPersona)

    //recibir el plan y actualizar en la persona
//    actualizarUsuario()
    


    actualizarUsuario({
        userId: document.getElementById("inputNombre").value
    })

    

});

const deleteUsuario = async (user) => {
    document.getElementById("loader").style.display = "";
    document.getElementById("main").style.display = "none";
    const resp = await fetch(`https://api.fabianjanuszewski.com/34165/user/${user}`, {
        method: 'DELETE'
    })
    const data = await resp.json()
    if (resp.ok) {
        mostrarMensaje({
            titulo: "¡Usuario eliminado con exito!",
            comentario: `El usuario ${user} fue eliminado con exito`,
            icono: "success"
        })
    } else {
        console.log(data)
        mostrarMensaje({
            titulo: "¡El usuario no fue eliminado!",
            comentario: `respuesta del servidor: ${data.error.message}`,
            icono: "error"
        })
    }
    document.getElementById("loader").style.display = "none";
    document.getElementById("main").style.display = "";
    return data
}
document.getElementById("deleteUsuario").addEventListener("click", () => {
    let nomPersona = student+document.getElementById("impNomPersona").value
    console.log(nomPersona)
    let usuario = new Usuario(nomPersona);
    deleteUsuario(nomPersona)
})

document.addEventListener("click", function(e){
    if(e.target.className.includes('cargar-lista')){
        const itemId = e.target.id.replace('cargar-', '')
        //const estado = deleteItem(itemId)
        console.log(itemId)
        console.log(itemId)

        // if(estado){
        //     document.getElementById(`fila-${itemId}`).remove()
        // }
    }
});