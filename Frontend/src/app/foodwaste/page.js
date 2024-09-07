"use client";
import "react-day-picker/dist/style.css";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import Select from "react-select";
import InputNumber from "rc-input-number";
import { FaMemory } from "react-icons/fa6";
import axios from "axios";
import Navigation from "@/components/Navigation";
import { useSelector,useDispatch } from "react-redux";

import { handle_role_update,handleResultsUpdate } from "@/Redux/Features/globalDetails";

const Page = () => {
  const [selected, setSelected] = useState(null);
  const [number, setNumber] = useState(5);
  const [selectedOption, setSelectedOption] = useState(null);
  const [jobLevel, setJobLevel] = useState(null);
  const [warningMessage, setWarningMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const globalDetails = useSelector((state) => state.globalDetails);
  const dispatch = useDispatch();

  const [footer, setFooter] = useState(
    <p
      className="mt-[50px] text-[22px]"
      style={{ fontFamily: "Ubuntu, sans-serif" }}
    >
      {" "}
      Choose a date for upcoming product expiration
    </p>
  );

  const options = [
    { value: 1, label: "Store 1" },
    { value: 2, label: "Store 2" },
    { value: 3, label: "Store 3" },
    { value: 4, label: "Store 4" },
    { value: 5, label: "Store 5" },
  ];

  useEffect(() => {
    if (selected) {
      setFooter(
        <p
          className="mt-[50px] text-[22px] font-semibold  text-center "
          style={{ fontFamily: "Ubuntu, sans-serif" }}
        >
          {format(selected, "PP")}
        </p>
      );
    }
  }, [selected]);
  //   let footer = <p>Please pick a day.</p>;
  const handleSelect = (date) => {
    const today = new Date();
    if (date >= today) {
      console.log(date);
      setSelected(date);
    } else {
      setFooter(
        <p
          className="mt-[50px] text-[22px]"
          style={{ fontFamily: "Ubuntu, sans-serif" }}
        >
          Pick a day in the future
        </p>
      );
      //   footer = <p>Pick a day in the future</p>;
    }
  };
  useEffect(() => {}, [jobLevel, selectedOption, number, selected]);
  const handleSubmitClick = async (e) => {


    const data = await axios.post(
      "http://localhost:5000/get_data",
      
      {
        store_id: selectedOption['value'],
        expires_at: selected,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    if (data.status == 200) {
      setSuccess(true);
      dispatch(handleResultsUpdate({data:data.data.data}))
      setWarningMessage("Successfully Updated!");
    } 

    // if (selected && selectedOption && number && jobLevel) {
     
    //   if (data.status == 200) {
    //     setSuccess(true);
    //     setWarningMessage("Successfully Updated!");
    //     setTimeout(() => {
    //       setWarningMessage(null);
    //       setJobLevel(jobOptions[0].label);
    //       setSelectedOption(null);
    //       setNumber(5);
    //       setSelected(null);
    //     }, 5000);
    //   }
    // } else {
    //   setWarningMessage("* You have to choose all the required options");
    //   setTimeout(() => {
    //     setWarningMessage(null);
    //   }, 5000);
    // }
  };
  //   if (selected) {
  //     console.log(selected);
  //     footer = <p>You picked {format(selected, "PP")}.</p>;
  //   }
  return (
    <>
      <Navigation currentPage="recruiter" />
      <div
        className="max-w-[60%] mx-auto my-[10%] border-[1px] border-solid border-black "
        style={{ fontFamily: "Ubuntu, sans-serif" }}
      >
        <h1
          className="text-center text-[40px] my-[35px] font-semibold"
          style={{ fontFamily: "Varela Round, sans-serif" }}
        >
          "Waste Not Want Not!"
        </h1>
        <div className="inline flex justify-between px-[20px] inline mx-auto text-center my-[40px]">
          <div className=" border-[1px] border-solid border-gray px-[4px] rounded ">
            <h1
              className="inline flex justify-center text-[26px] my-[20px]  "
              style={{ fontFamily: "Ubuntu, sans-serif" }}
            >
              Expiration date
            </h1>

            <DayPicker
              mode="single"
              selected={selected}
              onSelect={handleSelect}
              footer={footer}
              className="p-[60px]"
            />
          </div>
          <div className="w-[55%] flex mx-auto justify-center items-center border-[1px] border-solid border-gray rounded">
            {" "}
            <div className="w-[70%] my-[30px] ">
              <h1 className="text-[20px] my-[20px]"> Select a store</h1>
              <Select
                onChange={setSelectedOption}
                options={options}
                className=""
              />
             
              <div
                className="bg-[#c6ffb3] rounded-lg border-[1px] border-solid border-gray inline px-[20px] py-[10px] my-[20px]"
                onClick={handleSubmitClick}
              >
                <button className="my-[20px]">Submit</button>
              </div>
            </div>
          </div>
        </div>
        {warningMessage && (
          <div
            className={`text-center text-[26px] my-[20px]  ${
              success ? "text-[green]" : "text-[red]"
            }`}
          >
            {warningMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
