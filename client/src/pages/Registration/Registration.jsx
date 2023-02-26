import React, { useState, useEffect } from "react";
import Navbar from "../../components/NavBar/Navbar";
import NavbarAdmin from "../../components/NavBar/NavbarAdmin";
import NotInit from "../../components/NotInit";
import Web3 from "web3";
import Camera from "./Camera";
import {
  ELECTION_CONTRACT_ADDRESS,
  ELECTION_CONTRACT_ABI,
} from "../../utils/constance";
import { Container } from "./styles";
import Loader from "../../components/Loader/Loader";
import axios from "axios";

const Registration = () => {
  const [electionInstance, setElectionInstance] = useState(undefined);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isElStarted, setIsElStarted] = useState(false);
  const [isElEnded, setIsElEnded] = useState(false);
  const [voterCount, setVoterCount] = useState(undefined);
  const [voterName, setVoterName] = useState("");
  const [voterPhone, setVoterPhone] = useState("");
  const [voters, setVoters] = useState([]);
  const [registering, setRegistering] = useState(false);
  const [currentVoter, setCurrentVoter] = useState({
    address: undefined,
    name: null,
    phone: null,
    hasVoted: false,
    isVerified: false,
    isRegistered: false,
  });
  const [openCamera, setOpenCamera] = useState(false);
  const [voterData, setVoterData] = useState({
    name: "",
    phone_number: "",
    email: "",
    voter_id: "",
    current_picture: "",
    voterId_number: "",
  });

  const handleVoterDataChange = (e) => {
    setVoterData({
      ...voterData,
      [e.target.name]: e.target.value,
    });
    // console.log(voterData);
  };
  // const [voterList, setVoterList] = useState([]);

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

        const voterCount = await electionInstance.methods
          .getTotalVoter()
          .call();
        setVoterCount(voterCount);

        const voter = await electionInstance.methods.voterDetails(acc).call();
        setCurrentVoter(voter);
        console.log(voter);

        const voterList = await electionInstance.methods.getAllVoters().call();
        setVoters(voterList);
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

  const sendFileToIPFS = async (fileImg) => {
    try {
      const formData = new FormData();
      formData.append("file", fileImg);
      const resFile = await axios({
        method: "POST",
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
      return resFile?.data?.IpfsHash;
    } catch (error) {
      console.log("Error sending File to IPFS: ");
      console.log(error);
    }
  };

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const updateVoterName = (event) => {
    setVoterName(event.target.value);
  };
  const updateVoterPhone = (event) => {
    setVoterPhone(event.target.value);
  };
  const registerAsVoter = async (event) => {
    event.preventDefault();
    setRegistering(true);
    
    console.log("Registering as voter");
    const current_modified_picture = await sendFileToIPFS(
      dataURLtoFile(voterData.current_picture, "image.png")
    );
    const current_modified_voterId = await sendFileToIPFS(voterData?.voter_id);
    console.log("current_modified_voterId", current_modified_voterId);
    console.log("current_modified_picture", current_modified_picture);

    //send one fileto backend
    let verified = false;
    const formData = new FormData();
    formData.append("File1", voterData?.voter_id);
    formData.append("label", voterData?.email);
    await axios
      .post("http://localhost:5000/post-face", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.message !== "Face data stored successfully") {
          alert(res.data.message + " Please try again");
          window.location.reload();
          return;
        }
      })
      .catch((err) => {
        alert("Face not verified , Please try again");
        window.location.reload();
      });
    const newFormData = new FormData();
    newFormData.append("File1", voterData?.current_picture);
    await axios
      .post("http://localhost:5000/check-face", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (res) => {
        if (res.data.result[0]._label === voterData?.email) {
          verified = true;
        }
        try {
          await electionInstance.methods
            .registerAsVoter(
              voterData?.name,
              voterData?.email,
              voterData?.phone_number,
              current_modified_voterId,
              current_modified_picture,
              voterData?.voterId_number,
              verified
            )
            .send({ from: account });
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => {
        alert("Face not verified , Please try again");
        window.location.reload();
      });
  };

  if (!web3) {
    return (
      <Container>
        {isAdmin ? <NavbarAdmin /> : <Navbar />}
        <center>Loading Web3, accounts, and contract...</center>
        <Loader />
      </Container>
    );
  }

  return (
    <Container>
      {isAdmin ? <NavbarAdmin /> : <Navbar />}
      {!isElStarted && !isElEnded ? (
        <NotInit />
      ) : (
        <>
          <div
            className="container-item info"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <p className="text-[#ccc407] text-6xl mb-4"
            >
              Total Registered Voters: <strong className="text-[#171717]">{voterCount}</strong>
            </p>
          </div>
          <div
            className="container-main bg-[#e3e3e3] text-center p-4 shadow-2xl"
            // style={{
            //   display: "flex",
            //   flexDirection: "column",
            //   justifyContent: "center",
            //   alignItems: "center",
            // }}
          >
            <h3 className="font-bold text-7xl mb-4"
            >
              Registration
            </h3>
            <small className="text-5xl mt-4">Register to vote.</small>
            <div
              className="container-item"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <form
                className="form mb-16"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
                onSubmit={registerAsVoter}
              >
                <div
                  className="div-li"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <label
                    className={"label-r"}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Account Address
                    <input
                      className={"input-r"}
                      type="text"
                      value={
                        account
                          ? account.substring(0, 6) +
                            "..." +
                            account.substring(account.length - 6)
                          : ""
                      }
                      style={{
                        width: "100%",
                        padding: "12px 20px",
                        margin: "8px 0",
                        boxSizing: "border-box",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        backgroundColor: "#f8f8f8",
                        color: "black",
                        cursor: "not-allowed",
                      }}
                    />{" "}
                  </label>
                </div>
                <div className="text-left w-1/2 bg-[#c9c9c9] p-4">
                  <div className="block p-2">
                    <label for="name" className="block">
                      Name<span className="text-[#f2923e]">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full p-2 outline-none"
                      id="name"
                      placeholder="eg. Jhon Doe"
                      name="name"
                      value={voterData.name}
                      onChange={handleVoterDataChange}
                    />
                  </div>
                  <div className="block p-2">
                    <label for="phone_number" className="block">
                      Number<span className="text-[#f2923e]">*</span>
                    </label>
                    <input
                      required
                      type="number"
                      className="w-full p-2 outline-none"
                      id="phone_number"
                      placeholder="eg. 9841234567"
                      name="phone_number"
                      value={voterData.phone_number}
                      onChange={handleVoterDataChange}
                    />
                  </div>
                  <div className="block p-2">
                    <label for="email" className="block">
                      Email<span className="text-[#f2923e]">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full p-2 outline-none"
                      id="email"
                      placeholder="eg. abc@gmail.com"
                      name="email"
                      value={voterData.email}
                      onChange={handleVoterDataChange}
                    />
                  </div>
                  <div className="block p-2 items-center">
                    <label for="file" className="block">
                      Submit Voter ID<span className="text-[#f2923e]">*</span>
                    </label>
                    <input
                      required
                      type="file"
                      className="w-full p-2 outline-none"
                      id="file"
                      placeholder="eg. abc@gmail.com"
                      name="voter_id"
                      onChange={(e) => {
                        //only image files are allowed
                        // console.log(e.target.files)
                        if (
                          e.target.files[0].type.includes("image")
                        ) {
                          setVoterData({
                            ...voterData,
                            voter_id: e.target.files[0],
                          });
                        } else {
                          setVoterData({
                            ...voterData,
                            voter_id: "",
                          });

                          alert("Only image files are allowed");
                        }
                      }}
                    />
                  </div>
                  <div className="block p-2 items-center">
                    <label for="voter_number" className="block">
                      Voter ID Number<span className="text-[#f2923e]">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full p-2 outline-none"
                      id="voter_number"
                      placeholder="eg. XXXXXXXXX"
                      name="voterId_number"
                      value={voterData.voterId_number}
                      onChange={handleVoterDataChange}
                    />
                  </div>
                  <div className="mt-2">
                    <span
                      className="font-medium px-4 py-1 ml-2 rounded-2xl bg-[#f09b51] hover:bg-[#f0882d] cursor-pointer hover:shadow-slate-400 hover:shadow-2xl"
                      onClick={() => setOpenCamera(!openCamera)}
                    >
                      {!openCamera ? "Took Picture" : "Close Camera"}
                    </span>
                    {openCamera && (
                      <Camera
                        setVoterData={setVoterData}
                        voterData={voterData}
                      />
                    )}
                  </div>
                </div>
                <p
                  className="note"
                  style={{
                    width: "60%",
                    fontSize: "12px",
                    color: "gray",
                    textAlign: "left",
                    margin: "0",
                  }}
                >
                  <span style={{ color: "tomato" }}> Note: </span>
                  <br /> Make sure your account address and Phone number are
                  correct. <br /> Admin might not approve your account if the
                  provided Phone number nub does not matches the account address
                  registered in admins catalogue.
                </p>
                {registering ? <Loader className="mb-8 text-sm"/> : (

               
                <button
                  className="my-4 w-1/2 border-x border-y rounded-2xl p-2 font-semibold space-x-2 cursor-pointer border-[#f09b51] text-[#5c5b5b] hover:bg-[#f09b51] hover:text-[#fff]"
                  disabled={
                    voterData?.name?.length === 0 ||
                    voterData?.email?.length === 0 ||
                    voterData?.phone_number?.length === 0 ||
                    voterData?.voter_id?.length === 0 ||
                    voterData?.voterId_number?.length === 0 ||
                    voterData?.current_picture?.length === 0 ||
                    voterData?.phone_number?.length !== 10 ||
                    currentVoter["isRegistered"] 
                  }
                  type="submit"
                >
                  {currentVoter["isRegistered"]
                    ? "Registered"
                    : "Register as voter"}
                </button>
                )}
                {/* {registering && <h1><Loader/></h1>} */}
              </form>
            </div>
          </div>
          <div
            className="container-main"
            style={{
              borderTop: currentVoter["isRegistered"] ? null : "1px solid",
            }}
          >
            {loadCurrentVoter(currentVoter, currentVoter["isRegistered"])}
          </div>
        </>
      )}
    </Container>
  );
};

export function loadCurrentVoter(voter, isRegistered) {
  return (
    <>
      <div
        className={"container-item " + (isRegistered ? "success" : "attention")}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <center className="text-5xl mt-4 font-bold text-[#ccc407]">Your Ragistration Status</center>
      </div>
      <div
        className={"container-list " + (isRegistered ? "success" : "attention")}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <table
          className="table"
          style={{
            width: "60%",
            borderCollapse: "collapse",
            border: "1px solid #6610f2",
            padding: "8px",
            borderRadius: "4px",
            textAlign: "left",
          }}
        >
          <tr
            className="tr"
            style={{
              padding: "8px",
              textAlign: "left",
              backgroundColor: "#ddd",
            }}
          >
            <th
              className="th"
              style={{
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#ddd",
              }}
            >
              Account Address
            </th>
            <td
              className="td"
              style={{
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#ddd",
              }}
            >
              {isRegistered ? voter.voterAddress : "Not Registered"}
            </td>
          </tr>
          <tr
            className="tr"
            style={{
              padding: "8px",
              textAlign: "left",
              backgroundColor: "#ddd",
            }}
          >
            <th
              style={{
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#ddd",
              }}
            >
              Name
            </th>
            <td
              style={{
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#ddd",
              }}
            >
              {isRegistered ? voter.name : "Not Registered"}
            </td>
          </tr>
          <tr
            className="tr"
            style={{
              padding: "8px",
              textAlign: "left",
              backgroundColor: "#ddd",
            }}
          >
            <th
              style={{
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#ddd",
              }}
            >
              Phone
            </th>
            <td
              style={{
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#ddd",
              }}
            >
              {isRegistered ? voter.phone : "Not Registered"}
            </td>
          </tr>
          <tr
            className="tr"
            style={{
              padding: "8px",
              textAlign: "left",
              backgroundColor: "#ddd",
            }}
          >
            <th
              style={{
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#ddd",
              }}
            >
              Email
            </th>
            <td
              style={{
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#ddd",
              }}
            >
              {isRegistered ? voter.email : "Not Registered"}
            </td>
          </tr>
          <tr
            className="tr"
            style={{
              padding: "8px",
              textAlign: "left",
              backgroundColor: "#ddd",
            }}
          >
            <th
              style={{
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#ddd",
              }}
            >
              Voter ID Number
            </th>
            <td
              style={{
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#ddd",
              }}
            >
              {isRegistered ? voter.voterIdNumber : "Not Registered"}
            </td>
          </tr>
          <tr
            className="tr"
            style={{
              padding: "8px",
              textAlign: "left",
              backgroundColor: "#ddd",
            }}
          >
            <th
              style={{
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#ddd",
              }}
            >
              Your Picture
            </th>
            <td className="hover:text-[#4277d1] hover:underline">
              {/* <a href="">Click to see your pic</a> */}
              {isRegistered ? (
                <a
                  target="_blank"
                  href={`https://gateway.pinata.cloud/ipfs/${voter?.currentImage}`}
                  window="true"
                >
                  Click to see your pic
                </a>
              ) : (
                "Not Registered"
              )}
            </td>
          </tr>
          <tr
            className="tr"
            style={{
              padding: "8px",
              textAlign: "left",
              backgroundColor: "#ddd",
            }}
          >
            <th
              style={{
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#ddd",
              }}
            >
              Your Voter ID
            </th>
            <td className="hover:text-[#4277d1] hover:underline">
              {/* <a href="">Click to see your pic</a> */}
              {isRegistered ? (
                <a
                  target="_blank"
                  href={`https://gateway.pinata.cloud/ipfs/${voter?.govId}`}
                  window="true"
                >
                  Click to see your voter ID
                </a>
              ) : (
                "Not Registered"
              )}
            </td>
          </tr>
          <tr
            className="tr"
            style={{
              padding: "8px",
              textAlign: "left",
              backgroundColor: "#ddd",
            }}
          >
            <th
              style={{
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#ddd",
              }}
            >
              Voted
            </th>
            <td
              style={{
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#ddd",
              }}
            >
              {voter.hasVoted ? "True" : "False"}
            </td>
          </tr>
          <tr
            className="tr"
            style={{
              padding: "8px",
              textAlign: "left",
              backgroundColor: "#ddd",
            }}
          >
            <th
              style={{
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#ddd",
              }}
            >
              Verification
            </th>
            <td
              style={{
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#ddd",
              }}
            >
              {voter.isVerified ? "True" : "False"}
            </td>
          </tr>
          <tr
            className="tr"
            style={{
              padding: "8px",
              textAlign: "left",
              backgroundColor: "#ddd",
              //when theme is dark
            }}
          >
            <th
              style={{
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#ddd",
              }}
            >
              Registered
            </th>
            <td
              style={{
                padding: "8px",
                textAlign: "left",
                // backgroundColor: "#ddd",
              }}
            >
              {voter.isRegistered ? "True" : "False"}
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default Registration;
