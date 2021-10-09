// const callChain = require("./Auth0Manager"); //calling on Auth0Manager.js file
const result = callChain.getMyToken();

console.log(result);

function getMyTokenAgain() {
    return("second try");
}

// module.exports = { getMyTokenAgain };
