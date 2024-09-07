"use client";

import { MdDeleteOutline } from "react-icons/md";
import React, { useState, useEffect } from "react";
import {
  handleUpdateUserCompleted,
  handleChallengeDataFetch,
} from "@/Redux/Features/challengeDetails";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  handleUpdateNextQuestion,
  handleUpdatePrevQuestion,
  handleOutputUpdate,
} from "@/Redux/Features/globalDetails";
import Terminal from "@/components/Terminal";
import CodeEditor from "@/components/CodeEditor";
import Question from "@/components/Question";
const Timer = ({ username }) => {
  const [name, role] = username;
  const minutesToAdd = 10;
  const challengeDetails = useSelector((state) => state.challengeDetails.value);
  const globalDetails = useSelector((state) => state.globalDetails);
  const expirationTime = new Date(challengeDetails?.acceptedTime);
  const [time, setTimer] = useState(null);
  const levels = ["easyLevel", "intermediateLevel", "advancedLevel"];
  const level = levels[globalDetails.question];

  const [importMessage, setImportMessage] = useState("");
  const [importPackage, setImportPackage] = useState("");
  const [output, setOutput] = useState("");
  const [acceptedTime, setAcceptedTime] = useState(new Date());
  const [validation, setValidation] = useState(false);

  const [listOfPackages, setListOfPackages] = useState(["pandas"]);
  const [run, setRun] = useState(false);
  const dispatch = useDispatch();
  const question = challengeDetails["question"]?.[globalDetails.question];

  const questionNumber = globalDetails.question;

  const answer = challengeDetails["answers"]?.[globalDetails.question];
  const [isRunning, setIsRunning] = useState(globalDetails.timerRunning);
  const currentTime = new Date();
  let difference = expirationTime - new Date();
  let differenceInSeconds = (difference / 60 / 1000) * 60;
  const userData = challengeDetails.value;
  useEffect(() => {
    const fetchData = async () => {
      const user_data = await axios.get(
        globalDetails.redisBackend + "getuserdata",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            id: name,
            role: role,
          },
        }
      );
      if (!user_data.iscompleted) {
        console.log("insidet the status", user_data["data"]);
        dispatch(handleChallengeDataFetch(user_data["data"]));
      } else {
        dispatch(handleUpdateUserCompleted());
      }
    };
    fetchData();
    let difference = expirationTime - new Date();
    let differenceInSeconds = (difference / 60 / 1000) * 60;
  }, []);
  useEffect(() => {
    let timerId;

    if (isRunning) {
      timerId = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime == 1) {
            setIsRunning(false);
            let difference = expirationTime - new Date();
            const differenceInSeconds = (difference / 60 / 1000) * 60;
            if (differenceInSeconds <= 1) {
              const autoSubmit = async () => {
                const data = await axios.post(
                  globalDetails.redisBackend + "submit_results",
                  {
                    name,

                    userDetails: challengeDetails,
                    role,
                  },

                  {
                    headers: {
                      "Content-Type": "application/json",

                      "Access-Control-Allow-Origin": "*",
                    },
                  }
                );
              };
              setIsRunning(false);
              autoSubmit();
              dispatch(handleUpdateUserCompleted());
            }

            clearInterval(timerId);
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [isRunning]);

  useEffect(() => {
    let difference = expirationTime - new Date();
    setTimer((difference / 60 / 1000) * 60);
  }, [time]);
  const handleRunCode = async (e) => {
    // console.log(hint);
    setRun(true);
    let output = "Loading.....";
    dispatch(handleOutputUpdate(level, output, role));
    const data = await axios.post(
      globalDetails.redisBackend + "execute",
      {
        answer,
        name,
        questionNumber,
        allAnswers: userData?.answers,
        role: role,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    dispatch(handleOutputUpdate(level, data.data.output, role));
  };

  const handleCheck = async () => {
    setRun(true);
    const response = await axios.post(
      globalDetails.redisBackend + "evaluate",
      {
        userName: name,
        questionNumber: globalDetails.question + 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    dispatch(
      handleOutputUpdate(levels[questionNumber], response["data"], role)
    );
  };

  const handleDeletePackages = async (each) => {
    console.log("clicked");
    setListOfPackages((prev) => prev.filter((old) => old !== each));
  };

  const handleImport = async () => {
    // console.log(data);
    // setImportMessage("checking");
    console.log(importPackage);
    if (importPackage) {
      setListOfPackages((prev) => [...prev, importPackage]);
      setImportPackage("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.post(
          globalDetails.redisBackend + "add_packages",
          {
            listOfPackages,
            name,
            questionNumber,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      } catch {
        console.log("Error occurred while adding the packages");
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listOfPackages]);

  const startTimer = () => {
    setIsRunning(true);
  };

  return (
    <>
      {
        <>
          {" "}
          <div className="mx-[40px]">
            <h1 className="text-[50px]  mt-[20px]">
              Time Remaining: {Math.floor(differenceInSeconds / 60)}:
              {Math.floor(differenceInSeconds % 60).toLocaleString("en-US", {
                minimumIntegerDigits: 2,
              })}
            </h1>
          </div>
          <div>
            <div className="mx-[4%] p-[5px]">
              <Question />
            </div>
            <div className="mx-[4%]  my-[2%] p-[5px]">
              {/* {user.} */}

              <CodeEditor hint={answer} name={name} />

              {run && <Terminal username={username} />}
            </div>
            <div className="mx-[4%]  p-[5px]">
              <div className="flex justify-start  mt-[0px] ">
                <button
                  onClick={handleRunCode}
                  className="hover:bg-[#69A76D] hover:text-black-800 hover:border-gray-400 inline text-[25px] rounded p-[10px] px-[35px] border-solid border-black border-[1px] bg-[#66B96A]"
                >
                  Run
                </button>
                <button
                  onClick={handleCheck}
                  className="hover:bg-[#69A76D] hover:text-black-800 hover:border-gray-400 mx-[20px] inline text-[25px] rounded p-[10px] px-[35px] border-solid border-black border-[1px] bg-[#66B96A]"
                >
                  Check
                </button>
              </div>
              <div>
                <div className="">
                  <h1 className="text-[25px] my-[15px]">Dependencies</h1>
                  <div className="my-[20px]">
                    <h1 className="text-[24px] my-[10px] inline">Note</h1>
                    <div className="text-[20px] my-[10px]">
                      Enter <strong>Pandas3</strong> from pip install Pandas3
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      onChange={(e) => setImportPackage(e.target.value)}
                      value={importPackage}
                      type="text"
                      className=" px-[10px] text-[20px] border-[1px] border-solid border-gray h-[50px] w-[50%] rounded-lg"
                    />
                    <div
                      className="hover:bg-[#69A76D] hover:text-black-800 hover:border-gray-400 mx-[20px] border-[1px] border-solid border-gray rounded-lg px-[15px] py-[10px] bg-[#66B96A]"
                      onClick={(e) => handleImport()}
                    >
                      <button className=" "> IMPORT </button>
                    </div>
                  </div>
                  {importMessage && <div> {importMessage}</div>}
                  {listOfPackages && (
                    <div className=" max-w-[50%] grid grid-cols-3 mb-[20px]">
                      {listOfPackages.map((each) => {
                        return (
                          // <div className="inline rounded border-[1px] border-solid border-gray ">
                          <div
                            key={each}
                            onClick={(e) => handleDeletePackages(each)}
                          >
                            <p className="hover:bg-gray-100 hover:text-black-800 hover:border-gray-400 my-[5px] mx-[2px] flex justify-between items-center text-[20px] px-[10px] py-[5px] rounded border-[1px] border-solid border-gray">
                              {each} <MdDeleteOutline />{" "}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default Timer;
