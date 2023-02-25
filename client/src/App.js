// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import Home from "./pages/Home/Home";
import AddCandidate from "./pages/Admin/AddCandidate/AddCandidate";
import Voting from "./pages/Voting/Voting";
import Registration from "./pages/Registration/Registration";
import Result from "./pages/Result/Result";
import Verification from "./pages/Admin/Verification/Verification";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AddCandidate" element={<AddCandidate />} />
          <Route path="/Voting" element={<Voting />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/Result" element={<Result />} />
          <Route path="/Verification" element={<Verification />} />
          <Route
            path="*"
            element={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100vh",
                }}
              >
                <h1
                  style={{
                    fontSize: "10rem",
                    animation: "blinker 1s linear infinite",
                  }}
                >
                  404
                </h1>

                <h2
                  style={{
                    fontSize: "2rem",
                    fontWeight: "normal",
                    margin: "0",
                    padding: "0",
                  }}
                >
                  Page Not Found
                </h2>

                <p
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "normal",
                    margin: "0",
                    padding: "0",
                  }}
                >
                  Sorry, the page you are looking for does not exist.
                </p>

                <p
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "normal",
                    margin: "0",
                    padding: "0",
                  }}
                >
                  You can always go back to the{" "}
                  <a
                    href="/"
                    style={{
                      textDecoration: "underline",
                    }}
                  >
                    homepage
                  </a>
                  .
                </p>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
