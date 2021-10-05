// // The Auth0 client, initialized in configureClient()
let auth0 = null;

// "domain": "melandalin.us.auth0.com",
// "clientId": "uejGHfjRbCHNHgrQCBruC7L6CoknpcGA"

//the start of our Auth0 token renewal code vvvv
import createAuth0Client from '@auth0/auth0-spa-js';

// either with async/await
const auth0 = await createAuth0Client({
  domain: 'melandalin.us.auth0.com',
  client_id: 'uejGHfjRbCHNHgrQCBruC7L6CoknpcGA'
});
/////end of Auth0 renewal code^^^



// /**
//  * Executes the logout flow
//  */
const logout = () => {
  auth0.logout({
    returnTo: window.location.origin
  });
};

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
    client_id: config.clientId
  });
};

// /**
//  * Checks to see if the user is authenticated. If so, `fn` is executed. Otherwise, the user
//  * is prompted to log in
//  * @param {*} fn The function to execute if the user is logged in
//  */
// const requireAuth = async (fn, targetUrl) => {
//   const isAuthenticated = await auth0.isAuthenticated();

//   if (isAuthenticated) {
//     return fn();
//   }

//   return login(targetUrl);
// };

// // Will run when page finishes loading
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
  
//   // NEW
const updateUI = async () => {
    const isAuthenticated = await auth0.isAuthenticated();
  
    document.getElementById("btn-logout").disabled = !isAuthenticated;
    document.getElementById("btn-login").disabled = isAuthenticated;
  // NEW - add logic to show/hide gated content after authentication
    if (isAuthenticated) {
    document.getElementById("gated-content").classList.remove("hidden");

    document.getElementById(
      "ipt-access-token"
    ).innerHTML = await auth0.getTokenSilently();

    document.getElementById("ipt-user-profile").textContent = JSON.stringify(
      await auth0.getUser()
    );

  } else {
    document.getElementById("gated-content").classList.add("hidden");
  }


};

//   // If unable to parse the history hash, default to the root URL
// if (!showContentFromUrl(window.location.pathname)) {
//     showContentFromUrl("/");
//     window.history.replaceState({ url: "/" }, {}, "/");
//   }

// const bodyElement = document.getElementsByTagName("body")[0];

//   // Listen out for clicks on any hyperlink that navigates to a #/ URL
// bodyElement.addEventListener("click", (e) => {
//     if (isRouteLink(e.target)) {
//       const url = e.target.getAttribute("href");

//       if (showContentFromUrl(url)) {
//         e.preventDefault();
//         window.history.pushState({ url }, {}, url);
//       }
//     }
//   });

// const isAuthenticated = await auth0.isAuthenticated();

// if (isAuthenticated) {
//     console.log("> User is authenticated");
//     window.history.replaceState({}, document.title, window.location.pathname);
//     updateUI();
//     return;
//   }

// console.log("> User not authenticated");

// const query = window.location.search;
// const shouldParseResult = query.includes("code=") && query.includes("state=");

// if (shouldParseResult) {
//     console.log("> Parsing redirect");
//     try {
//       const result = await auth0.handleRedirectCallback();

//       if (result.appState && result.appState.targetUrl) {
//         showContentFromUrl(result.appState.targetUrl);
//       }

//       console.log("Logged in!");
//     } catch (err) {
//       console.log("Error parsing redirect:", err);
//     }

//     window.history.replaceState({}, document.title, "/");
//   }

//   updateUI();
// };

const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin
  });
};