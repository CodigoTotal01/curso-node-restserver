const { response, request } = require("express");
const Categoria = require("../models/categoria");

//? Crear categoria
const crearCategoria = async (req, res = response) => {

    console.log(req.body)
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });



    if (categoriaDB) {
        return res.status(400).json
            ({
                msg: `La categoria ${categoriaDB.nombre}, ya existe`
            })
    }

    //generar data a guardar 
    const data = {
        nombre,
        usuario: req.usuario._id,
        

    }

    console.log(data);

    const categoria = new Categoria(data); // generar un objeto apartir de neustro modelo
    await categoria.save(); // esperamos que se agrege nuestro modelo a neustra base de datos 


    res.status(201).json({
        categoria
    })
}


//? obtener listado de categorias
const obtenerCategorias = async(req = request, res = response) => {
    //Obteniendo datos del parametro -> query
    const {limite= 5, desde = 0 } = req.query; //! palabras dentro de ruta 
    const query = {estado : true}; // Obtener todos las catetegorias disponibles


    //Promise All -> ejecutar promesas de forma asyncrona -> cuando ambas terminen esta obtendra todos los datos 

    const [categorias, total] = await Promise.all(
        [
            Categoria.find(query).skip(parseInt(desde)).limit(parseInt(limite)), //categorias
            Categoria.countDocuments() // contiene la cantidad de categorias, todas
        ]
    );



    res.json({
        categorias,
        total
    });



}
//? obtener categoregoria opor id
const obtenerCategoriaPorId = async(req = request, res = response) =>  {
    //! solo valores -> req.params //parametros 
    //destructurar 
    const {id} = req.params; // para parametros -> objeto -> 
    const categoria = await Categoria.findById(id);

    res.json({
        categoria
    });
}


//? actualiar un producto -> ID y body

const actualizarCategoria = async(req = request, res = response) => {
    const {id} = req.params;

    const {_id, nombre, usuario, ...resto } = req.body; //formato json -> lo enviamos 


    const categoria = await Categoria.findByIdAndUpdate(id,  {nombre, usuario})


    res.json({
        categoria
    });
}



//?eliminar categoria
const borrarCategoria = async(req = request, res = response) => {
    //obtener id del prametro 
        const {id} = req.params;

        const usuarioAutenticado = req.usuario; // solo para conmpraibar que el usuario a sido comprobado atravez del tokej }

        const categoria = await Categoria.findByIdAndUpdate(id, {estado: false});

        res.status(201).json({
            usuarioAutenticado,
            categoria
        })
}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaPorId,
    actualizarCategoria,
    borrarCategoria
}