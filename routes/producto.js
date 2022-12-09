const { Router } = require('express'); //Para definir las rutas 
const { check } = require('express-validator'); //emplear los midlelwares de express
const { obtenerProductos, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');


const router  = Router(); //llmar metodo de las turas -> permite difefinir las rutas de los controladores, para luego usar los metodos que le pasemos


router.get('/', obtenerProductos);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],crearProducto)


router.put('/:id', 
[
    validarJWT,
    esAdminRole,
    check('id', 'El id debe ser valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
]
,actualizarProducto)

router.delete('/:id', 
[
    validarJWT,
    esAdminRole,
    check('id', 'El id debe ser valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
]
,borrarProducto)




module.exports = router;