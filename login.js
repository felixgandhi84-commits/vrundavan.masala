alert("login.js loaded");

import {
auth,
signInWithEmailAndPassword
}
from "./firebase.js";

window.loginUser = async function(){

    let email =
    document.getElementById("loginEmail").value.trim();

    let password =
    document.getElementById("loginPassword").value.trim();

    try{

        let userCredential =
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        localStorage.setItem(
            "loggedInUser",
            email
        );

        localStorage.setItem(
            "userUID",
            userCredential.user.uid
        );

        alert(
        "Login Successful!"
        );

        window.location.href =
        "index.html";

    }
    catch(error){

        alert(error.message);

    }
}