const openPopup = document.querySelectorAll('[data-open]');
const closePopup = document.querySelectorAll('[data-close]');
const overlay = document.getElementById('overlay');
const calculate = document.getElementById('submit-donate');

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

function open(element) {
  if (element == null) return;
  element.classList.add('popup');
  overlay.classList.add('popup');
};

function close(element) {
  if (element == null) return;
  element.classList.remove('popup');
  overlay.classList.remove('popup');
};

// Checks for valid keypresses
function filterKeys(event) {
  var charCode = (event.which) ? event.which : event.keyCode;
  return !(charCode != 46 && charCode > 31 && 
    (charCode < 48 || charCode > 57));
};

// Checks for valid inputs
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
  let temp = parseFloat(amount);

  // Format amount output onto input value field
  amount = amount.replace(/\d(?=(\d{3})+\.)/g, '$&,').toLocaleString('en-US'); 
  document.getElementById("amount").value = amount;
  };

// Clears input on click
function clearInput() {
  document.getElementById("amount").value = "";
}

// Obtain input value, send to PayPal
calculate.addEventListener('click', () => {
  let final = document.getElementById('amount').dataset.amount;

  let output = final.replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
  alert("You will be donating " + output);
  console.log(output + " is of type " + typeof output);
});