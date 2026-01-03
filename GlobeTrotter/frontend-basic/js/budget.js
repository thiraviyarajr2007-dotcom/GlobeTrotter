// Sample cost data
const costs = {
    transport: 12000,
    stay: 18000,
    activities: 6000,
    meals: 4000
};

const tripDays = 5;
const dailyBudgetLimit = 8000;

// Calculations
const totalCost =
    costs.transport +
    costs.stay +
    costs.activities +
    costs.meals;

const avgCostPerDay = Math.round(totalCost / tripDays);

// Update UI
document.getElementById("totalCost").innerText = totalCost;
document.getElementById("avgCost").innerText = avgCostPerDay;

// Alert
const alertBox = document.getElementById("alert");
if (avgCostPerDay > dailyBudgetLimit) {
    alertBox.innerText = "⚠️ Over budget days detected!";
    alertBox.style.color = "red";
} else {
    alertBox.innerText = "✅ Budget under control";
    alertBox.style.color = "green";
}

// PIE CHART
new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
        labels: ["Transport", "Stay", "Activities", "Meals"],
        datasets: [{
            data: [
                costs.transport,
                costs.stay,
                costs.activities,
                costs.meals
            ],
            backgroundColor: [
                "#3498db",
                "#2ecc71",
                "#f1c40f",
                "#e74c3c"
            ]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

// BAR CHART
new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
        labels: ["Transport", "Stay", "Activities", "Meals"],
        datasets: [{
            label: "Cost in ₹",
            data: [
                costs.transport,
                costs.stay,
                costs.activities,
                costs.meals
            ],
            backgroundColor: "#8e44ad"
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
