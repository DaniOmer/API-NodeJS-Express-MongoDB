// Import du package natif de node pour créer un serveur
const http = require('http')

// Import de l'index d'application
const app = require('./app')

// Traitement du port
const normalizedPort = val =>{
    const port = parseInt(val)
    if (isNaN(port)){
        return port
    }
    if(port >= 0){
        return port
    }
    return false
}

// Variable du port
const PORT = normalizedPort(process.env.PORT || 3000)

// Configuration du port
app.set('port', PORT)

// Démarrer un serveur node basique avec la méthode createServer du package http
const server = http.createServer(app)

// Le serveur écoute le port
server.listen(PORT)