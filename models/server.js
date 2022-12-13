const express = require('express')
require('dotenv').config(); //dotenv
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT;


        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar'
        }

        //conneccion con la base de datos
        this.conectarDB();
        //middelewares -> solo son funciones -> se ejecuta a la par del servidor
        this.middlewares();

        this.routes(); // para que cargue las rutas al iniciar
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //cors
        this.app.use(express.static('public')); //! prioridad
        this.app.use(cors());

        //lectura y pasrseao del body toda la informacion que bien la parsea a json
        this.app.use(express.json());

        //paralabra clase para indicar que es un middleware


    }

    routes() {
        //pero mira el path sera como la ruta inicial, fijate en el nombre que se concatena con las nuevas rutas 
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        //ruta -> categorias 
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        //ruta -> productos
        this.app.use(this.paths.productos, require('../routes/producto'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo');
        })
    }



}


module.exports = Server;