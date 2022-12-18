class Mensaje {
    constructor( uid, nombre, mensaje ) {
        this.uid     = uid;
        this.nombre  = nombre;
        this.mensaje = mensaje;
    }
}


class ChatMensajes {

    constructor() {
        this.mensajes = []; //obtiene arreglo de mensajes
        this.usuarios = {};
    }

    //obtener los ultimos 10 mensajes
    get ultimos10() {
        this.mensajes = this.mensajes.splice(0,10);
        return this.mensajes;
    }

    get usuariosArr() {
        return Object.values( this.usuarios ); // [ {}, {}, {}] //obtener el arreglo de usuarios como objetos de usuario
    }

    //enviar mensaje del cliente
    enviarMensaje( uid, nombre, mensaje ) {
        this.mensajes.unshift( //agregar al INICIO
            new Mensaje(uid, nombre, mensaje)
        );
    }

    conectarUsuario( usuario ) {
        //el id seteado a la hora de indicar la posciion tambien sirve para simplemente mostrar el indicador -> es decir sera por quien se reconosoca el contenido del usuario
        this.usuarios[usuario.id] = usuario

    }

    desconectarUsuario( id ) {
        delete this.usuarios[id]; //https://bytearcher.com/articles/how-to-delete-value-from-array/
    }

}

module.exports = ChatMensajes;