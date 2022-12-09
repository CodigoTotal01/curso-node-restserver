const { request, response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos =  (req = request, res = response, next) => {
    const errors = validationResult(req); // aqui obtenemos todos los errores a partir de los datos que no se halla nn enviado ya sean en el header o body del request 
    if(!errors.isEmpty()){ //si hay errores
        return res.status(400).json(errors);
    }

    next();//sigue con el siguiente middleware -> si no aejecuta el componente controlador
}




module.exports = {
    validarCampos
}