const Categoria = require('./categoria'); // asignando nombres a las importaciones
const Role = require('./roles'); 
const Server = require('./server'); 
const Usuario = require('./usuario'); 
//recuerda exportarlos cada uno de est os 

module.exports = {
    Categoria,
    Role,
    Server,
    Usuario
}

//index para centralizar todos nuestros modelos 