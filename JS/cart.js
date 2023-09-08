let productsOnCart = (localStorage.getItem("products-on-cart"));
productsOnCart = JSON.parse(productsOnCart);

const emptyCartContainer = document.querySelector("#empty-cart");
const productsCartContainer = document.querySelector("#products-cart");
const actionsCartContainer = document.querySelector("#actions-cart");
const boughtCartContainer = document.querySelector("#bought-cart");
let deleteButtons = document.querySelectorAll(".product-cart-delete")
const emptyButton = document.querySelector("#empty-actions-cart");
const totalContainer = document.querySelector("#total");
const buyButton = document.querySelector("#buy-actions-cart");

function chargeProducts() {
    if (productsOnCart && productsOnCart.length > 0) {
        
        emptyCartContainer.classList.add("disabled");
        productsCartContainer.classList.remove("disabled");
        actionsCartContainer.classList.remove("disabled");
        boughtCartContainer.classList.add("disabled");
    
        productsCartContainer.innerHTML = "";
    
        productsOnCart.forEach(product => {
            const div = document.createElement("div");
            div.classList.add("product-cart"); 
            div.innerHTML = `
                <img class="product-cart-image" src="${product.image}" alt="${product.title}">
                <div class="product-cart-title">
                    <small>Titulo</small>
                    <h3>${product.title}</h3>
                </div>
                <div class="product-cart-amount">
                    <small>Cantidad</small>
                    <p>${product.cantidad}</p>
                </div>
                <div class="product-cart-price">
                    <small>Precio</small>
                    <p>$${product.price}</p>
                </div>
                <div class="product-cart-subtotal">
                    <small>Subtotal</small>
                    <p>$${product.price * product.cantidad}</p>
                </div>
                <button class="product-cart-delete" id="${product.id}"><i class="bi bi-trash-fill"></i></button>                        
            `;
    
            productsCartContainer.append(div);
        })
        
    
    } else {
        emptyCartContainer.classList.remove("disabled");
        productsCartContainer.classList.add("disabled");
        actionsCartContainer.classList.add("disabled");
        boughtCartContainer.classList.add("disabled");
    }
    refreshDeleteButtons();
    updateTotal();
}

chargeProducts();

function refreshDeleteButtons() {
    deleteButtons = document.querySelectorAll(".product-cart-delete");

    deleteButtons.forEach(button => {
        button.addEventListener("click", deleteToCart);
    });
}



function deleteToCart(e) {
    const idButton = e.currentTarget.id;
    const index = productsOnCart.findIndex(product => product.id === idButton);
    productsOnCart.splice(index, 1);
    chargeProducts();

    localStorage.setItem("products-on-cart", JSON.stringify(productsOnCart));
}

emptyButton.addEventListener("click", emptyToCart);

function emptyToCart(){
    productsOnCart.length = 0;
    localStorage.setItem("products-on-cart", JSON.stringify(productsOnCart));
    chargeProducts();
}

function updateTotal() {
    const totalCalculated = productsOnCart.reduce((acc, product) => acc + (product.price * product.cantidad), 0);
    total.innerText = `$${totalCalculated}`;
}

buyButton.addEventListener("click", buyCart);

function buyCart(){
    productsOnCart.length = 0;
    localStorage.setItem("products-on-cart", JSON.stringify(productsOnCart));
    emptyCartContainer.classList.add("disabled");
    productsCartContainer.classList.add("disabled");
    actionsCartContainer.classList.add("disabled");
    boughtCartContainer.classList.remove("disabled");
}