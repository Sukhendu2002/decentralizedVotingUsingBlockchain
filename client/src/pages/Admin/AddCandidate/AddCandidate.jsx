import React, { useState, useEffect } from "react";

import Navbar from "../../../components/NavBar/Navbar";
import NavbarAdmin from "../../../components/NavBar/NavbarAdmin";
import { useNavigate } from "react-router-dom";
import AdminOnly from "../../../components/AdminOnly";
import { Container } from "./stayles";
import Web3 from "web3";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  ELECTION_CONTRACT_ADDRESS,
  ELECTION_CONTRACT_ABI,
} from "../../../utils/constance";
import "./module.css";
import check from "../../../assets/check.png";
import loading from "../../../assets/loading.gif";
const AddCandidate = () => {
  const [ElectionInstance, setElectionInstance] = useState(undefined);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [header, setHeader] = useState("");
  const [slogan, setSlogan] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [candidateCount, setCandidateCount] = useState(undefined);
  const [elStarted, setElStarted] = useState(undefined);
  const [elEnded, setElEnded] = useState(undefined);
  const [fileImg, setFileImg] = useState(null);
  const [imageHash, setImageHash] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const navigate = useNavigate();
  const loadWeb3 = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
        let acc = accounts[0];
        setWeb3(web3);
        const electionInstance = new web3.eth.Contract(
          ELECTION_CONTRACT_ABI,
          ELECTION_CONTRACT_ADDRESS
        );

        setElectionInstance(electionInstance);
        const candidateCount = await electionInstance.methods
          .getTotalCandidate()
          .call();
        setCandidateCount(candidateCount);

        const admin = await electionInstance.methods.admin().call();
        if (admin === acc) {
          setIsAdmin(true);
        }
        // console.log(admin);
        // console.log(acc);
        const candidate = await electionInstance.methods
          .getAllCandidates()
          .call();
        setCandidates(candidate);

        const start = await electionInstance.methods.getStart().call();
        setElStarted(start);
        const end = await electionInstance.methods.getEnd().call();
        setElEnded(end);
        // console.log(candidate);
      } catch (error) {
        console.log(error);
      }
    } else {
      window.alert("Please install MetaMask");
    }
  };

  useEffect(() => {
    loadWeb3();
  }, []);

  const updateHeader = (e) => {
    setHeader(e.target.value);
  };

  const updateSlogan = (e) => {
    setSlogan(e.target.value);
  };

  const addCandidate = async (e) => {
    e.preventDefault();

    await ElectionInstance.methods
      .addCandidate(header, slogan, imageHash)
      .send({ from: account });
    window.location.reload();
  };

  const sendFileToIPFS = async (e) => {
    if (fileImg) {
      try {
        console.log(fileImg, "shukendu");
        setImageLoading(true);
        const formData = new FormData();
        formData.append("file", fileImg);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: process.env.REACT_APP_PINATA_API,
            pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("File Uploaded to IPFS: ");
        console.log(resFile.data.IpfsHash);
        setImageHash(resFile.data.IpfsHash);
        setImageLoading(false);
        setImageUploaded(true);
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);

        setImageLoading(false);
        setImageUploaded(false);
      }
    }
  };

  return (
    <>
      {web3 ? (
        <Container>
          {isAdmin ? <NavbarAdmin /> : <Navbar />}
          {isAdmin ? (
            <div className="container-main">
              <p
                style={{
                  textAlign: "center",
                  marginBottom: "0.5rem",
                  fontSize: "4rem",
                }}
              >
                Add a new candidate
              </p>
              <small
                style={{
                  textAlign: "center",
                  marginBottom: "0.5rem",
                  fontSize: "1.5rem",
                }}
              >
                Total candidates: {candidateCount}
              </small>
              <div className="container-item">
                <form
                  className="form"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <label
                    className={"label-ac"}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "50%",
                      fontSize: "1.9rem",
                    }}
                  >
                    Name
                    <input
                      className={"input-ac"}
                      type="text"
                      placeholder="eg. Marcus"
                      value={header}
                      onChange={updateHeader}
                      style={{
                        width: "100%",
                        height: "40px",
                        padding: "0.5rem",
                        fontSize: "1.5rem",
                        border: "1px solid",
                        borderRadius: "0.5rem",
                      }}
                    />
                  </label>
                  <label
                    className={"label-ac"}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "50%",
                      marginTop: "1rem",
                      fontSize: "1.9rem",
                    }}
                  >
                    Slogan
                    <input
                      className={"input-ac"}
                      type="text"
                      placeholder="eg. It is what it is"
                      value={slogan}
                      onChange={updateSlogan}
                      style={{
                        width: "100%",
                        height: "40px",
                        padding: "0.5rem",
                        fontSize: "1.5rem",
                        border: "1px solid",
                        borderRadius: "0.5rem",
                      }}
                    />
                  </label>
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "50%",
                      marginTop: "1rem",
                    }}
                  >
                    <label
                      className={"label-ac"}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "78%",
                        marginTop: "1rem",
                        fontSize: "1.9rem",
                      }}
                    >
                      Image
                      <input
                        className={"input-ac"}
                        type="file"
                        name="data"
                        onChange={(e) => {
                          //only image files are allowed
                          if (e.target.files[0].type.includes("image")) {
                            setFileImg(e.target.files[0]);
                          } else {
                            setFileImg(null);
                            alert("Only image files are allowed");
                          }
                        }}
                        required
                        style={{
                          width: "100%",
                          height: "40px",
                          padding: "0.5rem",
                          fontSize: "1.5rem",
                          border: "1px solid",
                          borderRadius: "0.5rem",
                        }}
                      />
                    </label>
                    <button
                      className="btn-add"
                      disabled={
                        fileImg === null ||
                        imageUploaded === true ||
                        imageLoading === true
                      }
                      onClick={sendFileToIPFS}
                      style={{
                        width: "20%",
                        height: "100%",
                        padding: "0.5rem",
                        fontSize: "1.5rem",
                        border: "1px solid",
                        borderRadius: "0.5rem",
                        marginTop: "3.8rem",
                        // marginBottom: "1rem",
                      }}
                    >
                      {imageLoading ? "Uploading..." : "Upload Image"}
                    </button>

                    {imageUploaded ? (
                      <img
                        src={check}
                        alt="Candidate"
                        style={{
                          width: "25px",
                          height: "25px",
                          marginTop: "4rem",
                        }}
                      />
                    ) : null}
                    {imageLoading ? (
                      <img
                        src={loading}
                        alt="Candidate"
                        style={{
                          width: "25px",
                          height: "25px",
                          marginTop: "4rem",
                        }}
                      />
                    ) : null}
                  </span>

                  {/* <button
                    className="btn-add"
                    disabled={header.length < 3 || header.length > 21}
                    onClick={addCandidate}
                    style={{
                      width: "30%",
                      height: "100%",
                      padding: "0.5rem",
                      fontSize: "1.5rem",
                      border: "1px solid",
                      borderRadius: "0.5rem",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    Add
                  </button> */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <button
                      className="ctaa"
                      disabled={
                        header.length < 3 ||
                        header.length > 21 ||
                        elStarted ||
                        !imageUploaded
                      }
                      onClick={addCandidate}
                    >
                      <span>Add</span>
                      <svg viewBox="0 0 13 10" height="10px" width="15px">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                      </svg>
                    </button>
                    <button
                      className="ctaa"
                      disabled={candidateCount < 1}
                      onClick={async (e) => {
                        e.preventDefault();
                        navigate("/", {
                          state: {
                            commingFrom: true,
                          },
                        });
                      }}
                    >
                      <span>Continue</span>
                      <svg viewBox="0 0 13 10" height="10px" width="15px">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="container-main">
              <p
                style={{
                  textAlign: "center",
                  marginBottom: "1rem",
                  fontSize: "4rem",
                }}
              >
                You are not allowed to access this page
              </p>
            </div>
          )}
          <div className="container-main" style={{ borderTop: "1px solid" }}>
            <div
              className="container-item info"
              style={{
                fontSize: "2rem",
                marginBottom: "1rem",
                marginTop: "1rem",
              }}
            >
              <center>Candidates List</center>
            </div>
            {candidates.length < 1 ? (
              <div className="container-item alert">
                <center>No candidates added.</center>
              </div>
            ) : (
              <div
                className="container-item"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {candidates.map((candidate) => {
                  return (
                    <div className="containerr" key={candidate[0]}>
                      <div className="cardd">
                        <img
                          src={`https://gateway.pinata.cloud/ipfs/${candidate["image"]}`}
                          alt="Candidate"
                          style={{
                            width: "100px",
                            height: "100px",
                            //make it a circle
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                        <h3
                          style={{
                            fontSize: "1.8rem",
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          {candidate["header"]}
                        </h3>
                        <h5
                          style={{
                            fontSize: "1.5rem",
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            marginLeft: "1.5rem",
                            marginRight: "0.5rem",
                          }}
                        >
                          {candidate["slogan"]}
                        </h5>
                        <h5
                          style={{
                            fontSize: "1.5rem",
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            marginLeft: "1.5rem",
                            marginRight: "0.5rem",
                          }}
                        >
                          Voter Count: {candidate["voteCount"]}
                        </h5>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Container>
      ) : (
        <Container>
          <center>Loading Web3, accounts, and contract...</center>
        </Container>
      )}
    </>
  );
};

export default AddCandidate;
