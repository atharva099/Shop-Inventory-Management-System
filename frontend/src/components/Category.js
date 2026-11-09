import { useState, useEffect } from 'react';
import axios from 'axios';

function Category() {

    const [editId, setEditId] = useState(null);

    const editCategory = (category) => {
        setCategoryName(category.categoryName);
        setEditId(category.categoryId);
    };

    const deleteCategory = (id) => {

        axios.delete("http://localhost:8080/categories/" + id)
            .then(() => {
                const updatedCategories = categories.filter(
                    (category) => category.categoryId !== id
                );

                setCategories(updatedCategories);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const addCategory = (event) => {
        event.preventDefault();

        if (categoryName.trim() === "") {
            alert("Please enter category name");
            return;
        }

        if (editId !== null) {

            const updatedCategory = {
                categoryName: categoryName
            };

            axios.put("http://localhost:8080/categories/" + editId, updatedCategory)
                .then((response) => {
                    const updatedCategories = categories.map((category) => {
                        if (category.categoryId === editId) {
                            return response.data;
                        }
                        return category;
                    });

                    setCategories(updatedCategories);
                    setCategoryName("");
                    setEditId(null);
                })
                .catch((error) => {
                    console.log(error);
                });

        } else {
            const newCategory = {
                categoryName: categoryName
            };

            axios.post("http://localhost:8080/categories", newCategory)
                .then((response) => {
                    setCategories([...categories, response.data]);
                    setCategoryName("");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const [categoryName, setCategoryName] = useState('');

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/categories')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="management-section">
            <h2>Category Management</h2>

            <form onSubmit={addCategory}>
                <label>Category Name: </label>

                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter Category Name"
                />

                <button type="submit">
                    {editId !== null ? "Update Category" : "Add Category"}
                </button>
            </form>

            <br />

            <table border="1">
                <thead>
                    <tr>
                        <th>Category ID</th>
                        <th>Category Name</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {categories.map((category) => (
                        <tr key={category.categoryId}>
                            <td>{category.categoryId}</td>
                            <td>{category.categoryName}</td>
                            <td>
                                <button onClick={() => editCategory(category)}>
                                    Edit
                                </button>
                                <button onClick={() => deleteCategory(category.categoryId)}>
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

export default Category;