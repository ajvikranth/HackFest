"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsArrowDownSquareFill } from "react-icons/bs";
import { FaArrowDown, FaArrowUp, FaArrowRight } from "react-icons/fa";
import Timer from "@/components/Timer";
import Buttons from "@/components/Buttons";
import Question from "@/components/Question";
import CodeEditor from "@/components/CodeEditor";
import { FaMemory } from "react-icons/fa6";
import { RxLapTimer } from "react-icons/rx";
import { MdRemoveDone, MdOutlineDoneAll } from "react-icons/md";
import {
  handleUpdateRecNextQuestion,
  handleUpdateRecPrevQuestion,
  handleExpandClick,
  handleActiveIndex,
  handleFetchData,
} from "@/Redux/Features/userDetails";
import { handle_role_update,handleResultsUpdate } from "@/Redux/Features/globalDetails";
import axios from "axios";
import Navigation from "@/components/Navigation";
import { FcExpired } from "react-icons/fc";
import { GiHealthIncrease } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import { IoCaretDown } from "react-icons/io5";
import { IoStorefront } from "react-icons/io5";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Results = () => {
  
  const [value, setValue] = useState('');

  
  const globalDetails = useSelector((state) => state.globalDetails);
  const userDetails = useSelector((state) => state.userDetails.value);
  const results = globalDetails.results;
  console.log(results);
  let stores = [];
  let storeValues = []
  const allProducts = results["product_names"];
  var productLength = null;
  if (results["message"] == "success") {
    stores = Object.keys(results["store"]);
    storeValues = Object.values(results["store"]);
    productLength = allProducts.length;
  }

  const [submit, setSubmit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasData, setHasData] = useState(true);
  const handleRecruit = async (e, email, userRole) => {

    


    const data = await axios.post(
      'http://localhost:5000/get_data?expiresAt="2024-10-10"&store_id=2'
      ,{
        store_id: 1,
        jobrole: userRole,
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
      const dispatch = useDispatch();
      dispatch(handleRecruit({data:data.data}))
    } 
  };
  return (
    <>
      <div className="mb-[1000px]">
        <Navigation currentPage="homepage" />
        <div className="w-full max-w-[90%] mx-auto mt-[10%] border-[1px]">
          <h1
            className="text-[40px] text-center mt-[40px] my-[30px] font-semibold"
            style={{ fontFamily: "Varela Round, sans-serif" }}
          >
            {" "}
            Results
          </h1>
          {productLength >= 1 && (
            <>
              {allProducts?.map((product, productIndex) => {
                return (
                  <div className={`py-[10px] text-[30px] `} key={productIndex}>
                    <div
                      className={`mx-[20px]  ${
                        results.response[productIndex] == 0
                          ? "bg-[#c6ffb3]"
                          : "bg-[#ffb3b3]"
                      }  flex items-center justify-between border-[1px] border-solid border-black`}
                    >
                      {" "}
                      <div className="w-full">
                        <div className="flex justify-between items-center">
                          <div className="flex inline items-center">
                            <div className="p-[20px] ">
                              {/* <img
                                alt="profile picture"
                                src={
                                  user?.imageLink ||
                                  "https://avatars.githubusercontent.com/u/53965821?v=4"
                                }
                                className="w-[100px] rounded-full border-[1px] border-solid"
                              /> */}
                            </div>
                            <div>
                              <h1 className=" mx-[20px] truncate my-[20px]">
                                {product}
                              </h1>
                            </div>
                          </div>
                          <div className="flex my-[20px]">
                        {results.response[productIndex] !=  0 && ( <>
                              {/* <FcExpired />  */}
                              {stores.map((store,storeIndex) => {
                                  return (
                                    <div key={storeIndex} className="flex flex-col px-[20px] mx-[20px] items-center"> 
                                        <IoStorefront />
                                        <span>{storeValues[storeIndex]}</span>
                                        <p className="text-[12px]">{stores[storeIndex]}</p>
                                    </div>
                                )
                              })}
                            </>)  }
                         
                            <div className="flex flex-col px-[20px] mx-[20px] items-center">
                              {/* <FcExpired />  */}
                              <FcExpired />
                              {results["expires_in"][productIndex]}
                              <p className="text-[12px]">Expires in</p>

                              {/* <div
                              className={`  ${
                                store.response  == 0
                                  ? "hover:bg-[#E5FFDD]"
                                  : "hover:bg-[#FFF8F8]"
                              } hover:text-black-800 hover:border-gray-400 mr-[30px] flex items-center border-[1px] border-solid px-[5px] rounded-lg border-black`}
                              onClick={(e) =>
                                dispatch(handleActiveIndex(userIndex))
                              }
                            >
                              <div className="mx-[10px]">
                                <button className=""> Check </button>
                              </div>
                              {userIndex != userDetails.currentActiveIndex ? (
                                <FaArrowDown />
                              ) : (
                                <FaArrowUp />
                              )}
                            </div> */}
                            </div>

                            <div className="flex flex-col px-[20px] mx-[20px] items-center">
                              {/* <FcExpired />  */}
                              <GiHealthIncrease />
                              {results["demand"][productIndex]}
                              <p className="text-[12px]">Demand</p>
                            </div>
                            <div className="flex flex-col px-[20px] mx-[20px] items-center">
                              {/* <FcExpired />  */}
                              <TiTick />
                              {results["availability"][productIndex]}
                              <p className="text-[12px]">Available</p>
                            </div>
                         
                          </div>
                        </div>
                      
                      </div>
                      {/* {user.expand && <div className="flex"> hello </div>} */}
                    </div>
                    {/* <div>Button</div> */}
                  </div>
                );
              })}
            </>
          )}

          <div className="mx-[20px] font-[30px]">
            <div className="text-[20px] mx-[30px] my-[30px]  border-black border-[1px] border-solid text-[40px] p-[10px] text-center ">Suggestion to Avoid Food Wastage </div>
            {results.is_llm && <h1 className="text-[20px] mx-[30px] my-[30px] bg-[#ffffdf] border-[black] p-[50px] text-[20px] border-black border-[1px] border-solid  ">
                    {results.llm}</h1> }
        </div>
        {productLength == 0 && (
          <div className="mt-[40px] mb-[1000px] mx-auto text-center w-full max-w-[90%]  border-[1px] border-solid border-black text-[26px] p-[20px]">
            {" "}
            Please request for the expiration
          </div>
        )}
      </div>
      </div>
    </>
    
  );
};

export default Results;
