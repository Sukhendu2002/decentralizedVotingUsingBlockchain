import React, { useState, useEffect } from "react";
import { Container } from "./stylesh";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [active, setactive] = useState(false);
  const [login, setLogin] = useState(false);
  const toggleTheme = () => {
    let html = document.getElementsByTagName("html")[0];
    //save the theme in local storage

    html.classList.toggle("dark");
  };

  const closeMenu = () => {
    setactive(false);
  };
  return (
    <Container className="header-fixed">
      <Link to={login ? "/dashboard" : "/"} className="logo">
        <span>Voting </span>
        <span
          style={{
            fontWeight: "bold",
            color: "#f9a826",
          }}
        >
          Dapp{" "}
        </span>
      </Link>

      {/* <input
        onChange={toggleTheme}
        className="container_toggle"
        type="checkbox"
        id="switch"
        name="mode"
      />
      <label htmlFor="switch">Toggle</label> */}

      <nav className={active ? "active" : ""}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        <NavHashLink smooth to="/Voting" onClick={closeMenu}>
          Voting
        </NavHashLink>
        <NavHashLink smooth to="/Result" onClick={closeMenu}>
          Result
        </NavHashLink>

        <Link className="button" to="/Registration" onClick={closeMenu}>
          Register
        </Link>
      </nav>

      <div
        aria-expanded={active ? "true" : "false"}
        aria-haspopup="true"
        className={active ? "menu active" : "menu"}
        onClick={() => {
          setactive(!active);
        }}
      ></div>
    </Container>
  );
}

export default NavBar;
