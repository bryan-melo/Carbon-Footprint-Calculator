/*
Create Account Popup Functions start
*/
function showAccountCreationSuccessPopUp() {
    document.getElementById("success-popup").style.display = "block";
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
    const email = document.getElementById("create-email").value;
    const password = document.getElementById("create-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const firstName = document.getElementById("create-first-name").value;
    const lastName = document.getElementById("create-last-name").value;

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
            document.getElementById("create-email").setCustomValidity(response_1.email_error);
            document.getElementById("create-email").reportValidity();
        }
        } else {
        showAccountCreationSuccessPopUp();
        }
    })
    .catch(function(error) {
        console.log(error); // Log network errors
    });
}

// Attach event listeners
document.getElementById("create-username").addEventListener("input", function() {
    this.setCustomValidity("");
});

document.getElementById("confirm-password").addEventListener("input", function() {
    this.setCustomValidity("");
});

document.getElementById("create-email").addEventListener("input", function() {
    this.setCustomValidity("");
});
  