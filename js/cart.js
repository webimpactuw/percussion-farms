// var h = document.getElementById('a');
// h.onclick = dothing1;
// h.addEventListener('click', dothing2);
const addItem = document.querySelectorAll('[data-id]');

addItem.forEach(button => {
  button.addEventListener('click', () => {
    pf_cart.add(button.dataset.id);
    openCart();
  });
});

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
      // DEBUG **************************
      // for (let i in pf_cart.items) {
      //   console.log('Item: ' + pf_cart.items[i]);
      // }

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
      output += '<p class=\'cart-item empty\'> <em> Your cart is empty! </em> </p>';
    } else {
      for (let i in pf_cart.items) {
        item = products[i];
        output += `<div class=\'cart-item\'>`;
        output += `<img src="img/item${i}.png"><div class="right">`;
        output += `<p class="item-name"> Item: <b>${item.name}</b> </p>`;
        output += `<p> Description: ${item.desc}</p>`;
        output += `<div> Container [-] <b>${pf_cart.items[i]}</b> [+] </div>`; 
        output += `<button onclick="pf_cart.remove(${i}"> REMOVE </button>`
        output += `<p> Amount: <b>${pf_cart.items[i]}</b> </p> </div> </div>`;

        total += pf_cart.items[i] * item.price;
      }
    }
    this.total = total;
    $('.cart-mid').html(output);
    $('#cart-total').html('TOTAL: $' + total);

    /* TEMPORARY */
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
      cart.items[id]++; 
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
      $('#cart-total').html('TOTAL: $' + total);
    }
  }, 
  
  remove: (id) => {
    delete pf_cart.items[id];
    pf_cart.save();
    pf_cart.list();
  }, 

  // Send data to email about purchase
  // Send amount to PayPal about cost
  checkout: () => {

    alert('Implement CHECKOUT!');
    /*
    fetch('SERVER_SCRIPT') {
  
      resp => // promise
    }
    var data = new FormData();
    data.append(‘cart’, JSON.stringify(cart.items));
    data.append(‘products’, JSON.stringify(products));

    fetch(‘SERVER-SCRIPT’, {
      method:’POST’, body:data 
    }).then(res => res.text()).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.error(err); 
    });

    var totalCost = document.querySelector('.cart-total');
    fetch(‘SERVER-SCRIPT’, {
      method: ‘POST’, body: totalCost
    }).then(res => res.text()).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.error(err);
    });
    */
  }
};

// Initialize Cart
window.addEventListener('DOMContentLoaded', pf_cart.init);
