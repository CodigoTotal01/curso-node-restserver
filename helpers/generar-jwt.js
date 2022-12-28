
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

//user-identifier
const generarJWT = (uid='') => { //unico a almacenar -> nada sencible guardar 
    //retornar promesa 
    return new Promise((resolve, reject)=> {
        const payload = {uid}; //se necesrita que se envie como objeto 
 
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn: '4h', //tiempo de vida 
        }, (err, token)=>{ // informacion que nosretornara el generar el token
            if(err){
                reject('No se puedo geneerar el token')
            }else{
                resolve(token); //en el mejor de los casos nos retorna esta informacion 
            }
        });
    });

}

const comprobarJWT  = async(token = '') => {
    try{
        if(token.length < 0){
            return null;
        }

        //obtneiendo uid del cliente
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY); //cool la libreria 
        const usuario = await Usuario.findById(uid);
        if(usuario) {
            if(usuario.estado){
                return usuario;

            }
            return null;

        }else{
            return null;
        }




    }catch(error){
        return null;
    }
}

module.exports = {
    generarJWT,
    comprobarJWT
}