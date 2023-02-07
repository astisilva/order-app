import { menuArray } from './data.js';

const completeOrderBtn = document.querySelector("#completeorder-btn"); 
const modal = document.querySelector("#modal-form");
const payBtn = document.getElementById('pay-btn')
const nameInput = document.getElementById('name-input').value
const thanksBox = document.getElementById('thankyou-message')

document.addEventListener('click', function(e){
    const{add, remove, completeorder,paybtn} = e.target.dataset
        if(add){        
                foodOrder(add)   
        }  
        else if(remove){        
                removeFood(remove)
        }  
        else if(completeorder){
                modal.style.display = "block" 
        }  
        else if(paybtn){
                payOrder()
        }
})

let orderFoodArray = [];
function foodOrder(foodId) {
  const foodObj = menuArray.filter(function(food) {
    return food.id === Number(foodId);
  })[0];

  const existingFood = orderFoodArray.find(function(food) {
    return food.id === foodObj.id;
  });

  if (existingFood) {
    existingFood.count++;
  } else {
    foodObj.count = 1;
    orderFoodArray.push(foodObj);
  }
  renderOrder();
}

function renderOrder(){
    let orderInput = document.getElementById("order")
    let orderHtml = ""
    let totalPrice = 0

if(orderFoodArray.length>0){
  orderHtml = `<h1 class="yourorder">Your order</h1>`
  orderFoodArray.forEach(function(food) {
    orderHtml += `                                      
        <div class="order-items">
            <h1 class="food-choice"><span>${food.count}</span> ${food.name}</h1> 
            <button class="remove" data-remove=${food.id} type="submit">remove</button> 
           
            <p class="order-price">$${food.price *food.count}</p> 
        </div>
    ` 
    totalPrice += food.price * food.count 
  })
  orderHtml += `
  <div class="total-order">   
    <h1 class="food-choice" >Total price</h1>
    <p class="total-price" >$${totalPrice}</p>
  </div>   
  <button class="completeorder-btn" data-completeorder='completeorder' id="completeorder-btn" type="submit">Complete order</button>          
`
}
orderInput.innerHTML = orderHtml;
}
 
function payOrder(){     
    const modalText = document.getElementById('modal-text')   
    const cardform= document.getElementById('card-form')

cardform.addEventListener('submit', function(e){
        e.preventDefault()
        const cardformData =new FormData(cardform)
        const name = cardformData.get('name')
        modal.style.display = "none" 
        
        modalText.innerHTML = `
        <div class="modal-inner-loading">
            <img src="images/loading.svg" class="loading">
                <p id="upload-text"> handling your order </p>
        </div> `    
    setTimeout(function(){
       modalText.innerHTML = `Handling your order`
    }, 2000)
    
    setTimeout(function(){
        modalText.style.display='none'
        document.getElementById('thankyou-message').innerHTML = `
        <p> Thanks, ${name} your order is on the way! </p>` 

     document.getElementById('order').style.display='none'    
     }, 2000)    
})
} 

function removeFood(foodId){
    const findIndex = orderFoodArray.findIndex(function(food){
        return food.id === Number(foodId)
    })
        if(orderFoodArray[findIndex].count>0)
        orderFoodArray[findIndex].count--
            
        if(orderFoodArray[findIndex].count===0){
        orderFoodArray.splice(findIndex,1)
        }
            renderOrder()
}

function foodHtml() {
  let menuHtml = ""   
  menuArray.forEach(function(food) {   
    menuHtml += `
      <div class="food-item">
        <div class="food-image">${food.emoji}</div > 
        <div class="food-text">
          <h3 class="food">${food.name}</h3>
          <p class="ingredients">${food.ingredients}</p>
          <h4 class="price">$${food.price}</h4>                    
        </div >              
        <button class="add-btn" data-add="${food.id}" type="submit">+</button>
      </div>
      </div>    
    `
})
  return menuHtml    
}

function render(){
 document.getElementById('menu').innerHTML = foodHtml()
 }

render()