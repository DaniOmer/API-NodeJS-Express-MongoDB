// Import de la dépendance express
const express = require('express')

const app = express()

// image
const path = require('path')

// Import de la dépendance qui permet de capter les corps de requête
const bodyParser = require('body-parser')

// Import de la dépence qui permet la connexion à la base de données MongoDB
const mongoose = require('mongoose')

// Import des routes
const userRoutes = require('./routes/user')
const saucesRoutes = require('./routes/sauces')


// Connexion à la base de données via Mongoose
mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://daniomer1:4MGwkD5huylAhIDK@cluster0.7chqk1i.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))


// CORS : Contourner le système de sécurité CORS qui bloque par défaut les appels HTTP entre serveurs !
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next()
});


// Middlewares
app.use(bodyParser.json()) // Capter les corps de requêtes en JSON
app.use('/images', express.static(path.join(__dirname, 'images'))) // Gestionnaire de routage

// Routes complètes
app.use('/api/auth', userRoutes)
app.use('/api/sauces', saucesRoutes)

module.exports = app