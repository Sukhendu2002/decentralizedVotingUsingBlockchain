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
            <>
            <small
            className="text-5xl font-medium font-sans text-[#234975] hover:cursor-pointer hover:text-[#2b66aa]"
>
  Total Candidates:<strong className="text-[#ffc107] hover:no-underline"> {candidateCount}</strong>
</small>
            <div className=" w-1/2 m-auto shadow-[#c6c4c4] shadow-inner pt-4">
              <p className="text-center text-7xl mt-4 font-bold"
              >
                Add a new candidate
              </p>
              <div className="flex items-center w-3/4 m-auto">
<hr className="w-1/2 text-[#ffc107]"/><span className="">❌</span><hr className="w-1/2 text-[#ffc107]"/>
              </div>
              <div className="container-item">
                <form
                  className="form px-8 py-2"
                >
                <div className="mb-2">
                  {/* <label for="header" className="w-full block">Name</label> */}
                  <input
                    type="text"
                    id="header"
                    placeholder="Candidate Name"
                    value={header}
                    onChange={updateHeader}
                    className="border-b-2 py-2 text-3xl my-4 border-[#878585] outline-none w-full text-[#ffc107]"
                  />
                </div>
                <div className="mb-2">
   {/* <label for="slogan" className="w-full block">Slogan</label> */}
   <input
     type="text"
     id="slogan"
     placeholder="Candidate's Slogan"
     value={slogan}
     onChange={updateSlogan}
     className="border-b-2 py-2 text-3xl m-b-4 border-[#878585] outline-none w-full text-[#ffc107]"
   />
 </div>
                  <div
                  className="flex items-center mt-4 mb-2"
                  >

                    <label
                    >
                      Image
                      <input
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
                      />
                    </label>
                    <button
                      className="px-4 py-2 text-[#234975] border-2 border-[#234975] rounded-lg font-bold hover:text-[#fff] hover:bg-[#234975]"
                      disabled={
                        fileImg === null ||
                        imageUploaded === true ||
                        imageLoading === true
                      }
                      onClick={sendFileToIPFS}
                    >
                      {imageLoading ? "Uploading..." : "Upload Image"}
                    </button>

                    {imageUploaded ? (
                      <img
                      className="w-16 duration-1000 transform-cpu origin-[1%-99%] ml-8 border-2 rounded-full border-[#207f42] py-2"
                        src={check}
                        alt="Candidate"
                      />
                    ) : null}
                    {imageLoading ? (
                      <img
                      className="w-16 ml-8 "
                        src={loading}
                        alt="Candidate"
                      />
                    ) : null}
                  </div>
                  <div className="flex items-center"
                  >
                    <button
                      className="ctaa flex items-center"
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
                      className="ctaa flex items-center"
                      disabled={candidateCount < 2}
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
            </>
          ) : (
            <div className="container-main">
              <p
              >
                You are not allowed to access this page
              </p>
            </div>
          )}
          <div className="container-main mt-6">
            <div
              className="container-item info"
            >
              <center className="font-bold text-5xl text-[#ccc107] border-[#ccc107] border-b-2 rounded-sm">Candidates List</center>
            </div>
            {candidates.length < 1 ? (
              <div className="container-item alert">
                <center>No candidates added.</center>
              </div>
            ) : (
              <div
                className="container-item m-auto py-8 flex"
              >
                {candidates.map((candidate) => {
                  return (
                    <div className="containerr m-auto" key={candidate[0]}>
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
