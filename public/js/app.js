//     audience: 'https://melandalin.us.auth0.com/api/v2/'

console.log("HIIIII");

// /**
//  * Executes the logout flow
//  */
// // The Auth0 client, initialized in configureClient()
let auth0 = null;

// /**
//  * Retrieves the auth configuration from the server
//  */
const fetchAuthConfig = () => fetch("/auth_config.json");

// /**
//  * Initializes the Auth0 client
//  */
const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    audience: 'https://melandalin.us.auth0.com/api/v2/'
  });


};

//get raw token 



// // Will run when page finishes loading

////
if (typeof window !== "undefined") {
  // browser code
  window.onload = async () => {
    await configureClient();

//     // NEW - update the UI state
    updateUI();
    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
      // show the gated content
      return;
    }
  
    // NEW - check for the code and state parameters
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
  
      // Process the login state
      await auth0.handleRedirectCallback();
      
      updateUI();
  
      // Use replaceState to redirect the user away and remove the querystring parameters
      window.history.replaceState({}, document.title, "/");
    }

};

}


const logout = () => {
  auth0.logout({
    returnTo: window.location.origin
  });
};


const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin
  });
};


// const auth0 = await createAuth0Client({
//   domain: 'melandalin.us.auth0.com',
//   client_id: 'uejGHfjRbCHNHgrQCBruC7L6CoknpcGA',
//   useRefreshTokens: true
// });

// Request a new access token using a refresh token

//   // NEW
const updateUI = async () => {
    const isAuthenticated = await auth0.isAuthenticated();    document.getElementById("btn-logout").disabled = !isAuthenticated;

    
    
    document.getElementById("btn-login").disabled = isAuthenticated;
  // NEW - add logic to show/hide gated content after authentication
    if (isAuthenticated) {
    document.getElementById("gated-content").classList.remove("hidden");

    document.getElementById(
      "ipt-access-token"
    ).innerHTML = await auth0.getTokenSilently(); //this is calling our renewal tokens


    
    document.getElementById("ipt-user-profile").textContent = JSON.stringify(
      await auth0.getUser()
    );

  } else {
    document.getElementById("gated-content").classList.add("hidden");
  }


};





//CALLING THE RULES DATA FROM MANAGEMENT API


var axios = require("axios").default;

console.log("made it past....!");

// NEED TO DEBUG BELOW
var options = {
  method: 'GET',
  url: 'https://melandalin.us.auth0.com/api/v2/rules',
  headers: {'content-type': 'application/json', authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InB1WUxZejBSQjc5bG1oX1pUTHpsZSJ9.eyJpc3MiOiJodHRwczovL21lbGFuZGFsaW4udXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYwZGU2ZTFjN2FlOWE2MDA2OWYyNGZmZSIsImF1ZCI6WyJodHRwczovL21lbGFuZGFsaW4udXMuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL21lbGFuZGFsaW4udXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTYzMzQ3ODI5NSwiZXhwIjoxNjMzNzc4Mjk1LCJhenAiOiJ1ZWpHSGZqUmJDSE5IZ3JRQ0JydUM3TDZDb2tucGNHQSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.Ll99XkE-xciotZ8wtHDkGT-Oltp6m02fgG6N4jFuDnKctBuQ4gjLzpEHX1-zc7Y6_koo80DFCwcSbmHQuHcESFT9Zg2I1HPxo44FaV585gZgXAoJ5mYFNFADe0haEYutulU5EC5pSokE_D6-wAP5FSgidBx1cVQCHwUBPycTUZKsUwclBwxPqf-eDaJzi1VvKEmtHM3RnRuxBmLtRCFnF9pPfnVhJFrjgoW23Ikgit0VpNcbuM6NNN_b28lSuloGhAFtrCzZJLDhdmDpMW2KvF4IiHXVQl3VgauYzEYqnFwzmaaknUrg6aTmBIFK6uSyYGiyLEVvhqJ_a2O2LUzdYg'}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});

