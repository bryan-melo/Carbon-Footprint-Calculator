function setWelcomeMessage() {
    // Retrieve user data from local storage
    const userData = localStorage.getItem('userData');
    const user = JSON.parse(userData);
    const username = user.username;

    // Set Welcome message
    const welcomeMessage = "Welcome " + username + ",";
    document.getElementById('welcome-user-message').textContent = welcomeMessage;
}

document.addEventListener("DOMContentLoaded", function() {
    setWelcomeMessage();
});