const path = require('path'); //para crear url locales
const {response} = require("express");
const {subirArchivo} = require('../helpers/subir-archivo');
const {Usuario, Producto} = require('../models')
const {model} = require("mongoose");
const fs = require("fs");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const cargarArchivo = async (req, res = response) => {

    try {
        //! configurar en el servidor para que se generen carpetas automaticamente 
        const nombre = await subirArchivo(req.files, undefined, 'imgs'); //botenemos el arreglo de archivos, pero nos puede dar error con el rejet 
        res.json({nombre})

    } catch (msg) { //obteneidno el rejetc
        res.status(400).json({msg})

    }


}


const actualizarImagen = async (req, res = response) => {

    const {id, coleccion} = req.params;
    let modelo; // valor de manera condicional

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!model) {
                return res.status(400).json({msg: `No existe el usuario con el id: ${id}`})

            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!model) {
                return res.status(400).json({msg: `No existe el producto con el id: ${id}`})
            }
            break;


        default:
            return res.status(500).json({msg: "se me olvido validar esto"})
    }

    //si existe, trae consigo la imagen -> eliminar la anterior
    if (modelo.img) {
        //Borrar de del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen); // la elimina en el servidor
        }
    }


    //! despues de eliminarlo recien se añade ña nueva
    try {
        modelo.img = await subirArchivo(req.files, undefined, coleccion)
    } catch (msg) {
        res.status(400).json({msg})
    }


    await modelo.save();
    res.json({modelo})
}

const actualizarImagenCloudinary = async (req, res = response) => {

    const {id, coleccion} = req.params;
    let modelo; // valor de manera condicional

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!model) {
                return res.status(400).json({msg: `No existe el usuario con el id: ${id}`})

            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!model) {
                return res.status(400).json({msg: `No existe el producto con el id: ${id}`})
            }
            break;


        default:
            return res.status(500).json({msg: "se me olvido validar esto"})
    }

    //si existe, trae consigo la imagen -> eliminar la anterior
    if (modelo.img) { // obteniendo el id del cliente y matarlo
        const nombreArr  = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1]; //obtener la ultima posicion
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    const {tempFilePath} = req.files.archivo;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);

    modelo.img = secure_url;

    await modelo.save();
    res.json({modelo})
}

const cargarImagen = async (req, res = response) => {

    const {id, coleccion} = req.params;
    let modelo; // valor de manera condicional

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!model) {
                return res.status(400).json({msg: `No existe el usuario con el id: ${id}`})

            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!model) {
                return res.status(400).json({msg: `No existe el producto con el id: ${id}`})
            }
            break;


        default:
            return res.status(500).json({msg: "se me olvido validar esto"})
    }

    //si existe, trae consigo la imagen -> eliminar la anterior
    if (modelo.img) {
        //Borrar de del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen) //retornar u narchivo
        }
    }
    const pathImagenNotFound = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(pathImagenNotFound) //retornar u narchivo
}


module.exports = {
    cargarArchivo,
    actualizarImagen,
    cargarImagen,
    actualizarImagenCloudinary
}