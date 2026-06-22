import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
getFirestore,
collection,
getDocs,
doc,
updateDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let adminEmail =
localStorage.getItem("loggedInUser");

if(!adminEmail){

    alert("Please Login First");

    window.location.href =
    "login.html";

    throw new Error("Not Logged In");
}

if(adminEmail !== "felixgandhi84@gmail.com"){

    alert("Access Denied");

    window.location.href =
    "index.html";

    throw new Error("Not Admin");
}

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

async function loadAllOrders(){

    let ordersDiv =
    document.getElementById("admin-orders");

    ordersDiv.innerHTML = "";

    const snapshot =
    await getDocs(
        collection(db,"orders")
    );

    console.log(
        "Total Orders:",
        snapshot.size
    );

    snapshot.forEach(orderDoc => {

        let order =
        orderDoc.data();

        console.log(
            "ORDER:",
            order
        );

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
                Order Status
            </h3>

            <select
            onchange="updateStatus(
            '${orderDoc.id}',
            this.value)">
            
                <option value="Confirmed"
                ${order.status==="Confirmed"
                ?"selected":""}>
                Confirmed
                </option>

                <option value="Packed"
                ${order.status==="Packed"
                ?"selected":""}>
                Packed
                </option>

                <option value="Shipped"
                ${order.status==="Shipped"
                ?"selected":""}>
                Shipped
                </option>

                <option value="Delivered"
                ${order.status==="Delivered"
                ?"selected":""}>
                Delivered
                </option>

            </select>

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

            <p>
                <b>Total:</b>
                ₹${order.total || 0}
            </p>

            <p>
                <b>Email:</b>
                ${order.email || ""}
            </p>

            <ul>
                ${productsHTML}
            </ul>

        </div>
        `;
    });

    if(ordersDiv.innerHTML === ""){

        ordersDiv.innerHTML = `
        <p style="text-align:center;">
            No Orders Found
        </p>
        `;
    }
}

window.updateStatus =
async function(orderId,newStatus){

    try{

        await updateDoc(
            doc(db,"orders",orderId),
            {
                status:newStatus
            }
        );

        alert(
        "Status Updated Successfully!"
        );

    }
    catch(error){

        console.error(error);

        alert(
        "Status Update Failed!"
        );
    }
};

loadAllOrders();