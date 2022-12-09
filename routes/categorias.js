const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoriaPorId, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');

const router = Router();

//obtener todas las categorias 
router.get('/', obtenerCategorias)

//obtener categoria por id
router.get('/:id', 
[
    check('id', 'No es un id valido').isMongoId(), // validar si es valido en moongo 
    check('id').custom(existeCategoriaPorId),
    validarCampos

], obtenerCategoriaPorId)

//Crear categoria - privado - cualquier persona con untokern valido 
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);


//Actualizar -> body y parametro id 
router.put('/:id',
[
    validarJWT,
    check('id', 'No es un id valido').isMongoId(), // validar si es valido en moongo 
    check('id').custom(existeCategoriaPorId),
    validarCampos

],
actualizarCategoria
)



//delete un categoria - solo admin 

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(), // validar si es valido en moongo 
    check('id').custom(existeCategoriaPorId),
    validarCampos
],borrarCategoria)


module.exports = router; 
