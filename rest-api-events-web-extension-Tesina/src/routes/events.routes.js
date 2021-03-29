const express = require('express');
const app = express();
const router = express.Router();

// Controllers
const { getEvents, saveEvent, getEventsFromFile, saveEventInFile } = require("../controllers/events.controller");

// data from mongoDB
router.get('/', getEvents);
router.post('/save-event', saveEvent);

// data from files
/* fetch('http://localhost:8080/events') >> seria un GET
    .then((resp) => resp.text()) >>> si res.send()
    .then((resp) => resp.json()) >>> si res.json()
    .then(function(data) { console.log(data)}) >> imprimo contenido
*/
router.get('/events-from-file', getEventsFromFile);
router.post('/save-event-in-file', saveEventInFile);

module.exports = router;