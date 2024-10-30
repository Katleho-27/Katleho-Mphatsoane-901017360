import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const authenticateUser = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(
            (u) => u.username === username && u.password === password
        );
        if (user) {
            onLogin();
        } else {
            setError('Invalid username or password');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        authenticateUser();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username (Kash)"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (123qwerty)"
                required
            />
            <button type="submit">Login</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
};

export default Login;
