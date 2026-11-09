import axios from 'axios';
import { useState, useEffect } from 'react';

function Supplier() {

    const [suppliers, setSuppliers] = useState([]);
    const [editId, setEditId] = useState(null);
    const [supplierName, setSupplierName] = useState('');
    const [supplierPhone, setSupplierPhone] = useState('');
    const [supplierEmail, setSupplierEmail] = useState('');
    useEffect(() => {
        axios.get('http://localhost:8080/suppliers')
            .then((response) => {
                setSuppliers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const editSupplier = (supplier) => {
        setEditId(supplier.supplierId);
        setSupplierName(supplier.supplierName);
        setSupplierPhone(supplier.supplierPhone);
        setSupplierEmail(supplier.supplierEmail);
    };

    const addSupplier = (event) => {
        event.preventDefault();

        if (supplierName.trim() === "" ||
            supplierPhone.trim() === "" ||
            supplierEmail.trim() === "") {
            alert("Please fill all supplier details");
            return;
        }

        const newSupplier = {
            supplierName: supplierName,
            supplierPhone: supplierPhone,
            supplierEmail: supplierEmail
        };

        if (editId !== null) {
            const updatedSupplier = {
                supplierName: supplierName,
                supplierPhone: supplierPhone,
                supplierEmail: supplierEmail
            };

            axios.put('http://localhost:8080/suppliers/' + editId, updatedSupplier)
                .then((response) => {
                    const updatedSuppliers = suppliers.map((supplier) => {
                        if (supplier.supplierId === editId) {
                            return response.data;
                        }
                        return supplier;
                    });

                    setSuppliers(updatedSuppliers);
                    setEditId(null);
                    setSupplierName("");
                    setSupplierPhone("");
                    setSupplierEmail("");
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error updating supplier");
                });

            return;
        }

        axios.post('http://localhost:8080/suppliers', newSupplier)
            .then((response) => {
                setSuppliers([...suppliers, response.data]);

                setSupplierName("");
                setSupplierPhone("");
                setSupplierEmail("");
            })
            .catch((error) => {
                console.log(error);
                alert("Error adding supplier");
            });
    };

    const deleteSupplier = (id) => {
        axios.delete('http://localhost:8080/suppliers/' + id)
            .then(() => {
                const updatedSuppliers = suppliers.filter(
                    (supplier) => supplier.supplierId !== id
                );

                setSuppliers(updatedSuppliers);
            })
            .catch((error) => {
                console.log(error);
                alert("Error deleting supplier");
            });
    };

    return (
        <div className="management-section">
            <h2>Supplier Management</h2>

            <form onSubmit={addSupplier}>
                <label>Supplier Name: </label>
                <input
                    type="text"
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                    placeholder="Enter Supplier Name"
                />

                <br /><br />

                <label>Phone: </label>
                <input
                    type="text"
                    value={supplierPhone}
                    onChange={(e) => setSupplierPhone(e.target.value)}
                    placeholder="Enter Phone Number"
                />

                <br /><br />

                <label>Email: </label>
                <input
                    type="email"
                    value={supplierEmail}
                    onChange={(e) => setSupplierEmail(e.target.value)}
                    placeholder="Enter Email"
                />

                <br /><br />

                <button type="submit">
                    {editId !== null ? "Update Supplier" : "Add Supplier"}
                </button>
            </form>

            <br />

            <table border="1">
                <thead>
                    <tr>
                        <th>Supplier ID</th>
                        <th>Supplier Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {suppliers.map((supplier) => (
                        <tr key={supplier.supplierId}>
                            <td>{supplier.supplierId}</td>
                            <td>{supplier.supplierName}</td>
                            <td>{supplier.supplierPhone}</td>
                            <td>{supplier.supplierEmail}</td>
                            <td>
                                <button onClick={() => editSupplier(supplier)}>
                                    Edit
                                </button>
                                <button onClick={() => deleteSupplier(supplier.supplierId)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Supplier;