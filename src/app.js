import { http } from "./http.js";
import { ui } from "./ui.js";

const productsURL = "https://61363d1a8700c50017ef54bf.mockapi.io/bookshop";

//Get all products from api
document.addEventListener("DOMContentLoaded", getProducts);

function getProducts() {
  http.get(productsURL).then((products) => ui.showAllProducts(products));
}

//delete product
document.getElementById("products").addEventListener("click", deleteProduct);

function deleteProduct(e) {
  if (e.target.classList.contains("delete")) {
    const id = e.target.getAttribute("id"); //sau const id = e.target.id;
    http
      .delete(`${productsURL}/${id}`)
      .then(() => getProducts())
      .catch("Error on delete"); //call getProducts() ca sa actualizeze pagina de produse in urma stergerii unuia dintre ele
  }
}

//add new product
document.getElementById("add-product").addEventListener("click", addNewProduct);

function addNewProduct() {
  const titleValue = document.getElementById("title").value; //tragem elementele din input
  const priceValue = Number(document.getElementById("price").value);
  const imageValue = document.getElementById("image").value;

  //construim un obiect cu valorile elementelor de sus
  const product = {
    name: titleValue,
    price: priceValue,
    picture: imageValue,
  };

  http.post(productsURL, product).then((data) => console.log(data));
}
