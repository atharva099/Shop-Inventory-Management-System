import Category from './components/Category';
import Supplier from './components/Supplier';
import Product from './components/Product';
import './Inventory.css';

function App() {
    return (
        <div>
            <h1>Shop Inventory Management System</h1>
            <h2>Welcome to Shop Inventory</h2>

            <p>Manage Categories, Suppliers and Products</p>

            <Category />
            <Supplier />
            <Product />
        </div>
    );
}

export default App;