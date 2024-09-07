"use client";
import React, { useEffect, useState } from "react";
import Timer from "@/components/Timer";
import Question from "@/components/Question";
import Buttons from "@/components/Buttons";
import CodeEditor from "@/components/CodeEditor";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";

import MonacoEditor from "react-monaco-editor";
import Terminal from "@/components/Terminal";
import {
  handleUpdateNextQuestion,
  handleUpdatePrevQuestion,
  handleOutputUpdate,
} from "@/Redux/Features/globalDetails";

const CodingPage = ({ username }) => {
  const [output, setOutput] = useState("");
  const [validation, setValidation] = useState(false);
  const [name, role] = username;
  const [run, setRun] = useState(false);
  const [importMessage, setImportMessage] = useState("");
  //   console.log(username[1]);
  const globalDetails = useSelector((state) => state.globalDetails);
  const levels = ["easyLevel", "intermediateLevel", "advancedLevel"];
  const [importPackage, setImportPackage] = useState("");
  const questionNumber = globalDetails.question;
  console.log(globalDetails.question);

  const challengeDetails = useSelector((state) => state.challengeDetails.value);
  const question = challengeDetails["question"]?.[globalDetails.question];
  const answer = challengeDetails["answers"]?.[globalDetails.question];

  // const output =
  //   globalDetails.challenges[role][levels[globalDetails.question]].output;
  const [listOfPackages, setListOfPackages] = useState(["pandas"]);
  const handleChange = () => {
    dispatch(handleOutputUpdate(level, output, role));
    // dispatch(handleOutputUpdate(level, output, role));
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await axios.post(
  //         "globalDetails.postgresBackend/add_packages",
  //         {
  //           listOfPackages,
  //           name,
  //           questionNumber,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       console.log(data);
  //     } catch {
  //       console.log("Error occurred while adding the packages");
  //     }
  //   };

  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [listOfPackages]);

  // const handleImport = async () => {
  //   // console.log(data);
  //   // setImportMessage("checking");
  //   console.log(importPackage);
  //   if (importPackage) {
  //     setListOfPackages((prev) => [...prev, importPackage]);
  //     setImportPackage("");
  //   }
  // };
  // const role = globalDetails.role;
  const level = levels[globalDetails.question];
  const dispatch = useDispatch();
  // useEffect(() => {}, [output]);
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
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    // console.log(data, "output");
    output = data["data"]["output"];
    // console.log(output);
    dispatch(handleOutputUpdate(level, output, role));

    const timer = setTimeout(async () => {
      const data = await axios.post(globalDetails.postgresBackend + "execute", {
        answer,
        name,
        questionNumber,
      });
      output = data["data"];
      dispatch(handleOutputUpdate(level, output, role));
      console.log(level, output, role, "role");
      // dispatch(handleOutputUpdate(level, output, role));
    }, 3000);
  };
  const handleDeletePackages = async (each) => {
    console.log("clicked");
    setListOfPackages((prev) => prev.filter((old) => old !== each));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
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
        if (user_data.status == 200) {
          setValidation(true);
          const data = await axios.post(
            globalDetails.redisBackend + "createfolder",
            {
              name,
            }
          );
        } else {
          alert("no");
        }

        // Handle the data received if needed
      } catch (error) {
        // Handle errors
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full mx-auto mt-[10%] border-[1px] border-solid border-black">
      {validation ? (
        <>
          <div>
            <div className="mx-[4%] p-[5px]">
              <Question role={role} question={question} />
            </div>
            <div className="mx-[4%]  my-[5%] p-[5px]">
              {/* {user.} */}

              <CodeEditor hint={answer} name={name} />

              {run && (
                <div className="my-[40px] ">
                  <Terminal username={username} />
                </div>
              )}
              <div className="flex justify-start  mt-[20px] ">
                <button
                  onClick={handleRunCode}
                  className="inline text-[25px] rounded p-[10px] px-[35px] border-solid border-black border-[1px] bg-[#66B96A]"
                >
                  Run
                </button>
                <button
                  onClick={handleRunCode}
                  className="mx-[20px] inline text-[25px] rounded p-[10px] px-[35px] border-solid border-black border-[1px] bg-[#ff6666]"
                >
                  Stop
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
                      className=" mx-[20px] border-[1px] border-solid border-gray rounded-lg px-[15px] py-[10px] bg-[#66B96A]"
                      onClick={(e) => handleImport()}
                    >
                      <button className=" "> IMPORT </button>
                    </div>
                  </div>
                  {importMessage && <div> {importMessage}</div>}
                  {listOfPackages && (
                    <div className=" max-w-[50%] grid grid-cols-3">
                      {listOfPackages.map((each) => {
                        console.log(each);
                        return (
                          // <div className="inline rounded border-[1px] border-solid border-gray ">
                          <div
                            key={each}
                            onClick={(e) => handleDeletePackages(each)}
                          >
                            <p className="my-[5px] mx-[2px] flex justify-between items-center text-[20px] px-[10px] py-[5px] rounded border-[1px] border-solid border-gray">
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
      ) : (
        <>
          <div>Loading...</div>
        </>
      )}
    </div>
  );
};

export default CodingPage;
