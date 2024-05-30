// dependencies
const http = require('http');
const handler = require('./helpers/handleReqRes');
require('dotenv').config();

// module scaffolding
const app = {};


// create server
app.createServer = () => {
    const server = http.createServer(handler.handleReqRes);

    server.listen(process.env.PORT, ()=>{
        console.log(`listening to port ${process.env.PORT}....`);
    });
};

// start the server
app.createServer();