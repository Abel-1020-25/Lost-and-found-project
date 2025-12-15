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