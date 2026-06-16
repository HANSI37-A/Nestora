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
import Designers from './pages/Designers';
import Showrooms from './pages/Showrooms';
import AdminLayout from './components/Admin/AdminLayout';
import AdminHomePage from './pages/AdminHomePage';
import UserManaagement from './components/Admin/UserManaagement';
import ProductManagement from './components/Admin/ProductManagement';
import EditProductPage from './components/Admin/EditProductPage';
import OrderManagement from './components/Admin/OrderManagement';
import AccountSettings from './pages/AccountSettings';
import DesignerManagement from './components/Admin/DesignerManagement';
import EditDesigner from './components/Admin/EditDesigner';
import ShowroomManagement from './components/Admin/showroomManagement';
import ShowroomDetails from './pages/ShowroomDetails';

import { Provider } from "react-redux";
import store from "./redux/store";


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<UserLayout />}>
          
            <Route index element={<Home />} />
            
            {/* All nested pages here will cleanly share the sticky Navbar */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="account-settings" element={<AccountSettings />} />
            <Route path="collection/:collection" element={<Collection />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="order-confirmation/:id" element={<OrderConfirmation />} />
            <Route path="my-orders" element={<MyOrdersPage />} />
            <Route path="order/:id" element={<OrderDetailsPage />} />
            <Route path="showrooms" element={<Showrooms />} />
            <Route path="showrooms/:id" element={<ShowroomDetails />} />
            <Route path="designers" element={<Designers />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManaagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="designers" element={<DesignerManagement />} />
            <Route path="designers/:id/edit" element={<EditDesigner />} />
            <Route path="showrooms" element={<ShowroomManagement />} />
          </Route>

        </Routes>
      
      </BrowserRouter>
    </Provider>
  );
};

export default App;
