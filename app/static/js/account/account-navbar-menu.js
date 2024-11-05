document.addEventListener("DOMContentLoaded", function() {
    const userData = localStorage.getItem('userData');
    const userDropdown = document.getElementById('user-dropdown');
    const loginItem = document.getElementById('login-item');
    const createAccountItem = document.getElementById('create-account-item');
    const dropdownMenu = document.getElementById('user-menu');

    // User logged in
    if (userData) {
        const user = JSON.parse(userData);
        const username = user.username;

        // Show the dropdown with the user's name
        userDropdown.style.display = 'block';
        document.getElementById('username-display').textContent = username;

        // Populate dropdown menu
        dropdownMenu.innerHTML = `
            <li><a class="dropdown-item" href="${profileUrl}">Profile</a></li>
            <li><a class="dropdown-item" href="${calculateUrl}">Calculate</a></li>
            <li><a class="dropdown-item" href="${forumUrl}">Forums</a></li>
            <li><a class="dropdown-item" onclick="logout()">Logout</a></li>
        `;

        // Hide login and create account links
        loginItem.style.display = 'none';
        createAccountItem.style.display = 'none';
    } else {
        // User not logged in
        userDropdown.style.display = 'none'; 
        loginItem.style.display = 'block';  
        createAccountItem.style.display = 'block'; 
    }
});

function logout() {
    localStorage.removeItem('userData');
    window.location.href = homeUrl;
}
