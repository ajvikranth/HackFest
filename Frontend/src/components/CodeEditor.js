"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handle_code_update } from "@/Redux/Features/globalDetails";
import { handleUpdateUserAnswer } from "@/Redux/Features/challengeDetails";
import MonacoEditor from "react-monaco-editor";
import axios from "axios";

const CodeEditor = ({ hint, name }) => {
  const dispatch = useDispatch();
  const globalDetails = useSelector((state) => state.globalDetails);
  const challengeDetails = useSelector((state) => state.challengeDetails);
  const levels = ["easyLevel", "intermediateLevel", "advancedLevel"];
  const level = levels[globalDetails.question];
  const userData = challengeDetails.value;
  const role = globalDetails.role;
  const [code, setCode] = useState(hint);

  const handleEditorChange = (newValue, e) => {
    setCode(newValue);
  };
  const questionNumber = globalDetails.question;
  useEffect(() => {
    console.log(userData, "userData");
    const fetchData = async () => {
      dispatch(handleUpdateUserAnswer(code, questionNumber));
      const data = await axios.post(
        globalDetails.redisBackend + "insert_data",
        {
          answer: code,
          name,
          questionNumber: globalDetails.question,
          allAnswers: userData.answers,
          role: role,
        },
        {
          headers: {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    };
    fetchData();

    // dispatch(handleUpdateUserAnswer(code, questionNumber));
  }, [code]);
  return (
    <MonacoEditor
      //   width="800"
      height="600"
      language="python"
      theme="vs-dark" // Change the theme to 'vs-light'
      value={hint}
      options={{
        selectOnLineNumbers: true,
        automaticLayout: true,
        lineNumbers: "on",
        autoIndent: "full",
        padding: {
          top: 20,
        },
        fontSize: 24,
      }}
      onChange={handleEditorChange}
    />
  );
};
export default CodeEditor;
