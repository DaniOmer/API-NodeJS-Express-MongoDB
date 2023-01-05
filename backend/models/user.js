// Import de la dépendance mongoose
const mongoose = require('mongoose')

// Import de la dépendance mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator')

// Création du modèle utilisateur avec la méthode Schema() de mongoose
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, require: true}
})

// Application de uniqueValidator au modèle user
userSchema.pluging(uniqueValidator)

// Exportation du modèle utilisateur
module.exports = mongoose.model('User', userSchema)