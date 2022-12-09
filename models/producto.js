const { Schema, model } = require('mongoose')


const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [
            true, 'El nombre es obligatorio'
        ],
        unique: true
    },

    estado: {
        type: Boolean,
        default: true,
        required: true
    },


    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },

    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: true
    },

    descripcion: {
        type: String
    },

    disponible: {
    type: Boolean,
    default: true
}

});

//model -> para setear el nombre de la entidad y poder emplear todos los metodos del Schema

ProductoSchema.methods.toJSON = function () {
    const { __v, ...producto } = this.toObject();
    return producto;
}


module.exports = model('Productos', ProductoSchema);
