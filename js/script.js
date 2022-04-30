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
    const pop = button.closest('.clear')
    close(pop)
  });
});

// Outside click to close donate
overlay.addEventListener('click', () => {
  const pop = document.querySelectorAll('.popup');
  pop.forEach(pop => {
    close(pop)
  });
});

// Obtain input value, send to PayPal
calculate.addEventListener('click', () => {
  const final = parseFloat(document.querySelector('input').value);
  console.log(final + " is of type: " + typeof final);
  if (isNaN(final)) {
    alert("Please enter a valid dollar amount!");
  } else {
    alert("You will be donating $" + final);
  }
});

function open(element) {
  if (element == null) return
  element.classList.add('popup')
  overlay.classList.add('popup')
};

function close(element) {
  if (element == null) return
  element.classList.remove('popup')
  overlay.classList.remove('popup')
};