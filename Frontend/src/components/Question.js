"use client";
import React, { useEffect, useState } from "react";
import CodeEditor from "../components/CodeEditor";
import { useSelector, useDispatch } from "react-redux";
import {
  handle_code_update,
  handle_role_update,
} from "@/Redux/Features/globalDetails";
import axios from "axios";
const Question = ({}) => {
  const dispatch = useDispatch();

  const globalDetails = useSelector((state) => state.globalDetails);
  const challengeDetails = useSelector((state) => state.challengeDetails.value);

  const handleRunCode = async (e) => {
    console.log(hint);
    const data = await axios.post(globalDetails.redisBackend + "execute", {
      hint,
    });
    console.log(data);
  };
  const question = challengeDetails["question"]?.[globalDetails.question];
  // useEffect(() => {
  //   dispatch(handle_role_update(role));
  // }, [role]);
  // const allHintsArray = Object.values(globalDetails.challenges[role]).map(
  //   (level) => level.hint
  // );

  return (
    <div className="p-[30px] text-[40px] border-[1px] border-black border-solid">
      {question}
    </div>
  );
};

export default Question;
