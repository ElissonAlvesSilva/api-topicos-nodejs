require('../config/database.config')('mongodb://localhost:27017/rhmobi');

const { app } = require('../config/express.config');
const port = global.PORT || '4000';
app.listen( port , ()=> {
    console.log(`Server running at port ${port}`);
});

app.on('error', onError);
module.exports = app;

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}