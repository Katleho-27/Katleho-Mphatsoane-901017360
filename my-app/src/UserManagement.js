import React, { useState } from 'react';

const UserManagement = ({ users, loadUsers }) => {
    const [user, setUser] = useState({ id: '', username: '', password: '', role: '' });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        if (user.id) {
            const updatedUsers = existingUsers.map(u =>
                u.id === user.id ? { ...u, ...user } : u
            );
            localStorage.setItem('users', JSON.stringify(updatedUsers));
        } else {
            user.id = Date.now().toString();
            existingUsers.push(user);
            localStorage.setItem('users', JSON.stringify(existingUsers));
        }
        loadUsers();
        setUser({ id: '', username: '', password: '', role: '' });
    };

    const deleteUser = (id) => {
        const updatedUsers = users.filter(u => u.id !== id);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        loadUsers();
    };

    return (
        <div>
            <h2>User Management</h2>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="id" value={user.id} />
                <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username (Kash)" required />
                <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password (123qwerty)" required />
                <select name="role" value={user.role} onChange={handleChange} required>
                    <option value="">Select role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
                <button type="submit">Save User</button>
            </form>
            <ul>
                {users.map(u => (
                    <li key={u.id}>
                        <strong>Username:</strong> {u.username}, <strong>Role:</strong> {u.role}, <button onClick={() => setUser(u)}>Edit</button>
                        <button onClick={() => deleteUser(u.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
