const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers/generar-jwt");
const {ChatMensajes} = require("../models");


const chatMensajes = new ChatMensajes();

//metodo flecha que se emlpea para la configuracion del socket
//io es el servidor del socket


//io sala glbal _> se une a una sala con su propio socket id 
const socketController = async (socket = new Socket, io ) => {
    //token enviado desde el cliente hacia el backserver
    const token = socket.handshake.headers['x-token'];
    const usuario = await comprobarJWT(token);
    if(!usuario){ //false or null
        return socket.disconnect(); //mandarlo lejos de neustra aplciacion 
    }
//Agregar al usuario conectado
    chatMensajes.conectarUsuario(usuario);
    io.emit('usuarios-activos', chatMensajes.usuariosArr); //tenemos arreglo de usuarios
    socket.emit('recibir-mensajes', chatMensajes.ultimos10); //tenemos arreglo de usuarios

    //! Conectar lo a una sala especial 
    console.log(usuario.id)
    socket.join(usuario.id); //glovbal, socket.id. y ahora por el usuario .id





    //limpiar cuando alguien se desconecta
    socket.on('disconnect', ()=> {
        chatMensajes.desconectarUsuario(usuario.id); // l oquitamos del arreglo
        io.emit('usuarios-activos', chatMensajes.usuariosArr); //tenemos arreglo de usuarios
    })

    //enviar mensajes
    socket.on('enviar-mensaje', ({uid, mensaje})=> {
        console.log(uid)
        //uid es mensaje privado
        if(uid){
                socket.to(uid).emit('mensaje-privado', {de: usuario.nombre, mensaje});
        }else {
            chatMensajes.enviarMensaje(usuario.uid, usuario.nombre, mensaje);
            //enviar mensaje a todo el mundo 
            io.emit('recibir-mensajes', chatMensajes.ultimos10); //retorna arreglo de mensajes 

        }

    })
    

}

module.exports = {
    socketController
}