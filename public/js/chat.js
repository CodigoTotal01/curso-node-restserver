let usuario = null;
let socket = null;
var url = (window.location.hostname.includes('localhost')) ? 'http://localhost:8080/api/auth/' : 'http://localhostheroku:4200/api/auth/'

//elementos html
const textUid = document.querySelector('#textUid');
const textMensaje = document.querySelector('#textMensaje')
const ulUsuarios = document.querySelector('#ulUsuarios')
const ulMensajes = document.querySelector('#ulMensajes')
const btnSalir = document.querySelector('#btnSalir')




textMensaje.addEventListener('keyup', ({keyCode}) => {
    
    const mensaje  = textMensaje.value;
    const uid = textUid.value;
    console.log(mensaje)
    if (keyCode !== 13) {
        return
    }

    //cuando precione enter 

    if(mensaje.length === 0){
        return;
    }

    socket.emit('enviar-mensaje', {mensaje, uid});


})

const main = async () => {
    //validar jwt 
    await validarJWT();
}




//validar el token desde el localstorage
const validarJWT = async () => {

    const token = localStorage.getItem('token');

    if (token.length <= 10) {
        throw new Error('No hay token en el servidor');
    }


    const resp = await fetch(url, {
        headers: {
            'x-token': token
        }
    })

    const { usuario: userDB, token: tokenDB } = await resp.json();

    //Nueva vvida al token 
    localStorage.setItem('token', tokenDB)
    usuario = userDB;


    document.title = usuario.nombre;

    await conectarSocket();


}

//conectar el socket back 

const conectarSocket = async () => {
    socket = io({ //libreria para conectarnos con nuestro bakent server
        'extraHeaders': { //caera directamente en el controllador -> socket 
            'x-token': localStorage.getItem('token')
        }
    })
    //el clienteo socket se pondra a escuchar  meiusntras este coectado al backent server
    socket.on('connect', () => {
        console.log('Socket Online')
    })

    socket.on('disconnect', () => {
        console.log('Socket ofline')

    })

    //halbando al back

    socket.on('recibir-mensajes', (payload) => {
       dibujarMensajes(payload)
    })


    // socket.on('usuarios-activos', (payload) => {
    //     dibujarUsuarios(payload)
    // })
    const dibujarUsuarios = (usuarios = []) => {
        let userHtml = '';
        usuarios.forEach(({ nombre, uid }) => {
            userHtml += `
                    <li>
                           <p> 
                             <h5 class="text-success">${nombre}</h5>
                             <h5 class="fs-6 text.uted">${uid}</h5>

                           </p>
                                
                    </li>
                `
        })

        ulUsuarios.innerHTML = userHtml;
    }



    const dibujarMensajes = (mensajes = []) => {
        let mensajesHTML = '';
        mensajes.forEach(({mensaje, nombre}) => {
            mensajesHTML += `
                    <li>
                           <p> 
                             <span class="text-success">${nombre}</span>
                             <span>${mensaje}</span></span>

                           </p>
                                
                    </li>
                `
        })

        ulMensajes.innerHTML = mensajesHTML;
    }


    socket.on('usuarios-activos', dibujarUsuarios);

    socket.on('mensaje-privado', (payload) => {
        console.log("Privado: ", payload)
    })


}



main();

//const socket = io(); //para la coneccion de bakent server 
