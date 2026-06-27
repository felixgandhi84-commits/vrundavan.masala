const aiButton = document.getElementById("ai-button");
const aiChat = document.getElementById("ai-chat");
const closeAI = document.getElementById("close-ai");
const sendBtn = document.getElementById("send-ai");
const voiceBtn = document.getElementById("voice-ai");
const input = document.getElementById("ai-input");
const messages = document.getElementById("ai-messages");

aiButton.onclick = () => {
    aiChat.style.display = "flex";
};

closeAI.onclick = () => {
    aiChat.style.display = "none";
};

function addMessage(text, cls = "ai-msg") {
    const div = document.createElement("div");
    div.className = cls;
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}
function showTyping() {
    const div = document.createElement("div");
    div.className = "ai-msg";
    div.id = "typing";

    div.innerHTML = "🤖 Thinking...";

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

function removeTyping() {
    const typing = document.getElementById("typing");

    if (typing) {
        typing.remove();
    }
}
function showProductCard(product){

    const card=document.createElement("div");

    card.className="ai-product-card";

    card.innerHTML=`

        <img src="${product.image}" alt="${product.name}">

        <h4>${product.name}</h4>

        <select id="weight-${product.name}">

${Object.keys(product.prices).map(weight => `
<option value="${weight}">
${weight} - ₹${product.prices[weight]}
</option>
`).join("")}

</select>
<div class="ai-qty-box">

<button onclick="changeQty('${product.name}',-1)">−</button>

<span id="qty-${product.name}">1</span>

<button onclick="changeQty('${product.name}',1)">+</button>

</div>

<button onclick="addToCartFromAI('${product.name}')">
🛒 Add To Cart
</button>

    `;

    messages.appendChild(card);

    messages.scrollTop=messages.scrollHeight;

}

async function askAI() {

    const question = input.value.trim();

    if (!question) return;

    addMessage(question, "ai-msg user-msg");
    showTyping();

    input.value = "";

    try {

        // Product list from products.js
        const productList = products.map(product => ({
            name: product.name,
            prices: product.prices
        }));

        const prompt = `
You are the official AI Shopping Assistant of Vrundavan Masala.

Available Products:
${JSON.stringify(productList)}

Rules:
- You are the official AI Shopping Assistant of Vrundavan Masala.
- You can understand English, Hindi and Gujarati.
- Always reply in the same language that the customer uses.
- Recommend ONLY products from the list above.
- Mention prices whenever possible.
- Help customers choose the correct masala.
- Suggest recipes if asked.
- If the user has a budget, recommend products within that budget.
- If the customer wants to add a product to the cart, clearly mention the product and weight.
- Keep replies short, friendly and helpful.
- Never invent products that are not in the list.

Customer Question:
${question}
`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        console.log(data);


        const reply =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Sorry, I couldn't understand.";
removeTyping();
addMessage(reply);
const lowerQuestion = question.toLowerCase();

const wantsCart =
    lowerQuestion.includes("add") ||
    lowerQuestion.includes("cart") ||
    lowerQuestion.includes("buy") ||
    lowerQuestion.includes("purchase") ||
    lowerQuestion.includes("add to cart") ||
    lowerQuestion.includes("kharid") ||
    lowerQuestion.includes("खरीद") ||
    lowerQuestion.includes("कार्ट") ||
    lowerQuestion.includes("કાર્ટ") ||
    lowerQuestion.includes("લે") ||
    lowerQuestion.includes("ઉમેર");

const matchedProduct = products.find(product =>
    reply.toLowerCase().includes(product.name.toLowerCase())
);

if (matchedProduct) {

    showProductCard(matchedProduct);

    if (wantsCart) {

        let weight = "50gm";

        if (lowerQuestion.includes("100")) weight = "100gm";
        if (lowerQuestion.includes("250")) weight = "250gm";
        if (lowerQuestion.includes("500")) weight = "500gm";
        if (
            lowerQuestion.includes("1kg") ||
            lowerQuestion.includes("1 kg") ||
            lowerQuestion.includes("1000")
        ) {
            weight = "1kg";
        }

        addToCart(
            matchedProduct.name + " (" + weight + ")",
            matchedProduct.prices[weight],
            matchedProduct.image
        );

        addMessage(
            "✅ " + matchedProduct.name + " (" + weight + ") added to your cart."
        );
    }
}

    } catch (err) {

        console.error(err);

        removeTyping();
addMessage("❌ Something went wrong.");

    }

}

sendBtn.onclick = askAI;

input.addEventListener("keypress", e => {

    if (e.key === "Enter") {

        askAI();

    }

});
function changeQty(productName, change){

    const qty = document.getElementById("qty-" + productName);

    let value = parseInt(qty.innerText);

    value += change;

    if(value < 1){
        value = 1;
    }

    qty.innerText = value;
}
function addToCartFromAI(productName){

    const product = products.find(p => p.name === productName);

    if(!product){
        return;
    }

    const weight =
document.getElementById("weight-" + product.name).value;
const quantity = parseInt(
    document.getElementById("qty-" + product.name).innerText
);

for(let i = 0; i < quantity; i++){

    addToCart(
        product.name + " (" + weight + ")",
        product.prices[weight],
        product.image
    );

}
    alert(product.name + " added to cart.");
    console.log(typeof addToCart);

}
document.querySelectorAll(".ai-chip").forEach(chip => {

    chip.onclick = () => {

        input.value = chip.innerText;

        askAI();

    };

});
const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if(SpeechRecognition){

    const recognition = new SpeechRecognition();

 recognition.lang = "hi-IN";

recognition.maxAlternatives = 3;

    recognition.interimResults = false;

    recognition.continuous = false;

    voiceBtn.onclick = () =>{

        recognition.start();

    };

    recognition.onresult = (event)=>{

        input.value =
        event.results[0][0].transcript;
        console.log("Voice:", event.results[0][0].transcript);

        askAI();

    };

    recognition.onerror = ()=>{

        alert("Voice recognition failed.");

    };

}else{

    voiceBtn.style.display="none";

}