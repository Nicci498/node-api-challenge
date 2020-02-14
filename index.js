const express = require('express');

const projectRouter = require('./routers/projectRouter.js');
const actionRouter = require('./routers/actionRouter.js')

const server = express()
server.use(express.json())
server.use('/projects', projectRouter);
server.use('/actions', actionRouter);
const port = 5000
server.listen(port, () =>{
    console.log(`server listening on port ${port}`)
})
