const grabarDatosServer = async (user) => {
    document.getElementById("loader").style.display = "";
    document.getElementById("main").style.display = "none";
    const resp = await fetch('https://api.fabianjanuszewski.com/34165/user/', {
        method: 'POST',
        body: JSON.stringify({
            userId: student + user.nombre,
            planes: user.planesUsuario,
        })
    })
    const data = await resp.json()
    if (resp.ok) {
        mostrarMensaje({
            titulo: "¡Simulación Correcta!",
            comentario: `Además, guardamos la simulación del usuario ${user.nombre} para otra oportunidad`,
            icono: "success"
        })
    } else {
        actualizarUsuario(user);
    }
    document.getElementById("loader").style.display = "none";
    document.getElementById("main").style.display = "";
    return data
}

const buscarUsuario = async (userId) => {
    document.getElementById("loader").style.display = "";
    document.getElementById("main").style.display = "none";
    const resp = await fetch(`https://api.fabianjanuszewski.com/34165/user/${userId}`)
    const data = await resp.json()
    if (!resp.ok) {
        mostrarMensaje({
            titulo: "¡No existe simulación, para el usuario!",
            comentario: `respuesta del servidor: ${data.error.message}`,
            icono: "warning"
        })
        document.getElementById("loader").style.display = "none";
        document.getElementById("main").style.display = "";
        return
    }
    let usuario = new Usuario(data.userId.slice(student.length, data.userId.length));
    usuario.setPlanesUsuario(data.planes);
    asignarValoresPlan(usuario);
    document.getElementById("loader").style.display = "none";
    document.getElementById("main").style.display = "";
}

const actualizarUsuario = async (user) => {
    document.getElementById("loader").style.display = "";
    document.getElementById("main").style.display = "none";
    const resp = await fetch('https://api.fabianjanuszewski.com/34165/user/', {
        method: 'PUT',
        body: JSON.stringify({
            userId: student + user.nombre,
            planes: user.planesUsuario,
        })
    })
    const data = await resp.json()
    if (resp.ok) {
        mostrarMensaje({
            titulo: "¡Simulación Correcta!",
            comentario: `Además, actualizamos la simulación del usuario ${user.nombre} para otra oportunidad`,
            icono: "success"
        })
    } else {
        mostrarMensaje({
            titulo: "¡No se pudo actualizar la simulación!",
            comentario: `respuesta del servidor: ${data.error.message}`,
            icono: "error"
        })
    }
    document.getElementById("loader").style.display = "none";
    document.getElementById("main").style.display = "";
    return data
}

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
            comentario: `El usuario ${user.slice(student.length,user.length)} fue eliminado con exito`,
            icono: "success"
        })
    } else {
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