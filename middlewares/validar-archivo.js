const {response} = require("express");


const validarArchivoSubir= (req, res = response, next) =>  {
    //vaciamente simepre aqui enviamos un error pacivo como json
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) { //barrido de files -> ve si hay una propiedad de este tipo
      res.status(400).json({ msg: 'No files were uploaded.No hay archivos en la peticion' })
        return;
    }

    next(); //si pasa al nexct pasara hasta el proximo middleware
}


module.exports = {
    validarArchivoSubir
}