//solo para controladores -< crear funciones 
//!en los controlllers -> base de datos 
const { response, request } = require("express") //para tener la informacion del atribuyto response 
const Usuario = require('../models/usuario') // entity > mongoose
const bcryptjs = require('bcryptjs') // para encriptar contraseñas

//obtener los errores dgenerleles del middleware

const usuariosGet = async (req = request, res = response) => {
    //res.send('Hello World') html
    const { limite = 5, desde = 0 } = req.query; //todo lo que biene es un string
    const query = { estado: true }

    //Prmice all le pasamos todosas las promesas parauawe se ejecuten a la vez 
    const [usuarios, total] =await Promise.all( //igual el await -> para que cuando las dos promesas se cumplen recien se evie 
        
        [Usuario.find(query) // codigo bloqueante , hilos son independientes 
        .skip(parseInt(desde))
        .limit(parseInt(limite)),
        
        Usuario.countDocuments()])

    res.json({ //considerar stus de error
        usuarios,
        total
    })
}

//ren los post ala data se envia en la data 
const usuariosPost = async (req, res) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosDelete = async(req, res) => {
    const {id}=req.params
    //created 201

    //!pasado desde un middleware atravez del req
    //const uid = req.uid;

    const usuarioAutenticado = req.usuario;
    ///pero lo que nos interesa es el rol 

    //borrado fisico 
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false}); //recuerda que SI existe en este punto el usuario
    
    res.status(201).json({
        usuarioAutenticado,
        usuario
        
    })
}



//actualizar usuario
const usuariosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
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
