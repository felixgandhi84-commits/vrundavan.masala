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

function placeOrder() {

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

    let message =
        "Hello Vrundavan Masala,%0A%0AOrder Details:%0A";

    cartItems.forEach(function(item){

        let quantity = item.quantity || 1;

        let itemTotal =
            item.price * quantity;

        total += itemTotal;

        message +=
            "- " + item.name +
            " × " + quantity +
            " = ₹" + itemTotal +
            "%0A";
    });

    message +=
        "%0A Total = ₹" + total;

    message +=
        "%0A🚚 Delivery Charges: As per courier charges";

    message +=
        "%0A%0AName: " + name;

    message +=
        "%0AMobile: " + mobile;

    message +=
        "%0AAddress: " + address;

    window.open(
        "https://wa.me/917405648909?text=" + message,
        "_blank"
    );

    localStorage.removeItem("cartItems");
}