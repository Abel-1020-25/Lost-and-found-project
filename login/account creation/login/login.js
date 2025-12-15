const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const utrgvId = document.getElementById("loginUtrgvId").value.trim();

    // Get existing userInfo if it exists
    let userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

    // Update login-related info
    userInfo.email = email;
    userInfo.utrgvId = utrgvId;

    // Save BACK to the same key
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    console.log("Updated userInfo:", userInfo);

    window.location.href = "../../../AfterLogIn/afterLog.html";
});
