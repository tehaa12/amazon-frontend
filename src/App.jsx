import React from "react";
import { CartProvider } from "./components/Context/CartContext"; // Adjust the import path
import Routing from "../src/Router"; // Assuming Routing contains your main routes
import "./App.css"
function App() {
  return (
    <CartProvider>
      <Routing />
    </CartProvider>
  );
}

export default App;
