const { Schema, model} = require('mongoose');

const Element = new Schema({
    text: String,
    tagName: String,
    outerHTML: String
});

const Visitado = new Schema({
    identificador: String,
    contador: Number,
    ultimoUpdate: { type: Date, default: Date.now }
});

const PageStructureSchema = new Schema({
    baseURI: { type: String, required: true },
    elementos_interactivos: [{ name: String, elements: [ Element ]}],
    elementos_visitados: [ Visitado ],
    fechaCreacion: { type: Date, default: Date.now },
});

module.exports = model('PageStructure', PageStructureSchema);
