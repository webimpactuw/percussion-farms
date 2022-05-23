var products = {
  1: {
    name: 'Tote Bag', 
    desc: 'Black Percussion Farms Tote Bag', 
    price: 10, 
    image: '../img/item1.png'
  }, 
  2: {
    name: 'T-Shirt',
    desc: 'We appreciate your donation!', 
    price: 12, 
    image: '../img/item2.png'
  }, 
  3: {
    name: 'Water Bottle',
    desc: 'Stay hydrated!', 
    price: 8, 
    image: '../img/item3.png'
  }
};

var total = 0;
var pf_cart = {

  // Cart properties
  content: null,
  items: {}, 

  // Cart data control
  save: () => {
    localStorage.setItem('pf_cart', JSON.stringify(pf_cart.items));
  }, 
  load: () => {
    pf_cart.items = localStorage.getItem('pf_cart'); 
    if (pf_cart.items == null) {
      pf_cart.items = {};
    } else {
      pf_cart.items = JSON.parse(pf_cart.items);
    }
  },

  // Cart creation
  init:  () => {
    pf_cart.load();
    pf_cart.list();
  }, 

  // List items in cart
  list: () => {
    pf_cart.content = document.getElementById('cart-mid');
    let empty = true;
    for (let i in pf_cart.items) {
      if (pf_cart.items.hasOwnProperty(i)) {
        empty = false; 
      }
    }

    output = '';
    let total = 0, subtotal = 0;
    if (empty) {
      output += '<p class=\' empty\'> Your cart is empty! </p>';
      document.getElementById("cart-submit").classList.add("hide");
    } else {
      for (let i in pf_cart.items) {
        item = products[i];
        output += `<div class=\'cart-item\'>`;
        output += `<img src="img/item${i}.png"> <div class="right">`;
        output += `<p class="item-name"> ${item.name} </p>`;
        output += `<p class="item-desc"> ${item.desc} </p>`;

        output += `<div class="cart-row"> <div class="edit">`
        output += `<span onclick="pf_cart.subtract(${i})">-</span>`;
        output += `<p> ${pf_cart.items[i]} </p>`;
        output += `<span onclick="pf_cart.add(${i})">+</span> </div>`; 
        output += `<span class="item-remove" onClick="pf_cart.remove(${i})"> Remove </span>`
        output += `</div></div></div>`;
        total += pf_cart.items[i] * item.price;
      }
      document.getElementById("cart-submit").classList.remove("hide");
      output += `<div class="total"><h4> Total: </h4>`;
      output += `<p id="cart-total"></p></div>`;
    }
    this.total = total;
    $('.cart-mid').html(output);
    $('#cart-total').html('\$' + total + '.00');
  }, 

  // Clear cart
  clear: () => {
    if (confirm('Clear All Items In Cart?')) {
      pf_cart.items = {};
      localStorage.removeItem('pf_cart');
      pf_cart.list();    
    }
  },

  // Modify cart contents
  add: (id) => {
    if (pf_cart.items[id] == undefined) {
      pf_cart.items[id] = 1;
    } else {
      pf_cart.items[id] += 1;
    }
    openCart();
    pf_cart.save();
    pf_cart.list();
  }, 

  subtract: (id) => {
    if (pf_cart.items[id] == undefined) {
      return;
    }
    if (pf_cart.items[id] == 1) {
      pf_cart.remove(id);
    } else { 
      pf_cart.items[id] -= 1; 
    }
    pf_cart.save();
    pf_cart.list();
  },

  change: (id, count) => {
    if (count <= 0) {
      delete pf_cart.items[id];
    } else {
      pf_cart.items[id] = count;
      let total = 0;
      for (let i in pf_cart.items) {
        total += pf_cart.items[i] * products[i].price;
      }
      this.total = total;
      $('#cart-total').html('TOTAL: $' + total + '.00');
    }
  }, 
  
  remove: (id) => {
    delete pf_cart.items[id];
    pf_cart.save();
    pf_cart.list();
  }
};

// Initialize Cart
window.addEventListener('DOMContentLoaded', pf_cart.init);
