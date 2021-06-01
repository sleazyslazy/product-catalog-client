import $ from "jquery";

export function getBackendURL(path) {
    //let domain = "http://localhost:8080" + path;
    //If no domain use the hostname to derive it
    let domain = window.ENV.API_URL;
    if (!domain) {
        domain = window.location.host;
        console.log("Using domain " + domain);
        // Handle case in openshift to change route to server
        domain = domain.replace("client", "server");
        // Handle case for local development
        domain = domain.replace("9000", "8080");
        domain = "http://" + domain;
    }

    let result = domain + path;
    console.log("Using path " + result);
    return result;
}

export function getUser() {
    if (localStorage.getItem('user') === null) return {};
    else return JSON.parse(localStorage.getItem('user'));
}

export function setUser(user, authData) {
    user.authData = authData;
    localStorage.setItem('user', JSON.stringify(user));
}

export function clearUser() {
    localStorage.removeItem('user');
}

export function authHeader() {
    // return authorization header with basic auth credentials
    let user = getUser();

    if (user && user.authData) {
        return { 'Authorization': 'Basic ' + user.authData , 'user_key': window.ENV.API_KEY };
    } else {
        return {'user_key': window.ENV.API_KEY};
    }
}

// export function authHeader() {
//     // return authorization header with basic auth credentials
//     let user = getUser();

//     var headers = {}

//     if (user && user.authData) {
//         headers.push({ 'Authorization': 'Basic ' + user.authData });
//     }

//     if (window.ENV.API_KEY) {
//         headers.push({'user_key': window.ENV.API_KEY});
//     }

//     return headers;
// }

export function isLoggedIn() {
    let user = getUser();

    console.log("User: " + user);

    if ($.isEmptyObject(user)) {
        console.log("User is logged out");
        return false;
    } else {
        console.log("User is logged in");
        return true;
    }
}
