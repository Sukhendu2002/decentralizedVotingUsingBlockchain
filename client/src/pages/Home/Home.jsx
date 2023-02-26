import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar/Navbar";
import NavbarAdmin from "../../components/NavBar/NavbarAdmin";
import UserHome from "../../components/UserHome";
import StartEnd from "../../components/StartEnd";
import ElectionStatus from "../../components/ElectionStatus";
import Particles from "react-tsparticles";
import { Container } from "./styles";
import Web3 from "web3";
import { useForm } from "react-hook-form";
import HEROIMAGE from "../../assets/main.png";
import METAMASK from "../../assets/fox.svg";
import proc1 from "../../assets/proc1.png";
import proc2 from "../../assets/proc2.png";
import proc3 from "../../assets/proc3.png";
import {
  ELECTION_CONTRACT_ADDRESS,
  ELECTION_CONTRACT_ABI,
} from "../../utils/constance";

const Home = () => {
  const [ElectionInstance, setElectionInstance] = useState(undefined);
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [elStarted, setElStarted] = useState(false);
  const [elEnded, setElEnded] = useState(false);
  const [elDetails, setElDetails] = useState({});
  const [candidates, setCandidateCount] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const { state } = location;
  const { commingFrom } = state || { commingFrom: null };

  useEffect(() => {
    // loadWeb3();
    const theme = localStorage.getItem("theme");
    if (theme === null) {
      localStorage.setItem("theme", "light");
    }
  }, []);

  useEffect(() => {
    if (commingFrom === true) {
      loadWeb3();
    }
  }, [commingFrom]);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
        setWeb3(web3);
        const electionInstance = new web3.eth.Contract(
          ELECTION_CONTRACT_ABI,
          ELECTION_CONTRACT_ADDRESS
        );
        setElectionInstance(electionInstance);

        const admin = await electionInstance.methods.getAdmin().call();

        if (admin === accounts[0]) {
          setIsAdmin(true);
        }

        const start = await electionInstance.methods.getStart().call();
        setElStarted(start);
        const end = await electionInstance.methods.getEnd().call();
        setElEnded(end);
        const adminName = await electionInstance.methods.getAdminName().call();
        const adminEmail = await electionInstance.methods
          .getAdminEmail()
          .call();
        const adminTitle = await electionInstance.methods
          .getAdminTitle()
          .call();
        const electionTitle = await electionInstance.methods
          .getElectionTitle()
          .call();
        const organizationTitle = await electionInstance.methods
          .getOrganizationTitle()
          .call();
        const elDetails = {
          adminName,
          adminEmail,
          adminTitle,
          electionTitle,
          organizationTitle,
        };
        setElDetails(elDetails);
        const candidateCount = await electionInstance.methods
          .getTotalCandidate()
          .call();
        setCandidateCount(candidateCount);

        if (candidateCount >= 2) {
          navigate("/");
        } else {
          navigate("/AddCandidate");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      window.alert("Please install MetaMask");
    }
  };

  const EMsg = (props) => {
    return <span style={{ color: "tomato" }}>{props.msg}</span>;
  };

  const endElection = async () => {
    try {
      await ElectionInstance.methods.endElection().send({ from: account });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const registerElection = async (data) => {
    console.log(data);
    try {
      await ElectionInstance.methods
        .setElectionDetails(
          data.adminFName.toLowerCase() + " " + data.adminLName.toLowerCase(),
          data.adminEmail.toLowerCase(),
          data.adminTitle.toLowerCase(),
          data.electionTitle.toLowerCase(),
          data.organizationTitle.toLowerCase()
        )
        .send({ from: account, gas: 1000000 });
      // window.location.reload();
      navigate("/Verification");
    } catch (error) {
      console.log(error);
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    registerElection(data);
  };

  return web3 === null ? (
    <Container>
      <NavBar web3={web3} />
      <div className="home mt-4">
        {/* <h2> Connecting to the blockchain...</h2> */}
        <div className="homeLeft">
          <p>Secure and Transparent Voting with Blockchain Technology</p>
          <h1>Vote with Confidence</h1>
          <p className="font-bold">
            We provide a secure and transparent voting system with blockchain
            technology. We provide a secure and transparent voting system with
            blockchain technology.
          </p>
          <div className="flex items-center">
            <button
              onClick={loadWeb3}
              className="flex items-center bg-[#ffc107] text-[#fff] py-2 px-4 rounded-2xl mr-6 hover:bg-[#d6a719] text-3xl"
            >
              Connect to Metamask
              <img
                className="h-16 w-20"
                src={METAMASK}
                alt="metamask"
                // style={{ width: "30px" }}
              />
            </button>
            <button
              className="flex items-center bg-[#ffc107] text-[#fff] py-2 px-4 rounded-2xl h-20 hover:bg-[#d6a719] text-3xl"
              onClick={() => {
                document
                  .getElementById("process")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              See Full Process
            </button>
          </div>
        </div>
        <div className="homeRight">
          <img src={HEROIMAGE} alt="hero" />
        </div>
      </div>

      <div className="process" id="process">
        <p className="heading">Voting Process</p>
        <div className="allprocess">
          <div className="processCard">
            <span>1.</span>
            <h3>Register</h3>
            <img src={proc1} alt="proc1" />
            <p>
              Register as a voter by providing your details and phone number
            </p>
          </div>
          <div className="processCard">
            <span>2.</span>
            <h3>Voting</h3>
            <img src={proc2} alt="proc1" />
            <p>
              After registration and verification, you can vote for your choice
            </p>
          </div>
          <div className="processCard">
            <span>3.</span>
            <h3>Result</h3>
            <img src={proc3} alt="proc1" />
            <p>
              After the election is over, the result will be displayed on the
              website
            </p>
          </div>
        </div>
      </div>
    </Container>
  ) : (
    <Container>
      {isAdmin ? <NavbarAdmin /> : <NavBar account={account} web3={web3} />}
      <div
        className="container-main"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="container-item center-items info"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <div className="alert alert-success account" role="alert">
            Your Account: {account}
          </div>
        </div>
        {!elStarted & !elEnded ? (
          <div
            className="container-item info"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <center
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h3
              className="text-5xl" 
              >
                Register Election
              </h3>
              {isAdmin ? (
                <p
                className="text-3xl mt-2"
                >
                  (Set up the election.)
                </p>
              ) : (
                <p>Please wait for the admin to initialize the election.</p>
              )}
            </center>
          </div>
        ) : null}
      </div>

      {isAdmin ? (
        <>
          {!elStarted & !elEnded ? (
            <form onSubmit={handleSubmit(onSubmit)} className="infoform">
              <div className="container-main">
                <h3
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  {" "}
                  About Admin
                </h3>
                <div className="container-item">
                  <div className="form-group">
                    <label>
                      Full Name {errors.adminFName && <EMsg msg="*required" />}
                    </label>
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <input
                        type="text"
                        className="infoInput"
                        style={{
                          width: "100%",
                          height: "35px",
                          fontSize: "1.6rem",
                        }}
                        name="adminFName"
                        placeholder="First Name"
                        {...register("adminFName", {
                          required: true,
                        })}
                      />
                      <input
                        type="text"
                        className="infoInput"
                        style={{
                          width: "100%",
                          height: "35px",
                          fontSize: "1.6rem",
                          marginTop: "10px",
                        }}
                        name="adminLName"
                        placeholder="Last Name"
                        {...register("adminLName")}
                      />
                    </span>
                  </div>
                  <div className="form-group">
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: "7px",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "49%",
                        }}
                      >
                        <label>
                          Email{" "}
                          {errors.adminEmail && (
                            <EMsg msg={errors.adminEmail.message} />
                          )}
                        </label>

                        <input
                          type="text"
                          className="infoInput"
                          style={{
                            width: "100%",
                            height: "35px",
                            fontSize: "1.6rem",
                          }}
                          placeholder="eg. you@example.com"
                          name="adminEmail"
                          {...register("adminEmail", {
                            required: "*Required",
                            pattern: {
                              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, // email validation using RegExp
                              message: "*Invalid",
                            },
                          })}
                        />
                      </span>
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "49%",
                        }}
                      >
                        <label>
                          Job Title or Position{" "}
                          {errors.adminTitle && <EMsg msg="*required" />}
                        </label>

                        <input
                          type="text"
                          className="infoInput"
                          style={{
                            width: "98%",
                            height: "35px",
                            fontSize: "1.6rem",
                          }}
                          placeholder="eg. HR Head "
                          {...register("adminTitle", {
                            required: true,
                          })}
                        />
                      </span>
                    </span>
                  </div>
                </div>
                <div className="container-item">
                  <h3
                    style={{
                      fontSize: "2rem",
                      fontWeight: "bold",
                      textDecoration: "underline",
                    }}
                  >
                    {" "}
                    About Election
                  </h3>
                  <div className="form-group">
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: "7px",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "49%",
                        }}
                      >
                        <label>
                          Election Title{" "}
                          {errors.electionTitle && <EMsg msg="*required" />}
                        </label>

                        <input
                          type="text"
                          className="infoInput"
                          style={{
                            width: "100%",
                            height: "35px",
                            fontSize: "1.6rem",
                          }}
                          placeholder="eg. School Election"
                          {...register("electionTitle", {
                            required: true,
                          })}
                        />
                      </span>
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "49%",
                        }}
                      >
                        <label>
                          Organization Name{" "}
                          {errors.organizationTitle && <EMsg msg="*required" />}
                        </label>

                        <input
                          type="text"
                          className="infoInput"
                          style={{
                            width: "98%",
                            height: "35px",
                            fontSize: "1.6rem",
                          }}
                          placeholder="eg. Lifeline Academy"
                          {...register("organizationTitle", {
                            required: true,
                          })}
                        />
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "1.6rem",
                  marginTop: "20px",
                  padding: "0px",
                }}
              >
                Start Election
              </button>
            </form>
          ) : elStarted ? (
            <UserHome el={elDetails} />
          ) : null}
          <StartEnd
            elStarted={elStarted}
            elEnded={elEnded}
            endElFn={endElection}
          />
          {/* <ElectionStatus elStarted={elStarted} elEnded={elEnded} /> */}
        </>
      ) : elStarted ? (
        <>
          <UserHome el={elDetails} />
        </>
      ) : !elStarted && elEnded ? (
        <>
          <div
            className="container-item attention"
            style={{
              margin: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <center>
              <h3
                style={{
                  fontSize: "3rem",
                  fontWeight: "bold",
                  color: "red",
                  margin: "20px",
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
        </>
      ) : null}
    </Container>
  );
};

export default Home;
