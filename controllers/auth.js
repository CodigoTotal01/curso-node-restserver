const {response} = require("express");
const Usuario = require('../models/usuario') // entity > mongoose
const bcryptjs = require('bcryptjs');
const {generarJWT} = require("../helpers/generar-jwt");
const {googleVerify} = require("../helpers/google-verify");

//modelo 
const login = async (req, res = response) => {
    const {correo, password} = req.body;
    try {


        //verificar si el email existe 
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuarios / Password son incorrectos"
            })
        }
        //Si el usuario esta activo en la  baes de datos 
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuarios / Password son incorrectos estado false"
            })
        }

        //verificar la contraseña -> sdesencriptar 
        const validPassword = bcryptjs.compareSync(password, usuario.password); //bollean 
        if (!validPassword) {
            return res.status(400).json({
                msg: "Usuarios / Password son incorrectos - password"
            })
        }

        //generar el json web token

        const token = await generarJWT(usuario.id); //funciona con callbacks


        //si todo esta correcto 
        return res.json({

            usuario,
            token


        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: "Hable con el administrador"
        });

    }


}

const googleSignin = async (req, res = response) => {
    //toquen enviado por el body
    const {id_token}= req.body;
    try {
    const {correo, img, nombre} = await googleVerify(id_token); //viene com oundefine si ta cagaoo

        let usuario = await Usuario.findOne({correo}); // ecista o no exista (first time )

        if(!usuario){ ///crear usuario
            const data = {
                nombre,
                correo,
                password: 'xd', // nadie se autenticara con esto
                img,
                google: true
            };

            usuario = new Usuario(data); //generar usuario con los datos de la autenticacion
            await usuario.save(); //guardar
        }

        //el usuario esta negado en nuestra BD
        if(! usuario.estado){ // si es falso
            return res.status(401).json({
                msg: "Hable con el administrados, usted no tiene acceso"
            })
        }

        //generar JWT
        const token = await generarJWT(usuario.id); //funciona con callbacks


        res.json({
            usuario,
            token
        });
    }catch (error){
        res.status(400).json({
            msg: "Token de google no es valido"
        })
    }


}
module.exports = {
    login,
    googleSignin
}