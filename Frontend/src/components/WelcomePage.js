"use client";
import React, { useEffect, useState } from "react";
import CodingPage from "./CodingPage";

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

const WelcomePage = ({ username }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [accepted, setAccepted] = useState(true);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = () => {
    if (isChecked) {
      // Redirect to the recruitment page
      setAccepted(true);
      // You can use Next.js router or Link component for navigation
    } else {
      alert("Please accept the terms and conditions to proceed.");
    }
  };


  return (
    <div className="w-full px-[30px] py-[10px]">
      <div className={`${accepted && "hidden"}`}>
        <h1 className="text-center text-[30px] my-[50px] font-bold ">
          Welcome to Hush Hush Recruitment
        </h1>
        <p>Please read and accept the terms and conditions below to proceed:</p>
        <div className="flex my-[10px]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <p className="mx-[10px]"> I accept the terms and conditions</p>
        </div>
        <button
          onClick={handleSubmit}
          className="border-[1px] border-solid border-gray bg-[green] rounded-lg px-[30px] py-[15px]"
        >
          Proceed
        </button>
      </div>
      {accepted && (
        <div className="w-full mx-auto mt-[10%] border-[1px] border-solid border-black">
          {validation ? (
            <>
              <Timer />
              <div>
                <div className="mx-[4%] p-[5px]">
                  <Question role={role} question={question} />
                </div>
                <div className="mx-[4%]  my-[5%] p-[5px]">
                  {/* {user.} */}

                  <CodeEditor hint={answer} name={name} />

                  {run && (
                    <div className="my-[40px] ">
                      {/* <Terminal username={username} /> */}
                      <MonacoEditor
                        // //   width="800"
                        height="300"
                        // className="h-[300px]"
                        language="python"
                        theme="vs-dark" // Change the theme to 'vs-light'
                        value={output}
                        options={{
                          selectOnLineNumbers: false,
                          automaticLayout: false,
                          lineNumbers: "off",
                          autoIndent: "full",
                          padding: {
                            top: 20,
                          },
                          fontSize: 24,
                          readOnly: true,
                        }}
                        onChange={setOutput}
                      />
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
                          Enter <strong>Pandas3</strong> from pip install
                          Pandas3
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
              <Buttons
                next={handleUpdateNextQuestion}
                prev={handleUpdatePrevQuestion}
                questionNumber={globalDetails.question}
                name={name}
              />
            </>
          ) : (
            <>
              <div>Loading...</div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
