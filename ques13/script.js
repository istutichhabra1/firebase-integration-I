const DATABASE_URL = "https://your-database.firebaseio.com/users"; // Replace with your Firebase URL

// Fetch and Display Users
async function fetchUsers() {
    try {
        const res = await fetch(`${DATABASE_URL}.json`);
        const data = await res.json();

        const userTable = document.getElementById("user-table");
        userTable.innerHTML = ""; // Clear table

        if (data) {
            Object.entries(data).forEach(([id, user]) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>
                        <button class="edit" onclick="editUser('${id}', '${user.name}', '${user.email}')">Edit</button>
                    </td>
                `;
                userTable.appendChild(row);
            });
        }
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

// Edit User - Pre-Fill Form
function editUser(id, name, email) {
    document.getElementById("user-id").value = id;
    document.getElementById("edit-name").value = name;
    document.getElementById("edit-email").value = email;
    document.getElementById("edit-user-form").classList.remove("hidden");
}

// Handle User Update (PATCH Request)
document.getElementById("edit-user-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const userId = document.getElementById("user-id").value;
    const name = document.getElementById("edit-name").value;
    const email = document.getElementById("edit-email").value;
    const message = document.getElementById("message");

    if (!name || !email) {
        showMessage("All fields are required!", "error");
        return;
    }

    try {
        const response = await fetch(`${DATABASE_URL}/${userId}.json`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email }),
        });

        if (!response.ok) throw new Error("Update failed");

        showMessage("User updated successfully!", "success");
        document.getElementById("edit-user-form").classList.add("hidden");
        fetchUsers(); // Refresh the table
    } catch (error) {
        showMessage("Error updating user.", "error");
        console.error("Error:", error);
    }
});

function showMessage(text, type) {
    const message = document.getElementById("message");
    message.textContent = text;
    message.className = type;
    message.classList.remove("hidden");
}

// Load Users on Page Load
fetchUsers();
