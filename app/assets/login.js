document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById('loginMessage').textContent = data.message;
      setTimeout(() => {
        window.location.href = '/home.html'; // Redirect to home page on successful login
      }, 1000);
    } else {
      document.getElementById('loginMessage').textContent = data.message;
    }
  } catch (error) {
    console.error('Error logging in: ', error);
    document.getElementById('loginMessage').textContent = 'Error logging in';
  }
});

// Add event listener for the "Register" link
document.addEventListener('DOMContentLoaded', function() {
  const registerLink = document.getElementById('registerLink');

  registerLink.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = '/signup.html';
  });
});
