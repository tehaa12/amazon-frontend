import React from "react";
import Routing from "./Router";
import { CartProvider } from "./components/Context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <CartProvider>
      <div>
        <Routing />
        <ToastContainer />
      </div>
    </CartProvider>
  );
}
export default App;
