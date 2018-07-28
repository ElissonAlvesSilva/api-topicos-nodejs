module.exports = (uri)=>{

    const mongoose = require('mongoose');

    mongoose.connect(uri, {
        useNewUrlParser: true
    });

    mongoose.connection.on('connected', ()=>{
        console.log('Connected to MongoDB');
    });

    mongoose.connection.on('disconnected', ()=>{
        console.log('Disconnected to MongoDB');
    });

    mongoose.connection.on('error', (error)=>{
        console.log(`Connection Erro ${error}`);
    });

    process.on('SIGINT', ()=>{
        mongoose.connection.close(()=>{
            console.log('Application finished, closed connection');
        });
    });
};