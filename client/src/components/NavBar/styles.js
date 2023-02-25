import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.8rem 10rem;

  ${'' /* // background-color: #21212150; */}

  backdrop-filter: blur(6px);

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1000;

  nav {
    display: flex;
    align-items: center;
    gap: 1.8rem;
    a {
      ${'' /* color: #f9a826; */}
      padding: 0.6rem;
      font-family: "Poppins", sans-serif;
      font-size: 2rem;

      font-weight: 500;
      ${'' /* // text-transform: uppercase; */}
      transition: filter 0.25s;

      &.button {
        padding: 0.5rem 3rem;
        border-width: 2px;
      }

      &:hover {
        ${'' /* // filter: brightness(0.6); */}
        ${'' /* color: #f9a826; */}
        ${'' /* //increase the color brightness */}
        -webkit-filter: brightness(1.5);
        -moz-filter: brightness(1.5);
        -o-filter: brightness(1.5);
        -ms-filter: brightness(1.5);
        filter: brightness(1.5);
      }
    }
  }

  /* Dropdown Button */
  .dropbtn {
    padding: 16px;
    font-size: 16px;
    border: none;
    color: #ffff;
    padding: 0.6rem;
    font-family: "Questrial", sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    transition: filter 0.25s;

    &.button {
      padding: 0.6rem 5rem;
    }

    &:hover {
      filter: brightness(0.6);
    }
  }

  /* The container <div> - needed to position the dropdown content */
  .dropdown {
    position: relative;
    display: inline-block;
  }

  /* Dropdown Content (Hidden by Default) */
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    z-index: 1;
  }

  /* Links inside the dropdown */
  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  /* Change color of dropdown links on hover */
  .dropdown-content a:hover {
    background-color: #ddd;
    border-radius: 0.5rem;
  }

  /* Show the dropdown menu on hover */
  .dropdown:hover .dropdown-content {
    display: block;
  }

  /* Change the background color of the dropdown button when the dropdown content is shown */
  .dropdown:hover .dropbtn {
  }
  .logo {
    font-size: 2.8rem;
    font-weight: 700;
    text-decoration: none;
    display: flex;
    align-items: center;
    &:hover {
      color: #f5f5f5;
      corsor: pointer;
    }
  }

  .menu-container {
    cursor: pointer;
    padding: 0.6rem 0;
  }

  .menu {
    width: 2rem;
    height: 0.2rem;
    background: #000000;
    position: relative;
    cursor: pointer;
    display: none;

    &:before {
      bottom: 0.5rem;
    }
    &:after {
      top: 0.5rem;
    }

    &.active:before {
      bottom: 0;
      transform: rotate(45deg);
    }

    &.active:after {
      top: 0;
      transform: rotate(135deg);
    }

    &.active {
      background-color: rgba(0, 0, 0, 0);
    }
  }

  .menu:before,
  .menu:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 0.2rem;
    background: #000000;
    cursor: pointer;
    transition: 0.6s;
  }

  input[type="checkbox"] {
    height: 0;
    width: 0;
    visibility: hidden;
    outline: none;
  }

  label {
    cursor: pointer;
    text-indent: -9999px;
    width: 55px;
    height: 30px;
    background: var(--purple);
    display: block;
    justify-content: center;
    align-items: center;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
    position: relative;
    margin-left: auto;
    right: 10px;
  }

  @media only screen and (max-width: 800px) {
    label {
      position: relative;
    }
  }

  label:after {
    content: "";
    background: #f9a826;
    width: 20px;
    height: 20px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    position: absolute;
    top: 5px;
    left: 4px;
    transition: cubic-bezier(0.68, -0.55, 0.27, 01.55) 320ms;
  }

  input:checked + label {
    background: var(--gray-dark);
  }

  input:checked + label:after {
    left: calc(100% - 5px);
    -webkit-transform: translateX(-100%);
    -moz-transform: translateX(-100%);
    -ms-transform: translateX(-100%);
    -o-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  @media (max-width: 960px) {
    padding: 1.8rem 3rem;

    .menu {
      display: block;
    }

    nav {
      -ms-overflow-style: none;
      scrollbar-width: none;
      overflow: hidden;
      opacity: 0;
      visibility: hidden;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: fixed;
      width: 100vw;
      height: 100vh;
      background: var(--blue);
      top: 0;
      left: 0;
      transition: opacity 0.25s;
      background-color: var(--purple);

      a.button {
        background-color: var(--purple);
      }

      &.active {
        opacity: 1;
        visibility: visible;
      }
    }
  }
`;
