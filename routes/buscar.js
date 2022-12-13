const { Router } = require('express'); //isntacncia de rutas
const { check } = require('express-validator');
const { buscar } = require('../controllers/buscar');

const router = Router(); //a el se le configura las rutas 

router.get('/:coleccion/:termino', buscar)


module.exports =router;