function refreshHomeProducts(){

    let scrollPos = window.scrollY;

    renderProducts(products.slice(0,5));

    let searchBox =
        document.getElementById("searchInput");

    if(searchBox && searchBox.value){
        searchProducts();
    }

    setTimeout(() => {
        window.scrollTo(0, scrollPos);
    }, 0);
}

let productContainer =
document.getElementById("home-products");

let selectedWeights = {};

function renderProducts(productList){

    productContainer.innerHTML = "";

    productList.forEach(function(product){

        let selectedWeight =
            selectedWeights[product.name] || "50gm";

        productContainer.innerHTML += `
        <div class="card product-card">

            <img src="${product.image}" alt="${product.name}" class="product-img">

            <h3>${product.name}</h3>

            <select class="weight-select"
                onchange="updatePrice(this)">

                <option value="50gm"
                ${selectedWeight === "50gm" ? "selected" : ""}>
                50gm
                </option>

                <option value="100gm"
                ${selectedWeight === "100gm" ? "selected" : ""}>
                100gm
                </option>

                <option value="250gm"
                ${selectedWeight === "250gm" ? "selected" : ""}>
                250gm
                </option>

                <option value="500gm"
                ${selectedWeight === "500gm" ? "selected" : ""}>
                500gm
                </option>

                <option value="1kg"
                ${selectedWeight === "1kg" ? "selected" : ""}>
                1kg
                </option>

            </select>

            <p class="price">
                ₹${product.prices[selectedWeight]}
            </p>

            <div class="cart-control"></div>

        </div>
        `;
    });

    document
    .querySelectorAll("#home-products .product-card")
    .forEach(card => {
        updateHomeCard(card);
    });
}

if(productContainer){

    renderProducts(products.slice(0,5));
}

function updatePrice(select){

    let card =
        select.closest(".product-card");

    let productName =
        card.querySelector("h3").innerText;

    let product =
        products.find(
            p => p.name === productName
        );

    let weight =
        select.value;

    selectedWeights[productName] = weight;

    card.querySelector(".price").innerText =
        "₹" + product.prices[weight];

    updateHomeCard(card);
}

function updateHomeCard(card){

    let productName =
        card.querySelector("h3").innerText;

    let weight =
        card.querySelector("select").value;

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
           refreshHomeProducts();
            ">
            -
            </button>

            <span>${qty}</span>

            <button onclick="
            increaseProductQty('${fullName}');
            refreshHomeProducts();
            ">
            +
            </button>

        </div>
        `;
    }
    else{

        let product =
            products.find(
                p => p.name === productName
            );

        cartControl.innerHTML = `
        <button onclick="
        addToCart(
'${fullName}',
${product.prices[weight]},
'${product.image}'
);
        refreshHomeProducts();
        ">
        Add To Cart
        </button>
        `;
    }
}