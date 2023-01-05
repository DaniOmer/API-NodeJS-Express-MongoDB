// Import de la dépendance bcrypt pour hasher le mot de passe
const bcrypt = require('bcrypt')

// Import de la dépendance jsonwebtoken pour créer un token d'identification
const jwt = require('jsonwebtoken')

// Import du modèle utilisateur
const User = require('../models/user')


// Parcours d'incription d'un utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Créer un nouvel utilisateur
            const user = new User({
                email : req.body.email,
                password : hash
            })
            // On enregistre le nouvel utilisateur
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
                .catch(error => res.status(400).json({ error }))
        })
        // On note un erreur serveur
        .catch(error => res.status(500).json({ error }))
        next()
}



// Parcours de connexion d'un utilisateur
exports.login = (req, res, next) => {
    // Vérifier si l'utilisateur existe dans la base de données
    User.findOne({ email : req.body.email })
        .then(user => {
            // COmparer le mot de passe du user trouvé à celui de la requête
            bcrypt.compare(user.password, res.body.password)
                .then(valid => {
                    if(!valid){
                        return res.status(401).json({ message : 'Paire login/mot de passe incorrecte'})
                    }
                    // Retourner une réponse avec l'id utilisateur et un token unique
                    res.status(200).json({
                        userId : user._id,
                        token : jwt.login(
                            { userId : user._id },
                            'TERCES_NEKOT_MODNAR',
                            { expireIn : '24' }
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}