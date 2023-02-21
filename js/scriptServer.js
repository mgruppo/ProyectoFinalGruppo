const grabarDatosServer = async (user) => {
    document.getElementById("loader").style.display = "";
    document.getElementById("main").style.display = "none";
    

    
    const resp = await fetch('https://api.fabianjanuszewski.com/34165/user/', {
        method: 'POST',
        body: JSON.stringify({
            userId: student+user.nombre,
            planes: user.planes,
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
    }
    document.getElementById("loader").style.display = "none";
    document.getElementById("main").style.display = "";
    return data
}

document.getElementById("traerUsuario").addEventListener("click", () => {
    let nomPersona = student+document.getElementById("impNomPersona").value
    //console.log(nomPersona)
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
    console.log(data);
    console.log(data.userId.slice(student.length,data.userId.length));
    let usuario = new Usuario(data.userId.slice(student.length,data.userId.length));
    usuario.setPlanesUsuario(data.planes);
    
    asignarValoresAlosInputs(usuario)
    document.getElementById("loader").style.display = "none";
    document.getElementById("main").style.display = "";
}


function asignarValoresAlosInputs(usuario) {
    console.log(usuario);
}


const actualizarUsuario = async (user) => {
    document.getElementById("loader").style.display = "";
    document.getElementById("main").style.display = "none";
    const resp = await fetch('https://api.fabianjanuszewski.com/34165/user/', {
        method: 'PUT',
        body: JSON.stringify({
            userId: user.userId,
            planes: user.planes
        })
    })
    const data = await resp.json()
    if (resp.ok) {
        mostrarMensaje({
            titulo: "¡Usuario actualizado con exito!",
            comentario: `El usuario ${user.userId} fue actualizado con exito`,
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

// document.getElementById("actualizarUsuario").addEventListener("click", () => {
//     let nomPersona = student+document.getElementById("impNomPersona").value
//     console.log(nomPersona)
//     actualizarUsuario({
//         userId: document.getElementById("inputNombre").value
//     })
// });

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