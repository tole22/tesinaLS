const mongoose = require('mongoose');

const { EVENTS_APP_MONGODB_HOST, EVENTS_APP_MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${EVENTS_APP_MONGODB_HOST}/${EVENTS_APP_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Db is connected to ', db.connection.host))
    .catch(err => console.error(err));