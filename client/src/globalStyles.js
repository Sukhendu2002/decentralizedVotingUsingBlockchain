import { createGlobalStyle } from "styled-components";
//get the them prafarance from the local storage
const theme = localStorage.getItem("theme");
// console.log(theme);
const GlobalStyle = createGlobalStyle`

  :root{
    --pink: #E31F71;
    --black: #212121;
    --green: #23ce6b;
    --blue: #016fb9;
    --purple: #6E3FF2 ;
    --white: #FFFF;
    --gray: #E5E5E5;
    --gray-dark: #999;
    --lin: linear-gradient(to left top, #8364e2, #f94ebd, #ff627c, #ffa436, #f9e700);
    scroll-padding-top: 10rem;

    &.light{

      body{
        transition: 0.5s;
        background-color: #f5f5f5;
        color: var(--black);
      }

      .logo{
        color: var(--black);
      }

      header.header-fixed{
        transition: 0.5s;
        background-color: #f5f5f550;
        a{
          transition: 0.5s;
          color: black;
        }
        .menu,.menu:before, .menu:after{
          background-color: var(--black); 
        }
        .menu.active{
          background-color: rgba(555,555,555,0);
        }
      }

      footer.footer{
        transition: 0.5s;
        background-color: rgba(0,0,0,0.1);
        color: var(--black);
      }

      form{
        input,textarea{
          transition: 0.5s;
          border: solid 1px var(--black);
          color: var(--black);
          &::placeholder{
            transition: 0.5s;
            color: var(--black);
          }
        }
      }

    }

    &.dark{

      body{
        transition: 0.5s;
        background-color: #212121;
        color: #f5f5f5;
      }

      .logo{
        color: #f5f5f5;
      }

      header.header-fixed{
        transition: 0.5s;
        background-color: #21212150;
        a{
          transition: 0.5s;
          color: #f5f5f5;
        }
        .menu,.menu:before, .menu:after{
          background-color: #f5f5f5;
        }
        .menu.active{
          background-color: rgba(555,555,555,0);
        }

      }
    }
  }



  ul, li {
    text-decoration: none;
    list-style: none;
    margin: 0;
    padding:0;
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html{
    font-size: 62.5%;
  }

  body{
    font-size: 1.6rem;
    -webkit-font-smoothing: antialiased;
    // background-color: ${theme === "dark" ? "var(--black)" : "var(--white)"};
    // color: ${theme === "dark" ? "var(--white)" : "var(--black)"};
    background-color: var(--white);
    color: var(--black);

  }

  body, input, textarea, button{
    // font-family: 'Red Hat Display', sans-serif;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  a{
    text-decoration: none;
  }

  // button, .button{
  //   border: none;
  //   cursor: pointer;
  //   // background-color: var(--purple);
  //   color: var(--white);
  //   border-radius: 2rem;
  //   border: solid 1px var(--purple);
  //   font-weight: 500;
  //   transition: filter 0.25s;
  //   &:hover{
  //     filter: brightness(0.8);
  //     // fill the button with the color
  //     background-color: var(--purple);
  //     color: #FFFF;
  //   }
  // }

  button:disabled, .button:disabled{
    filter: brightness(0.8);
    cursor: not-allowed;
  }


  .logo{
    font-size: 3rem;
    color: #FFFF;
    & > *:first-child{
      color: var(--purple);
    }
    text-decoration: none;
   
    &:hover{
      text-shadow: 0 0 10px var(--purple), 0 0 20px var(--purple), 0 0 30px var(--purple), 0 0 40px var(--purple), 0 0 50px var(--purple), 0 0 60px var(--purple), 0 0 70px var(--white);
      text-decoration: none;
      //make the text-shadow more smooth
      -webkit-text-stroke: 1px #f9a826;
      -webkit-text-fill-color: transparent;

    }
    
  }
  

`;

export default GlobalStyle;
