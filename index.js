// index.js

let seats = document.querySelectorAll('.seat');
let selectedSeats = [];
let moviePrice = 0;
let totalPrice = 0;
let movieName = '';
let dateOn = '';

// Add event listener to each seat
seats.forEach((seat) => {
  seat.addEventListener('click', () => {
    if (seat.classList.contains('selected')) {
      seat.classList.remove('selected');
      let index = selectedSeats.indexOf(seat);
      selectedSeats.splice(index, 1);
    } else {
      seat.classList.add('selected');
      selectedSeats.push(seat);
    }
    updateTotalPrice();
  });
});

// Add event listener to movie select dropdown
document.querySelector('.selectMovie').addEventListener('change', (e) => {
  movieName = e.target.value;
  moviePrice = getMoviePrice(movieName);
  updateMovieInfo();
});

// Add event listener to book button
document.querySelector('.bookButton').addEventListener('click', () => {
  if (selectedSeats.length > 0 && movieName!== '') {
    bookSeats();
  } else {
    showErrorModal();
  }
});

// Add event listener to reset button
document.querySelector('.resetButton').addEventListener('click', () => {
  resetSeats();
});

// Function to get movie price based on movie name
function getMoviePrice(movieName) {
  switch (movieName) {
    case 'Movie 1':
      return 10.99;
    case 'Movie 2':
      return 12.99;
    case 'Movie 3':
      return 9.99;
    default:
      return 0;
  }
}

// Function to update movie info
function updateMovieInfo() {
  document.querySelector('.movieName').innerText = movieName;
  document.querySelector('.moviePrice').innerText = `$${moviePrice.toFixed(2)}`;
  document.querySelector('.dateOn').innerText = `Date: ${getDate()}`;
}

// Function to update total price
function updateTotalPrice() {
  totalPrice = selectedSeats.length * moviePrice;
  document.querySelector('.numberOfSeat').innerText = selectedSeats.length;
  document.querySelector('.totalPrice').innerText = `$${totalPrice.toFixed(2)}`;
}

// Function to book seats
function bookSeats() {
  showSuccessModal();
  resetSeats();
}

// Function to show success modal
function showSuccessModal() {
  document.querySelector('.overlay').style.display = 'flex';
  document.querySelector('.successModal').style.display = 'block';
}

// Function to show error modal
function showErrorModal() {
  document.querySelector('.errorOverlay').style.display = 'flex';
  document.querySelector('.errorModal').style.display = 'block';
}

// Function to reset seats
function resetSeats() {
    selectedSeats = [];
    seats.forEach((seat) => {
      seat.classList.remove('selected');
    });
    updateTotalPrice();
  }
  
  // Function to get current date
  function getDate() {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    return `${month}/${day}/${year}`;
  }
  
  // Add event listener to close success modal button
  document.querySelector('.closeModal').addEventListener('click', () => {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.successModal').style.display = 'none';
  });
  
  // Add event listener to close error modal button
  document.querySelector('.closeErrorModal').addEventListener('click', () => {
    document.querySelector('.errorOverlay').style.display = 'none';
    document.querySelector('.errorModal').style.display = 'none';
  });