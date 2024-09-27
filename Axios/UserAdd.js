import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './UserAdd.css'; // Importing CSS for styling

const UserAdd = () => {
    // State to hold user data and input values
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // Fetch existing users on component mount
    useEffect(() => {
        Axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    // Function to add a new user
    const addUser = () => {
        if (!name || !email) return; // Prevent adding empty users

        const newUser = {
            id: users.length + 1, // Assigning unique id
            name,
            email
        };

        // Using Axios to simulate a post request
        Axios.post('https://jsonplaceholder.typicode.com/users', newUser)
            .then(response => {
                // Append the new user to the existing list
                setUsers([...users, response.data]);
                // Clear input fields
                setName('');
                setEmail('');
            })
            .catch(error => console.error("Error adding user:", error));
    };

    return (
        <div className="user-list-container">
            <h1>User List</h1>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={addUser}>Add New</button>
            </div>
        </div>
    );
};

export default UserAdd;
