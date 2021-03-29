require('dotenv').config();

var cors = require('cors');
const express = require('express');
const app = express();

require('./db/database');


// Settings
app.set('port', process.env.PORT || 8080);

// Middlewares
app.use(express.json());

/* CORS */
app.use(cors({
    origin: '*',
    methods: ['GET', 'PUT', 'DELETE', 'PATCH', 'POST'],
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
  }));

// Routes
app.use('/api/structures', require('./routes/pageStructure.routes'));
app.use('/api/events', require('./routes/events.routes'));
app.use('/api/badSmellReport', require('./routes/badSmellEvents.routes'));
app.use('/api/reportedPages', require('./routes/reportedPages.routes'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});