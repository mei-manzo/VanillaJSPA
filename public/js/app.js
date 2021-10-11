let auth0 = null; //may need to add back

// /** /// DATA RETRIEVAL CODE BELOWvvvv
//  * Executes the logout flow

// import createAuth0Client from '@auth0/auth0-spa-js';
//calling on Auth0Manager to produce data
//now that we are requiring this file, everytime app.js gets called, Auth0Manager gets called as well
// const second = require("./chain"); //calling on Auth0Manager.js file
// const result = second.getMyTokenAgain();
// var request = require("request"); //added in

// console.log(result);
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
// if (typeof window !== 'undefined') {
//   // window.localStorage.setItem("name", "Mei!");
//   console.log("yeah");
// } else {
//   console.log("not saved to window!");
// };


// // Will run when page finishes loading

////
if (typeof window !== "undefined") {
  // browser code
  window.onload = async () => {
    await configureClient();

//     // NEW - update the UI state
    updateUI();
    const isAuthenticated = await auth0.isAuthenticated();
    // const XMLHttpRequest = require ("xhr2");
  
    // const xhr = new XMLHttpRequest();


    // function httpGetAsync(theUrl)
    // {
    //     var xmlHttp = new XMLHttpRequest();
    //     xmlHttp.onreadystatechange = function() { 
    //         if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
    //             console.log("try this");
    //             console.log(this.responseText);
    //             localStorage.setItem("trying", this.responseText);
    //             console.log("fish");
    //             console.log("try this");
    //             return ("diamond");
    //     }
    //     xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    //     xmlHttp.send(null);
    // }
    
    window.localStorage.setItem("done", httpGetAsync('http://localhost:7000/'));

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





////Update UI dynamically

const updateUI = async () => {

    const isAuthenticated = await auth0.isAuthenticated();    
    const asyncLocalStorage = {
      getItem: async function () {
          await null;
          return localStorage.getItem("testing");
      }
    };

    // asyncLocalStorage.getItem("testing").then(function () {
    //   return asyncLocalStorage.getItem("testing")
    // })

    document.getElementById("btn-logout").disabled = !isAuthenticated;

    document.getElementById("btn-login").disabled = isAuthenticated;


  // NEW - add logic to show/hide gated content after authentication
    if (isAuthenticated) {
      
    document.getElementById("gated-content").classList.remove("hidden");

    document.getElementById(
      "ipt-access-token"
    ).innerHTML = await auth0.getTokenSilently(); //this is calling our renewal tokens

    document.getElementById("ipt-user-profile").innerHTML = JSON.stringify(
      await auth0.getUser()
    );

    // async function setTimeouts(){
    //   // let aToken = localStorage.getItem("testing");

    //   let promise = new Promise((resolve, reject) => {
    //     setTimeout(() => resolve(localStorage.getItem("testing")), 1000)
    //   });
    //   let result = await promise;
    //   console.log(result);
    //   // return Promise.resolve(aToken);
    // }

    document.getElementById("ipt-user-rules").innerHTML = JSON.stringify(
      await asyncLocalStorage.getItem("testing").then(function () {
        return asyncLocalStorage.getItem("testing")
      })); //returns null
    

  } else {
    document.getElementById("gated-content").classList.add("hidden");
  }

};



  // document.getElementById("again").innerHTML = noodle;


// document.getElementById("testing").innerHTML = "ppp";


//defining localStorage
var LocalStorage = require('node-localstorage').LocalStorage, //here we are defining the localstorage variable
localStorage = new LocalStorage('./scratch');


// Import the filesystem module
const fs = require("fs");
  
let directory_name = "example_dir";
  
// Function to get current filenames
// in directory
let filenames = fs.readdirSync('./scratch');
  
// console.log("\nFilenames in directory:");
filenames.forEach((file) => {
    // console.log("File:", file);
});


// fs.readFile('index.html', 'utf8' , (err, data) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log(data)
// })
// const fetch = require ("node-fetch");


fetch('scratch/testing')
  .then(response => response.text())
  .then(text => console.log(text))
  // outputs the content of the text file



// console.log(localStorage.getItem("testing"));

// async function setTimeouts(){
//       // let aToken = localStorage.getItem("testing");

//   let promise = new Promise((resolve, reject) => {
//       setTimeout(() => resolve(localStorage.getItem("testing")), 100000)
//       });
//   let result = await promise;
//       console.log(result);
//       console.log("birch");
//       // return Promise.resolve(aToken);
// }
// console.log("birch1");

// const asyncLocalStorage = {
//   getItem: async function () {
//       await null;
//       // return localStorage.getItem("testing");
//       let promise = new Promise((resolve, reject) => {
//         setTimeout(() => resolve(localStorage.getItem("testing")), 1000);
//         reject("failed1")
//       });
//       let result = await promise;
//       console.log(result);
//   }
// };
// console.log(asyncLocalStorage.getItem("testing").then(function () {
//   return asyncLocalStorage.getItem("testing")
// }))
// asyncLocalStorage.getItem("testing").then(function () {
//   return asyncLocalStorage.getItem("testing")
// })


const { response } = require('express');
const { token } = require('morgan');




var request = require("request"); //requests bearer management API token, should work

var options = { method: 'POST',
  url: 'https://melandalin.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"uejGHfjRbCHNHgrQCBruC7L6CoknpcGA","client_secret":"7FYXeYhIA_snqdH7x9NVbgYrxsI5tt93z3ZY09BISsRY1cf9tW2COxIUiwy0X1iQ","audience":"https://melandalin.us.auth0.com/api/v2/","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);


});



///HTTP request to fetch management data from backend server



// function thisData(){ //need to debug how to serve http request within a function
//     // we defined the xhr
//   var XMLHttpRequest = require ("xhr2");
  
//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function () {
//         if (this.readyState != 4) return;
    
//         if (this.status == 200) {
//             // console.warn(xhr.responseText)
//             var data = JSON.parse(this.responseText);
//             // console.log(data);
//             localStorage.setItem("rulesData", JSON.stringify(data));
//             return ("spaghetti");
//             // we get the returned data
//         }
    
//         // end of state change: it can be after some time (async)
//   };
    
//   xhr.open('GET', 'http://localhost:7000/', true);
//   xhr.send();  
// }

// console.log(thisData());

// var XMLHttpRequest = require ("xhr2");
  
// var xhr = new XMLHttpRequest();
    // we defined the xhr
    
  // xhr.onreadystatechange = function () {
  //       if (this.readyState != 4) return;
    
  //       if (this.status == 200) {
  //           // console.warn(xhr.responseText)
  //           var data = JSON.parse(this.responseText);
  //           // console.log(data);
  //           localStorage.setItem("rulesData", JSON.stringify(data));
  //           // we get the returned data
  //       }
    
  //       // end of state change: it can be after some time (async)
  // };
    
  // xhr.open('GET', 'http://localhost:7000/', true);
  // xhr.send();

//   function httpGetAsync(theUrl)
// {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function() { 
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//             console.log("try this");
//             console.log(this.responseText);
//             localStorage.setItem("trying", this.responseText);
//             console.log("fish");
//             console.log("try this");
//     }
//     xmlHttp.open("GET", theUrl, true); // true for asynchronous 
//     xmlHttp.send(null);
// }

// httpGetAsync('http://localhost:7000/');