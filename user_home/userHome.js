document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  if (!user || !user.email) {
    alert("Please log in first.");
    window.location.href = "../login/login.html";
    return;
  }

  const fullName = `${user.firstName || ""} ${user.middleName || ""} ${user.lastName || ""}`
    .replace(/\s+/g, " ")
    .trim();

  document.getElementById("userName").textContent = fullName || "User";
  document.getElementById("userID").textContent = user.utrgvId ? `UTRGV ID: ${user.utrgvId}` : "";
  document.getElementById("userEmail").textContent = user.email ? `Email: ${user.email}` : "";

  renderMyLost(user.email);
  renderMyFound(user.email);
});

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ---------- LOST ---------- */
function getLostItems() {
  return JSON.parse(localStorage.getItem("lostItems")) || [];
}
function saveLostItems(items) {
  localStorage.setItem("lostItems", JSON.stringify(items));
}

function renderMyLost(email) {
  const list = document.getElementById("myLostItemsList");
  list.innerHTML = "";

  const all = getLostItems();
  const mine = all.filter(x => x.ownerEmail === email);

  if (mine.length === 0) {
    list.innerHTML = `<li class="list-group-item text-muted">No lost items posted yet.</li>`;
    return;
  }

  mine.slice().reverse().forEach(item => {
    const li = document.createElement("li");
    li.className = "list-group-item";

    li.innerHTML = `
      <div class="d-flex justify-content-between gap-2">
        <div>
          <div class="fw-bold text-capitalize">${escapeHtml(item.type)}</div>
          <div class="small text-muted">${escapeHtml(item.building)} • ${escapeHtml(item.room)} • ${escapeHtml(item.date)} ${escapeHtml(item.time)}</div>
          <div class="small"><strong>Color:</strong> ${escapeHtml(item.color)}<br><strong>Details:</strong> ${escapeHtml(item.details)}</div>
        </div>
        <button class="btn btn-outline-danger btn-sm" data-del-lost="${escapeHtml(makeSigLost(item))}">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });

  list.querySelectorAll("button[data-del-lost]").forEach(btn => {
    btn.addEventListener("click", () => {
      const sig = btn.getAttribute("data-del-lost");
      const allItems = getLostItems();
      const idx = allItems.findIndex(x => x.ownerEmail === email && makeSigLost(x) === sig);
      if (idx === -1) return;
      allItems.splice(idx, 1);
      saveLostItems(allItems);
      renderMyLost(email);
    });
  });
}

function makeSigLost(item) {
  return [
    item.ownerEmail, item.type, item.building, item.room,
    item.date, item.time, item.color, item.details
  ].join("|");
}

/* ---------- FOUND ---------- */
function getFoundItems() {
  return JSON.parse(localStorage.getItem("foundItems")) || [];
}
function saveFoundItems(items) {
  localStorage.setItem("foundItems", JSON.stringify(items));
}

function renderMyFound(email) {
  const list = document.getElementById("myFoundItemsList");
  list.innerHTML = "";

  const all = getFoundItems();
  const mine = all.filter(x => x.ownerEmail === email);

  if (mine.length === 0) {
    list.innerHTML = `<li class="list-group-item text-muted">No found items posted yet.</li>`;
    return;
  }

  mine.slice().reverse().forEach(item => {
    const leftWithText = item.leftWith === "Other" ? item.leftWithOther : item.leftWith;

    const li = document.createElement("li");
    li.className = "list-group-item";

    li.innerHTML = `
      <div class="d-flex justify-content-between gap-2">
        <div>
          <div class="fw-bold text-capitalize">${escapeHtml(item.type)}</div>
          <div class="small text-muted">${escapeHtml(item.foundBuilding)} • ${escapeHtml(item.foundRoom)} • ${escapeHtml(item.dateFound)} ${escapeHtml(item.timeFound)}</div>
          <div class="small"><strong>Left with:</strong> ${escapeHtml(leftWithText)}<br><strong>Details:</strong> ${escapeHtml(item.details)}</div>
        </div>
        <button class="btn btn-outline-danger btn-sm" data-del-found="${escapeHtml(makeSigFound(item))}">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });

  list.querySelectorAll("button[data-del-found]").forEach(btn => {
    btn.addEventListener("click", () => {
      const sig = btn.getAttribute("data-del-found");
      const allItems = getFoundItems();
      const idx = allItems.findIndex(x => x.ownerEmail === email && makeSigFound(x) === sig);
      if (idx === -1) return;
      allItems.splice(idx, 1);
      saveFoundItems(allItems);
      renderMyFound(email);
    });
  });
}

function makeSigFound(item) {
  return [
    item.ownerEmail, item.type, item.foundBuilding, item.foundRoom,
    item.dateFound, item.timeFound, item.color, item.details,
    item.leftWith, item.leftWithOther || ""
  ].join("|");
}
