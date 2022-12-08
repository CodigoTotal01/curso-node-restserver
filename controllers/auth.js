const {response} = require("express");
const Usuario = require('../models/usuario') // entity > mongoose
const bcryptjs = require('bcryptjs');
const {generarJWT} = require("../helpers/generar-jwt");

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

const googleSignin = (req, res = response) => {
    //toquen enviado por el body
    const {id_token}= req.body;

    res.json({
        msg: "Todo bien, google sing in ",
        id_token
    });
}
module.exports = {
    login,
    googleSignin
}