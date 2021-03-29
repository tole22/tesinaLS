const eventsCtrl = {};

const { events } = require("../models/Event");
// Model
const Event = require("../models/Event");
const PageStructure = require("../models/PageStructure");

const FileManager = require('../utils/fileManager');
const fileManager = new FileManager();

// File for events data
const archivo = "./src/files/events.txt";

// Data from Mongo DB
eventsCtrl.getEvents = async (req, res) => {
    const events = await Event.find();
    return res.json(events);
};

eventsCtrl.saveEvent = async (req, res) => {
    const { baseURI, data, fechaCreacion } = req.body;
    // Almaceno el evento
    const newEvent = new Event({ baseURI, data, fechaCreacion });
    await newEvent.save();

    // Registro la visita al elemento en la estructura de paginas
    await PageStructure.findOne({ baseURI: baseURI }).then(estructura => {
        let elements = estructura.elementos_visitados;

        let evento = {
            identificador: data.outerHTML,
            contador: 1,
            ultimoUpdate: Date.now()
        };

        let elem = elements.find( ({identificador}) => identificador === data.outerHTML);

        if (elem) {
            elem.contador++;
        } else { 
                estructura.elementos_visitados.push(evento);    
        }
        estructura.save();
    }).catch(err => {
        console.log('Error, no se pudo hacer el update', err);
    });
    return res.send('Evento agregado!');
};

// Data from files
eventsCtrl.getEventsFromFile = async(req, res) => {
    fileManager.read(archivo, function (err, data) {
        if (err) {
            return console.log(err);
        }
        return res.send('El contenido es: ' + data);
    });
};

eventsCtrl.saveEventInFile = async(req, res) => {
    let msg = JSON.stringify(req.body) + "\n";

    fileManager.write(archivo, msg, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Archivo escrito correctamente!");
        return res.send('Evento nuevo agregado!');
    });
};

module.exports = eventsCtrl;