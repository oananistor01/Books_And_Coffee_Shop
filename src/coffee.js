import { http } from "./http.js";
import { ui } from "./ui.js";

const productsURL = "https://61363d1a8700c50017ef54bf.mockapi.io/bookshop";

//Get all coffee-products from api
document.addEventListener("DOMContentLoaded", getCoffeeProducts);

function getCoffeeProducts() {
  http.get(productsURL).then((products) => ui.showCoffeeProducts(products));
  ui.navCartIconCounter();
}
