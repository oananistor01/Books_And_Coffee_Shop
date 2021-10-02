import { http } from "./http.js";
import { ui } from "./ui.js";

const productsURL = "https://61363d1a8700c50017ef54bf.mockapi.io/bookshop";
let cartTable = document.getElementById("cart-table");
let subtotalPrice = document.getElementById("subtotal-price");
let totalPrice = document.getElementById("total-price");
let shippingPrice = document
  .getElementById("shipping-price")
  .getAttribute("data-value");

/********************** GET ALL PRODUCTS FROM LOCAL STORAGE TO SHOPPING CART & CALCULATE TOTAL PRICE ******************/
window.onload = () => {
  http.get(productsURL).then(() => {
    ui.showProductInCart();
    calculateTotalPrice();
    ui.navCartIconCounter();
    // updateQuantity(); //only if navCartIconCount is calculated according to the quantity from rows input

    cartTable.addEventListener("click", removeFromCartAndLocalStorage);

    cartTable.addEventListener("change", updateQuantity);
  });
};

//when the DELETE BUTTON is clicked, remove item from shopping list and from local storage!!
function removeFromCartAndLocalStorage(e) {
  if (e.target.classList.contains("delete-product-from-cart")) {
    // e.target.parentElement.parentElement.parentElement.remove();

    let idBtn = e.target.getAttribute("id"); //get the id of the clicked button

    let cart = JSON.parse(localStorage.getItem("cart")); //get the cart from local storage

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === idBtn) {
        cart.splice(i, 1); //delete only 1 item (with index i) from the cart array

        localStorage.setItem("cart", JSON.stringify(cart)); //reset the cart from local storage with the new array of products

        window.location.reload(); //to refresh the page
        calculateTotalPrice();
        ui.navCartIconCounter();
        return; //return is for stoping the loop, so other items with the same id wont be deleted alltogether. Only one item gets to be deleted => the clicked one
      }
    }
  }
}

//when the quantity of the input field is changed, recalculate total price and send the value to local storage
function updateQuantity(e) {
  if (e.target.classList.contains("quantity")) {
    let input = e.target;

    //input validation: quantity must be a number between 1 and max.stock
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }

    //send the changed quantity of a product from the input field to local storage
    let idInput = e.target.getAttribute("id");

    let cart = JSON.parse(localStorage.getItem("cart"));

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === idInput) {
        cart[i].qt = Number(input.value);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }

    calculateTotalPrice();
    ui.navCartIconCounter();
  }
}

function calculateTotalPrice() {
  let table = document.getElementById("cart-table-body");
  let cartRows = table.querySelectorAll(".cart-table-row");
  let subtotal = 0;
  let total = 0;

  //calculate subtotal price
  for (let i = 0; i <= cartRows.length - 1; i++) {
    let productPrice = cartRows[i]
      .querySelector(".product-price")
      .getAttribute("data-value"); //get the value of the products-price-element

    let quantityInput = cartRows[i].querySelector(".quantity").value; //get the value of the input-quantity-element
    // console.log(quantityInput);

    subtotal += Number(quantityInput) * Number(productPrice);
    subtotalPrice.innerHTML = "€ " + parseFloat(subtotal).toFixed(2); //toFixed() will round or pad with zeros if necessary to meet the specified length.
  }

  //calculate total price, only if subtotal has a value. This is neccessary, because else it always displays the shopping fee as total amount
  if (subtotal) {
    total += Number(subtotal) + Number(shippingPrice);
    totalPrice.innerHTML = "€ " + parseFloat(total).toFixed(2);
  }
}
