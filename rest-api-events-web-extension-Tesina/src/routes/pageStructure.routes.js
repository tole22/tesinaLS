// Elementos interactivos de una pagina web

const express = require('express');
const app = express();
const router = express.Router();

// Controllers
const { getStructures,
        getStructure,
        saveNewStructure, 
        getStructuresFromFile,
        deleteStructure,
        deleteStructureEvents,
        addNewPageStructureInFile } = require("../controllers/pageStructure.controller"); 

// Data from MongoDB
router.get('/', getStructures);
router.post('/saveNewStructure', saveNewStructure);
router.post('/getStructure', getStructure);
router.delete('/:id', deleteStructure);
router.post('/deleteEvents', deleteStructureEvents);

// Data from file
router.get('/structures-from-file', getStructuresFromFile);
router.post('/addNewPageStructure-in-file', addNewPageStructureInFile);

module.exports = router;


