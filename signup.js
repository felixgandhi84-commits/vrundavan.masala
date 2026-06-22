import {
auth,
createUserWithEmailAndPassword
}
from "./firebase.js";

window.registerUser = async function(){

    let name =
    document.getElementById("name").value.trim();

    let email =
    document.getElementById("email").value.trim();

    let password =
    document.getElementById("password").value.trim();

    if(name.length < 3){
        alert("Enter valid name");
        return;
    }

    try{

        let userCredential =
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        localStorage.setItem(
            "name",
            name
        );

        alert(
        "Account Created Successfully!"
        );

        window.location.href =
        "login.html";

    }
    catch(error){

        alert(error.message);

    }
}