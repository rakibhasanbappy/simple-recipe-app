// dependencies
const db_operations = require('../db/db_operation');

// module scaffolding
const handler = {};

handler.recipeHandler = (requestProperties, callback) =>{
    
    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    if(acceptedMethods.indexOf(requestProperties.method) >=0){
        handler._recipes[requestProperties.method](requestProperties, callback);
    }else{
        callback(405); // 405 Method Not Allowed
    }
};


handler._recipes = {};

handler._recipes.post = (requestProperties, callback) => {
    
    const name = typeof requestProperties.body.name === 'string' && requestProperties.body.name.length > 0 ? requestProperties.body.name : false;


    const ingredients = typeof requestProperties.body.ingredients === 'string' && requestProperties.body.ingredients.length > 0 ? requestProperties.body.ingredients : false;


    const directions = typeof requestProperties.body.directions === 'string' && requestProperties.body.directions.length > 0 ? requestProperties.body.directions : false;

    if(name && ingredients && directions){
        
        const data = {
            name,
            ingredients,
            directions,
        };
        db_operations.db_create(data, callback);
    } else{
        callback(400, { // 400 Bad Request
            error: 'You have a problem in your request!',
        })
    }

}

handler._recipes.get = (requestProperties, callback) => {
    
    let id = Number(requestProperties.queryStringObject.id);
    
    id = typeof id === 'number' ? id : false;

    if(id){
        db_operations.db_read(id, callback);
    }else{
        callback(404, {
            error: 'Recipe Not Found!',
        })
    }
}

handler._recipes.put = (requestProperties, callback) => {
    
    let id = Number(requestProperties.queryStringObject.id);
    
    id = typeof id === 'number' ? id : false;
    
    const name = typeof requestProperties.body.name === 'string' && requestProperties.body.name.length > 0 ? requestProperties.body.name : false;


    const ingredients = typeof requestProperties.body.ingredients === 'string' && requestProperties.body.ingredients.length > 0 ? requestProperties.body.ingredients : false;


    const directions = typeof requestProperties.body.directions === 'string' && requestProperties.body.directions.length > 0 ? requestProperties.body.directions : false;


    if(name && ingredients && directions && id){
        
        const data = {
            id,
            name,
            ingredients,
            directions,
        };
        db_operations.db_update(data, callback);

    } else{
        callback(400, { // 400 Bad Request
            error: 'You have a problem in your request!',
        })
    }

}

handler._recipes.delete = (requestProperties, callback) => {
    
    let id = Number(requestProperties.queryStringObject.id);
    
    id = typeof id === 'number' ? id : false;

    if(id){
        db_operations.db_delete(id, callback);
    }else{
        callback(404, {
            error: 'Recipe Not Found!',
        })
    }
}



module.exports = handler;