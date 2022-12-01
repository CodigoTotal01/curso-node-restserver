const { Router } = require('express'); //isntacncia de rutas
const { check } = require('express-validator')
const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete } = require('../controllers/usuarios');
const { esRoleValido, emailExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router(); //a el se le configura las rutas 
//el segundo argumento es un middleware _> son funciones que se ejecutan antesque un controlador
router.get('/', usuariosGet)

//se supone que estos midleware estas biendo dotodo lo que venga en el body
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mayor a 6 letras').isLength({min:6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROL', 'USER_ROL']),//* o uno o el otro nadamas
    check('rol').custom(esRoleValido),
    validarCampos
    ], usuariosPost)
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
