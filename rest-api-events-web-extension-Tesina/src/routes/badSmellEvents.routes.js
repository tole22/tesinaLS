const express = require('express');
const app = express();
const router = express.Router();

// Controllers
const { getBadSmellEvents, saveBadSmellEvent } = require("../controllers/badSmellEvents.controller");

// data from mongoDB
router.get('/', getBadSmellEvents);
router.post('/saveNewBadSmellEvent', saveBadSmellEvent);


module.exports = router;