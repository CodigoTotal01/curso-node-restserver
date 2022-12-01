//solo para controladores -< crear funciones 
//!en los controlllers -> base de datos 
const { response, request } = require("express") //para tener la informacion del atribuyto response 
const Usuario = require('../models/usuario') // entity > mongoose
const bcryptjs = require('bcryptjs') // para encriptar contraseñas

//obtener los errores dgenerleles del middleware

const usuariosGet = (req = request, res = response) => {
    const {q, nombre, apikey} = req.query;


    
    //res.send('Hello World') html
    res.status(403).json({ //considerar stus de error
        ok: true,
        nombre,
        q,
        apikey
    })
}

//ren los post ala data se envia en la data 
const usuariosPost = async(req, res) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //verificar correo existente 
    const existeEmail = await Usuario.findOne({correo});

    if(existeEmail){
        return res.status(400).json({
            msg: "Ese correo ya esta registrado"
        }); 
        
        // si es igual que el controlador no diga
    }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosDelete = (req, res) => {
    //created 201
    res.status(201).json({
        nombre: 'Palacios'
    })
}


const usuariosPut = (req, res) => {
    //created 201
    const id = req.params.id;
    const { nombre, edad } = req.body; //* asi ignoramos el resto que nos envie el usuario
    //created 201
    res.status(201).json({
        nombre,
        edad,
        id
    })
}


const usuariosPatch = (req, res) => {
       //created 201
       const id = req.params.id;
       const { nombre, edad } = req.body; //* asi ignoramos el resto que nos envie el usuario
       //created 201
       res.status(201).json({
           nombre,
           edad,
           id,
        estado: "Eliminar"
       })
}

module.exports = { //solo son referencias

    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,

}
