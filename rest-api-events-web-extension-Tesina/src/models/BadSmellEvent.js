const { Schema, model} = require('mongoose');

const BadSmellEventSchema = new Schema({
    baseURI: { type: String, required: true },
    data: [{ text: String, tagName: String, outerHTML: String }],
    type: { type: String },
    fechaCreacion: { type: Date, default: Date.now }
});

module.exports = model('BadSmellEvent', BadSmellEventSchema);