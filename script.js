
let cartCount = 0;
let cartItems = [];

function orderNow(product) {
    let number = "917405648909";

    let message =
        "Hello Vrundavan Masala,%0A%0AI want to order: " + product;

    window.open(
        "https://wa.me/" + number + "?text=" + message,
        "_blank"
    );}
function addToCart(product, price, image) {
    console.log("Product:", product);
console.log("Price:", price);


    if(price === undefined){
        alert("Price not found!");
        return;
    }

    let cartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];

    let existingItem =
        cartItems.find(item => item.name === product);

    if(existingItem){
        existingItem.quantity++;
    }
    else{
        cartItems.push({
    name: product,
    price: Number(price),
    image: image,
    quantity: 1
});
    }

    localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
    );

    updateCartCount();

if(document.getElementById("home-products")){
    searchProducts();
}

if(document.getElementById("products")){
    renderAllProducts();
}
}
function viewCart() {

    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "Items in Cart:\n\n";

    cartItems.forEach(function(item, index) {
        message += (index + 1) + ". " + item + "\n";
    });

    alert(message);
}
window.onload = function() {

    let user = localStorage.getItem("loggedInUser");

    if(user){
        document.getElementById("user-name").innerText =
            "Welcome, " + user;

        document.getElementById("logout-btn").style.display =
            "inline";
    }

    let cartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];

    document.getElementById("cart-count").innerText =
        cartItems.length;
}
function logoutUser() {

    localStorage.removeItem("loggedInUser");

    alert("Logged Out Successfully!");

    window.location.href = "login.html";
}
function addSelectedToCart(button, productName){

    let select = button.parentElement.querySelector("select");

    let weight = select.value;

    let prices = JSON.parse(select.dataset.prices);

    let price = Number(prices[weight]);

    addToCart(productName + " (" + weight + ")", price);
}
function searchProducts(){

    let searchBox =
        document.getElementById("searchInput");

    if(!searchBox) return;

    let input =
        searchBox.value.toLowerCase().trim();

    if(document.getElementById("home-products")){
        let hero = document.getElementById("hero-section");
let about = document.getElementById("about-section");
let featured = document.getElementById("featured-section");

if(input !== ""){

    hero.style.display = "none";
    about.style.display = "none";
    featured.style.display = "none";

}else{

    hero.style.display = "";
    about.style.display = "";
    featured.style.display = "";
}

        if(input === ""){

            renderProducts(products.slice(0,5));
            return;
        }

        let filteredProducts =
            products.filter(product =>
                product.name
                .toLowerCase()
                .includes(input)
            );
            console.log("Search:", input);
console.log("Results:", filteredProducts);
console.log("Count:", filteredProducts.length);
        renderProducts(filteredProducts);
    }

    else if(document.getElementById("products")){

        let cards =
            document.querySelectorAll(".product-card");

        cards.forEach(card => {

            let productName =
                card.querySelector("h3")
                .innerText
                .toLowerCase();

            card.style.display =
                productName.includes(input)
                ? "block"
                : "none";
        });
    }
}
function updateCartCount(){

    let cartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];

    let totalQty = 0;

    cartItems.forEach(item=>{
        totalQty += item.quantity || 1;
    });

    let cartCount =
        document.getElementById("cart-count");

    if(cartCount){
        cartCount.innerText = totalQty;
    }
}
function increaseProductQty(productName, price){

    let cartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];

    let item =
        cartItems.find(item => item.name === productName);

    if(item){
        item.quantity++;
    }

    localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
    );

    updateCartCount();

if(document.getElementById("products")){
    renderAllProducts();
}
if(document.getElementById("home-products")){
    searchProducts();
}
}

function decreaseProductQty(productName){

    let cartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];

    let itemIndex =
        cartItems.findIndex(item => item.name === productName);

    if(itemIndex !== -1){

        cartItems[itemIndex].quantity--;

        if(cartItems[itemIndex].quantity <= 0){
            cartItems.splice(itemIndex,1);
        }
    }

    localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
    );

   updateCartCount();

if(document.getElementById("products")){
    renderAllProducts();
}
if(document.getElementById("home-products")){
    searchProducts();
}
}

function getProductQty(productName){

    let cartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];

    let item =
        cartItems.find(item => item.name === productName);

    return item ? item.quantity : 0;
}

function updateProductControls(card){

    let productName = getSelectedProductName(card);

    let qty = getProductQty(productName);

    return qty;
}
function getProductQtyByWeight(productName,weight){

    return getProductQty(
        productName + " (" + weight + ")"
    );
}
function getSelectedProductName(card){

    let productName =
        card.querySelector("h3").innerText;

    let weight =
        card.querySelector("select").value;

    return productName + " (" + weight + ")";
}
let user =
localStorage.getItem("loggedInUser");

if(user === "felixgandhi84@gmail.com"){

    document.getElementById("admin-link")
    .style.display = "inline";
}