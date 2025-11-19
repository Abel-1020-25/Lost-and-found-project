// Handle Login form
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // stop page reload

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();


    // const res = await fetch('http://localhost:3000/api/login', { ... })

    console.log('Login with:', email, password);
    alert('Login clicked (this will later talk to the backend).');
});

// Handle Sign Up form
const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();

    // In the future, you'll send this to your backend:
    // const res = await fetch('http://localhost:3000/api/register', { ... })

    console.log('Sign up with:', name, email, password);
    alert('Sign Up clicked (this will later create an account in the backend).');
});