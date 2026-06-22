import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
getFirestore,
doc,
getDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAS1tcG7WCprB3JsAwTP98-v-PtMFA-UBA",
  authDomain: "vrundavan-masala.firebaseapp.com",
  projectId: "vrundavan-masala",
  storageBucket: "vrundavan-masala.firebasestorage.app",
  messagingSenderId: "311444034414",
  appId: "1:311444034414:web:e9b83fb0b679b71964677f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const params =
new URLSearchParams(
window.location.search
);

const orderId =
params.get("id");

async function loadOrder(){

    let orderDiv =
    document.getElementById(
        "order-details"
    );

    const orderRef =
    doc(db,"orders",orderId);

    const orderSnap =
    await getDoc(orderRef);

    if(!orderSnap.exists()){

        orderDiv.innerHTML =
        "<p>Order Not Found</p>";

        return;
    }

    const order =
    orderSnap.data();

    let productsHTML = "";

    order.products.forEach(p => {

        productsHTML += `
        <li>
            ${p.name}
            × ${p.quantity}
        </li>
        `;
    });

    orderDiv.innerHTML = `

    <div class="order-card">

        <h3>
            Order #${orderId.slice(0,8)}
        </h3>

       <div class="order-info">

<p>
<b>Status:</b>
${order.status}
</p>

<p>
<b>Order Date:</b>
${new Date(order.orderDate)
.toLocaleString("en-IN",{
    day:"2-digit",
    month:"short",
    year:"numeric",
    hour:"2-digit",
    minute:"2-digit"
})}
</p>

<p>
<b>Total Amount:</b>
₹${order.total}
</p>

</div>
<div class="customer-details">

    <h4>
        Customer Details
    </h4>

    <p>
        <b>Name:</b>
        ${order.customerName || ""}
    </p>

    <p>
        <b>Mobile:</b>
        ${order.mobile || ""}
    </p>

    <p>
        <b>Address:</b>
        ${order.address || ""}
    </p>

</div>
        <div id="timeline-container">

        </div>

        <div class="order-products">

            <h4>
                Products Ordered
            </h4>

            <ul>
                ${productsHTML}
            </ul>

        </div>

    </div>
    `;

    createTimeline(
        order.status
    );
}

function createTimeline(status){

    let stages = [
        "Confirmed",
        "Packed",
        "Shipped",
        "Delivered"
    ];

    let current =
    stages.indexOf(status);

    let html = "";

    stages.forEach(
    (stage,index)=>{

        html += `
        <div class="
        timeline-step
        ${index <= current
        ? "active"
        : ""}
        ">

            <div class="
            timeline-dot
            "></div>

            <div class="
            timeline-text
            ">
                ${stage}
            </div>

        </div>
        `;
    });

    document.getElementById(
    "timeline-container"
    ).innerHTML = html;
}

loadOrder();