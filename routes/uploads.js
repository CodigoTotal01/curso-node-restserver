const { Router } = require('express'); //isntacncia de rutas
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, cargarImagen, actualizarImagenCloudinary} = require('../controllers/uploads');
const { validarCampos } = require('../middlewares/validar-campos');
const {coleccionesPermitidas} = require("../helpers/db-validators");
const {validarArchivoSubir} = require("../middlewares/validar-archivo");
const router = Router();


router.post('/',validarArchivoSubir ,cargarArchivo );

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] ) ),
    validarCampos
], actualizarImagenCloudinary  );


router.get('/:coleccion/:id', [
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] ) ),
    validarCampos
], cargarImagen  );


module.exports = router;