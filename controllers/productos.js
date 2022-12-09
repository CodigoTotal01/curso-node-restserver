const { response, request } = require("express");

const Producto = require("../models/producto");



const obtenerProductos = async (req = request, res = response) => {


    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [productos, total] = await Promise.all(
        [
            Producto.find(query)
                .populate('usuario', 'nombre')
                .populate('categoria', 'categoria')
                // basicamente populate se encarga de tomar el id de un 
                .skip(parseInt(desde)).limit(parseInt(limite)), //categorias
            Producto.countDocuments() // contiene la cantidad de categorias, todas
        ]
    );


    res.json({
        productos,
        total
    })
}

// producto 
const crearProducto = async (req = request, res = response) => {
    const { precio, categoria, descripcion } = req.body;
    const nombre = req.body.nombre.toUpperCase();

    //preguntando si ya existe elprocudto 

    const productoDB = await Producto.findOne({ nombre });

    if (productoDB) {
        return res.status(400).json(
            {
                msg: `La Productos ${productoDB.nombre}, ya esta registrado ❤`
            }
        )
    }



    const data = {
        nombre,
        usuario: req.usuario._id,
        precio,
        categoria, //categoria id 
        descripcion,
    }

    console.log("la data generada de los productos: " + data);

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json({
        producto
    })
}

const actualizarProducto = async (req = request, res = response) => {       
    const {id} = req.params;
    const {estado, disponible, ...data} = req.body;
    
    data.nombre = data.nombre.toUpperCase();

    data.usuario= req.usuario._id; // asi se guarda en mongo db 


    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});

    res.json({
        producto
    })

}


//exportar los metoods que maejan los controladores


//eliminar cambiar el estado


const borrarProducto =  async (req = request, res = response) => {  
    const {id} = req.params;
    const usuarioAutenticado= req.usuario; //jwt

    //recuerda que solo debemos cambiar el estado
    const producto = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.status(201).json({
        usuarioAutenticado,
        producto
    })
    
}

module.exports = {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    borrarProducto
}