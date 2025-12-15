const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const utrgvId = document.getElementById("loginUtrgvId").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if(!name || !email || !utrgvId || !password){
        alert("Please fill all fields.");
        return;
    }

    const user = { name, email, id: utrgvId };

    // Save current user
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Redirect to userHome
    window.location.href = "../../../../user_home/userHome.html";
});
