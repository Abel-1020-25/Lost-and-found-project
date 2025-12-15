const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();

    //  Clear old signup info FIRST
    localStorage.removeItem("userInfo");

    // Save ONLY what login should know
    const userInfo = {
        email: email,
        firstName: "",
        middleName: "",
        lastName: "",
        utrgvId: ""
    };

    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    // Go to logged-in home
    window.location.href = "../../../AfterLogIn/afterLog.html";
});
