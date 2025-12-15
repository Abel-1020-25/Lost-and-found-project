const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const utrgvId = document.getElementById("utrgvId").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !utrgvId || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Save current user in localStorage
    const currentUser = {
        name: name,
        email: email,
        id: "UTRGV-" + Math.floor(1000 + Math.random() * 9000)
    };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Save all registered users (optional, useful for login verification)
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || {};
    allUsers[email] = { name, utrgvId, password };
    localStorage.setItem("allUsers", JSON.stringify(allUsers));

    // Redirect to logged-in home
    window.location.href = "../../../AfterLogIn/afterLog.html";
});
