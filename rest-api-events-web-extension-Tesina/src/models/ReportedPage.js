const { Schema, model} = require('mongoose');

const Element = new Schema({
    tagName: String,
    outerHTML: String,
    bad_smell_type: String,
    ocurrencias: { type: Number, default: 1},
    ultimoUpdate: { type: Date, default: Date.now }
});

const ReportedPageSchema = new Schema({
    baseURI: { type: String, required: true },
    reported_elements: [ Element ],
    fechaCreacion: { type: Date, default: Date.now },
    ultimoUpdate: { type: Date, default: Date.now }
});

module.exports = model('ReportedPage', ReportedPageSchema);
