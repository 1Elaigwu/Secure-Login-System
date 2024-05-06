document.getElementById('registerForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  // Retrieve values from form inputs
  const regUsername = document.getElementById('regUsername').value;
  const regEmail = document.getElementById('regEmail').value;
  const regPassword = document.getElementById('regPassword').value;

  // Log values before sending the request
  console.log('Username:', regUsername);
  console.log('Email:', regEmail);
  console.log('Password:', regPassword);

  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: regUsername, email: regEmail, password: regPassword })
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById('registerMessage').textContent = data.message;
    } else {
      document.getElementById('registerMessage').textContent = data.message;
    }
  } catch (error) {
    console.error('Error registering: ', error);
    document.getElementById('registerMessage').textContent = 'Error registering';
  }
});
