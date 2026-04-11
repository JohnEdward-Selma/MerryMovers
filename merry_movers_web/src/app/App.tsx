
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../features/home/pages/HomePage';
import ProductPage from '../features/product/pages/ProductPage';
import BookingCartPage from '../features/cart/pages/BookingCartPage';
import ScheduleAndCheckoutPage from '../features/schedule/pages/ScheduleAndCheckoutPage';
import AdminPage from '../features/admin/pages/AdminPage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import ProfilePage from '../features/profile/pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<BookingCartPage />} />
        <Route path="/schedule" element={<ScheduleAndCheckoutPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dashboard" element={<ProfilePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
