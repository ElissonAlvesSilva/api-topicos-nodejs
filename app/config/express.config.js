'use strict';
const express = require('express');
const body_parser = require('body-parser');
const express_validator = require('express-validator');
const morgan = require('morgan');
const cors = require('cors');
const consign = require('consign');


const logger = require('../services/logger.service');

const app = express();

app.use(morgan('common', {
    stream: {
        write: (message)=>{
            logger.info(message);
        }
    }
}));

app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: false
}));
app.use(express_validator());
app.use(cors());
app.use('/static',express.static('app/public'));


consign({cwd: 'app'})
    .include('models')
    .then('controllers')
    .then('routes')
    .then('services')
    .into(app);

module.exports.app = app ;