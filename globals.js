// Define an object to hold the global variables
const globals = {
    longitude: 0,
    latitude: 0,
    apiKey: 'dee7f9f89cf71e69d03cfc2d23e6dc69'
}

// Define a function to set a global variable
function setGlobal(name, value) {
    //console.log(`Setting global variable '${name}' to '${value}'`);
    globals[name] = value;
}

// Define a function to get a global variable
function getGlobal(name) {
    // console.log(`Getting global variable '${name}': '${JSON.stringify(globals[name], null, 2)}'`);
    return globals[name];
}

// Export the functions
module.exports = {
    setGlobal,
    getGlobal
};