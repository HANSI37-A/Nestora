import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLayout from './components/Layout/UserLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Collection from './pages/Collection';
import ProductDetails from './components/Products/ProductDetails';
import CheckOut from './components/Cart/CheckOut';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/collection/:category" element={<Collection />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="chechout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;