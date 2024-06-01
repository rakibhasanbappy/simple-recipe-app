// dependencies

// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) =>{
    // console.log(requestProperties);
    callback(404, {
        message: 'The requested url was not found!',
    });
};

module.exports = handler.notFoundHandler;