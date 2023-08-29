import {  sendToCart } from "./cart.js";
import { setCookie,getCookie } from "./cookies.js";
function addItemFunction(e) {
  const id = e.target.closest(".card").getAttribute("id");
  const img = e.target.closest(".card").querySelector("img").src;
  const name = e.target.closest(".card").querySelector("h4").textContent;
  const price = e.target.closest(".card").querySelector(".price").textContent;
  const amount = e.target
    .closest(".card")
    .querySelector(".price")
    .getAttribute("id");
  const remove = e.target.closest(".card").querySelector("#removeBtn");

  const quantity = 0;
  sendToCart(id, name, img, price, amount, quantity);
  e.target.classList.add("hide");
  remove.classList.remove("hide");
}
/* ========= PRODUCTS CARDS ============ */
document.addEventListener("DOMContentLoaded", function () {
  var productContainer = document.getElementById("productContainer");
  var filterBtns = document.getElementsByClassName("filter-btn");

  // Load JSON data
  fetch("../data.json")
    .then((response) => response.json())
    .then((data) => {
      // Initial rendering of all products
      renderProducts(data);
      addEventListenersToButtons();

      // Add click event listeners to filter buttons
      Array.from(filterBtns).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var category = btn.getAttribute("data-category");
          setCookie("filterBtn", category);
          let activeBtn = document.querySelectorAll("[data-category]");
          activeBtn.forEach((i) => {
            if (i.getAttribute("data-category") === getCookie("filterBtn")) {
              i.classList.add("activeBtn");
              console.log(i.getAttribute("data-category"));
            } else i.classList.remove("activeBtn");
          });
          // console.log(activeBtn);
          filterProducts(data, category);
        });
      });
    })
    .catch((error) => console.log(error));

  function renderProducts(data) {
    var productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = "";

    data.forEach(function (product) {
      var card = createCard(product);
      productContainer.appendChild(card);
    });
  }

  // When click btn
  function addEventListenersToButtons() {
    var addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

    Array.from(addToCartBtns).forEach(function (btn) {
      btn.addEventListener("click", addItemFunction);
    });
  }

  function filterProducts(data, category) {
    // Add activeBtn class
    var filteredProducts = data.filter(function (product) {
      return product.category === category;
    });

    renderProducts(filteredProducts);
  }

  function createCard(product) {
    var card = document.createElement("div");
    card.setAttribute("id", product.id);
    card.classList.add("card");

    var image = document.createElement("img");
    image.src = product.src;
    card.appendChild(image);

    var title = document.createElement("h4");
    title.textContent = product.title;
    card.appendChild(title);

    var price = document.createElement("p");
    price.setAttribute("class", "price");
    price.textContent = product.price;
    card.appendChild(price);

    var addBtn = document.createElement("button");
    addBtn.setAttribute("class", "add-to-cart-btn");
    addBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Add to cart`;

    // Remove Item
    var removeBtn = document.createElement("button");

    removeBtn.setAttribute("id", "removeBtn");
    card.appendChild(removeBtn);
    removeBtn.innerHTML = `Added`;
    if (!localStorage.getItem(`ProductId${product.id}`)) {
      card.appendChild(addBtn);
      removeBtn.classList.add("hide");
    } else removeBtn.classList.remove("hide");
    return card;
  }

  function renderProducts(products) {
    productContainer.innerHTML = "";
    products.forEach(function (product) {
      var card = createCard(product);
      productContainer.appendChild(card);
    });
  }

  function filterProducts(products, category) {
    var filteredProducts = [];
  
    if (category === "all") {
      filteredProducts = products;
    } else {
      filteredProducts = products.filter(function (product) {
        return product.category === category;
      });
    }

    renderProducts(filteredProducts);
    addEventListenersToButtons();
  }

  function addEventListenersToButtons() {
    var addButtons = document.querySelectorAll(".add-to-cart-btn");
    var productImg = document.querySelectorAll("img");
    addButtons.forEach((button) => {
      button.addEventListener("click", addItemFunction);
    });
    productImg.forEach((button) => {
      button.addEventListener("click", getProductId); //Send product id & go to product details 
    });
  }
});
function getProductId(e) {
  const id = e.target.closest(".card").getAttribute("id");
  console.log(id);
  setCookie("productID", id);
  window.open("./products.html");
}
