const fetchUsers = async () => {
    try {
        const res = await fetch('https://your-project-id.firebaseio.com/users.json');
        const data = await res.json();
        
        const userTable = document.getElementById("user-table");
        userTable.innerHTML = ""; // Clear table

        if (data) {
            Object.entries(data).forEach(([id, user]) => {
                const row = document.createElement("tr");
                row.id = `row-${id}`; // Assign an ID for easy deletion
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>
                        <button onclick="deleteUser('${id}')">Delete</button>
                    </td>
                `;
                userTable.appendChild(row);
            });
        }
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

const deleteUser = async (key) => {
    try {
        const response = await fetch(`https://your-project-id.firebaseio.com/users/${key}.json`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error("Failed to delete user");
        }

        console.log("User deleted successfully");
        document.getElementById(`row-${key}`).remove();
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};

// Fetch users on page load
document.addEventListener("DOMContentLoaded", fetchUsers);
