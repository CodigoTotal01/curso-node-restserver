 
 //Para generar el modelo con mongoose
//schema -> esquema

 const {Schema, model} = require('mongoose')


 const CategoriaSchema = Schema({
    nombre:{
        type: String,
        required: [
            true, 'El nombre es obligatorio' 
        ],
        unique: true
    },

    estado: {
        type: Boolean,
        default: true,
        required: true // no olvidar asignar el valor 
    },


    usuario:{
        type: Schema.Types.ObjectId, // tiene que ser otro objeto que se tiene en mongo 
        ref: 'Usuario', //refrecnia del otro modelo  
        required: true 
    }

 });

//model -> para setear el nombre de la entidad y poder emplear todos los metodos del Schema

CategoriaSchema.methods.toJSON = function() {
    const { __v, ...usuario  } = this.toObject();
    return usuario; 
}


module.exports = model('Categoria', CategoriaSchema);
