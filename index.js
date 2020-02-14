/*play this: https://www.youtube.com/watch?v=d-diB65scQU*/

const express = require('express');
const projectRouter = require('./projectRouter.js');
const actionRouter = require('./actionRouter.js');
const server = express();
require('dotenv').config();

server.use(express.json());
server.use('/projects', projectRouter);
server.use('/actions', actionRouter);

const port = process.env.PORT || 5000;

server.listen(port, () =>{
    console.log(`*** server running on port ${port}`);
})
