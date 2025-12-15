// info.js (Create Account)

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("accInfoForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const middleName = document.getElementById("middleName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();

    const email = document.getElementById("email").value.trim().toLowerCase();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const utrgvId = document.getElementById("utrgvId").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const campus = document.getElementById("campus").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!campus) {
      alert("Please select a campus.");
      return;
    }

    // Load existing accounts list
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // prevent duplicate email or id
    const exists = accounts.some(a => a.email === email || a.utrgvId === utrgvId);
    if (exists) {
      alert("That email or UTRGV ID is already registered.");
      return;
    }

    const newAccount = {
      firstName,
      middleName,
      lastName,
      email,
      password,   // for demo only
      utrgvId,
      phone,
      campus
    };

    accounts.push(newAccount);
    localStorage.setItem("accounts", JSON.stringify(accounts));

    alert("Account created! Now log in.");

    // go to your login page (change path if needed)
    window.location.href = "login.html";
  });
});
