// dependencies

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
        // eikhane database er query call kora lagbe
        console.log("post request hoise");
    } else{
        callback(400, { // 400 Bad Request
            error: 'You have a problem in your request!',
        })
    }

}

handler._recipes.get = (requestProperties, callback) => {
    
    const id = typeof requestProperties.queryStringObject.id === 'number' ? requestProperties.queryStringObject.id : false;

    if(id){
        // eikhane ei id er against er data read korar sql query likha lagbe
    }else{
        callback(404, {
            error: 'Recipe Not Found!',
        })
    }
}

handler._recipes.put = (requestProperties, callback) => {
    
    const name = typeof requestProperties.body.name === 'string' && requestProperties.body.name.length > 0 ? requestProperties.body.name : false;


    const ingredients = typeof requestProperties.body.ingredients === 'string' && requestProperties.body.ingredients.length > 0 ? requestProperties.body.ingredients : false;


    const directions = typeof requestProperties.body.directions === 'string' && requestProperties.body.directions.length > 0 ? requestProperties.body.directions : false;

    if(name && ingredients && directions){
        // eikhane database er query call kora lagbe
        console.log("put request hoise");
    } else{
        callback(400, { // 400 Bad Request
            error: 'You have a problem in your request!',
        })
    }

}

handler._recipes.delete = (requestProperties, callback) => {
    const id = typeof requestProperties.queryStringObject.id === 'number' ? requestProperties.queryStringObject.id : false;

    if(id){
        // eikhane ei id er against er data delete korar sql query likha lagbe
        
    }else{
        callback(404, {
            error: 'Recipe Not Found!',
        })
    }
}



module.exports = handler;