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

            <div>
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
            </div>

            <div>

                <button onclick="decreaseQty(${index})">
                    -
                </button>

                ${quantity}

                <button onclick="increaseQty(${index})">
                    +
                </button>

                <button onclick="removeItem(${index})">
                    ❌
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