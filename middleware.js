const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const logger = (req, res, next) => {
    console.log(`A ${req.method} request to '${req.url}'`);
    next();
} //I only wrote this for MVP but I ain't using it

module.exports = server => {
    server.use(express.json()); //JSON derrrruuuloooo
    server.use(cors()); //cross origin requests
    server.use(helmet()); //we must protecc from attacc
    server.use(morgan('tiny')); //I'm using this instead of a basic written logger
}