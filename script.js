document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const filterForm = document.getElementById('filter-form');

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Retrieve users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Check if user exists
            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                alert('Login successful');
            } else {
                alert('Login failed. Your username or password is incorrect, or you have not signed up.');
            }
        });

        // Handle forgot password link
        document.querySelector('.login p a').addEventListener('click', function (e) {
            e.preventDefault();
            alert('Forgot password functionality is not implemented yet.');
        });
    }

    // Handle signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const fullName = document.getElementById('full-name').value;
            const email = document.getElementById('email').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const mobileNumber = document.getElementById('mobile-number').value;
            const occupation = document.getElementById('occupation').value;

            // Validate password length
            if (password.length < 8 || password.length > 12) {
                alert('Password should be between 8 to 12 characters.');
                return;
            }

            // Validate mobile number length
            if (mobileNumber.length !== 10) {
                alert('Mobile number should be exactly 10 digits.');
                return;
            }

            // Retrieve users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Save user data
            users.push({ fullName, email, username, password, mobileNumber, occupation });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Signup successful');

            // Redirect to login page
            window.location.href = 'C:\\Users\\abc\\Desktop\\website\\user-login.html';
        });
    }

    // Handle filter form submission
    if (filterForm) {
        filterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const selectedLocation = document.getElementById('location').value;
            const selectedBhk = document.getElementById('bhk').value;
            const selectedType = document.getElementById('property-type').value;
            const selectedTransaction = document.getElementById('transaction').value;

            const properties = document.querySelectorAll('.property');
            properties.forEach(property => {
                const propertyLocation = property.getAttribute('data-location');
                const propertyBhk = property.getAttribute('data-bhk');
                const propertyType = property.getAttribute('data-type');
                const propertyTransaction = property.getAttribute('data-transaction');

                if (
                    (selectedLocation === propertyLocation || selectedLocation === "") &&
                    (selectedBhk === propertyBhk || selectedBhk === "") &&
                    (selectedType === propertyType || selectedType === "") &&
                    (selectedTransaction === propertyTransaction || selectedTransaction === "")
                ) {
                    property.style.display = "block";
                } else {
                    property.style.display = "none";
                }
            });
        });
    }

    const locationSelect = document.getElementById('location');
    const sectorSelect = document.getElementById('sector');

    locationSelect.addEventListener('change', function () {
        if (locationSelect.value === 'gurugram') {
            sectorSelect.disabled = true;
        } else {
            sectorSelect.disabled = false;
        }
    });

    // Display users on the manage-users.html page
    if (document.getElementById('user-list')) {
        displayUsers();
    }
});

function displayUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userList = document.getElementById('user-list');
    
    userList.innerHTML = ''; // Clear the user list before populating it
    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.classList.add('user');
        userItem.innerHTML = `
                       <h3>${user.fullName}</h3>
            <p>Email: ${user.email}</p>
            <p>Username: ${user.username}</p>
            <p>Mobile Number: ${user.mobileNumber}</p>
            <p>Occupation: ${user.occupation}</p>
            <button onclick="editUser('C:\\Users\\abc\\Desktop\\website\\${user.username}.html')">Edit</button>
            <button onclick="deleteUser('${user.username}')">Delete</button>
        `;
        userList.appendChild(userItem);
    });
}

// Helper functions for managing properties and users
function viewDetails(propertyPage) {
    const basePath = "C:\\Users\\abc\\Desktop\\website\\";
    const fullPath = `${basePath}${propertyPage}`;
    window.location.href = fullPath;
}


function editProperty(propertyId) {
    alert(`Editing property C:\\Users\\abc\\Desktop\\website\\${propertyId}`);
}

function deleteProperty(propertyId) {
    alert(`Deleting property C:\\Users\\abc\\Desktop\\website\\${propertyId}`);
}

function editUser(username) {
    alert(`Editing user C:\\Users\\abc\\Desktop\\website\\${username}`);
}

function deleteUser(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.filter(user => user.username !== username);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert(`User C:\\Users\\abc\\Desktop\\website\\${username} deleted`);
    window.location.reload();
}
