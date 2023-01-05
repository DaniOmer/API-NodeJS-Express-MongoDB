// Import de la dépendance express
const express = require('express')
// Import de la dépendance qui permet de capter les corps de requête
const bodyParser = require('body-parser')
// Import de la dépence qui permet la connexion à la base de données MongoDB
const mongoose = require('mongoose')


const app = express()


// Middlewares
app.use(bodyParser.json()) // Capter les corps de requêtes en JSON



module.exports = app