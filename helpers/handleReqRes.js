//dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const notFoundHandler = require('../handlers/notFoundHandler');
const utilities = require('./utilities');

//module scaffolding
const handler = {};

handler.handleReqRes = (req, res) =>{
    //get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();

    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    };

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;



    req.on('data', (buffer)=>{
        realData += decoder.write(buffer);
    });

    req.on('end',()=>{
        realData += decoder.end();

        requestProperties.body = utilities.parsedJSON(realData);

        chosenHandler(requestProperties, (status, payload)=>{
            const statusCode = typeof status === 'number' ? status : 500; 
            const responsePayload = typeof payload === 'object' ? payload : {};

            const payloadString = JSON.stringify(responsePayload);

            // return the final response
            res.setHeader('Content-type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });

};

module.exports = handler;