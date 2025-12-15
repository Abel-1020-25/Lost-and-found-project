document.addEventListener("DOMContentLoaded", () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const lostItems = JSON.parse(localStorage.getItem("lostItems")) || [];

    if (userInfo) {
        document.getElementById("userName").textContent =
            `${userInfo.firstName} ${userInfo.middleName || ""} ${userInfo.lastName}`;
        document.getElementById("userID").textContent = `UTRGV ID: ${userInfo.utrgvId}`;
        document.getElementById("userEmail").textContent = userInfo.email;
    }

    const lostItemsList = document.getElementById("lostItemsList");

    if (lostItems.length === 0) {
        lostItemsList.innerHTML = `<li class="list-group-item text-muted">No lost items yet.</li>`;
    } else {
        lostItems.forEach(item => {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.innerHTML = `
                <strong>${item.type}</strong><br>
                ${item.building}, ${item.room}<br>
                ${item.color} — ${item.date}
            `;
            lostItemsList.appendChild(li);
        });
    }
});
