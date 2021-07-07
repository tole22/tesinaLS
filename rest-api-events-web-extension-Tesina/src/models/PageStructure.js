const { Schema, model} = require('mongoose');

const Element = new Schema({
    text: String,
    tagName: String,
    outerHTML: String
});

const Child = new Schema({
    tagName: String,
    href: String,
    tabindex: String,
    aria_label: String,
    role: String
});

const Atributos = new Schema({
    tabindex: String,
    aria_label: String,
    role: String
});

const ElemWithHandler = new Schema({
    id_elem: String,
    className: String,
    tagName: String,
    outerHTML: String,
    href: String,
    type: String,
    func: String,
    children: [ Child ],
    accessibility_attrib: Atributos
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
    elementos_con_handler: [ ElemWithHandler ],
    fechaCreacion: { type: Date, default: Date.now },
});

module.exports = model('PageStructure', PageStructureSchema);
