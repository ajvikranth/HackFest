"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handle_code_update,
  handleOutputUpdate,
} from "@/Redux/Features/globalDetails";
import MonacoEditor from "react-monaco-editor";
const Terminal = ({ username }) => {
  const [name, role] = username;
  const levels = ["easyLevel", "intermediateLevel", "advancedLevel"];
  const dispatch = useDispatch();
  const globalDetails = useSelector((state) => state.globalDetails);
  const userDetails = useSelector((state) => state.userDetails.value);
  const question_number = globalDetails.question;

  const level = levels[globalDetails.question];
  // const output =
  //   globalDetails.challenges[role][levels[globalDetails.question]].output;
  // useEffect(() => {
  //   const output =
  //     globalDetails.challenges[role][levels[globalDetails.question]].output;
  //   setCode(output);
  // }, []);
  // const [outputCode, setOutputCode] = useState(output);
  const output =
    globalDetails.challenges[role][levels[globalDetails.question]].output;
  // useEffect(() => {
  //   const output =
  //     globalDetails.challenges[role][levels[globalDetails.question]].output;
  //   console.log(output);
  //   setOutputCode(output);
  // }, [outputCode]);

  const handleChange = () => {
    setOutputCode(output);
    dispatch(handleOutputUpdate(level, output, role));
    // dispatch(handleOutputUpdate(level, output, role));
  };
  return (
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
      onChange={handleChange}
      className="mt-[20px]"
    />
  );
};
export default Terminal;
