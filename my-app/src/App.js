import React, { useState, useEffect } from 'react';
import './App.css'; // Ensure CSS is imported
import Login from './Login';
import ProductManagement from './ProductManagement';
import UserManagement from './UserManagement';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeSection, setActiveSection] = useState('login'); // Track the active section

    useEffect(() => {
        loadUsers();
        loadProducts();
    }, []);

    const loadUsers = () => {
        const usersData = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(usersData);
    };

    const loadProducts = () => {
        const productsData = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(productsData);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem('loggedIn', 'true');
        setActiveSection('productManagement'); // Set active section to Product Management on login
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('loggedIn');
        setActiveSection('login'); // Set active section to Login on logout
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'productManagement':
                return <ProductManagement products={products} loadProducts={loadProducts} />;
            case 'userManagement':
                return <UserManagement users={users} loadUsers={loadUsers} />;
            default:
                return <Login onLogin={handleLogin} />;
        }
    };

    return (
        <div id="app">
            <header>
                <h1>WINGS CAFE</h1>
                <nav id="nav-bar">
                    <button onClick={() => setActiveSection('login')}>Login</button>
                    {isLoggedIn && (
                        <>
                            <button onClick={() => setActiveSection('productManagement')}>Product Management</button>
                            <button onClick={() => setActiveSection('userManagement')}>User Management</button>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    )}
                </nav>
            </header>
            <main>
                {renderSection()}
            </main>
        </div>
    );
};

export default App;
