const DATABASE_URL = "https://your-database.firebaseio.com/users.json"; // Replace with your Firebase Realtime Database URL

document.getElementById("user-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message");

    if (!name || !email) {
        showMessage("Please fill out all fields.", "error");
        return;
    }

    const userData = { name, email };

    try {
        const response = await fetch(DATABASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error("Failed to add user.");
        }

        showMessage("User added successfully!", "success");

        // Clear form fields
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
    } catch (error) {
        showMessage("Error adding user. Try again.", "error");
        console.error("Error:", error);
    }
});

function showMessage(text, type) {
    const message = document.getElementById("message");
    message.textContent = text;
    message.className = type;
    message.classList.remove("hidden");
}
