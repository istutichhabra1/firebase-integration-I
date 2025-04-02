const FIREBASE_URL = "https://your-database.firebaseio.com/users.json"; // Replace with your Firebase URL

document.addEventListener("DOMContentLoaded", fetchUsers);

async function fetchUsers() {
    const tableBody = document.getElementById("user-table");
    const errorMessage = document.getElementById("error-message");

    try {
        const response = await fetch(FIREBASE_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch data.");
        }

        const data = await response.json();
        tableBody.innerHTML = "";

        if (!data) {
            tableBody.innerHTML = "<tr><td colspan='2'>No users found.</td></tr>";
            return;
        }

        Object.entries(data).forEach(([key, user]) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${user.name}</td><td>${user.email}</td>`;
            tableBody.appendChild(row);
        });
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
    }
}
