import { useState, useEffect } from 'react';
import axios from 'axios';

function Product() {

    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const [categoryId, setCategoryId] = useState('');
    const [supplierId, setSupplierId] = useState('');
    const [products, setProducts] = useState([]);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/categories')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get('http://localhost:8080/suppliers')
            .then((response) => {
                setSuppliers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get('http://localhost:8080/products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const addProduct = (event) => {
        event.preventDefault();

        if (productName.trim() === "" ||
            price === "" ||
            quantity === "" ||
            categoryId === "" ||
            supplierId === "") {
            alert("Please fill all product details");
            return;
        }

        const newProduct = {
            productName: productName,
            productPrice: Number(price),
            productQuantity: Number(quantity),
            category: {
                categoryId: Number(categoryId)
            },
            supplier: {
                supplierId: Number(supplierId)
            }
        };

        if (editId !== null) {
            const updatedProduct = {
                productName: productName,
                productPrice: Number(price),
                productQuantity: Number(quantity),
                category: {
                    categoryId: Number(categoryId)
                },
                supplier: {
                    supplierId: Number(supplierId)
                }
            };

            axios.put('http://localhost:8080/products/' + editId, updatedProduct)
                .then((response) => {
                    const updatedProducts = products.map((product) => {
                        if (product.productId === editId) {
                            return response.data;
                        }
                        return product;
                    });

                    setProducts(updatedProducts);
                    setEditId(null);
                    setProductName("");
                    setPrice("");
                    setQuantity("");
                    setCategoryId("");
                    setSupplierId("");

                    alert("Product updated successfully");
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error updating product");
                });

            return;
        }

        axios.post('http://localhost:8080/products', newProduct)
            .then((response) => {
                alert("Product added successfully");

                setProductName("");
                setPrice("");
                setQuantity("");
                setCategoryId("");
                setSupplierId("");
            })
            .catch((error) => {
                console.log(error);
                alert("Error adding product");
            });
    };

    const deleteProduct = (id) => {
        axios.delete('http://localhost:8080/products/' + id)
            .then(() => {
                const updatedProducts = products.filter(
                    (product) => product.productId !== id
                );

                setProducts(updatedProducts);
            })
            .catch((error) => {
                console.log(error);
                alert("Error deleting product");
            });
    };

    const editProduct = (product) => {
        setEditId(product.productId);
        setProductName(product.productName);
        setPrice(product.productPrice);
        setQuantity(product.productQuantity);
        setCategoryId(product.category.categoryId);
        setSupplierId(product.supplier.supplierId);
    };

    return (
        <div className="management-section">
            <h2>Product Management</h2>

            <form onSubmit={addProduct}>
                <label>Product Name: </label>
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Enter Product Name"
                />

                <br /><br />

                <label>Price: </label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter Price"
                />

                <br /><br />

                <label>Quantity: </label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter Quantity"
                />

                <br /><br />

                <label>Category: </label>
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option value="">Select Category</option>

                    {categories.map((category) => (
                        <option
                            key={category.categoryId}
                            value={category.categoryId}
                        >
                            {category.categoryName}
                        </option>
                    ))}
                </select>

                <br /><br />

                <label>Supplier: </label>
                <select
                    value={supplierId}
                    onChange={(e) => setSupplierId(e.target.value)}
                >
                    <option value="">Select Supplier</option>

                    {suppliers.map((supplier) => (
                        <option
                            key={supplier.supplierId}
                            value={supplier.supplierId}
                        >
                            {supplier.supplierName}
                        </option>
                    ))}
                </select>

                <br /><br />

                <button type="submit">
                    {editId !== null ? "Update Product" : "Add Product"}
                </button>
            </form>

            <br />

            <table border="1">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Supplier</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product.productId}>
                            <td>{product.productId}</td>
                            <td>{product.productName}</td>
                            <td>{product.productPrice}</td>
                            <td>{product.productQuantity}</td>
                            <td>{product.category?.categoryName}</td>
                            <td>{product.supplier?.supplierName}</td>
                            <td>
                                <button onClick={() => editProduct(product)}>
                                    Edit
                                </button>

                                <button onClick={() => deleteProduct(product.productId)}>
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

export default Product;