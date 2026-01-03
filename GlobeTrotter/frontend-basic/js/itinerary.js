const itineraryContainer = document.getElementById("itineraryContainer");
const addStopBtn = document.getElementById("addStopBtn");

let stopCount = 0;

addStopBtn.addEventListener("click", addStop);

function addStop() {
    stopCount++;

    const stopDiv = document.createElement("div");
    stopDiv.className = "stop-card";

    stopDiv.innerHTML = `
        <h3>Stop ${stopCount}</h3>

        <label>City:</label><br>
        <select>
            <option>Chennai</option>
            <option>Coimbatore</option>
            <option>Paris</option>
            <option>Tokyo</option>
        </select><br>

        <label>Start Date:</label><br>
        <input type="date"><br>

        <label>End Date:</label><br>
        <input type="date"><br>

        <label>Activities:</label><br>
        <input type="text" placeholder="Temple visit, food tour..."><br>

        <div class="actions">
            <button onclick="moveUp(this)">⬆ Move Up</button>
            <button onclick="moveDown(this)">⬇ Move Down</button>
            <button onclick="removeStop(this)">❌ Remove</button>
        </div>
    `;

    itineraryContainer.appendChild(stopDiv);
}

function removeStop(btn) {
    btn.closest(".stop-card").remove();
}

function moveUp(btn) {
    const card = btn.closest(".stop-card");
    const prev = card.previousElementSibling;
    if (prev) itineraryContainer.insertBefore(card, prev);
}

function moveDown(btn) {
    const card = btn.closest(".stop-card");
    const next = card.nextElementSibling;
    if (next) itineraryContainer.insertBefore(next, card);
}
