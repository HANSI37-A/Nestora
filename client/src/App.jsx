import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLayout from './components/Layout/UserLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Collection from './pages/Collection';
import ProductDetails from './components/Products/ProductDetails';
import CheckOut from './components/Cart/CheckOut';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderDetailsPage from './pages/OrderDetailsPage';
import MyOrdersPage from './pages/MyOrdersPage';
import Home from './pages/Home';
import AdminLayout from './components/Admin/AdminLayout';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />}>
        <Route path="/" element={<UserLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/collection/:category" element={<Collection />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
        <Route path="/order/:id" element={<OrderDetailsPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />} />
      </Routes>
      
    </BrowserRouter>
  );
};

export default App;
