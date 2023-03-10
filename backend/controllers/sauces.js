const Sauce = require('../models/sauces')
const fs = require('fs')


// Créer une sauce
exports.createSauce = (req, res, next) => {
	const sauceObject = JSON.parse(req.body.sauce)
    // supprime le faux _id envoyé par le front-end
	delete sauceObject._id 
    // crée une instance du model Sauce
	const sauce = new Sauce({
		...sauceObject, // contient toutes les informations d'une sauce
		imageUrl: `${req.protocol}://${req.get('host')}/images/${ req.file.filename }`
	})
	sauce // promise
		.save() // enregistre la sauce dans la BDD
		.then(() => res.status(201).json({ message: 'Sauce enregistré !' }))
		.catch((error) => res.status(400).json({ message: error }))
}


// Récupérer une sauce
exports.getOneSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id }) // trouve la Sauce avec le même _id
		.then((sauce) => {
			res.status(200).json(sauce)
		})
		.catch((error) => {
			res.status(404).json({ error })
		})
}


// Modifier une sauce
exports.modifySauce = (req, res, next) => {
	const sauceObject = req.file
		? { // ternaire stipulant si req.file existe
				...JSON.parse(req.body.sauce),
				imageUrl: `${req.protocol}://${req.get('host')}/images/${
					req.file.filename
				}`,
		  }
		: { // sinon
            ...req.body 
        }
	Sauce.updateOne(
		// méthode updateOne() met à jour la sauce
		{ _id: req.params.id }, // l'id de l'élément à modifier
		{ ...sauceObject, _id: req.params.id } // la modification
	)
		.then(() => res.status(200).json({ message: 'Sauce modifié !' }))
		.catch((error) => res.status(400).json({ error }))
}


// Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			const filename = sauce.imageUrl.split('/images/')[1]
			fs.unlink(`images/${filename}`, () => {
				Sauce.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
					.catch((error) => res.status(400).json({ error }))
			})
		})
		.catch((error) => res.status(500).json({ error }))
}


// Récupérer toutes les sauces
exports.getAllSauces = (req, res, next) => {
	Sauce.find()
		.then((sauces) => {
			res.status(200).json(sauces)
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			})
		})
}