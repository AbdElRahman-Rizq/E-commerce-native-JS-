/*========= signup & logOut ==============*/
import { getCookie,deleteCookie, setCookie } from "./cookies.js";
let signup=document.getElementById("signup");
let logOut=document.getElementById("logOut");
let findUser=document.getElementById("findUser");
// user founded
if(getCookie("name")) {
  signup.classList.add("hide")
  logOut.classList.remove("hide")
  // show greeting
  var hiName=document.createElement("p");
  hiName.classList="name"
  hiName.id="name"
hiName.innerHTML=`${getCookie("name")}`
findUser.before(hiName);
}
// Not founded
else{ signup.classList.remove("hide")
logOut.classList.add("hide")}

// logout
logOut.addEventListener("click",()=>{
  let UserName=document.getElementById("name") ;
  deleteCookie("name");
  signup.classList.remove("hide")
  logOut.classList.add("hide")
  UserName.classList.add("hide")
})

/*===== open & close Cart =====================*/
var cartClose=document.querySelector(".cart__close");
document.addEventListener('DOMContentLoaded', () => {
  const cartIcon = document.querySelector('.cart-icon');
  const wholeCartWindow = document.querySelector('.cart-box');
  wholeCartWindow.inWindow = 0;

  cartIcon.addEventListener('click', () => {
    if (wholeCartWindow.classList.contains('hide')) {
      wholeCartWindow.classList.remove('hide');
    }
  });

  cartClose.addEventListener('click', () => {
    setTimeout(() => {
      wholeCartWindow.classList.add('hide');
    }, 500);
  });
});

/* ========= Add to cart ============ */
function renderCartItem(newCartCount){ // the number of items in cart
  let cartIcons = document.querySelectorAll('.cart-count-indicator');
  cartIcons.forEach(icon => {
    icon.innerHTML = newCartCount;
  });
}

(function(){
  renderCartItem(0);
})();
class CartItem {
  constructor(id, name, img, price, amount,quantity) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.price = price;
    this.amount = amount;
    this.quantity = quantity;
  }
}

class LocalCart {
  constructor() {
    this.cartItems = new Map();
  }

  addItemToLocalCart(id, item) {
    if (item.quantity==item.amount) {
      this.cartItems.set(id, item);
    }
      else{
        
        item.quantity += 1;
        this.cartItems.set(id, item);
      }
    
    this.updateCartUI();
  }

  removeItemFromCart(id) {
    this.cartItems.delete(id);
    localStorage.removeItem(`ProductId${id}`);
    this.updateCartUI();
  }

  decreaseItemQuantity(id) {
    const existingItem = this.cartItems.get(id);
    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1;
     
    } else {
      this.cartItems.delete(id);
    }
    this.updateCartUI();
  }

  getLocalCartItems() {
    return this.cartItems;
  }

  updateCartUI() {
    const cartWrapper = document.getElementById('cart-wrapper');
    cartWrapper.innerHTML = '';

    let count = 0;
    let total = 0;

    this.cartItems.forEach((value, key) => {
      const price = value.price * value.quantity;
      count += value.quantity;
      
      total += price;

      const cartItem = document.createElement('div');
const line = document.createElement('div'); // Line will use in Cart items

      cartItem.classList.add('cart-item');
      cartItem.setAttribute('data-id', key);
      const itemHTML = `
        <img src="${value.img}">
        <div class="details">
          <h3>${value.name}</h3>
          <p>
            <span class="quantity">Quantity: ${value.quantity}</span>
            <span class="price">Price: $ ${price.toFixed(2)}</span>
          </p>
        </div>
        <div class="quantity-buttons">
          <div class="button minus-btn"><i class="fas fa-minus"></i></div>
          <div class="button plus-btn"><i class="fas fa-plus"></i></div>
        </div>
        <div class="cancel"><i class="fa fa-trash-alt cart__amount-trash"></i></div>
      `;
      cartItem.innerHTML = itemHTML;
      line.classList.add('lineCart');
      // cartItem.appendChild(line)
      // cartWrapper.after(line)
      const minusBtn = cartItem.querySelector('.minus-btn');
      const plusBtn = cartItem.querySelector('.plus-btn');
      const cancelBtn = cartItem.querySelector('.cancel');

      minusBtn.addEventListener('click', () => {
        this.decreaseItemQuantity(key);
      });

      plusBtn.addEventListener('click', () => {
        this.addItemToLocalCart(key, value);
      });

      cancelBtn.addEventListener('click', () => {
        this.removeItemFromCart(key);
        
      });

      cartWrapper.appendChild(cartItem);
      // cartWrapper.appendChild(line)
      cartItem.after(line)
    });

    const countElement = document.getElementById('count');
    const totalElement = document.getElementById('total');
    countElement.textContent = count;
      renderCartItem(count);// number of items
    totalElement.textContent = `$ ${total.toFixed(2)}`;
  }
}

const LocalCartInstance = new LocalCart();
// let cartCount =parseInt(getCookie("cartItems"));

function addItemFunction(e) {

  const id = e.target.closest('.card').getAttribute('id');
  const img = e.target.closest('.card').querySelector('img').src;
  const name = e.target.closest('.card').querySelector('h4').textContent;
  const price = e.target.closest('.card').querySelector('.price').textContent;
  const amount = e.target.closest('.card').querySelector('.price').getAttribute('id');
  const remove = e.target.closest('.card').querySelector('#removeBtn');

  const quantity=0;
 sendToCart(id,name, img, price,amount,quantity)
  e.target.classList.add("hide");
remove.classList.remove("hide")
}


export function sendToCart(id,name, img, price,amount,quantity){
  let newPrice = price.replace("EGP", "").trim().replace(",", '');
localStorage.setItem(`ProductId${id}`,true)
const item = new CartItem( id,name, img, parseInt(newPrice), amount,quantity);
  LocalCartInstance.addItemToLocalCart( id,item);
  setCookie("added",id)
}
/* ========= PRODUCTS CARDS ============ */
document.addEventListener("DOMContentLoaded", function() {
  var productContainer = document.getElementById("productContainer");
  var filterBtns = document.getElementsByClassName("filter-btn");

  // Load JSON data
  fetch("../data.json")
  .then(response => response.json())
  .then(data => {
    // Initial rendering of all products
    renderProducts(data);
    

    // Add click event listeners to filter buttons
    Array.from(filterBtns).forEach(function(btn) {
      btn.addEventListener("click", function() {
        var category = btn.getAttribute("data-category");
        setCookie("filterBtn",category);
        let activeBtn=document.querySelectorAll("[data-category]");
  activeBtn.forEach((i)=> 
  {
    if (i.getAttribute("data-category")=== getCookie("filterBtn")) {
      i.classList.add("activeBtn")
      console.log(i.getAttribute("data-category"));
    }else
    i.classList.remove("activeBtn")
  })
  // console.log(activeBtn);
        filterProducts(data, category);
      });
    });
  })
  .catch(error => console.log(error));

function renderProducts(data) {
  var productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = "";

  data.forEach(function(product) {
    var card = createCard(product);
    productContainer.appendChild(card);
  });
}


function filterProducts(data, category) {
  
  var filteredProducts = data.filter(function(product) {

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
  price.setAttribute("id", product.amount);
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
  // setInterval(()=>{
    if (!localStorage.getItem(`ProductId${product.id}`)) {
      card.appendChild(addBtn);
      removeBtn.classList.add("hide")
    }else
    removeBtn.classList.remove("hide")
  // },5000)
  return card;
}
  
  function renderProducts(products) {
    productContainer.innerHTML = "";
    products.forEach(function(product) {
      var card = createCard(product);
      productContainer.appendChild(card);
    });
    addEventListenersToButtons();
}

  function filterProducts(products, category) {
    var filteredProducts = [];

    if (category === "all") {

      filteredProducts = products;
    } else {
      filteredProducts = products.filter(function(product) {
        return product.category === category;
      });
    }

    renderProducts(filteredProducts);
  }

  function addEventListenersToButtons() {
    var addButtons = document.querySelectorAll(".add-to-cart-btn");
    var productImg = document.querySelectorAll("img");
    addButtons.forEach((button) => {
      button.addEventListener('click', addItemFunction);
    });
    //*======== Send product id & go to product details ======= */
    productImg.forEach((button) => {
      button.addEventListener('click', getProductId);
    });
  }
});

function getProductId(e){
  const id = e.target.closest('.card').getAttribute('id');
  console.log(id);
  setCookie("productID",id)
window.open("./products.html","_self");
}
/*======== backToTopBtn ========== */
var backToTopBtn = document.querySelector("#back-to-top-btn");

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0});
});