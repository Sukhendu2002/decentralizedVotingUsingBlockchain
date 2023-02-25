import styled from "styled-components";

export const Container = styled.main`
  position: relative;
  z-index: 0;
  padding: 0 10rem;
  margin-top: 8rem;
  min-height: 100vh;
  overflow-x: hidden;
  #tsparticles {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .verify {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 4rem;
    p {
      font-size: 2rem;
      font-family: "Poppins", sans-serif;
      line-height: 1.5;
    }
  }

  .voting-can {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .heading {
      font-size: 3.5rem;
      font-family: "Poppins", sans-serif;
      line-height: 1.5;
      text-decoration: underline;
    }

    .candidate-list {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      margin-top: 2rem;

      .card {
        width: 230px;
        height: 370px;
        padding: 1rem;
        background-image: linear-gradient(
          144deg,
          #f9a826,
          #492fed 60%,
          #bd6fda
        );
        border: none;
        position: relative;
        margin: 0 1rem;
        font-family: inherit;

        box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease-in-out;

        &:hover {
          transform: translateY(-10px);
          box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.3);
          background-image: linear-gradient(
            144deg,
            #5d5d5d,
            #292929 60%,
            #a9a9a9
          );
        }
      }

      .card span {
        font-weight: 600;
        color: white;
        text-align: center;
        display: block;
        padding-top: 10px;
        font-size: 1.3em;
      }

      .card .job {
        font-weight: 400;
        color: white;
        display: block;
        text-align: center;
        padding-top: 5px;
        font-size: 1em;
      }

      .card .img {
        width: 70px;
        height: 70px;
        background: #e8e8e8;
        border-radius: 100%;
        margin: auto;
        margin-top: 20px;
      }

      .card button {
        padding: 8px 25px;
        display: block;
        margin: auto;
        border-radius: 8px;
        border: none;
        margin-top: 30px;
        background: #e8e8e8;
        color: #111111;
        font-weight: 600;
      }

      .card button:hover {
        background: #212121;
        color: #ffffff;
      }
    }
  }

  @media (max-width: 740px) {
    padding: 0 4rem;
  }

  @media (max-width: 360px) {
    padding: 0 2rem;
  }
`;
