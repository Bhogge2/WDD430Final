var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Pokemon = require('../models/pokemon');

function returnError(res, error) {
    res
    .status(500) 
    .json({
        message: 'An error occured',
        error: error
    });
}

router.get('/', (req, res, next) => {
    Pokemon.find()
    .then(pokemon => {
        res.status(200)
        .json({
            message: 'Pokemon fetched successfully!',
            pokemon: pokemon
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});

router.get('/:id', (req, res, next) => {
    Pokemon.findOne({
        "id": req.params.id
    })
    .then(pokemon => {
        res.status(200)
        .json({
            message: 'Pokemon fetched successfully!',
            pokemon: pokemon
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});

router.post('/', (req, res, next) => {
    const maxPokemonId = sequenceGenerator.nextId("pokemon");

    const pokemon = new Pokemon({
        id: maxPokemonId,
        name: req.body.name,
        type1: req.body.type1,
        type2: req.body.type2,
        sprite: req.body.sprite
    });

    pokemon.save()
    .then(createdPokemon => {
        res.status(201)
        .json({
            message: 'Pokemon added successfully',
            pokemon: createdPokemon
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});

router.put('/:id', (req, res, next) => {
    Pokemon.findOne({
        id: req.params.id
    })
    .then(pokemon => {
        pokemon.name = req.body.name,
        pokemon.type1 = req.body.type1,
        pokemon.type2 = req.body.type2,
        pokemon.sprite = req.body.sprite

        Pokemon.updateOne({
            id: req.params.id
        }, pokemon)
        .then(result => {
            res.status(204)
            .json({
                message: 'Pokemon updated successfully'
            })
        })
        .catch(error => {
            returnError(res, error);
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Pokemon not found.',
            error: {
                pokemon: 'Pokemon not found'
            }
        });
    });
});

router.delete(":/id", (req, res, next) => {
    Pokemon.findOne({
        id: req.params.id
        .then(pokemon => {
            res.status(204)
            .json({
                message: "Pokemon deleted successfully"
            });
        })
        .catch(error => {
            returnError(res, error);
        })
    })
    .catch(error => {
        returnError(res, error);
    });
});

module.exports = router;