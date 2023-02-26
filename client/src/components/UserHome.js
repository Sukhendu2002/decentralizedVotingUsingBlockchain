import React from "react";

function UserHome(props) {
  return (
    <div
      style={{
        // margin-top: 0px;margin-bottom: 0px;
        marginTop: "0px",
        marginBottom: "50px",
      }}
    >
      <div
        className="text-nowrap d-flex flex-column flex-grow-1 flex-shrink-1 flex-wrap blog-slider"
        style={{
          width: "100%",
        }}
      >
        <h1
          className="d-xxl-flex justify-content-xl-center m-auto text-8xl text-[#ccc107]"
        >
          {props.el.electionTitle}
        </h1>
        <p
          className="d-xxl-flex justify-content-xxl-center text-4xl text-[#9b9a9a]"
          style={{
            // "text-align: center;"
            textAlign: "center",
          }}
        >
          {props.el.organizationTitle}
        </p>
        <hr
          style={{
            // font-size: 15px;text-align: center;height: 2px;margin-bottom: 40px;
            fontSize: "15px",
            textAlign: "center",
            height: "2px",
            marginBottom: "40px",
          }}
        ></hr>
        <h1
          style={{
            // margin-top: 8px;font-size: 25px;text-align: center;
            marginTop: "8px",
            fontSize: "25px",
            textAlign: "center",
          }}
        >
          Admin : {props.el.adminName} ({props.el.adminTitle})
        </h1>
        <h1
          style={{
            // margin: 0px;margin-top: 12px;font-size: 25px;text-align: center;
            margin: "0px",
            marginTop: "12px",
            fontSize: "25px",
            textAlign: "center",
          }}
        >
          Contact : {props.el.adminEmail}
        </h1>
      </div>
    </div>
  );
}

export default UserHome;
