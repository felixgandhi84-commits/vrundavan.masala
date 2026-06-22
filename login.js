import { auth } from "./firebase.js";

import {
RecaptchaVerifier,
signInWithPhoneNumber
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

window.recaptchaVerifier =
new RecaptchaVerifier(
auth,
"recaptcha-container",
{
    size: "compact"
}
);

window.sendOTP = async function(){

    let phoneNumber =
    document
    .getElementById("phoneNumber")
    .value
    .trim();

    try{

        let confirmationResult =
        await signInWithPhoneNumber(
            auth,
            phoneNumber,
            window.recaptchaVerifier
        );

        window.confirmationResult =
        confirmationResult;

        alert("OTP Sent!");

    }
    catch(error){

    console.error(error);

    alert(error.code);

    alert(error.message);

}
};

window.verifyOTP = async function(){

    let otp =
    document
    .getElementById("otp")
    .value
    .trim();

    try{

        let result =
        await window.confirmationResult.confirm(
            otp
        );

        localStorage.setItem(
            "loggedInUser",
            result.user.phoneNumber
        );

        localStorage.setItem(
            "userUID",
            result.user.uid
        );

        alert(
        "Login Successful!"
        );

        window.location.href =
        "index.html";

    }
    catch(error){

    console.error(error);

    alert(error.code);

    alert(error.message);

}
};