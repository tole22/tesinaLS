const express = require('express');
const app = express();
const router = express.Router();

// Controllers
const { getReportedPages, getReportedPage } = require("../controllers/reportedPages.controller");

// data from mongoDB
router.get('/', getReportedPages);
router.post('/getReportedPage', getReportedPage);

module.exports = router;