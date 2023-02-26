import React from "react";
import { Link } from "react-router-dom";
import "./module.css";

const StartEnd = (props) => {
  const btn = {
    display: "block",
    padding: "21px",
    margin: "7px",
    minWidth: "max-content",
    textAlign: "center",
    width: "333px",
    alignSelf: "center",
  };
  return (
    <div
      className="container-main"
      style={{
        // borderTop: "1px solid",
        marginTop: "40px",
        borderTopWidth: "2.4px",
        borderTopColor: "rgb(0, 0, 0, 0.2)",
        width: "60%",
        margin: "auto",
      }}
    >
      {!props.elStarted ? (
        <>
          {/* edit here to display start election Again button */}
          {!props.elEnded ? (
            <>
              {/* <div
                className="container-item attention"
                style={{ display: "block" }}
              >
                <h2>Do not forget to add candidates.</h2>
                <p>
                  Go to{" "}
                  <Link
                    title="Add a new "
                    to="/addCandidate"
                    style={{
                      color: "black",
                      textDecoration: "underline",
                    }}
                  >
                    add candidates
                  </Link>{" "}
                  page.
                </p>
              </div> */}
              {/* <button class="ctaa" type="submit">
                <span>Start</span>
                <svg viewBox="0 0 13 10" height="10px" width="15px">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </button> */}
            </>
          ) : (
            <div className="container-item">
              <center>
                <p>Re-deploy the contract to start election again.</p>
              </center>
            </div>
          )}
          {props.elEnded ? (
            <div className="container-item">
              <center>
                <p>The election ended.</p>
              </center>
            </div>
          ) : null}
        </>
      ) : (
        <>
          <div
            className="container-item"
            style={{ display: "block", marginTop: "20px" }}
          >
            <center>
              <p className="text-4xl">The election started...</p>
            </center>
          </div>
          <div
            className="container-item"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button className="btn text-3xl my-2 mx-4" type="submit" onClick={props.endElFn}>
              {" "}
              END
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StartEnd;
