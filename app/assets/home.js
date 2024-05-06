// home.js

document.addEventListener('DOMContentLoaded', function() {
  const greetingElement = document.getElementById('greeting');

  // Function to get the current time and return a greeting message
  function getGreeting() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    let greetingMessage = '';

    if (currentHour < 12) {
      greetingMessage = 'Good morning';
    } else if (currentHour < 18) {
      greetingMessage = 'Good afternoon';
    } else {
      greetingMessage = 'Good evening';
    }

    return greetingMessage;
  }

  // Function to update the greeting message on the page
  function updateGreeting() {
    const greeting = getGreeting();
    const username = sessionStorage.getItem('username');

    if (username) {
      greetingElement.textContent = `${greeting}, ${username}!`;
    } else {
      greetingElement.textContent = greeting;
    }
  }

  // Check if the user is logged in and update the greeting
  if (sessionStorage.getItem('username')) {
    updateGreeting();
  }

  // Example of adding an event listener to a button
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', function() {
      // Clear the session storage and redirect to the login page
      sessionStorage.removeItem('username');
      window.location.href = '/login';
    });
  }
});
