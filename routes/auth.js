const { Router } = require('express'); //isntacncia de rutas
const { check } = require('express-validator');
const { login, googleSignin} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router(); //a el se le configura las rutas 
//el segundo argumento es un middleware _> son funciones que se ejecutan antesque un controlador
router.post('/login', 
[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(), // nunca debemos mostrar si la contraseña esta mal
    validarCampos //! envia los mensajes de errores -> middleware personalizado
]
, login ); 

router.post('/google',
    [
        check('id_token', 'El id_token es necesario').not().isEmpty(),
        validarCampos
    ]
    , googleSignin   ); //aqui va el controlador

//

module.exports = router;