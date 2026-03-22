import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout, { AuthProvider, useAuth } from './components/Layout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';

// Seller
import SellerDashboard from './pages/seller/sellerDashboard';
import AddProduct from './pages/seller/Addproduct';
import MyListings from './pages/seller/MyListings';
import ClusterStatus from './pages/seller/ClusterStatus';
import OrderHistory from './pages/seller/OrderHistory';
import Payments from './pages/seller/Payments';

// Buyer
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import BrowseSupply from './pages/buyer/BrowseSupply';
import Forecasts from './pages/buyer/Forecasts';
import PreOrders from './pages/buyer/PreOrders';
import Invoices from './pages/buyer/Invoices';

// Consumer
import Shop from './pages/consumer/Shop';
import Cart from './pages/consumer/Cart';
import Checkout from './pages/consumer/Checkout';
import ConsumerOrders from './pages/consumer/ConsumerOrders';
import OrderTracking from './pages/consumer/OrderTracking';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import ClusterMonitor from './pages/admin/ClusterMonitor';
import Transactions from './pages/admin/Transactions';
import Analytics from './pages/admin/Analytics';
import Disputes from './pages/admin/Disputes';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* Authenticated Layout */}
          <Route element={<Layout />}>
            {/* Seller Routes */}
            <Route path="/seller" element={<ProtectedRoute><SellerDashboard /></ProtectedRoute>} />
            <Route path="/seller/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
            <Route path="/seller/listings" element={<ProtectedRoute><MyListings /></ProtectedRoute>} />
            <Route path="/seller/clusters" element={<ProtectedRoute><ClusterStatus /></ProtectedRoute>} />
            <Route path="/seller/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
            <Route path="/seller/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />

            {/* Buyer Routes */}
            <Route path="/buyer" element={<ProtectedRoute><BuyerDashboard /></ProtectedRoute>} />
            <Route path="/buyer/browse" element={<ProtectedRoute><BrowseSupply /></ProtectedRoute>} />
            <Route path="/buyer/forecasts" element={<ProtectedRoute><Forecasts /></ProtectedRoute>} />
            <Route path="/buyer/orders" element={<ProtectedRoute><PreOrders /></ProtectedRoute>} />
            <Route path="/buyer/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />

            {/* Consumer Routes */}
            <Route path="/consumer" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
            <Route path="/consumer/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/consumer/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/consumer/orders" element={<ProtectedRoute><ConsumerOrders /></ProtectedRoute>} />
            <Route path="/consumer/tracking" element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
            <Route path="/admin/clusters" element={<ProtectedRoute><ClusterMonitor /></ProtectedRoute>} />
            <Route path="/admin/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
            <Route path="/admin/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/admin/disputes" element={<ProtectedRoute><Disputes /></ProtectedRoute>} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
