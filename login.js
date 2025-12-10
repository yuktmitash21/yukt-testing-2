document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Simple validation
    if (!validateEmail(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        return;
    }

    if (password.length < 6) {
        errorMessage.textContent = 'Password must be at least 6 characters long.';
        return;
    }

    // Simulate an API call
    loginUser(email, password);
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function loginUser(email, password) {
    console.log('Logging in:', email);
    // Here we would normally send a request to the server
    alert('Login successful!');
}