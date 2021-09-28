import { http } from "./http.js";
import { ui } from "./ui.js";

const productsURL = "https://61363d1a8700c50017ef54bf.mockapi.io/bookshop";
const image = document.getElementById("image");
const title = document.getElementById("title");
const author = document.getElementById("author");
const price = document.getElementById("price");
const stock = document.getElementById("stock");
const category = document.getElementById("category");
const description = document.getElementById("description");
let titleLinkClicked = false;
let productToEdit;
let id;

/********************************** GET ALL PRODUCTS FROM API *********************************/
document.addEventListener("DOMContentLoaded", getAllProducts);

function getAllProducts() {
  http.get(productsURL).then((products) => ui.showAllAdminProducts(products));
  ui.navCartIconCounter();
}

/********************************** ADD NEW PRODUCT TO API **********************************/
//adding an event to the SAVE button
document
  .getElementById("add-product")
  .addEventListener("click", addOrEditProduct);

function addOrEditProduct() {
  //with this 'IF' I use the 'SAVE' button to EDIT a product and 'PUT' the edited product to API
  if (titleLinkClicked === true && inputValidation() === true) {
    productToEdit = {
      image: image.value,
      title: title.value,
      author: author.value,
      price: Number(price.value),
      stock: Number(stock.value),
      category: category.value,
      description: description.value,
    }; // here I create a new object with the edited information from the input fields

    http
      .put(`${productsURL}/${id}`, productToEdit)
      .then(() => getAllProducts()); //call getAllProducts() to update the table of products upon editing one of them

    ui.clearFields(); //clearing the fields after saving the edited product to the list
    ui.showSuccessBanner("Product successfully edited!"); // this ui mehtod is called in order to display a success-banner after EDITING a product from the API list
    id = ""; //reseting the ID, because the variable 'id' is used in a global scope
    titleLinkClicked = false; //resetting the value to false after edit is done

    return;
  } else if (titleLinkClicked === false && inputValidation() === true) {
    //with this 'ELSE IF' I use the 'SAVE' button to 'POST' a new product to API

    //Here I create an object with the values from input
    const product = {
      image: image.value,
      title: title.value,
      author: author.value,
      price: Number(price.value),
      stock: Number(stock.value),
      category: category.value,
      description: description.value,
    };

    http.post(productsURL, product).then(() => getAllProducts());

    ui.clearFields();
    ui.showSuccessBanner("Product successfully added!"); // this ui mehtod is called in order to display a success-banner after ADDING a product to the API list
  }
}

/*********************************** EDIT PRODUCT FROM API **********************************/
document
  .getElementById("admin-products")
  .addEventListener("click", editProduct);

function editProduct(e) {
  if (e.target.classList.contains("admin-title-link")) {
    titleLinkClicked = true;
    id = e.target.getAttribute("id");

    http.get(`${productsURL}/${id}`).then((data) => {
      image.value = data.image;
      title.value = data.title;
      author.value = data.author;
      price.value = data.price;
      stock.value = data.stock;
      category.value = data.category;
      description.value = data.description;
    }); //get product by ID and put it in the input fields, in order to edit the information
  }
} //it continues in the first part of the above function addOrEditProduct(), because it uses the same SAVE button, as for adding a new product

/***************************************** CANCEL BUTTON *********************************/
//adding an event to the CANCEL button, in order to delete whatever text was written in the input(clear the fields) and removing the red border class
document
  .getElementById("cancel-add-product")
  .addEventListener("click", cancelAddProduct);

function cancelAddProduct() {
  ui.clearFields();
  image.classList.remove("error-input-border");
  title.classList.remove("error-input-border");
  price.classList.remove("error-input-border");
  stock.classList.remove("error-input-border");
  category.classList.remove("error-input-border");
}

/***************************** DELETE PRODUCT FROM API ******************************/
document
  .getElementById("admin-products")
  .addEventListener("click", deleteProduct);

function deleteProduct(e) {
  if (e.target.classList.contains("delete-product")) {
    id = e.target.getAttribute("id"); //or const id = e.target.id;

    http
      .delete(`${productsURL}/${id}`)
      .then(() => getAllProducts())
      .catch("Error on delete");

    ui.showSuccessBanner("Product successfully deleted!"); //display a banner that a product has been DELETED successfuly from the API
    id = ""; //reseting the id that is used in global scope
  }
}

/***************************** INPUT VALIDATION ******************************/
function inputValidation() {
  let result = true;

  if (image.value == "") {
    ui.showErrorBanner("Image name required!"); //display a red banner with the message in round brackets
    image.classList.add("error-input-border"); //put a red border class list on the input field
    result = false;
  } else {
    image.classList.remove("error-input-border"); //remove the red border error class list
  }

  if (title.value == "") {
    ui.showErrorBanner("Title required!");
    title.classList.add("error-input-border");
    result = false;
  } else {
    title.classList.remove("error-input-border");
  }

  if (price.value == "" || isNaN(price.value) || price.value < 0) {
    ui.showErrorBanner("The price must be a valid number greater than 0!");
    price.classList.add("error-input-border");
    result = false;
  } else {
    price.classList.remove("error-input-border");
  }

  if (stock.value == "" || isNaN(stock.value) || stock.value < 0) {
    ui.showErrorBanner("The quantity must be a valid number greater than 0!");
    stock.classList.add("error-input-border");
    result = false;
  } else {
    stock.classList.remove("error-input-border");
  }

  if (category.value === "book" || category.value === "coffee") {
    category.classList.remove("error-input-border");
  } else {
    ui.showErrorBanner("Category must be either 'book' or 'coffee'!");
    category.classList.add("error-input-border");
    result = false;
  }

  return result;
}
