const mongoose = require('mongoose');

const pokemonSchema = mongoose.Schema({
    id: { type: String, required: true},
    name: { type: String, required: true},
    type1: { type: String, required: true},
    type2: { type: String },
    sprite: { type: String, required: true}
});

module.exports = mongoose.model('Pokemon', pokemonSchema);