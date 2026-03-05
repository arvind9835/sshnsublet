// Google Sheet JSON link
const sheetURLBase = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSxy2GfZ2e97B0vGI-iVTrAHrFROOaj6Okw7WWNa_T04S2htRUOuZIy5cyBvBRBBQwVu8t1RVWTN8lR/pubhtml?gid=234411873&single=true";

let rooms = [];

// Load data from Google Sheet
function loadData() {
  const sheetURL = sheetURLBase + "&cacheBuster=" + new Date().getTime();

  fetch(sheetURL)
    .then(res => res.text())
    .then(data => {
      const json = JSON.parse(data.substring(47).slice(0,-2));
      const rows = json.table.rows;

      rooms = [];

      rows.forEach(r => {
        rooms.push({
          city: r.c[1]?.v || "",
          area: r.c[2]?.v || "",
          rent: r.c[3]?.v || "",
          date: r.c[4]?.v || "",
          desc: r.c[5]?.v || "",
          email: r.c[6]?.v || ""
        });
      });

      renderListings(rooms);
    });
}

// Render all listings
function renderListings(data) {
  const container = document.getElementById("listings");
  container.innerHTML = "";

  data.forEach((r, i) => {
    const card = `
      <div class="card">
        <h3>${r.city}</h3>
        <p>${r.area}</p>
        <p class="price">€${r.rent}/month</p>
        <p>Available: ${r.date}</p>
        <button onclick="showDetails(${i})">View Details</button>
      </div>
    `;
    container.innerHTML += card;
  });
}

// Show modal
function showDetails(i) {
  const r = rooms[i];
  document.getElementById("mCity").innerText = r.city;
  document.getElementById("mArea").innerText = "Area: " + r.area;
  document.getElementById("mRent").innerText = "Rent: €" + r.rent;
  document.getElementById("mDate").innerText = "Available: " + r.date;
  document.getElementById("mDesc").innerText = r.desc;
  document.getElementById("mEmail").innerText = "Contact: " + r.email;

  document.getElementById("modal").style.display = "block";
}

// Close modal
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Initial load
loadData();

// Auto-refresh every 2 seconds
setInterval(loadData, 2000);