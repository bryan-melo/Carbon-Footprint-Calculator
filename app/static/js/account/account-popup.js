function openLoginForm() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById('create-account-form').style.display = "none";
}

function openCreateAccountForm() {
  document.getElementById("create-account-form").style.display = "block";
  document.getElementById("login-form").style.display = "none";
}
  
function closeLoginForm() {
    document.getElementById("login-form").style.display = "none";
}

function closeCreateAccountForm() {
  document.getElementById("create-account-form").style.display = "none";
}