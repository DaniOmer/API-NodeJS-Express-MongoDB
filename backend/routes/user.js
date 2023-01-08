// Import de dépendance express
const express = require('express')

// Import du parcours de l'utilisateur depuis controllers
const userCtrl = require('../controllers/user')

// Import du middleware d'authentification
const auth = require('../middlewares/auth')
// Import du middleware multer
const multer = require('../middlewares/multer-config')

// Appel à la méthode Router de express
const router = express.Router()


// Routes
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)




module.exports = router