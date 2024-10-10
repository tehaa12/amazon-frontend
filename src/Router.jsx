import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import AuthForm from "./Pages/Auth/AuthForm";
import Payment from "./Pages/Payment/Payment";
import Order from "./Pages/Orders/Order";
import Cart from "./Pages/Cart/Cart";
import Result from "./Pages/Results/Result";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import PaymentSuccess from "./Pages/Payment/PaymentSuccess";
import ProtectedRoute from "./components/ProtectedRouter.jsx/ProtectedRouter"; // Import ProtectedRoute

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<AuthForm />} />

        {/* Protected Routes */}
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        />

        {/* Unprotected Routes */}
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/category/:categoryName" element={<Result />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default Routing;
