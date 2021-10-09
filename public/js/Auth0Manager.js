//moved here from backendClient so we can access same data
function Auth0Manage(){
    var ManagementClient = require('auth0').ManagementClient;
    var auth0 = new ManagementClient({
        domain: 'melandalin.us.auth0.com',
        clientId: 'H5NA6UmUpuvdAFYqTyo9cjQz28nvhSvQ',
        clientSecret: 'Zch6ceM8me9nThaEuo53b0H1BU6sEgw3EOOMJxFVb8kulp63lvHcLeG9xTcGkr0O',
        scope: 'read:users update:users'
    });
    
    
    //access token code
    var AuthenticationClient = require('auth0').AuthenticationClient;
    
    var auth0 = new AuthenticationClient({
        domain: 'melandalin.us.auth0.com',
        clientId: 'H5NA6UmUpuvdAFYqTyo9cjQz28nvhSvQ',
        clientSecret: 'Zch6ceM8me9nThaEuo53b0H1BU6sEgw3EOOMJxFVb8kulp63lvHcLeG9xTcGkr0O'
    });
    
    //defining localStorage
    var LocalStorage = require('node-localstorage').LocalStorage, //here we are defining the localstorage variable
    localStorage = new LocalStorage('./scratch');
    
    
    auth0.clientCredentialsGrant(
        {
            audience: 'https://melandalin.us.auth0.com/api/v2/',
            scope:  'read:users update:users'
        },
        
        function(err, response) {
            if (err) {
          // Handle error.
            }
            // console.log(response.access_token); //this seems to output the bearer access token for our data!
            var myToken = JSON.stringify(response.access_token);
            localStorage.setItem("thisToken", myToken);
            console.log("PASSED THROUGH AUTH0MANAGER");

        }
    );
    

    
}


function getMyToken() {
    return("connected again");
}

    
// module.exports = { getMyToken };
