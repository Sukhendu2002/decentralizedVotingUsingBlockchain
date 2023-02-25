import styled from "styled-components";

export const Container = styled.main`
  position: relative;
  z-index: 0;
  padding: 0 10rem;
  margin-top: 9rem;
  overflow-x: hidden;
  min-height: 100vh;
  #tsparticles {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .info {
    margin-top: 10rem;
    h3 {
      font-size: 4rem;
      font-weight: bold;
      margin-bottom: 20px;
    }
    p {
      font-size: 2rem;
      margin-bottom: 20px;
    }
    .link {
      text-decoration: none;
      color: #f7bd1b;
      font-size: 3rem;
      font-weight: bold;

      &:hover {
        color: #f7bd1b;
        text-decoration: underline;
      }
    }
  }
  .card-container {
    background-color: #fff;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 20%;
    border: 1px solid #f7c948;
    margin: 0 auto;
    margin-top: 10rem;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
  }

  .card-header {
    background-color: #f7c948;
    padding: 20px;
  }

  .winner-tag {
    background-color: #1f1f1f;
    color: #fff;
    display: inline-block;
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
    padding: 5px 10px;
    text-transform: uppercase;
  }

  .winner-header {
    color: #1f1f1f;
    font-size: 24px;
    margin: 10px 0;
  }

  .card-body {
    padding: 20px;
  }

  .winner-slogan {
    color: #1f1f1f;
    font-size: 18px;
    margin-bottom: 20px;
  }

  .votes-container {
    display: flex;
    align-items: center;
  }

  .votes-tag {
    font-size: 14px;
    margin-right: 5px;
  }

  .vote-count {
    color: #1f1f1f;
    font-size: 24px;
    font-weight: bold;
  }

  @media (max-width: 740px) {
    padding: 0 4rem;
  }

  @media (max-width: 360px) {
    padding: 0 2rem;
  }
`;
