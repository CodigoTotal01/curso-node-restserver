const Categoria = require('./categoria'); // asignando nombres a las importaciones
const Role = require('./roles'); 
const Server = require('./server'); 
const Usuario = require('./usuario'); 
const Producto = require('./producto')
//recuerda exportarlos cada uno de est os 

module.exports = {
    Categoria,
    Role,
    Server,
    Usuario,
    Producto
}

//index para centralizar todos nuestros modelos 