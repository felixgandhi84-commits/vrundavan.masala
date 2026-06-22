import { auth } from "./firebase.js";

import {
db,
collection,
addDoc
}
from "./firebase.js";

let cartItems =
JSON.parse(localStorage.getItem("cartItems")) || [];

let summaryDiv =
document.getElementById("order-summary");

let total = 0;

cartItems.forEach(function(item){

    let quantity = item.quantity || 1;

    let itemTotal =
        item.price * quantity;

    total += itemTotal;

    summaryDiv.innerHTML += `
        <p>
            ${item.name}
            × ${quantity}
            = ₹${itemTotal}
        </p>
    `;
});

document.getElementById("checkout-total").innerText =
    "Total = ₹" + total;

async function placeOrder(){

    let user =
    localStorage.getItem("loggedInUser");

    if(!user){

        alert("Please Login / Sign Up First");

        window.location.href =
        "login.html";

        return;
    }

    let name =
        document.getElementById("customerName").value.trim();

    let mobile =
        document.getElementById("customerMobile").value.trim();

    let address =
        document.getElementById("customerAddress").value.trim();

    if(name.length < 3){
        alert("Name must contain at least 3 letters.");
        return;
    }

    if(mobile.length !== 10 || isNaN(mobile)){
        alert("Enter valid 10 digit mobile number.");
        return;
    }

    if(address.length < 20){
        alert("Please enter complete address.");
        return;
    }

    let cartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];

    let total = 0;

    cartItems.forEach(item => {

        total +=
        item.price *
        (item.quantity || 1);

    });

    try{

        await addDoc(
            collection(db,"orders"),
            {
                uid:
                localStorage.getItem("userUID"),

                email:
                localStorage.getItem("loggedInUser"),

                customerName: name,

                mobile: mobile,

                address: address,

                products: cartItems,

                total: total,

                status: "Confirmed",

                orderDate:
                new Date().toISOString()
            }
        );

        localStorage.removeItem("cartItems");

        window.location.href =
        "success.html";

    }
    catch(error){

        console.error(error);

        alert(
        "Order save failed!"
        );

    }
}

window.placeOrder = placeOrder;