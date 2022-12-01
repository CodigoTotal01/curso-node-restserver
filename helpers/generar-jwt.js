
const jwt = require('jsonwebtoken');

//user-identifier
const generarJWT = (uid='') => { //unico a almacenar -> nada sencible guardar 
    //retornar promesa 
    return new Promise((resolve, reject)=> {
        const payload = {uid}; //se necesrita que se envie como objeto 
        //llavae cecreata -> muy nuestro 
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

module.exports = {
    generarJWT
}