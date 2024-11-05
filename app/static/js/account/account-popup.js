/*
  Login Popup Functions start
*/
function openLoginForm() {
  document.getElementById("login-form").style.display = "block";
  closeCreateAccountForm();
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

/*
  Login Popup Functions end
*/

/*
  Create Account Popup Functions start
*/
function openCreateAccountForm() {
  document.getElementById("create-account-form").style.display = "block";
  closeLoginForm();
}

function closeCreateAccountForm() {
  document.getElementById("create-account-form").style.display = "none";
}

function showAccountCreationSuccessPopUp() {
  document.getElementById("success-popup").style.display = "block";
  closeCreateAccountForm();

}

function validatePasswords(password, confirmPassword) {
  if (password !== confirmPassword) {
      document.getElementById("confirm-password").setCustomValidity("Passwords do not match!");
      return false;
  }
  document.getElementById("confirm-password").setCustomValidity(""); 
  return true;
}

function submitCreateAccountForm(event) {
  event.preventDefault();

  const username = document.getElementById("create-username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;

  // Validate passwords
  if (!validatePasswords(password, confirmPassword)) {
      document.getElementById("confirm-password").reportValidity(); 
      return;
  }

  // Prep data
  const data = {
    username: username,
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName
  };

  // Send data to the backend
  fetch("http://127.0.0.1:5000/api/create-account", {
    headers: {"Content-Type": "application/json"},
    method: "POST",
    body: JSON.stringify(data),
  })
  .then(async function (response) {
    if (!response.ok) {
      const response_1 = await response.json();
      
      // username exists in database
      if (response_1.username_error) {
        document.getElementById("create-username").setCustomValidity(response_1.username_error);
        document.getElementById("create-username").reportValidity();
      } 

      // email exists in database
      if (response_1.email_error) { 
        document.getElementById("email").setCustomValidity(response_1.email_error);
        document.getElementById("email").reportValidity();
      }
    } else {
      showAccountCreationSuccessPopUp();
    }
  })
  .catch(function(error) {
    console.log(error); // Log network errors
  });
  
}
/*
  Create Account Popup Functions end
*/

// Check if user is logged in
function checkLogInStatus() {
  if (localStorage.length > 0) {
    window.location.href = calculateUrl;
  } else {
    openLoginForm();
  }
}

// Attach event listeners
document.getElementById("confirm-password").addEventListener("input", function() {
  this.setCustomValidity("");
});

document.getElementById("create-username").addEventListener("input", function() {
  this.setCustomValidity("");
});

document.getElementById("email").addEventListener("input", function() {
  this.setCustomValidity("");
});
