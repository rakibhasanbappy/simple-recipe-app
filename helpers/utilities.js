// dependencies


// module scaffolding
const utilities = {};


// parse a string to JSON
utilities.parsedJSON = (jsonString)=>{

    let output;

    try{
        output = JSON.parse(jsonString);
    } catch{
        output = {};
    }
    return output;
};


module.exports = utilities;

