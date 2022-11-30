const {Router} = require('express'); //isntacncia de rutas

const { usuariosGet,
        usuariosPost, 
        usuariosPut, 
        usuariosPatch, 
        usuariosDelete } = require('../controllers/usuarios');

const router = Router(); //a el se le configura las rutas 

router.get('/', usuariosGet)

router.post('/', usuariosPost)
//recibir del header, params
router.put('/:id', usuariosPut)

router.patch('/', usuariosPatch)
//queryparams
router.delete('/', usuariosDelete)

//! los mensajes de errores son para decirle que hizo algo mal el front
router.put('/', (req, res) => {
    //bad request
    res.status(400).json({//usarlo cuanod no nos envia n una informacion 
        nombre: 'Palacios'
    })
})


module.exports = router; //que raro que se deba exportar pero ahi va 
