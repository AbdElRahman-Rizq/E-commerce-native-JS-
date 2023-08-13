/*===============SLider===================*/

async function getImgs(){
    try{
  
      var jsonData=await fetch('../data.json')
      
      let data=await jsonData.json();
      
      let imgs =data.map(function(item) {
        return item.src;
       });
       setImgsArray(imgs);
       startInterval()
     }
     catch{
       console.log("Data not found");
     }
  }
  
  let imgsArr=[];
  getImgs();
  
  let setImgsArray= (imgs)=>{
  imgsArr.push(...imgs)
  return console.log(imgsArr);
  }
  
  //   ==================== Update slider ============
  
  var prevButton = document.getElementById('prevButton');
  var nextButton = document.getElementById('nextButton');
  var currentIndex = 0;
  var sliderInterval;
  
  
  
  
   function updateSlider() {
      
    var slider = document.getElementById('slider');
    slider.style.backgroundImage = 'url(' + imgsArr[currentIndex] + ')';
   }
   
  function startInterval() {
      sliderInterval = setInterval(function() {
            currentIndex = (currentIndex + 1) % imgsArr.length;
            updateSlider();
          }, 4000);
          
        }
      
      function resetInterval() {
          clearInterval(sliderInterval);
          startInterval();
      }
  //   ===================Previous & Next Btns===================
  prevButton.addEventListener('click', function() {
    
    currentIndex = (currentIndex - 1 + imgsArr.length) % imgsArr.length;
    updateSlider();
    resetInterval();
  });
  
  nextButton.addEventListener('click', function() {
    
     currentIndex = (currentIndex + 1) % imgsArr.length;
      updateSlider();
      resetInterval();
    });
  
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
class CartItem {
  constructor(id, name, img, price, quantity) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.price = price;
    this.quantity = quantity;
  }
}

class LocalCart {
  constructor() {
    this.cartItems = new Map();
  }

  addItemToLocalCart(id, item) {
    if (this.cartItems.has(id)) {
      const existingItem = this.cartItems.get(id);
      existingItem.quantity += 1;
    } else {
      item.quantity = 1;
      this.cartItems.set(id, item);
    }
    this.updateCartUI();
  }

  removeItemFromCart(id) {
    this.cartItems.delete(id);
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
        <div class="cancel"><i class="fas fa-window-close"></i></div>
      `;
      cartItem.innerHTML = itemHTML;

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
    });

    const countElement = document.getElementById('count');
    const totalElement = document.getElementById('total');
    countElement.textContent = count;
    totalElement.textContent = `$ ${total.toFixed(2)}`;
  }
}

const LocalCartInstance = new LocalCart();

function addItemFunction(e) {
  const id = e.target.closest('.card').getAttribute('id');
  const img = e.target.closest('.card').querySelector('img').src;
  const name = e.target.closest('.card').querySelector('h3').textContent;
  const price = e.target.closest('.card').querySelector('.price').textContent;
  const quantity = 1;
  let newPrice = price.replace("EGP", "").trim().replace(",", '');

  const item = new CartItem(id, name, img, parseInt(newPrice), quantity);
  LocalCartInstance.addItemToLocalCart(id, item);
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
    addEventListenersToButtons();

    // Add click event listeners to filter buttons
    Array.from(filterBtns).forEach(function(btn) {
      btn.addEventListener("click", function() {
        var category = btn.getAttribute("data-category");
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

function addEventListenersToButtons() {
  var addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

  Array.from(addToCartBtns).forEach(function(btn) {
    btn.addEventListener("click", addItemFunction);
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

  var title = document.createElement("h3");
  title.textContent = product.title;
  card.appendChild(title);

  var price = document.createElement("p");
  price.setAttribute("class", "price");
  price.textContent = product.price;
  card.appendChild(price);

  var btn = document.createElement("button");
  btn.setAttribute("class", "add-to-cart-btn");
  btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>`;
  card.appendChild(btn);

  return card;
}
  
  function renderProducts(products) {
    productContainer.innerHTML = "";

    products.forEach(function(product) {
      var card = createCard(product);
      productContainer.appendChild(card);
    });
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
    addButtons.forEach((button) => {
      button.addEventListener('click', addItemFunction);
    });
  }
});
var backToTopBtn = document.querySelector("#back-to-top-btn");

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0});
});