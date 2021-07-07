const pageStructureCtrl = {};

// Model
const PageStructure = require("../models/PageStructure");
const BadSmellEvent = require("../models/BadSmellEvent");
const Event = require("../models/Event");
const ReportedPage = require("../models/ReportedPage");

const FileManager = require('../utils/fileManager');
const fileManager = new FileManager();

// File for events data
const archivo = "./src/files/page_structures.txt";

// Data from Mongo DB

// Obtener todas las estructuras de la BD
pageStructureCtrl.getStructures = async (req, res) => {
    const structures = await PageStructure.find();
    return res.json(structures);
};

// Guardar nueva estructura
pageStructureCtrl.saveNewStructure = async (req, res) => {
    const { baseURI, elementos_interactivos, fechaCreacion } = req.body;
    // cuando guardo una estructura por primera vez el array de elementos visitados va a estar vacio.
    const empty_array = [];

    const estructura = await PageStructure.find({ baseURI: baseURI });

    if(estructura.length === 0) {
        const newStructure = new PageStructure({ baseURI, elementos_interactivos, empty_array, fechaCreacion });
        await newStructure.save();
        return res.send('Estructura Agregada!');
    }
    return res.send('La estructura ya existe! No se ha agregado.');
};

// Obtener datos de una estructura determinada a travez de la baseURI
pageStructureCtrl.getStructure = async (req, res) => {
    const { baseURI } = req.body;
    const structure = await PageStructure.findOne({ baseURI: baseURI});
    return res.json(structure);
};

// Eliminar una estructura
pageStructureCtrl.deleteStructure = async(req, res) => {
    await PageStructure.findByIdAndDelete(req.params.id);
    res.json({status: 'Estructura Eliminada'})
};

// Eliminar todos los eventos de una pagina/estructura
pageStructureCtrl.deleteStructureEvents = async (req, res) => {
    const { baseURI } = req.body;
    const eliminarBSEvents = await BadSmellEvent.deleteMany({ baseURI: baseURI });
    const eliminarEvents = await Event.deleteMany({ baseURI: baseURI });

    // Busco la reportPage
    await ReportedPage.findOne({ baseURI: baseURI }).then(reportedPage => {
        if (reportedPage.reported_elements) reportedPage.reported_elements = [];
        reportedPage.save();
    }).catch(err => {
        console.log('Error, no se pudo hacer el update', err);
    });

    let msg = "Se eliminaron: " +
        eliminarBSEvents.deletedCount +
        " Bad Smell Events y " +
        eliminarEvents + " Eventos";
    res.json({ status: msg })
};

// Elementos de la pagina que poseen Handlers JS asignados
pageStructureCtrl.saveElementsWithHandler = async (req, res) => {
    const { baseURI, elements, cant_elements } = req.body;

    try {
        // Registro la visita al elemento en la estructura de paginas
        await PageStructure.findOne({ baseURI: baseURI }).then(estructura => {

            // Actualizo el listado de elementos si el tamaño cambio
            if (estructura.elementos_con_handler.length !== cant_elements) {
                estructura.elementos_con_handler = elements;
                estructura.save();
                return res.send('Se actualizaron los elementos con handlers!');
            }
        }).catch(err => {
            console.log('Error, no se pudo hacer el update de elementos con handlers', err);
        });
        return res.send('No se actualizaron los elementos con handlers!');

    } catch (error) {
        console.log('Error, no se pudo hacer el update de elementos con handlers', error);
    }
};


// Data from files
pageStructureCtrl.getStructuresFromFile = async(req, res) => {
    fileManager.read(archivo, function (err, data) {
        if (err) {
            return console.log(err);
        }
        return res.send('El contenido es: ' + data);
    });
};

pageStructureCtrl.addNewPageStructureInFile = async(req, res) => {
    let msg = JSON.stringify(req.body) + "\n";

    fileManager.write(archivo, msg, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Archivo escrito correctamente!");
        return res.send('Estructura nuevo agregado!');
    });
};

module.exports = pageStructureCtrl;