import React from "react"
import "./Header.css";
import logo from "./bbb_logo.png";

import { Link, NavLink } from "react-router-dom";

export default function Header()
{
    return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/players">
              Players
            </Link>
          </li>
          
          <li>
            <Link to="/teams">
              Teams
            </Link>
          </li>
          <li>
            <Link to="/">
              Seasons
            </Link>
          </li> 
          <li>
            <Link to="/">
              Fantasy
            </Link>
          </li> 
          <li id="search">
            Search
            <input type="text" />
          </li>
          <li>
            <Link to="/home" >
              <img src={logo} id="logo"/>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
    )
}