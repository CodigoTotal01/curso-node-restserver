const validaCampos= require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');

//constantes que importan tood lo de estos archivos 

module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validaRoles,
}