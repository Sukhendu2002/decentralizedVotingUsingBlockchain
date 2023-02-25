import styled from "styled-components";

export const Container = styled.main`
  position: relative;
  z-index: 0;
  ${'' /* // padding: 0 10rem; */}
  ${'' /* // margin-top: 5rem; */}
  overflow-x: hidden;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  #tsparticles {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .infoform {
    width: 70%;

    .infoInput {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100vh;
      margin-top: 1rem;
      margin-bottom: 1rem;
      padding: 1rem 2rem;

      border: 1px solid #ccc;
      border-radius: 0.5rem;
      font-size: 1.5rem;
      font-weight: 500;
      margin-right: 1rem;
    }
  }

  .home {
    margin-top: 1/7rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;

    .homeLeft {
      display: flex;
      flex-direction: column;
      padding-left: 6rem;

      p {
        font-size: 2rem;
        font-weight: 400;
        margin-bottom: 1rem;
      }

      h1 {
        font-size: 10rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      .homeLeftButtons {
        display: flex;
        flex-direction: row;

        button {
          padding: 1rem 2rem;
          border: none;
          border-radius: 0.5rem;
          font-size: 1.5rem;
          font-weight: 500;
          margin-right: 1rem;
          ${'' /* // background-color: #ff0000; */}

          background: #b701ff;
          background: -webkit-linear-gradient(top right, #b701ff, #ff7201);
          background: -moz-linear-gradient(top right, #b701ff, #ff7201);
          background: linear-gradient(to bottom left, #b701ff, #ff7201);
          color: #fff;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          &:hover {
            transform: scale(1.05);

            background: #ff7201;
            background: -webkit-linear-gradient(top right, #ff7201, #b701ff);
            background: -moz-linear-gradient(top right, #ff7201, #b701ff);
            background: linear-gradient(to bottom left, #ff7201, #b701ff);
          }
        }
      }
    }
    .homeRight {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100vh;
      text-align: center;

      img {
        width: 95%;
      }
    }
  }

  .process {
    display: flex;
    flex-direction: column;
    align-items: center;

    .heading {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 2rem;
    }
    .allprocess {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 70%;

      text-align: center;
      margin-bottom: 4rem;

      .processCard {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 50%;
        text-align: center;
        margin: 0 1rem;
        padding: 1rem;
        border-radius: 1rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease-in-out;
        &:hover {
          transform: scale(1.05);
        }
        img {
          width: 90%;
          height: 90%;
          margin-bottom: 1rem;
          border-radius: 1rem;
        }
        span {
          font-size: 3rem;
          font-weight: 500;
        }
        h3 {
          font-size: 4rem;
          font-weight: 500;
        }
        p {
          font-size: 2rem;
          font-weight: 400;
        }
      }
    }
  }

  @media (max-width: 700px) {
    padding: 0 4rem;
    .account {
      font-size: 1.5rem;
      width: 90%;
    }
    .home {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 100px;

      .homeLeft {
        padding-left: 0;
        text-align: center;
        margin-bottom: 2rem;

        p {
          font-size: 1.5rem;

          margin-bottom: 1rem;
        }

        h1 {
          font-size: 5rem;

          margin-bottom: 1rem;
        }
        .homeLeftButtons {
          display: flex;
          flex-direction: column;

          button {
            padding: 1rem 2rem;
            border: none;
            border-radius: 0.5rem;
            font-size: 1.5rem;
            font-weight: 500;
            margin-right: 1rem;
            ${'' /* // background-color: #ff0000; */}
          }

          button:nth-child(1) {
            margin-bottom: 1rem;
          }
        }
      }

      .homeRight {
        img {
          width: 100%;
        }
      }
    }

    .process {
      .allprocess {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        .processCard {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          text-align: center;
          margin: 1rem;
        }
      }
    }
  }

  @media (max-width: 360px) {
    padding: 0 2rem;
  }
`;
