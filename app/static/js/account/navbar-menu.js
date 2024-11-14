document.addEventListener("DOMContentLoaded", function() {
    const userData = localStorage.getItem('userData');
    const loginItem = document.getElementById('login-item');
    const createAccountItem = document.getElementById('create-account-item');
    const profileItem = document.getElementById('profile-item');
    const calculateItem = document.getElementById('calculate-item');
    const socialMediaItem = document.getElementById('social-media-item');
    const logoutItem = document.getElementById('logout-item'); 

    // User logged in
    if (userData) {
        // Hide login and create account links
        loginItem.style.display = 'none';
        createAccountItem.style.display = 'none';
        profileItem.style.display = 'block';
        calculateItem.style.display = 'block';
        socialMediaItem.style.display = 'block';
        logoutItem.style.display = 'block';
    } else {
        // User not logged in
        loginItem.style.display = 'block';  
        createAccountItem.style.display = 'block';
    }
});

function logout() {
    localStorage.removeItem('userData');
    window.location.href = homeUrl;
}
