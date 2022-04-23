const openDonation = document.querySelectorAll('[data-open]');
const closeDonation = document.querySelectorAll('[data-close]');
const overlay = document.getElementById('overlay');

// Open donation popup
openDonation.forEach(button => {
  button.addEventListener('click', () => {
    const donate = document.querySelector(button.dataset.open)
    openPopup(donate)
  });
});

// Outside click to close
overlay.addEventListener('click', () => {
  const donates = document.querySelectorAll('.donate.active')
  donates.forEach(donate => {
    closePopup(donate)
  });
});

// Exit button to close
closeDonation.forEach(button => {
  button.addEventListener('click', () => {
    const donate = button.closest('.donate')
    closePopup(donate)
  });
});

function openPopup(element) {
  if (element == null) return
  donate.classList.add('active')
  overlay.classList.add('active')
};

function closePopup(element) {
  if (element == null) return
  donate.classList.remove('active')
  overlay.classList.remove('active')
};