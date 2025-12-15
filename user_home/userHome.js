const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(!currentUser){
    alert("You must log in first.");
    window.location.href = "../../../../login/account creation/login/login.html";
}

// Display user info
document.getElementById("userName").textContent = currentUser.name;
document.getElementById("userEmail").textContent = currentUser.email;
document.getElementById("userID").textContent = currentUser.id;

// Display user's lost items
const lostItemsList = document.getElementById("lostItemsList");
const allItems = JSON.parse(localStorage.getItem("lostItems")) || {};
const userItems = allItems[currentUser.email] || [];

if(userItems.length === 0){
    lostItemsList.innerHTML = "<li class='list-group-item text-muted'>No items posted yet.</li>";
} else {
    userItems.forEach(item => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `${item.category === 'lost' ? 'Lost' : 'Found'}: ${item.color} ${item.type} in ${item.building} ${item.room}`;
        lostItemsList.appendChild(li);
    });
}

// Logout
function logout(){
    localStorage.removeItem("currentUser");
    window.location.href = "../../../../home/index.html";
}
