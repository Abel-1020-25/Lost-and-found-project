const items = [
    {
        title: "Black Wallet",
        location: "UTRGV Library",
        description: "Contains student ID",
        status: "LOST"
    },
    {
        title: "AirPods",
        location: "Student Union",
        description: "White case with sticker",
        status: "FOUND"
    }
];

function renderItems() {
    const container = document.getElementById("itemsContainer");
    container.innerHTML = "";

    items.forEach(item => {
        container.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${item.status}: ${item.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${item.location}</h6>
                        <p class="card-text">${item.description}</p>
                        <button class="btn btn-primary btn-sm">View Details</button>
                    </div>
                </div>
            </div>
        `;
    });
}

renderItems();
