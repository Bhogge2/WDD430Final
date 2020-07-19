const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxPokemonId: { type: Number, required: true }
});

module.exports = mongoose.model('Sequence', sequenceSchema);