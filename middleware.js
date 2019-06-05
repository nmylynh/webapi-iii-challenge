const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

module.exports = server => {
    server.use(express.json()); //JSON derrrruuuloooo
    server.use(cors()); //cross origin requests
    server.use(helmet()); //we must protecc from attacc
    server.use(morgan('tiny')); //I'm using this instead of a basic written logger
}