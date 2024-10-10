import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { CartProvider } from './components/Context/CartContext'; // Adjust the path as needed


createRoot(document.getElementById("root")).render(
  <CartProvider>
    <App/>
  </CartProvider>
);
