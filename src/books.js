import { http } from "./http.js";
import { ui } from "./ui.js";

const productsURL = "https://61363d1a8700c50017ef54bf.mockapi.io/bookshop";

//Get all book-products from api
document.addEventListener("DOMContentLoaded", getBookProducts);

function getBookProducts() {
  http.get(productsURL).then((products) => ui.showBookProducts(products));
  ui.navCartIconCounter();
}
