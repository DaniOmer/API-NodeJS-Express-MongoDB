// Import de la dépendance jsonwebtoken
const jwt = require('jsonwebtoken')

// Requête d'authentification de l'utilisateur
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        // Vérifier le token avec la méthode verify de jwt
        const decodedToken = jwt.verify(token, process.env.TOKEN_CRYPT)
        // Récupérer l'id utilisateur
        const userId = decodedToken.userId
        // Ajouter l'id user à l'objet request
        req.auth = {
            userId : userId 
        }
        next()
    }catch(error) {
        res.status(401).json({ error })
    }
}