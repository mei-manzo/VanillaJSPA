//     audience: 'https://melandalin.us.auth0.com/api/v2/'
// let auth0 = null; //may need to add back

// /**
//  * Executes the logout flow



//calling on Auth0Manager to produce data
//now that we are requiring this file, everytime app.js gets called, Auth0Manager gets called as well
// const backend = require("./Auth0Manager"); //calling on Auth0Manager.js file
// const result = backend.Auth0Manage();


// console.log(JSON.stringify(result));
//  */

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
    //adding data to be rendered for rules
    // document.getElementById("ipt-user-rules").textContent = JSON.stringify(
    //   await auth0.getUser()
    // );

  } else {
    document.getElementById("gated-content").classList.add("hidden");
  }


};



// console.log(auth0);

//REQUESTING A MANAGEMENT API TOKEN - need to debug, has 401 permission errors for some reason
// var axios = require("axios").default;

// var tokenOptions = {
//   method: 'POST',
//   url: 'https://melandalin.us.auth0.com/oauth/token',
//   headers: {'content-type': 'application/x-www-form-urlencoded'},
//   data: {
//     grant_type: 'client_credentials',
//     client_id: 'uejGHfjRbCHNHgrQCBruC7L6CoknpcGA', //these taken from VanillaJSPA
//     client_secret: '7FYXeYhIA_snqdH7x9NVbgYrxsI5tt93z3ZY09BISsRY1cf9tW2COxIUiwy0X1iQ',//these taken from VanillaJSPA
//     audience: 'https://melandalin.us.auth0.com/api/v2/'
//   }
// };

// axios.request(tokenOptions).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });

//defining localStorage
var LocalStorage = require('node-localstorage').LocalStorage, //here we are defining the localstorage variable
localStorage = new LocalStorage('./scratch');


var request = require("request"); //requests bearer management API token, should work

var options = { method: 'POST',
  url: 'https://melandalin.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"uejGHfjRbCHNHgrQCBruC7L6CoknpcGA","client_secret":"7FYXeYhIA_snqdH7x9NVbgYrxsI5tt93z3ZY09BISsRY1cf9tW2COxIUiwy0X1iQ","audience":"https://melandalin.us.auth0.com/api/v2/","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  // console.log(body);

});




var myToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InB1WUxZejBSQjc5bG1oX1pUTHpsZSJ9.eyJpc3MiOiJodHRwczovL21lbGFuZGFsaW4udXMuYXV0aDAuY29tLyIsInN1YiI6Ikg1TkE2VW1VcHV2ZEFGWXFUeW85Y2pRejI4bnZoU3ZRQGNsaWVudHMiLCJhdWQiOiJodHRwczovL21lbGFuZGFsaW4udXMuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE2MzM1Mzk0NzUsImV4cCI6MTYzMzU2OTQ3NSwiYXpwIjoiSDVOQTZVbVVwdXZkQUZZcVR5bzljalF6MjhudmhTdlEiLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIHJlYWQ6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgZGVsZXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDphY3Rpb25zIHVwZGF0ZTphY3Rpb25zIGRlbGV0ZTphY3Rpb25zIGNyZWF0ZTphY3Rpb25zIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6aW5zaWdodHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpsb2dzX3VzZXJzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyB1cGRhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyB1cGRhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIHJlYWQ6bWZhX3BvbGljaWVzIHVwZGF0ZTptZmFfcG9saWNpZXMgcmVhZDpyb2xlcyBjcmVhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHVwZGF0ZTpyb2xlcyByZWFkOnByb21wdHMgdXBkYXRlOnByb21wdHMgcmVhZDpicmFuZGluZyB1cGRhdGU6YnJhbmRpbmcgZGVsZXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMgY3JlYXRlOnNpZ25pbmdfa2V5cyByZWFkOnNpZ25pbmdfa2V5cyB1cGRhdGU6c2lnbmluZ19rZXlzIHJlYWQ6bGltaXRzIHVwZGF0ZTpsaW1pdHMgY3JlYXRlOnJvbGVfbWVtYmVycyByZWFkOnJvbGVfbWVtYmVycyBkZWxldGU6cm9sZV9tZW1iZXJzIHJlYWQ6ZW50aXRsZW1lbnRzIHJlYWQ6YXR0YWNrX3Byb3RlY3Rpb24gdXBkYXRlOmF0dGFja19wcm90ZWN0aW9uIHJlYWQ6b3JnYW5pemF0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcnMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVycyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGNyZWF0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgcmVhZDpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.EscrtQ7xMEDfy-Ho7smK3aaCjecpG2w5kASyK8yi-XY3yxoAdglrHS7qS92GDnjr_URdnQXuOcN4xN4X41VAC1rAIjXcl7XJZZ2SPVk-a8JodF32REqw-dT5FGhNSkdfFcFA1eBRlX34BHcM4me3t-fDCft3l-7iZ9sD7eJtfBvm1TMtpqfZWrrcc0lwLwqaemge5gRK8g3ZiKAqEja3PNdOaCZ0iqODyJKC7Rz_yjdmIbTw1FZY7VJxdiUIrcsLmtiAhYB-2Ee0NRGBt7hbx_A8bX2uobUlEyhvdV1c41q9XTEjrudKQAUBKqkONWUQ6YMCk-OlThlBjjNNRW3SPg';

// NEED TO DEBUG BELOW
var axios = require("axios").default;


var options = {
  method: 'GET',
  url: 'https://melandalin.us.auth0.com/api/v2/rules', //Bearer token allows for Managment API access, manual works
  headers: {'content-type': 'application/json', authorization: 'Bearer ' + myToken}, //add a variable to swap in a new token
  scope: 'read:rules',
};

console.log("...");
console.log("...");

axios.request(options).then(function (response) {
  // console.log(response.data);
  userRules = response.data;
  localStorage.setItem("rules",JSON.stringify(userRules));//saving rules to scratch
}).catch(function (error) {
  // console.error(error);
});


//now we need a way to dynamically call the access token from the backendClient and add it into our data retrieval.
