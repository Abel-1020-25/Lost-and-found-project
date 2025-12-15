const userInfo = JSON.parse(localStorage.getItem("userInfo"));

if (userInfo) {
    const fullName = [userInfo.firstName, userInfo.middleName, userInfo.lastName]
        .filter(Boolean)
        .join(" ");

    document.getElementById("userName").textContent =
        fullName || "Name not provided";

    document.getElementById("userEmail").textContent =
        userInfo.email || "Email not available";

    document.getElementById("userID").textContent =
        userInfo.utrgvId || "";
}
