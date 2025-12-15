const accInfoForm = document.getElementById("accInfoForm");

if (!accInfoForm) {
    console.error("accInfoForm not found");
}

accInfoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const userInfo = {
        firstName: document.getElementById("firstName").value.trim(),
        middleName: document.getElementById("middleName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        utrgvId: document.getElementById("utrgvId").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        campus: document.getElementById("campus").value
    };

    console.log("User info saved:", userInfo);

    // Save for later (My Account page)
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    // Redirect to logged-in home
    window.location.href = "../../../AfterLogIn/afterLog.html";
});
