import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

import "../styles/Header.css";

export function Header() {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <div>
        <h1>Global Harmony</h1>
        <p>Scheduling Made Seamless Across Time Zones</p>
      </div>
    </header>
  );
}
