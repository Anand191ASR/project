import React, { useState, useEffect } from 'react';

const MenuItemModal = ({ show, handleClose, onSave, itemToEdit }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        available: true,
    });

    useEffect(() => {
        if (show) {

            if (itemToEdit) {
                setFormData({
                    name: itemToEdit.name,
                    description: itemToEdit.description,
                    price: itemToEdit.price,
                    category: itemToEdit.category,
                    available: itemToEdit.available,
                });
            } else {

                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    category: '',
                    available: true,
                });
            }
        }
    }, [itemToEdit, show]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };


    if (!show) {
        return null;
    }

    return (
        <>

            <div className="modal-backdrop fade show"></div>


            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {itemToEdit ? 'Edit Menu Item' : 'Add New Menu Item'}
                            </h5>
                            <button type="button" className="btn-close" onClick={handleClose}></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea id="description" name="description" className="form-control" rows="3" value={formData.description} onChange={handleChange} required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="number" id="price" name="price" className="form-control" step="0.01" value={formData.price} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <input type="text" id="category" name="category" className="form-control" value={formData.category} onChange={handleChange} placeholder="e.g., Appetizer, Main, Dessert" required />
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="availability-switch"
                                        name="available"
                                        checked={formData.available}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="availability-switch">
                                        Available
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MenuItemModal;