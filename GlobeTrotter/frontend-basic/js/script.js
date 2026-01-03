// Sample city data (later DB-la irundhu varum)
const cities = [
    { name: "Chennai", country: "India", cost: "Low", popularity: "High" },
    { name: "Coimbatore", country: "India", cost: "Low", popularity: "Medium" },
    { name: "Paris", country: "France", cost: "High", popularity: "High" },
    { name: "Tokyo", country: "Japan", cost: "High", popularity: "High" }
];

const cityList = document.getElementById("cityList");
const searchInput = document.getElementById("searchInput");
const countryFilter = document.getElementById("countryFilter");

// Display cities
function displayCities(filteredCities) {
    cityList.innerHTML = "";

    filteredCities.forEach(city => {
        const div = document.createElement("div");
        div.className = "city-card";

        div.innerHTML = `
            <h3>${city.name}</h3>
            <p>Country: ${city.country}</p>
            <p>Cost Index: ${city.cost}</p>
            <p>Popularity: ${city.popularity}</p>
            <button onclick="addToTrip('${city.name}')">Add to Trip</button>
        `;

        cityList.appendChild(div);
    });
}

// Add to trip
function addToTrip(cityName) {
    alert(cityName + " added to your trip ✈️");
}

// Search & filter logic
function filterCities() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCountry = countryFilter.value;

    const filtered = cities.filter(city => {
        const matchesSearch = city.name.toLowerCase().includes(searchText);
        const matchesCountry =
            selectedCountry === "all" || city.country === selectedCountry;

        return matchesSearch && matchesCountry;
    });

    displayCities(filtered);
}

// Event listeners
searchInput.addEventListener("input", filterCities);
countryFilter.addEventListener("change", filterCities);

// Initial load
displayCities(cities);
fetch("http://localhost:5000/api/trips")
  .then(res => res.json())
  .then(data => console.log(data));
