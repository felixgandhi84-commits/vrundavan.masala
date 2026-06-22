import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
getFirestore,
collection,
getDocs
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

async function loadOrders(){

    let userUID =
    localStorage.getItem("userUID");

    if(!userUID){

        alert("Please Login First");

        window.location.href =
        "login.html";

        return;
    }

    let ordersDiv =
    document.getElementById("orders-list");

    ordersDiv.innerHTML = "";

    const snapshot =
    await getDocs(
        collection(db,"orders")
    );

    snapshot.forEach(doc => {

        let order = doc.data();

        if(order.uid === userUID){

            let productsHTML = "";

            if(
                order.products &&
                Array.isArray(order.products)
            ){

                order.products.forEach(p => {

                    productsHTML += `
                    <li>
                        ${p.name}
                        × ${p.quantity}
                    </li>
                    `;
                });

            }else{

                productsHTML =
                "<li>No product details found</li>";

            }

            ordersDiv.innerHTML += `
            <div class="order-card">

                <h3>
                    Status: ${order.status || "Confirmed"}
                </h3>

                <p>
                    Total: ₹${order.total || 0}
                </p>

                <p>
                    Order Date:
                    ${order.orderDate || ""}
                </p>

                <ul>
                    ${productsHTML}
                </ul>

            </div>
            `;
        }
    });

    if(ordersDiv.innerHTML === ""){

        ordersDiv.innerHTML = `
        <p style="text-align:center;">
            No Orders Found
        </p>
        `;
    }
}

loadOrders();