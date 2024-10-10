import React, { useState, useEffect } from "react";
import classes from "./Header.module.css";
import { CiLocationOn } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";
import LowerHeader from "./lowerHeader";
import { Link } from "react-router-dom";
import { useCart } from "../../components/Context/CartContext"; // Adjust the path
import { getAuth, signOut } from "firebase/auth";

function Header() {
  const { state } = useCart();
  const [user, setUser] = useState(null);

  // Get the current user from Firebase authentication
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Set the user if logged in
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Handle sign-out
  const handleSignOut = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUser(null); // Reset the user state after logging out
    alert("You have been signed out.");
  };

  // Calculate total number of items in the cart based on their quantity
  const totalItemsInCart = state.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className={classes.all}>
      <div className={classes.header}>
        <div className={classes.logo}>
          {/* logo */}
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
              alt="amazon logo"
              width={120}
            />
          </Link>

          <div className={classes.delivery}>
            <span>
              {/* icon */}
              <CiLocationOn />
            </span>
            <div>
              <p>Delivered To</p>
              <span>ethiopia</span>
            </div>
          </div>
        </div>
        {/* logo */}
        <div className={classes.search}>
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" placeholder="Search product" name="" id="" />
          <CiSearch size={25} />
        </div>
        {/* search */}
        <div className={classes.order}>
          <Link to="" className={classes.language}>
            <img
              src="https://www.shutterstock.com/shutterstock/photos/2477519645/display_1500/stock-vector-american-flag-usa-design-united-states-flag-rendered-usa-flag-the-usa-national-flag-2477519645.jpg"
              alt="usa flag"
            />
            <select name="" id="">
              <option value="">EN</option>
            </select>
          </Link>

          {/* Check if the user is logged in */}
          {user ? (
            <div className={classes.userAccount}>
              <p>Hello, {user.email.split("@")[0]}</p>{" "}
              {/* Display user's name */}
              <button onClick={handleSignOut} className={classes.signOutButton}>
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/auth">
              <p>Sign In</p>
              <span>Account & Lists</span>
            </Link>
          )}

          <Link to="/orders">
            <p>Returns</p>
            <span>& Orders</span>
          </Link>
          <Link to="/cart" className={classes.cart}>
            <LuShoppingCart size={35} />
            <span>{totalItemsInCart}</span>
          </Link>
        </div>
        {/* order */}
      </div>
      <LowerHeader />
    </div>
  );
}

export default Header;
