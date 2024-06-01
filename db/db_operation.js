// dependencies
const get_client = require('./get-client');
const utilities = require('../helpers/utilities');

// module scaffolding
const db = {};

db.db_create = (data, callback) =>{
    const client = get_client();
    
    const query = `INSERT INTO recipes (name, ingredients, directions) VALUES ('${data.name}', '${data.ingredients}', '${data.directions}')`;

    client.query(query, (err, res) => {
        if (!err) {
            console.log('Data insert successful');
            callback(201,{
                message: 'Data created successfully!',
            });
        }
        else{
            callback(404,{
                error: err,
            })
        }
     
        client.end();
    });
};

db.db_read = (id, callback) =>{
    const client = get_client();
    console.log(id);
    const query = `SELECT * FROM recipes WHERE id = '${id}'`;

    client.query(query, (err, res) => {
        if (!err && res.rows.length) {
            console.log('Data read successful');
            const data = {
                name: res.rows[0].name,
                ingredients: res.rows[0].ingredients,
                directions: res.rows[0].directions,
            };
            callback(200, data);
        }
        else if(!res.rows.length){
            callback(404,{
                error: "No data found with this id",
            });
        }else{
            callback(404,{
                error: "There was a problem in the request!",
            });
        }
     
        client.end();
    });


};


db.db_update = (data, callback) => {
    const client = get_client();
    const query = `UPDATE recipes SET name = '${data.name}', ingredients = '${data.ingredients}', directions = '${data.directions}' WHERE id = '${data.id}'`;

    client.query(query, (err, res) => {
        if (!err) {
            console.log('Data update successful');
            callback(200,{
                message: 'Data updated successfully!',
            });
        }else{
            callback(404,{
                error: 'There was a problem in the request!',
            });
        }
        client.end();
    });
};

db.db_delete = (id, callback) => {
    const client = get_client();
    const query = `DELETE FROM recipes WHERE id = '${id}'`;

    client.query(query, (err, res) => {
        if (!err) {
            callback(200,{
                message: 'Data deleted successfully!',
            });
        }else{
            callback(404,{
                error: 'There was a problem in the request!',
            });
        }
        client.end();
    });
};

// export the module
module.exports = db;


