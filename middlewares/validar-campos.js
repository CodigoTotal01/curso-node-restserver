const { request, response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos =  (req = request, res = response, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){ //si hay errores
        return res.status(400).json(errors);
    }

    next();//sigue con el siguiente middleware -> si no aejecuta el componente controlador 
}

module.exports = {
    validarCampos
}