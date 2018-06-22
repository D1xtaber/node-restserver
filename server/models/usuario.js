const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let roleValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

//Importar schemas para poder crear schemas
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'] //not null
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roleValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});
//PAra que no le aparezca al usuario en el response el password
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password; //borrar una propiedad
    return userObject;
}
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });
//npm i mongoose-unique-validator --save
//Models es todo aquello que yo le puedo hacer cambios
//usuario va tener toda la configuracion usuariosSchema
module.exports = mongoose.model('Usuario', usuarioSchema);