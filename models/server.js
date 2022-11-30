const express = require('express')
require('dotenv').config(); //dotenv
var cors = require('cors')

class Server{
    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosRoutePath ="/api/usuarios"

        //middelewares -> solo son funciones -> se ejecuta a la par del servidor
        this.middlewares();

        this.routes(); // para que cargue las rutas al iniciar
    }

    middlewares(){
         //cors
         this.app.use(cors());

        //lectura y pasrseao del body toda la informacion que bien la parsea a json
        this.app.use(express.json());

        //paralabra clase para indicar que es un middleware
        this.app.use(express.static('public')); //! prioridad
       
    }

    routes(){
        //pero mira el path sera como la ruta inicial, fijate en el nombre que se concatena con las nuevas rutas 
        this.app.use(this.usuariosRoutePath, require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo');
        })
    }



}


module.exports = Server;