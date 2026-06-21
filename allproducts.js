let selectedWeights = {};
const params = new URLSearchParams(window.location.search);

const searchText =
(params.get("search") || "").toLowerCase();
function refreshProducts(){

    let scrollPos = window.scrollY;

    let searchBox =
        document.getElementById("searchInput");

    let searchValue =
        searchBox ? searchBox.value : "";

    renderAllProducts();

    if(searchValue){
        searchProducts();
    }

    setTimeout(() => {
        window.scrollTo(0, scrollPos);
    }, 0);
}

function renderAllProducts(){

    let productContainer =
    document.getElementById("products");

    if(!productContainer) return;

    productContainer.innerHTML = "";

    products
    .filter(product =>
        product.name.toLowerCase().includes(searchText)
    )
    .forEach(function(product){
        let selectedWeight =
    selectedWeights[product.name] || "50gm";

let fullName =
    product.name + " (" + selectedWeight + ")";

let qty =
    getProductQty(fullName);

        productContainer.innerHTML += `
        <div class="card product-card">

            <img src="${product.image}" alt="${product.name}" class="product-img">

            <h3>${product.name}</h3>

           <select
data-prices='${JSON.stringify(product.prices)}'
onchange="updateSelectedWeight(this);">

<option value="50gm"
${(selectedWeights[product.name] || "50gm")==="50gm" ? "selected" : ""}>
50gm
</option>

<option value="100gm"
${(selectedWeights[product.name] || "50gm")==="100gm" ? "selected" : ""}>
100gm
</option>

<option value="250gm"
${(selectedWeights[product.name] || "50gm")==="250gm" ? "selected" : ""}>
250gm
</option>

<option value="500gm"
${(selectedWeights[product.name] || "50gm")==="500gm" ? "selected" : ""}>
500gm
</option>

<option value="1kg"
${(selectedWeights[product.name] || "50gm")==="1kg" ? "selected" : ""}>
1kg
</option>

</select>

            <p class="price">
₹${product.prices[selectedWeights[product.name] || "50gm"]}
</p>

            <div class="cart-control">

${qty > 0 ?

`

<div class="qty-box">

<button onclick="
decreaseProductQty('${fullName}');
refreshProducts();
">
--

</button>

<span>
${qty}
</span>

<button onclick="
increaseProductQty('${fullName}');
refreshProducts();
">
+ </button>

</div>
`

:

`
<button onclick="
let card=this.closest('.product-card');
let weight=card.querySelector('select').value;

let productName='${product.name}';
let fullName=productName + ' (' + weight + ')';

let price=products.find(
p=>p.name===productName
).prices[weight];

addToCart(fullName,price);

refreshProducts();
">
Add To Cart </button>
`
}

</div>




            <button onclick="orderNow('${product.name}')">
                Order on WhatsApp
            </button>

        </div>
        `;
    });
}

renderAllProducts();
document
.querySelectorAll(".product-card select")
.forEach(select=>{
    updateSelectedWeight(select);
});
function updateSelectedWeight(select){

    let card = select.closest(".product-card");

    let productName =
        card.querySelector("h3").innerText;

    let weight = select.value;
    selectedWeights[productName] = weight;

    let product =
        products.find(p => p.name === productName);

    card.querySelector(".price").innerText =
        "₹" + product.prices[weight];

    let fullName =
        productName + " (" + weight + ")";

    let qty =
        getProductQty(fullName);

    let cartControl =
        card.querySelector(".cart-control");

    if(qty > 0){

        cartControl.innerHTML = `
        <div class="qty-box">

            <button onclick="
            decreaseProductQty('${fullName}');
            refreshProducts();
            ">
            -
            </button>

            <span>${qty}</span>

            <button onclick="
            increaseProductQty('${fullName}');
            refreshProducts();
            ">
            +
            </button>

        </div>
        `;
    }
    else{

        cartControl.innerHTML = `
        <button onclick="
        let price =
        products.find(
        p=>p.name==='${productName}'
        ).prices['${weight}'];

        addToCart(
        '${fullName}',
        price
        );

        refreshProducts();
        ">
        Add To Cart
        </button>
        `;
    }
}