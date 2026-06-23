import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
getFirestore,
collection,
getDocs,
doc,
getDoc,
updateDoc,
query,
orderBy
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

async function checkAdmin(){

    let uid =
    localStorage.getItem("userUID");

    if(!uid){

        alert("Please Login First");

        window.location.href =
        "login.html";

        return;
    }

    const adminRef =
    doc(db,"admins",uid);

    const adminSnap =
    await getDoc(adminRef);

    if(!adminSnap.exists()){

        alert("Access Denied");

        window.location.href =
        "index.html";

        return;
    }

    loadAllOrders();
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

    let totalOrders = 0;
    let totalRevenue = 0;
    let shippedOrders = 0;
    let deliveredOrders = 0;

    let ordersDiv =
    document.getElementById("admin-orders");

    ordersDiv.innerHTML = "";

    const q = query(
        collection(db,"orders"),
        orderBy("orderDate","desc")
    );

    const snapshot =
    await getDocs(q);

    snapshot.forEach(orderDoc => {

        let order =
        orderDoc.data();

        totalOrders++;

        totalRevenue +=
        Number(order.total || 0);

        if(order.status === "Shipped"){
            shippedOrders++;
        }

        if(order.status === "Delivered"){
            deliveredOrders++;
        }

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

            <div class="order-info">

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
                    <b>Order Time:</b>
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
                    <b>Total:</b>
                    ₹${order.total || 0}
                </p>

                <p>
                    <b>Email:</b>
                    ${order.email || ""}
                </p>

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
    });

    document.getElementById(
    "total-orders"
    ).innerText =
    totalOrders;

    document.getElementById(
    "total-revenue"
    ).innerText =
    "₹" + totalRevenue;

    document.getElementById(
    "shipped-orders"
    ).innerText =
    shippedOrders;

    document.getElementById(
    "delivered-orders"
    ).innerText =
    deliveredOrders;

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

        loadAllOrders();

    }
    catch(error){

        console.error(error);

        alert(
        "Status Update Failed!"
        );
    }
};
checkAdmin();