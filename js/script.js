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

// Obtain input value, send to PayPal
calculate.addEventListener('click', () => {
  const final = parseFloat(document.querySelector('input').value);
  console.log(final)
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

// Checks for valid inputs
function checkInput() {
  let amount = document.getElementById("amount").value;
  amount = parseFloat(amount);
  if (isNaN(amount)) return;

  amount = amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
  amount = "$" + amount.toLocaleString('en-US');
  document.getElementById("amount").value = amount;
};

// Clears input on click
function clearInput() {
  document.getElementById("amount").value = "";
}

// Checks for valid keypresses
function filterKeys(event) {
  var charCode = (event.which) ? event.which : event.keyCode;
  return !(charCode != 46 && charCode > 31 && 
    (charCode < 48 || charCode > 57));
};