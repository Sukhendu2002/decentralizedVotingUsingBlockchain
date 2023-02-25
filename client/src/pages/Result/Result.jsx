import React, { useState, useEffect } from "react";
import Navbar from "../../components/NavBar/Navbar";
import NavbarAdmin from "../../components/NavBar/NavbarAdmin";
import NotInit from "../../components/NotInit";
import Web3 from "web3";
import {
  ELECTION_CONTRACT_ADDRESS,
  ELECTION_CONTRACT_ABI,
} from "../../utils/constance";
import { Container } from "./styles";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";
import { Bar, Line, Pie } from "react-chartjs-2";
import Loader from "../../components/Loader/Loader";
import "./style.css";

const Result = () => {
  const [ElectionInstance, setElectionInstance] = useState(undefined);
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [candidateCount, setCandidateCount] = useState(undefined);
  const [candidates, setCandidates] = useState([]);
  const [isElStarted, setIsElStarted] = useState(false);
  const [isElEnded, setIsElEnded] = useState(false);
  const [winner, setWinner] = useState([]);

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

        const admin = await electionInstance.methods.admin().call();
        if (admin === acc) {
          setIsAdmin(true);
        }

        const isStarted = await electionInstance.methods.getStart().call();
        setIsElStarted(isStarted);
        const isEnded = await electionInstance.methods.getEnd().call();
        setIsElEnded(isEnded);
        const candidateCount = await electionInstance.methods
          .getTotalCandidate()
          .call();
        setCandidateCount(candidateCount);
        const candidate = await electionInstance.methods
          .getAllCandidates()
          .call();
        setCandidates(candidate);

        const winner = await electionInstance.methods.getWinner().call();
        // console.log(winner);
        setWinner(winner);
      } catch (error) {
        console.log(error);
      }
    } else {
      window.alert("Please install MetaMask");
    }
  };

  useEffect(() => {
    loadWeb3();
    //call getWinnerif election is ended
    // if (isElEnded) {
    //   getWinner();
    // }
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
  // const getWinner = () => {
  //   let max = 0;
  //   let winner;
  //   for (let i = 0; i < candidateCount; i++) {
  //     let currntCan = candidates[i];
  //     if (currntCan["voteCount"] > max) {
  //       max = currntCan["voteCount"];
  //       winner = i;
  //     }
  //   }

  //   setWinner({
  //     header: candidates[winner]["header"],
  //     slogan: candidates[winner]["slogan"],
  //     voteCount: candidates[winner]["voteCount"],
  //   });
  // };
  return (
    <Container>
      {isAdmin ? <NavbarAdmin /> : <Navbar />}
      <br />
      <div>
        {!isElStarted && !isElEnded ? (
          <NotInit />
        ) : isElStarted && !isElEnded ? (
          <div className="info">
            <center>
              <h3>Get ready to cast your vote in the ongoing election!</h3>
              <p>
                The excitement is building as the votes are being cast as we
                speak.
              </p>
              <p>
                Don't miss out on this opportunity to have your say in the
                election {"(if you haven't already)"}.
              </p>
              <p>
                Keep your fingers crossed and stay tuned for the final results,
                which will be revealed once the election has ended!
              </p>
              <br />
              <Link to="/Voting" className="link">
                Voting Page
              </Link>
            </center>
          </div>
        ) : !isElStarted && isElEnded ? (
          // <div class="card-container">
          //   <div class="card-header">
          //     <p class="winner-tag">Winner!</p>
          //     <h2 class="winner-header">{winner["header"]}</h2>
          //   </div>
          //   <div class="card-body">
          //     <p class="winner-slogan">{winner["slogan"]}</p>
          //     <div class="votes-container">
          //       <div class="votes-tag">Total Votes:</div>
          //       <div class="vote-count">{winner["voteCount"]}</div>
          //     </div>
          //   </div>
          // </div>
          <>
            <div
              class="card"
              style={{
                margin: "50px auto",
              }}
            >
              <div class="card-border-top"></div>
              <img
                class="img"
                src={`https://gateway.pinata.cloud/ipfs/${winner["image"]}`}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                }}
              ></img>
              <span> {winner["header"]}</span>
              <p class="job"> {winner["slogan"]}</p>
              <div
                style={{
                  display: "flex",
                  // justifyContent: "space-around",
                  width: "100%",
                  alignItems: "center",
                  textAlign: "center",
                  margin: "10px auto",
                }}
              >
                <div
                  class="votes-tag"
                  style={{
                    width: "50%",
                    textAlign: "center",
                    margin: "10px auto",
                  }}
                >
                  Total Votes:
                </div>
                <div
                  class="vote-count"
                  style={{
                    width: "30%",
                    textAlign: "center",
                    margin: "10px auto",
                  }}
                >
                  {winner["voteCount"]}
                </div>
              </div>
            </div>
            <h2>Results</h2>
            <div
              style={{
                maxWidth: "800px",
                margin: "0px auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                padding: "40px",
              }}
            >
              <Bar
                data={{
                  labels: candidates.map((candidate) => candidate["header"]),
                  datasets: [
                    {
                      label: "Votes",
                      data: candidates.map(
                        (candidate) => candidate["voteCount"]
                      ),
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              />

              {/* <Pie
                data={{
                  labels: candidates.map((candidate) => candidate["header"]),
                  datasets: [
                    {
                      label: "Votes",
                      data: candidates.map(
                        (candidate) => candidate["voteCount"]
                      ),
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              /> */}
            </div>
          </>
        ) : null}
      </div>
    </Container>
  );
};

export default Result;
