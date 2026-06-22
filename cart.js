import { auth } from "./firebase.js";

window.goToCheckout = function(){

    let user =
    localStorage.getItem("loggedInUser");

    console.log(user);

    if(!user){

        alert("Please Login / Sign Up First");

        window.location.href = "login.html";

        return;
    }

    window.location.href = "checkout.html";
}

let cartItems =
JSON.parse(localStorage.getItem("cartItems")) || [];

let cartDiv =
document.getElementById("cart-items");

let total = 0;

function loadCart(){

    cartDiv.innerHTML = "";

    total = 0;

    cartItems.forEach(function(item,index){

        let quantity = item.quantity || 1;

        let itemTotal =
            item.price * quantity;

        total += itemTotal;

        cartDiv.innerHTML += `
<div class="cart-item">

    <div class="cart-image">
        <img src="${item.image}" alt="${item.name}">
    </div>

    <div class="cart-details">

        <h3>${item.name}</h3>

        <p class="price">₹${item.price}</p>

        <p class="qty-price">
            ₹${item.price} × ${quantity}
        </p>

        <p class="subtotal">
            Subtotal: ₹${itemTotal}
        </p>

    </div>

    <div class="cart-actions">

        <button onclick="decreaseQty(${index})">
            -
        </button>

        <span>${quantity}</span>

        <button onclick="increaseQty(${index})">
            +
        </button>

    </div>

</div>
`;
    });

    document.getElementById("total-price").innerText =
    "Total: ₹" + total;

    localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
    );
}

function increaseQty(index){

    cartItems[index].quantity++;

    localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
    );

    loadCart();
}

function decreaseQty(index){

    if(cartItems[index].quantity > 1){

        cartItems[index].quantity--;

    }else{

        cartItems.splice(index,1);

    }

    localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
    );

    loadCart();
}

function removeItem(index){

    cartItems.splice(index,1);

    localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
    );

    loadCart();
}

loadCart();

window.increaseQty = increaseQty;
window.decreaseQty = decreaseQty;
window.removeItem = removeItem;