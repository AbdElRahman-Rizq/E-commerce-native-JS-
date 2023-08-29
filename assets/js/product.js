
import { getCookie } from "./cookies.js";
 import { sendToCart } from "./cart.js"; 


 // Load JSON data
 fetch("../data.json")
 .then(response => response.json())
 .then(data => {
  
  // get details
  let src="", amount="", info="",price="",title="";
  for (let i = 0; i < data.length; i++) {
   if (data[i].id==getCookie("productID")) {
     src = data[i].src;
     info = data[i].info;
     price = data[i].price;
     title = data[i].title;
     amount = data[i].amount;
   }
  }
 
   
    // Initial rendering of all products
  renderProduct(getCookie("productID"),src,amount,title,info,price);
   
 
 })
 .catch(error => console.log(error));


function renderProduct(id,src,amount,title,info,price){
  let productSection=document.getElementById("products");
  let productImgSection=document.getElementById("productImg");
  let productImg= document.createElement("img");
  let productDetails= document.getElementById("details");
  let priceSection= document.createElement("h4");
  let availabl= document.createElement("h4");
  let titleSection= document.createElement("h2");
  let quantitySection= document.createElement("div");
  let addToCartBtn= document.createElement("div");
  let added= document.createElement("div");
  let infoSection= document.createElement("section");
  let quantity=1;
 productImg.src=src;
 productImgSection.append(productImg);
 titleSection.innerText=title;
productDetails.append(titleSection)
priceSection.innerText=price;
productDetails.append(priceSection)
availabl.innerHTML=`available watches: <span style="color:hsl(31deg 100% 50%)">${amount}</span>`;
productDetails.append(availabl)
quantitySection.innerHTML=` <div id="quantity-buttons">
<div id="minus-btn"><i class="fas fa-minus"></i></div>
<div id="quantityNum">${quantity}</div>
<div id="plus-btn"><i class="fas fa-plus"></i></div>
</div> `
productDetails.append(quantitySection)
addToCartBtn.innerText="Add to Cart";
addToCartBtn.classList.add("addToCartBtn");
added.innerText="Added to Cart";
added.classList.add("added");
added.classList.add("hide")
productDetails.append(added)
productDetails.append(addToCartBtn)
if(localStorage.getItem(`ProductId${id}`)){
  addToCartBtn.classList.add("hide")
  added.classList.remove("hide")
} 
else{
  added.classList.add("hide")
  addToCartBtn.classList.remove("hide")
}

infoSection.classList.add("infoSection")
infoSection.innerHTML=`<h2 class="title">Product info</h2>
<div class="info">${info}</div>
`
productSection.after(infoSection)
// Some Functions
let addFun= () => {
  if (quantity==amount) {
    quantity=amount
  }
  else quantity++
quantityNum.innerText=quantity;
}
//---------------
let minusFun=() => {
  if (quantity==1) {
      quantity
    }
  else  quantity--
  quantityNum.innerText=quantity;
  }

//  When add or minus quantity 
const minusBtn = document.querySelector('#minus-btn');
const plusBtn = document.querySelector('#plus-btn');
const quantityNum=document.querySelector('#quantityNum')

minusBtn.addEventListener('click',minusFun );
plusBtn.addEventListener('click', addFun);


addToCartBtn.addEventListener("click",()=>{ // When click addToCartBtn
  //1-  Remove Event Listener
minusBtn.removeEventListener('click',minusFun );
plusBtn.removeEventListener('click', addFun);
  //2-  Hide button "Add to cart" & Show btn "Added"
addToCartBtn.classList.add("hide")
added.classList.remove("hide")
  //3-Add class preventClick 
minusBtn.classList.add("preventClick")
plusBtn.classList.add("preventClick")
  //4-  Add item to cart
  sendToCart(id,title,src,price,amount,parseInt(quantity-1))})
}

