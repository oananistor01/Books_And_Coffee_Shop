class UI {
  constructor() {
    this.productContainer = document.getElementById("products");
    this.adminTableBody = document.getElementById("table-body-admin");
    this.adminMain = document.getElementById("main-admin");
    this.showBannerDiv = document.getElementById("show-banner");
    this.firstInput = document.getElementById("first-input");
    this.imageInput = document.getElementById("image");
    this.detailsContainer = document.getElementById("details-container");
    this.cartTableBody = document.getElementById("cart-table-body");
    this.showBannerDiv = document.getElementById("details-show-banner");
    this.cartBasketCounter = document.getElementById("cart-basket-counter");
  }

  //Here I create a card for each book (books only)
  showBookProducts(products) {
    let output = "";
    products.forEach((product) => {
      if (product.category == "book") {
        output += `
           <div class="card m-3" style="width: 13rem;">
              <div class="card-body card-display">
                 <img src="${product.image}" class="card-img-top" alt="...">
                 <h6 class="card-title">${product.title}</h6>
                 <p class="card-author">by ${product.author}</p>
                 <h5 class="card-price">€ ${product.price}</h5>
                 <a class="btn btn-outline-warning details" href="details.html?id=${product.id}" id="${product.id}"><i class="fas fa-info-circle"></i> DETAILS</a>
              </div>
           </div>`;
        this.productContainer.innerHTML = output;
      }
    });
  }

  //Here I create a card for each coffe product (coffee only)
  showCoffeeProducts(products) {
    let output = "";
    products.forEach((product) => {
      if (product.category == "coffee") {
        output += `
           <div class="card m-3" style="width: 13rem;">
              <div class="card-body">
                 <img src="${product.image}" class="card-img-top" alt="...">
                 <h6 class="card-title">${product.title}</h6>
                 <h5 class="card-price">€ ${product.price}</h5>
                 <a class="btn btn-outline-success details" href="details.html?id=${product.id}" id="${product.id}"><i class="fas fa-info-circle"></i> DETAILS</a>
              </div>
           </div>`;
        this.productContainer.innerHTML = output;
      }
    });
  }

  //Here I create a table-row for each product from API (all products - books & coffee) and append it to the table. This is for the admin page.
  showAllAdminProducts(products) {
    let output = "";
    products.forEach((product) => {
      output += `
                  <tr class="table-row">
                     <td class="admin-table-data">${product.id}</td>
                     <td class="admin-table-data"><a href="#admin-add-item-container" class="admin-title-link" id="${product.id}">${product.title}</a></td>
                     <td class="admin-table-data">${product.author}</td>
                     <td class="admin-table-data">€ ${product.price}</td>  
                     <td class="admin-table-data">${product.stock}</td>
                     <td class="admin-table-data"><button type="button" class="delete-product" id="${product.id}"><i class="fas fa-trash-alt delete-product" id="${product.id}"></i></button></td>
                  </tr>
                  `;
      this.adminTableBody.innerHTML = output;
    });
  }

  //Here I create a card with the details for each product
  showProductDetails(product) {
    let output = `
      <div class="card mb-5" id="details-show-banner" style="max-width: 100%">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              src="${product.image}"
              class="img-fluid rounded-start"
              alt="..."
            />
          </div>

          <div class="col-md-8">
            <div class="card-body" id="product-details">
              <div>
                <h5 class="card-title title-style">${product.title}</h5>
                <p class="card-text">
                  <small class="text-muted">${product.author}</small>
                </p>
                <h4 class="card-title">€ ${product.price}</h4>

                <hr />

                <h6 class="card-title">Overview</h6>
                <p class="card-text" id="card-description">${product.description}</p>

                <hr />
              </div>

              <div id="details-add-to-cart">
                <button type="button" class="btn btn-outline-dark" id="add-to-cart-btn">
                <i class="fas fa-shopping-cart"></i
                > ADD TO CART
                </button>

                <p class="card-text">
                  <small class="text-muted">Stock: ${product.stock} pcs.</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    this.detailsContainer.innerHTML = output;
  }

  //Here I create the cart items with the details for each product
  showProductInCart() {
    let output = "";
    let cart = JSON.parse(localStorage.getItem("cart")); //getting the cart from local storage
    // console.log(cart[0].id);

    //cart must have at least one item; go through the cart array of products and map each product to the output
    if (cart) {
      for (let i = 0; i <= cart.length - 1; i++) {
        output += `<tr class="cart-table-row">
                      <td class="cart-table-data td-img">
                        <img
                          style="width: 2.5rem"
                          src="${cart[i].image}"
                        />
                      </td>
                      <td class="cart-table-data">
                        <a href="details.html?id=${cart[i].id}" class="admin-title-link">
                        ${cart[i].title}</a
                        >
                        <p class="card-text">
                          <small class="text-muted">${cart[i].author}</small>
                        </p>
                      </td>
                      <td class="cart-table-data stock" data-value="${cart[i].stock}">Stock: ${cart[i].stock}</td>
                      <td class="cart-table-data">
                        <div class="form-group field-product-quantity">
                          <input
                            class="form-control form-control-sm quantity"
                            min="1"
                            max="${cart[i].stock}"
                            name="quantity"
                            value="1"
                            type="number"
                          />
                        </div>
                      </td>
                      <td class="cart-table-data product-price" data-value="${cart[i].price}">€ ${cart[i].price}</td>
                      <td class="cart-table-data">
                        <button type="button" class="delete-product" id="${cart[i].id}">
                          <i class="fas fa-trash-alt delete-product-from-cart" id="${cart[i].id}"></i>
                        </button>
                      </td>
                    </tr>`;
        this.cartTableBody.innerHTML = output;
      }
    }
  }

  //Clearing the fields (input value) from the admin page
  clearFields() {
    document.getElementById("image").value = "";
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("category").value = "";
    document.getElementById("description").value = "";
  }

  //Admin input validation; display success-Banner
  showSuccessBanner(message) {
    let messageElem = document.createElement("p");
    messageElem.classList.add("success");
    messageElem.innerHTML = "<i class='fas fa-thumbs-up'></i> " + message;

    this.adminMain.insertBefore(messageElem, this.showBannerDiv);

    setTimeout(() => {
      messageElem.remove();
    }, 3000);
  }

  //Admin input validation; display error-Banner
  showErrorBanner(message) {
    let messageElem = document.createElement("p");
    messageElem.classList.add("error");
    messageElem.innerHTML =
      "<i class='fas fa-exclamation-triangle'></i> " + message;

    this.firstInput.insertBefore(messageElem, this.imageInput);

    setTimeout(() => {
      messageElem.remove();
    }, 4000);
  }

  //ADD TO CART button from details page - display success-Banner
  addToCartBanner() {
    let messageElem = document.createElement("p");
    messageElem.classList.add("successufully-added");
    messageElem.classList.add("container");
    messageElem.innerHTML =
      "<i class='fas fa-thumbs-up'></i> " + "Product added to cart!";

    this.detailsContainer.insertBefore(messageElem, this.showBannerDiv);

    setTimeout(() => {
      messageElem.remove();
    }, 2000);
  }

  //update cart icon from navbar, when items are added to the shopping cart

  /******************************** update cart icon => according to local storage length ************************/
  navCartIconCounter() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      let counter = 0;

      for (let i = 0; i < cart.length + 1; i++) {
        this.cartBasketCounter.innerHTML = counter++;
      }
    }
  }

  /************************* update cart icon => according to quantity input count  ************************/
  // navCartIconCounter() {
  //   let table = document.getElementById("cart-table-body");

  //   if (table) {
  //     let counter = 0;
  //     let cartRows = table.querySelectorAll(".cart-table-row");

  //     for (let i = 0; i <= cartRows.length - 1; i++) {
  //       let quantityInput = cartRows[i].querySelector(".quantity").value;
  //       counter += Number(quantityInput);
  //     }

  //     this.cartBasketCounter.innerHTML = counter;
  //     console.log(counter);
  //   }
  // }
}

export const ui = new UI();
