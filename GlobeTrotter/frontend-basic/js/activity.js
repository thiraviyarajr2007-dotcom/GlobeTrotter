const activities = [
    {
        name: "Temple Sightseeing",
        type: "Sightseeing",
        cost: "Low",
        duration: "2 hrs",
        desc: "Explore famous temples and heritage places.",
        img: "https://source.unsplash.com/300x200/?temple"
    },
    {
        name: "Street Food Tour",
        type: "Food",
        cost: "Medium",
        duration: "3 hrs",
        desc: "Taste local food and snacks.",
        img: "https://source.unsplash.com/300x200/?street-food"
    },
    {
        name: "Trekking Adventure",
        type: "Adventure",
        cost: "High",
        duration: "5 hrs",
        desc: "Mountain trekking and nature exploration.",
        img: "https://source.unsplash.com/300x200/?trekking"
    }
];

const activityList = document.getElementById("activityList");
const typeFilter = document.getElementById("typeFilter");
const costFilter = document.getElementById("costFilter");

function displayActivities(list) {
    activityList.innerHTML = "";

    list.forEach(act => {
        const div = document.createElement("div");
        div.className = "activity-card";

        div.innerHTML = `
            <h3>${act.name}</h3>
            <img src="${act.img}">
            <p><b>Type:</b> ${act.type}</p>
            <p><b>Cost:</b> ${act.cost}</p>
            <p><b>Duration:</b> ${act.duration}</p>
            <p>${act.desc}</p>

            <button class="add" onclick="addActivity('${act.name}')">➕ Add</button>
            <button class="remove" onclick="removeActivity('${act.name}')">➖ Remove</button>
        `;

        activityList.appendChild(div);
    });
}

function addActivity(name) {
    alert(name + " added to itinerary ✅");
}

function removeActivity(name) {
    alert(name + " removed from itinerary ❌");
}

function filterActivities() {
    const type = typeFilter.value;
    const cost = costFilter.value;

    const filtered = activities.filter(a => {
        return (type === "all" || a.type === type) &&
               (cost === "all" || a.cost === cost);
    });

    displayActivities(filtered);
}

typeFilter.addEventListener("change", filterActivities);
costFilter.addEventListener("change", filterActivities);

displayActivities(activities);
