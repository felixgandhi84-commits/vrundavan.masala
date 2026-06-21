function loginUser() {

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let savedEmail = localStorage.getItem("email");
    let savedPassword = localStorage.getItem("password");

    if(email === savedEmail && password === savedPassword){

        localStorage.setItem(
            "loggedInUser",
            localStorage.getItem("name")
        );

        alert("Login Successful!");

        window.location.href = "index.html";

    }else{

        alert("Invalid Email or Password");

    }
}