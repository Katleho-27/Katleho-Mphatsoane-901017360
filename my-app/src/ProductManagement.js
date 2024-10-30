import React, { useState } from 'react';

const ProductManagement = ({ products, loadProducts }) => {
    const [product, setProduct] = useState({ id: '', name: '', description: '', category: '', price: '', quantity: '' });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
        if (product.id) {
            const updatedProducts = existingProducts.map(p =>
                p.id === product.id ? { ...p, ...product } : p
            );
            localStorage.setItem('products', JSON.stringify(updatedProducts));
        } else {
            product.id = Date.now().toString();
            existingProducts.push(product);
            localStorage.setItem('products', JSON.stringify(existingProducts));
        }
        loadProducts();
        setProduct({ id: '', name: '', description: '', category: '', price: '', quantity: '' });
    };

    const deleteProduct = (id) => {
        const updatedProducts = products.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        loadProducts();
    };

    return (
        <div>
            <h2>Product Management</h2>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="id" value={product.id} />
                <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Name" required />
                <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="Description" required />
                <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" required />
                <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
                <input type="number" name="quantity" value={product.quantity} onChange={handleChange} placeholder="Quantity" required />
                <button type="submit">Save Product</button>
            </form>
            <ul>
                {products.map(p => (
                    <li key={p.id}>
                        <strong>Name:</strong> {p.name}, <strong>Price:</strong> {p.price}, <button onClick={() => setProduct(p)}>Edit</button>
                        <button onClick={() => deleteProduct(p.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductManagement;
