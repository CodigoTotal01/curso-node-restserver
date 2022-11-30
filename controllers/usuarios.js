//solo para controladores -< crear funciones 

const { response, request } = require("express") //para tener la informacion del atribuyto response 

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

const usuariosPost = (req, res) => {
    const { nombre, edad } = req.body; //* asi ignoramos el resto que nos envie el usuario
    //created 201
    res.status(201).json({
        nombre,
        edad,
        
    })
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
