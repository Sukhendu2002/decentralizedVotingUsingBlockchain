import React, { useState, useEffect } from "react";
import { Container } from "./styles";
import { Link } from "react-router-dom";

import Navbar from "../../components/NavBar/Navbar";
import NavbarAdmin from "../../components/NavBar/NavbarAdmin";
import NotInit from "../../components/NotInit";
import Loader from "../../components/Loader/Loader";
import Web3 from "web3";
import {
  ELECTION_CONTRACT_ADDRESS,
  ELECTION_CONTRACT_ABI,
} from "../../utils/constance";
import axios from "axios";

const Voting = () => {
  const [ElectionInstance, setElectionInstance] = useState(undefined);
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [candidateCount, setCandidateCount] = useState(undefined);
  const [candidates, setCandidates] = useState([]);
  const [isElStarted, setIsElStarted] = useState(false);
  const [isElEnded, setIsElEnded] = useState(false);
  const [currentVoter, setCurrentVoter] = useState({
    address: undefined,
    name: null,
    phone: null,
    hasVoted: false,
    isVerified: false,
    isRegistered: false,
  });

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
        // console.log(candidate);

        const isStarted = await electionInstance.methods.getStart().call();
        setIsElStarted(isStarted);
        const isEnded = await electionInstance.methods.getEnd().call();
        setIsElEnded(isEnded);

        // console.log(isStarted);
        // console.log(isEnded);

        const voter = await electionInstance.methods
          .getVoterDetails(acc)
          .call({ from: acc });
        console.log(voter);
        setCurrentVoter({
          address: voter["voterAddress"],
          name: voter["name"],
          phone: voter["phone"],
          hasVoted: voter["hasVoted"],
          isVerified: voter["isVerified"],
          isRegistered: voter["isRegistered"],
        });
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

  if (!web3) {
    return (
      <Container>
        {isAdmin ? <NavbarAdmin /> : <Navbar />}
        <center>Loading Web3, accounts, and contract...</center>
        <Loader />
      </Container>
    );
  }

  const castVote = async (id) => {
    await ElectionInstance.methods
      .vote(id)
      .send({ from: account })
      .once("receipt", (receipt) => {
        console.log(receipt);
        window.alert("Vote casted successfully.");
      });
    // await axios
    //   .post("http://localhost:5000/send", {
    //     number: "+91" + currentVoter.phone,
    //     message:
    //       "You have successfully casted your vote for " +
    //       currentVoter.name +
    //       ".",
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     window.location.reload();
    //   });
    window.location.reload();
  };
  const confirmVote = (id, header) => {
    var r = window.confirm(
      "Vote for " + header + " with Id " + id + ".\nAre you sure?"
    );
    if (r === true) {
      castVote(id);
    }
  };

  return (
    <Container>
      {isAdmin ? <NavbarAdmin /> : <Navbar />}
      {!isElStarted && !isElEnded ? (
        <NotInit />
      ) : //check if it is started and not ended
      isElStarted && !isElEnded ? (
        <>
          {currentVoter.isRegistered ? (
            currentVoter.isVerified ? (
              currentVoter.hasVoted ? (
                <div className="container-item success">
                  <div>
                    {/* <strong>You've casted your vote.</strong> */}
                    <div
                      className="alert alert-success account"
                      role="alert"
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      You've casted your vote.
                    </div>
                    <p />
                    <center>
                      <Link
                        to="/Result"
                        style={{
                          color: "black",
                          textDecoration: "underline",
                        }}
                      >
                        See Results
                      </Link>
                    </center>
                  </div>
                </div>
              ) : (
                <div className="container-item info">
                  <center>Go ahead and cast your vote.</center>
                </div>
              )
            ) : (
              <div className="verify">
                <p>Please wait for admin to verify.</p>
                <p>You will get a sms once verified.</p>
              </div>
            )
          ) : (
            <div className="container-item attention">
              <center>
                <p>You're not registered. Please register first.</p>
                <br />
                <Link
                  to="/Registration"
                  style={{ color: "black", textDecoration: "underline" }}
                >
                  Registration Page
                </Link>
              </center>
            </div>
          )}
          <div className="voting-can">
            <h2 className="heading">Candidates</h2>
            {/* <small>Total candidates: {candidates.length}</small> */}
            {candidates.length < 1 ? (
              <div className="container-item attention">
                <center>No one to vote for.</center>
              </div>
            ) : (
              <div div className="candidate-list">
                {candidates.map((candidate, index) => (
                  <div class="card" key={index}>
                    <div class="card-border-top"></div>
                    <img
                      class="img"
                      src={`https://gateway.pinata.cloud/ipfs/${candidate["image"]}`}
                      alt="Avatar"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                    {/* <span
                        style={{
                          fontSize: "3rem",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        {candidate["header"].charAt(0).toUpperCase()}
                      </span> */}

                    <span> {candidate["header"]} </span>
                    <p class="job"> {candidate["slogan"]}</p>
                    <button
                      onClick={() =>
                        confirmVote(
                          candidate["candidateId"],
                          candidate["header"]
                        )
                      }
                      disabled={
                        !currentVoter.isRegistered ||
                        !currentVoter.isVerified ||
                        currentVoter.hasVoted
                      }
                    >
                      {" "}
                      Vote
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        //check if it is ended
        isElEnded && (
          <div
            className="container-item attention"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <center>
              <h3
                style={{
                  margin: "0",
                  padding: "0",
                  fontSize: "2.5rem",
                }}
              >
                The Election ended.
              </h3>
              <br />
              <Link
                to="/Result"
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "black",
                  padding: "10px",
                  borderRadius: "10px",
                  textDecoration: "none",
                }}
              >
                See results
              </Link>
            </center>
          </div>
        )
      )}
    </Container>
  );
};

export default Voting;
