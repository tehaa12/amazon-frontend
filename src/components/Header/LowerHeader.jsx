import React from 'react'
import { CiMenuBurger } from "react-icons/ci";
import classes from "./Header.module.css"

function LowerHeader() {
  return (
    <>
      <div className={classes.lower}>
        <ul>
          <li>
            <CiMenuBurger />
            <p>all</p>
          </li>
          <li>today's deals</li>
          <li>costumer service</li>
          <li>registry</li>
          <li>gift cards</li>
          <li>sell</li>
        </ul>
      </div>
    </>
  );
}

export default LowerHeader
