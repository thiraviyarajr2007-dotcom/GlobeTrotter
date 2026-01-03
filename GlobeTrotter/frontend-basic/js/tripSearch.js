// ===============================
// MOCK API DATA (Dynamic)
// ===============================
const experiences = Array.from({ length: 30 }, (_, i) => ({
  name: "Experience " + (i + 1),
  type: ["Sightseeing", "Food", "Adventure"][i % 3],
  cost: ["Low", "Medium", "High"][i % 3],
  duration: ["Short", "Medium", "Long"][i % 3],
  img: `https://source.unsplash.com/400x300/?travel,${i}`
}));

const cards = document.getElementById("results");
let page = 1;
const limit = 6;

// ===============================
// RENDER CARDS
// ===============================
function render(list) {
  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${item.img}">
      <div class="card-content">
        <h3>${item.name}</h3>
        <p>${item.type} • ${item.cost} • ${item.duration}</p>
        <button onclick="addToTrip('${item.name}')">Add to Trip</button>
      </div>
    `;
    cards.appendChild(div);
  });
}

// ===============================
// LOAD DATA (Pagination)
// ===============================
function loadData(filteredData = experiences) {
  const slice = filteredData.slice((page - 1) * limit, page * limit);
  render(slice);
  page++;
}

// ===============================
// SEARCH BUTTON FIX ✅
// ===============================
function searchTrips() {
  cards.innerHTML = "";
  page = 1;
  applyFilters();
}

// ===============================
// FILTER LOGIC
// ===============================
function applyFilters() {
  const type = document.getElementById("typeFilter").value;
  const cost = document.getElementById("costFilter").value;
  const duration = document.getElementById("durationFilter").value;

  const filtered = experiences.filter(e =>
    (type === "all" || e.type === type) &&
    (cost === "all" || e.cost === cost) &&
    (duration === "all" || e.duration === duration)
  );

  cards.innerHTML = "";
  page = 1;
  loadData(filtered);
}

// ===============================
// EVENT LISTENERS
// ===============================
document.getElementById("typeFilter").onchange = applyFilters;
document.getElementById("costFilter").onchange = applyFilters;
document.getElementById("durationFilter").onchange = applyFilters;

// ===============================
// INFINITE SCROLL (Lazy Load)
// ===============================
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
    loadData();
  }
});

// ===============================
// ADD TO TRIP
// ===============================
function addToTrip(name) {
  alert(name + " added to itinerary ✅");
}

// ===============================
// INITIAL LOAD
// ===============================
loadData();
