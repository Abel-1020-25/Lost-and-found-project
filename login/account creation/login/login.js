// login.js (Login + verify saved accounts)

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const utrgvId = document.getElementById("loginUtrgvId").value.trim();
    const password = document.getElementById("loginPassword").value;

    // Load registered accounts
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // Find matching account
    const user = accounts.find(a =>
      a.email === email &&
      a.utrgvId === utrgvId &&
      a.password === password
    );

    if (!user) {
      alert("Login failed. Check Email, UTRGV ID, and Password.");
      return;
    }

    // Save the logged-in user (this is what your app can use)
    const userInfo = {
      email: user.email,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      utrgvId: user.utrgvId,
      campus: user.campus,
      phone: user.phone
    };

    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    // Go to logged-in home
    window.location.href = "../../../AfterLogIn/afterLog.html";
  });
});
