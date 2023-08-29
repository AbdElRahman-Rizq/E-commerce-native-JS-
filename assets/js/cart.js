import { getCookie, setCookie } from "./cookies.js";
/*============== open & close Cart =====================*/
var cartClose = document.querySelector(".cart__close");
document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".cart-icon");
  const wholeCartWindow = document.querySelector(".cart-box");
  wholeCartWindow.inWindow = 0;

  cartIcon.addEventListener("click", () => {
    if (wholeCartWindow.classList.contains("hide")) {
      wholeCartWindow.classList.remove("hide");
    }
  });

  cartClose.addEventListener("click", () => {
    setTimeout(() => {
      wholeCartWindow.classList.add("hide");
    }, 500);
  });
});

/* =========================== Add to cart ========================== */
function renderCartItem(newCartCount) {
  // the number of items in cart
  let cartIcons = document.querySelectorAll(".cart-count-indicator");
  cartIcons.forEach((icon) => {
    icon.innerHTML = newCartCount;
  });
}

(function () {
  renderCartItem(0);
})();
class CartItem {
  constructor(id, name, img, price, amount, quantity) {
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
    if (item.quantity == item.amount) {
      this.cartItems.set(id, item);
    } else {
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
    const cartWrapper = document.getElementById("cart-wrapper");
    cartWrapper.innerHTML = "";
    let count = 0;
    let total = 0;
    
    this.cartItems.forEach((value, key) => {
      const price = value.price * value.quantity;
      count += value.quantity;
      total += price;
      const cartItem = document.createElement("div");
      const line = document.createElement("div"); // Line will use in Cart items
      
      cartItem.classList.add("cart-item");
      cartItem.setAttribute("data-id", key);
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
      line.classList.add("lineCart");
      const minusBtn = cartItem.querySelector(".minus-btn");
      const plusBtn = cartItem.querySelector(".plus-btn");
      const cancelBtn = cartItem.querySelector(".cancel");

      minusBtn.addEventListener("click", () => {
        this.decreaseItemQuantity(key);
      });

      plusBtn.addEventListener("click", () => {
        this.addItemToLocalCart(key, value);
      });

      cancelBtn.addEventListener("click", () => {
        this.removeItemFromCart(key);
      });
      
      cartWrapper.appendChild(cartItem);
      cartItem.after(line);
    });
    // Total Items & Price
    const countElement = document.getElementById("count");
    const totalPriceElement = document.getElementById("totalPrice");
    countElement.textContent = count;
    renderCartItem(count); // number of items
    totalPriceElement.textContent = `$ ${total.toFixed(2)}`;
    setCookie("totalItems",countElement.textContent) // set cookie total items to checkout 
  }
}
// When click checkoutBtn 
const checkoutBtn = document.getElementById("checkout-btn");
checkoutBtn.addEventListener("click",()=>{
  console.log(checkoutBtn);
  // If there is not any elment in cart
  if(getCookie("totalItems")<1) alert("Cart is empty")
  else return alert("checkout succesfuly!")
})
const LocalCartInstance = new LocalCart();

export function sendToCart(id, name, img, price, amount, quantity) {
  // Get Items from ProductCard.js & product.js
  let newPrice = price.replace("EGP", "").trim().replace(",", "");
  localStorage.setItem(`ProductId${id}`, true);
  const item = new CartItem(
    id,
    name,
    img,
    parseInt(newPrice),
    amount,
    quantity
  );
  LocalCartInstance.addItemToLocalCart(id, item);
  setCookie("added", id);
}
