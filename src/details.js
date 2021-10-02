import { http } from "./http.js";
import { ui } from "./ui.js";

const productsURL = "https://61363d1a8700c50017ef54bf.mockapi.io/bookshop";

//on window load this page is getting the id number of the product, as a query parameter and displays the details from API. (ex. details.html?id=1, where 1 is the product id)
window.onload = () => {
  let searchParamString = window.location.search; //this gives us the query param (ex. "?id=1")
  const searchParam = new URLSearchParams(searchParamString);
  const id = searchParam.get("id"); //getting the id-nr out of the string

  http.get(productsURL + "/" + id).then((product) => {
    ui.showProductDetails(product);

    product.qt = 1; //we define a new product key called 'qt' (quantity), with a default value of '1' and send it to local storage. This is neccessary, so we can further change the quantity of a specific product directly from the input value

    ui.navCartIconCounter();

    //if cart isn't existing yet in local storage on first webpage load, the value of the variable 'cart' = 'null' => therefor we  define it as an empty array
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart === null) {
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    //other method:
    //   if (!cart) {
    //     window.localStorage.setItem("cart", JSON.stringify([]));
    //   }

    //after clicking the ADD TO CART button....
    document.getElementById("add-to-cart-btn").addEventListener("click", () => {
      ui.addToCartBanner(); //...a banner with a successful message is displayed

      //if cart is defined in local storage, retriev it and add the new items
      if (cart) {
        //...the existing cart is fetched from local storage. This is neccessary, so that the old cart does not get constantly overwritten.
        cart = JSON.parse(localStorage.getItem("cart"));

        //...the new product is being added to the cart (array) and to local storage
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
      }

      ui.navCartIconCounter();
    });
  });
};
