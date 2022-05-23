const openPopup = document.querySelectorAll('[data-open]');
const closePopup = document.querySelectorAll('[data-close]');
const overlay = document.getElementById('overlay');
const addItem = document.querySelectorAll('[data-id]');

// Open donation popup
openPopup.forEach(button => {
  button.addEventListener('click', () => {
    const pop = document.querySelector(button.dataset.open);
    open(pop);
  });
});

// Exit button to close
closePopup.forEach(button => {
  button.addEventListener('click', () => {
    const pop = document.querySelector(button.dataset.close);
    close(pop);
  });
});

// Outside click to close donate
overlay.addEventListener('click', () => {
  const pop = document.querySelectorAll('.popup');
  pop.forEach(pop => {
    close(pop);
  });
});

// Escape key to close
$(document).keydown(function(e) {
    if (e.keyCode == 27) {
        const pop = document.querySelectorAll('.popup');
        pop.forEach(pop => {
          close(pop);
        });
    }
});

// Open popup
function open(element) {
  if (element == null) return;
  element.classList.add('popup');
  overlay.classList.add('popup');
};

// Close popup
function close(element) {
  if (element == null) return;
  element.classList.remove('popup');
  overlay.classList.remove('popup');
};

// Set donation value in donation popup
function setValue(num) {
  clearInput();
  document.getElementById("amount").dataset.amount = num;
  document.getElementById("donate-amount").value = num;
  checkInput();
}

// Open cart sidebar
function closeCart() {
  document.getElementById("cart-sidebar").classList.remove("opened");
}

// Close cart sidebar
function openCart() {
  document.getElementById("cart-sidebar").classList.add("opened");
}

// Add an item to the cart
addItem.forEach(button => {
  button.addEventListener('click', () => {
    pf_cart.add(button.dataset.id);
  });
});

// Check for valid keypresses
function filterKeys(event) {
  var charCode = (event.which) ? event.which : event.keyCode;
  return !(charCode != 46 && charCode > 31 && 
    (charCode < 48 || charCode > 57));
};

// Check for valid inputs
function checkInput() {
  // Obtain input value, or stored amount if empty
  let amount = document.getElementById("amount").value;
  amount = parseFloat(amount);
  if (isNaN(amount)) {
    amount = parseFloat(document.getElementById('amount').dataset.amount);
  }

  // Store value into input data field as string
  amount = amount.toFixed(2);
  document.getElementById("amount").dataset.amount = amount;  
  document.getElementById("donate-amount").value = amount;
  let temp = parseFloat(amount);

  // Format amount output onto input value field
  amount = amount.replace(/\d(?=(\d{3})+\.)/g, '$&,').toLocaleString('en-US'); 
  document.getElementById("amount").value = amount;
  };

// Clear input on click
function clearInput() {
  document.getElementById("amount").value = "";
}