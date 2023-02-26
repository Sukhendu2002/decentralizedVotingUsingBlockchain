import React, { useState, useEffect } from "react";
import { Container } from "./styles";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";

function NavbarAdmin() {
  const [active, setactive] = useState(false);
  const [login, setLogin] = useState(false);

  const toggleTheme = () => {
    let html = document.getElementsByTagName("html")[0];
    html.classList.toggle("dark");
    //save the theme in local storage
    // const theme = localStorage.getItem("theme");
    // if (theme === "dark") {
    //   localStorage.setItem("theme", "light");
    //   window.location.reload();
    // }
    // if (theme === "light") {
    //   localStorage.setItem("theme", "dark");
    //   window.location.reload();
    // }

    //reload the page
  };

  const closeMenu = () => {
    setactive(false);
  };
  return (
    <Container className="header-fixed border-b-2 bg-[#e8e7e7]">
      <Link to="/" className="text-[#ffc107] font-extrabold text-5xl hover:text-[#f2cf66]">
        <span className="text-6xl font-serif font-extrabold ">Admin </span>
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
        <NavHashLink
        className="bg-[#2d4b6e] text-[#fff] py-2 px-4 rounded-2xl hover:bg-[#234975]"
          to="/Verification"
          onClick={closeMenu}
          style={{
            fontWeight: "bold",
          }}
        >
          Verification
        </NavHashLink>

        <NavHashLink
        className="bg-[#2d4b6e] text-[#fff] py-2 px-4 rounded-2xl hover:bg-[#234975]"
          smooth
          to="/AddCandidate"
          style={{
            fontWeight: "bold",
          }}
          onClick={closeMenu}
        >
          Add Candidate
        </NavHashLink>
        <NavHashLink
        className="bg-[#2d4b6e] text-[#fff] py-2 px-4 rounded-2xl hover:bg-[#234975]"
          smooth
          to="/Registration"
          style={{
            fontWeight: "bold",
          }}
          onClick={closeMenu}
        >
          Registration
        </NavHashLink>
        <NavHashLink
        className="bg-[#2d4b6e] text-[#fff] py-2 px-4 rounded-2xl hover:bg-[#234975]"
          smooth
          to="/Voting"
          style={{
            fontWeight: "bold",
          }}
          onClick={closeMenu}
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
          Results
        </NavHashLink>

        {/* <Link className="button" onClick={logoutUser}>
          Disconnect
        </Link> */}
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

export default NavbarAdmin;
