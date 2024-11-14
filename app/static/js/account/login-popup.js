/*
  Login Popup Functions
*/
function openLoginForm() {
  document.getElementById("login-form").style.display = "block";
}

function closeLoginForm() {
  document.getElementById("login-form").style.display = "none";
}

function submitLoginForm(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("login-password").value;

  // Prep data
  const data = {
    username: username,
    password: password
  };

  // Send data to the backend
  fetch("http://127.0.0.1:5000/api/login", {
    headers: {"Content-Type": "application/json"},
    method: "POST",
    body: JSON.stringify(data),
  })
  .then(async function (response) {
    const errorMessage = document.getElementById("error-message");
    
    // Clear any existing error message
    errorMessage.style.display = "none"; 

    if (!response.ok) {
      const responseError = await response.json();
      // Account not found in database
      if (responseError.account_error) {
        errorMessage.textContent = responseError.account_error;
        errorMessage.style.display = "block";
      }
    } else {
      // Successful login
      const responseData = await response.json();
      
      // Store user data in local storage for global use
      localStorage.setItem('userData', JSON.stringify(responseData));

      // Redirect to homepage
      window.location.href = homeUrl; // Ensure homeUrl is defined
    }
  })
  .catch(function(error) {
    console.log(error); // Log network errors
  });
}

// Check if user is logged in
function checkLogInStatus() {
  if (localStorage.length > 0) {
    window.location.href = calculateUrl;
  } else {
    openLoginForm();
  }
}
