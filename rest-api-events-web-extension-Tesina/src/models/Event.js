const { Schema, model} = require('mongoose');

const EventSchema = new Schema({
    baseURI: { type: String, required: true },
    data: [{ text: String, tagName: String, outerHTML: String }],
    fechaCreacion: { type: Date, default: Date.now }
});

module.exports = model('Event', EventSchema);
