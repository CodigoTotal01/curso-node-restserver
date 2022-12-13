const { response } = require("express");
const { ObjectId } = require("mongoose").Types;


const { Usuario, Categoria, Producto } = require('../models');
const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuarios = async (termino = '', res = response) => {
    //termino debe ser un mongo id 
    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
        const usuario = await Usuario.findById(termino); 
        return res.json({ //retornara un null, porque ahora n oirve null porque eso sigue siendo un elmentos :0
            result: (usuario)? [usuario] : []
        })
    }

    //busquedas insencibles 
    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find(//operadores propios sde mongo 
    {
        $or: [{nombre: regex}, { correo: regex}],
        $and: [{estado: true}]
    }
        
    ); //buqueda por nombre y no por id -> literal laso le pass solo una parte del contenid oy no le interesa si es mayucula o minuscula
    
    return res.json({ //retornara un null, porque ahora n oirve null porque eso sigue siendo un elmentos :0
        result: (usuarios)? [usuarios] : [] 
    })
}


//?categorias
const buscarCategorias = async (termino = '', res = response) => {
    //termino debe ser un mongo id 
    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
        const categoria = await Categoria.findById(termino); 
        return res.json({ //retornara un null, porque ahora n oirve null porque eso sigue siendo un elmentos :0
            result: (categoria)? [categoria] : []
        })
    }

    //busquedas insencibles 
    const regex = new RegExp(termino, 'i');

    const categorias = await Categoria.find(//operadores propios sde mongo 
    {
        $or: [{nombre: regex}],
        $and: [{estado: true}]
    }
        
    ); //buqueda por nombre y no por id -> literal laso le pass solo una parte del contenid oy no le interesa si es mayucula o minuscula
    
    return res.json({ //retornara un null, porque ahora n oirve null porque eso sigue siendo un elmentos :0
        result: (categorias)? [categorias] : [] 
    })
}

//?categorias
const buscarProductos = async (termino = '', res = response) => {
    //termino debe ser un mongo id 
    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
        const producto = await Producto.findById(termino)
        .populate('categoria', 'nombre');
        return res.json({ //retornara un null, porque ahora n oirve null porque eso sigue siendo un elmentos :0
            result: (producto)? [producto] : []
        })
    }

    //busquedas insencibles 
    const regex = new RegExp(termino, 'i');

    const productos = await Producto.find(//operadores propios sde mongo 
    {
        $or: [{nombre: regex}],
        $and: [{estado: true}]
    }
        
    ).populate('categoria', 'nombre'); //buqueda por nombre y no por id -> literal laso le pass solo una parte del contenid oy no le interesa si es mayucula o minuscula
    
    return res.json({ //retornara un null, porque ahora n oirve null porque eso sigue siendo un elmentos :0
        result: (productos)? [productos] : [] 
    })
}
const buscar = ( req, res = response ) => {
    
    const { coleccion, termino  } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
        break;
        case 'categorias':
            buscarCategorias(termino, res);
        break;
        case 'productos':
            buscarProductos(termino, res);
        break;

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsquda'
            })
    }

}


module.exports = {
    buscar
}