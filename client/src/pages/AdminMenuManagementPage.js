import React, { useState, useEffect } from 'react';
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from '../api/menu';
import MenuItemModal from '../components/MenuItemModal';
import { Link } from 'react-router-dom';

const AdminMenuManagementPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    const fetchMenuItems = async () => {
        try {
            const res = await getMenuItems();
            setMenuItems(res.data);
        } catch (err) {
            console.error("Failed to fetch menu items:", err);
        }
    };

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const handleSave = async (formData) => {
        try {
            if (currentItem) {
                // Update existing item
                await updateMenuItem(currentItem._id, formData);
            } else {
                // Create new item
                await createMenuItem(formData);
            }
            fetchMenuItems(); // Refresh the list
            handleClose();
        } catch (err) {
            console.error("Failed to save menu item:", err);
            alert("Error: Could not save item.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await deleteMenuItem(id);
                fetchMenuItems(); // Refresh the list
            } catch (err) {
                console.error("Failed to delete menu item:", err);
            }
        }
    };

    const handleEdit = (item) => {
        setCurrentItem(item);
        setShowModal(true);
    };

    const handleCreate = () => {
        setCurrentItem(null);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setCurrentItem(null);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Menu Management</h1>
                <button className="btn btn-primary" onClick={handleCreate}>Add New Item</button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Available</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuItems.map(item => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>₹{item.price.toFixed(2)}</td>
                                <td>{item.available ? 'Yes' : 'No'}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm" onClick={() => handleEdit(item)}>Edit</button>
                                    <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <MenuItemModal show={showModal} handleClose={handleClose} onSave={handleSave} itemToEdit={currentItem} />
            <div className="mt-4">
                <Link to="/admin" className="btn btn-secondary">Back to Dashboard</Link>
            </div>
        </div>
    );
};

export default AdminMenuManagementPage;