import {menuArray} from "./data.js";
const checkoutEl = document.getElementById("checkout");
const checkoutListDiv = document.getElementById("checkout-list");
const priceEl = document.getElementById("total-price");
const cardDetailsModal = document.getElementById("card-details-modal");
const thankYouDiv = document.getElementById("order-thank-you");
let shoppingCartItems = new Array();
let totalPrice = 0;

renderMenu();

document.addEventListener("click", (e) => {
    for (const item of menuArray) {
        if (e.target.id === "complete-order-btn" && shoppingCartItems.length > 0) {
            cardDetailsModal.style.display = "block";
        }
        else if (e.target.id === "pay-btn") {
            cardDetailsModal.style.display = "none";
            checkoutEl.style.display = "none";
            thankYouDiv.style.display = "block";
        }
        else if (e.target.id === item.name) {
            shoppingCartItems.push({name: item.name, price: item.price});
            renderCheckout();
        } else if (e.target.id === item.name + "-remove") {
            shoppingCartItems.pop();
            renderCheckout();
        }
    }
});

function renderMenu() {
    let menuHtml = "";
    menuArray.forEach(function(item) {
        menuHtml += `
        <div class="menu-item">
            <div class="menu-container">            
                <div class="menu-icon">${item.emoji}</div>
                    <div class="menu-item-description">
                        <h3 class="menu-item-name">${item.name}</h3>
                        <p class="menu-item-ingredients">${item.ingredients}</p>
                        <p class="menu-item-price">\$${item.price}</p>
                    </div>
            </div>
            <button class="add-menu-item-btn" id="${item.name}">+</button>
        </div>
        <hr>`;
    });
    document.getElementById("menu").innerHTML = menuHtml;
}

function renderCheckout() {    
    checkoutListDiv.innerHTML = "";
    totalPrice = 0;
    
    if (shoppingCartItems.length === 0) {
        checkoutListDiv.innerHTML = `
        <h3 class="checkout-placeholder-text" id="checkout-placeholder-text">nothing ordered yet</h3>`;
    } else {
        shoppingCartItems.forEach(function(item) {
        const {name, price} = item;
        totalPrice += price;
        checkoutListDiv.innerHTML += `
        <div class="checkout-item">
            <div class="checkout-item-container">
                <h3>${name}</h3>
                <p class="checkout-item-remove" id="${name}-remove">remove</p>
            </div>
            <p class="checkout-item-price">\$${price}</p>
        </div>`;
        });
    }
    
    priceEl.textContent = "$" + totalPrice;
}