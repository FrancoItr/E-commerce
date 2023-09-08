const productsArray = [
    //Pasta
    {
        id:"pasta-01",
        title: "Plato 01",
        image: "../img/pastas/pasta-01.jpg",
        category: {
            name: "Pastas",
            id:"pastas"
        },
        price: 1000
    },
    {
        id:"pasta-02",
        title: "Plato 02",
        image: "../img/pastas/pasta-02.jpg",
        category: {
            name: "Pastas",
            id: "pastas"
        },
        price: 1500
    },
    {
        id:"pastas-03",
        title: "Plato 03",
        image: "../img/pastas/pasta-03.jpg",
        category: {
            name: "Pastas",
            id: "pastas"
        },
        price: 1500
    },

    //Drinks
    {
        id:"drink-01",
        title: "Agua",
        image: "../img/bebidas/agua.jpg",
        category: {
            name: "Bebidas",
            id: "bebidas"
        },
        price: 600
    },
    {
        id:"drink-02",
        title: "Cerveza",
        image: "../img/bebidas/cerveza.jpg",
        category: {
            name: "Bebidas",
            id: "bebidas"
        },
        price: 800
    },
    {
        id:"drinks-03",
        title: "Vino",
        image: "../img/bebidas/vino.jpg",
        category: {
            name: "Bebidas",
            id: "bebidas"
        },
        price: 1900
    },

    //Combos
    {
        id:"combo-01",
        title: "Hamburguesa + Papas",
        image: "../img/combos/combo-01.jpg",
        category: {
            name: "Combos",
            id: "combos"
        },
        price: 1000
    },
    {
        id:"combo-02",
        title: "Pastas + Copa de vino",
        image: "../img/combos/combo-02.jpg",
        category: {
            name: "Combos",
            id: "combos"
        },
        price: 1000
    },
        {
        id:"combo-03",
        title: "Pizza + Cerveza",
        image: "../img/combos/combo-03.jpg",
        category: {
            name: "Combos",
            id: "combos"
        },
        price: 1000
    }
]


const productsContainer = document.querySelector("#product-container");
const categoryButtons = document.querySelectorAll(".category-button");
const mainTitle = document.querySelector("#main-title");
let addButtons = document.querySelectorAll(".add-product");
const number = document.querySelector("#number")


function chargeProducts(selectedProducts) {

    productsContainer.innerHTML = "";

    selectedProducts.forEach(product => {

        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <img class="product-image" src="${product.image}" alt="${product.title}">
            <div class="product-detail">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price}</p>
                <button class="add-product" id="${product.id}" >Agregar</button>
            </div>
        `;

        productsContainer.append(div);
    })
    refreshAddButtons();
}

chargeProducts(productsArray);

categoryButtons.forEach(button => {
    button.addEventListener("click", (e) => {
    
        categoryButtons.forEach(button => button.classList.remove("active"));
        e.currentTarget.classList.add("active");
        if (e.currentTarget.id != "all"){
            const categoryProduct = productsArray.find(product => product.category.id === e.currentTarget.id);
            mainTitle.innerText = categoryProduct.category.name;
            const buttonProducts = productsArray.filter(product => product.category.id === e.currentTarget.id);
            chargeProducts(buttonProducts);
    } else {
        mainTitle.innerText = "Todos los productos";
        chargeProducts(productsArray);
    }
    })
});

function refreshAddButtons() {
    addButtons = document.querySelectorAll(".add-product");

    addButtons.forEach(button => {
        button.addEventListener("click", addToCart);
    });
}

let productsOnCart;
let newNumber;

let productsOnCartLS = localStorage.getItem("products-on-cart");

if (productsOnCartLS) {
    productsOnCart = JSON.parse(productsOnCartLS);
    updateNumber();
} else {
    productsOnCart = [];
}

function addToCart(e) {

    const idButton = e.currentTarget.id;
    const addedProduct = productsArray.find(product => product.id === idButton);

    if(productsOnCart.some(product => product.id === idButton)) {
        const index = productsOnCart.findIndex(product => product.id === idButton)
        productsOnCart[index].cantidad++;
    } else {
        addedProduct.cantidad = 1;
        productsOnCart.push(addedProduct);
    }

    updateNumber();

    localStorage.setItem("products-on-cart", JSON.stringify(productsOnCart));
}

function updateNumber() {
    let newNumber = productsOnCart.reduce((acc, product) => acc + product.cantidad, 0);
    number.innerHTML = newNumber;
}