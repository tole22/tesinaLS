const badSmellEventsCtrl = {};


// Model
const BadSmellEvent = require("../models/BadSmellEvent");
const ReportedPage = require("../models/ReportedPage");



// Data from Mongo DB
badSmellEventsCtrl.getBadSmellEvents = async (req, res) => {
    const events = await BadSmellEvent.find();
    return res.json(events);
};

badSmellEventsCtrl.saveBadSmellEvent = async (req, res) => {
    const { baseURI, data, type, fechaCreacion } = req.body;
    // Almaceno el evento
    const newEvent = new BadSmellEvent({ baseURI, data, type, fechaCreacion });
    await newEvent.save();

    // Agrego el evento a la coleccion de ReportedPages
    const reportedPage = await ReportedPage.find({ baseURI: baseURI });

    // Elemento que generó el evento de Bad Smell
    const element = {
        'tagName': data.tagName,
        'outerHTML': data.outerHTML,
        'bad_smell_type': type,
        'ocurrencias': 1,
        'ultimoUpdate': fechaCreacion
    };

    // Si el reportedPage para esta URL no existe creo una nueva
    if(reportedPage.length === 0) {
        const reported_elements = [ element ];
        const newReportedPage = new ReportedPage({ 
            baseURI, 
            reported_elements,
            fechaCreacion,
            fechaCreacion
        });
        await newReportedPage.save();
        return res.send('Evento de BadSmell agregado!');
    } else {
        // Busco la reportPage
        await ReportedPage.findOne({ baseURI: baseURI }).then(reportedPage => { 
            let elemento = reportedPage.reported_elements.find( ({outerHTML}) => outerHTML === data.outerHTML);
            // Si existe, incremento la ocurrencia del elemento
            if (elemento) {
                elemento.ocurrencias++;
            } else {
                reportedPage.reported_elements.push(element);
            }
            reportedPage.save();
        }).catch(err => {
            console.log('Error, no se pudo hacer el update', err);
        });
        return res.send('Nro de ocurrencias actualizado!');
    }
};


module.exports = badSmellEventsCtrl;