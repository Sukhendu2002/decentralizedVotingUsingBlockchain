import React, { useState, useEffect } from "react";
import { Container } from "./styles";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";

function NavBar(props) {
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
    <Container className="header-fixed bg-[#efeded]">
      <Link to={login ? "/dashboard" : "/"} className="font-extrabold text-6xl hover:px-1 duration-700">
        <span className="hover:text-[#565656]">Voting </span>
        <span className="hover:text-[#d7b550] text-[#ffc107]"
        >
          Dapp{" "}
        </span>
      </Link>

      <input
        onChange={toggleTheme}
        className="container_toggle"
        type="checkbox"
        id="switch"
        name="mode"
      />
      <label htmlFor="switch">Toggle</label>

      <nav className={active ? "active" : ""}>
        <Link
        className="bg-[#2d4b6e] text-[#fff] py-2 px-4 rounded-2xl hover:bg-[#234975]"
          to="/"
          onClick={closeMenu}
          style={{
            fontWeight: "bold",
          }}
        >
          Home
        </Link>

        <NavHashLink
        className="bg-[#2d4b6e] text-[#fff] py-2 px-4 rounded-2xl hover:bg-[#234975]"
          smooth
          to="/Voting"
          onClick={closeMenu}
          style={{
            fontWeight: "bold",
          }}
        >
          Voting
        </NavHashLink>
        <NavHashLink
        className="bg-[#2d4b6e] text-[#fff] py-2 px-4 rounded-2xl hover:bg-[#234975]"
          smooth
          to="/Result"
          style={{
            fontWeight: "bold",
          }}
          onClick={closeMenu}
        >
          Result
        </NavHashLink>

        <Link
          className="bg-[#ffc107] text-[#fff] py-2 px-4 rounded-2xl hover:bg-[#c39f33] hover:text-[#fff] transition-all animate-bounce animate-pulse"
          to="/Registration"
          style={{
            fontWeight: "bold",
          }}
          onClick={closeMenu}
        >
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
