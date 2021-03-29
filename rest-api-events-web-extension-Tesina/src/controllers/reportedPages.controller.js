const reportedPagesCtrl = {};

// Model
const ReportedPage = require("../models/ReportedPage");

// Data from Mongo DB
// Obtener todas las Reported Pages de la BD
reportedPagesCtrl.getReportedPages = async (req, res) => {
    const reportedPages = await ReportedPage.find();
    return res.json(reportedPages);
};

// Obtener datos de una reported page determinada a travez de la baseURI
reportedPagesCtrl.getReportedPage = async (req, res) => {
    const { baseURI } = req.body;
    const reportedPage = await ReportedPage.findOne({ baseURI: baseURI});
    return res.json(reportedPage);
};

module.exports = reportedPagesCtrl;