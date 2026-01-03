function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Please fill all fields");
    } else {
        window.location.href = "dashboard.html";
    }
}
function saveTrip() {
    let name = document.getElementById("tripName").value;
    let start = document.getElementById("startDate").value;
    let end = document.getElementById("endDate").value;

    if (name === "" || start === "" || end === "") {
        alert("Please fill all required fields");
        return;
    }

    alert("Trip Created Successfully!");
    window.location.href = "dashboard.html";
}
function logout() {
    // Optional: clear stored data later
    alert("You have been logged out");
    window.location.href = "index.html";
}
/* ===== MOCK GOOGLE LOGIN ===== */
function googleLogin() {
    alert("Google login successful (demo)");
    window.location.href = "dashboard.html";
}

/* ===== MOCK PHONE OTP LOGIN ===== */
function sendOTP() {
    let phone = document.getElementById("phone").value;

    if (phone === "") {
        alert("Enter phone number");
        return;
    }

    alert("OTP sent: 123456 (demo)");

    document.getElementById("otp").style.display = "block";
    document.getElementById("verifyBtn").style.display = "block";
}

function verifyOTP() {
    let otp = document.getElementById("otp").value;

    if (otp === "123456") {
        alert("OTP verified");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid OTP");
    }
}
/* ===== MOCK GOOGLE LOGIN ===== */
function googleLogin() {
    alert("Google login successful (demo)");
    window.location.href = "dashboard.html";
}

function sendOTP() {
    let phone = document.getElementById("phone").value;

    if (phone === "") {
        alert("Please enter phone number");
        return;
    }

    alert("OTP sent: 123456 (demo)");

    document.getElementById("otp").style.display = "block";
    document.getElementById("verifyBtn").style.display = "block";
}

function verifyOTP() {
    let otp = document.getElementById("otp").value;

    if (otp === "123456") {
        alert("OTP verified");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid OTP");
    }
}
