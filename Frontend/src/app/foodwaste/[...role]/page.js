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
import { handle_role_update } from "@/Redux/Features/globalDetails";
import axios from "axios";
import Navigation from "@/components/Navigation";
const RectruiterRole = ({ params: { role } }) => {
  const dispatch = useDispatch();
  const jobRole = role[0];
  console.log(jobRole);

  // console.log(role);
  const globalDetails = useSelector((state) => state.globalDetails);
  const userDetails = useSelector((state) => state.userDetails.value);

  const roles = userDetails[jobRole];
  console.log(roles);
  // alert(typeof roles);
  const currentPage = userDetails.currentPage;
  const levels = ["easyLevel", "intermediateLevel", "advancedLevel"];
  // const questionNumber = globalDetails.question;
  let titleRole;
  const question =
    roles[userDetails.currentActiveIndex]?.question?.[currentPage];
  // const question =
  // "Implement a linear regression model using TensorFlow or PyTorch. Evaluate model performance using metrics like RMSE. Implement feature scaling.";
  const [submit, setSubmit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasData, setHasData] = useState(true);
  const handleRecruit = async (e, email, userRole) => {
    const data = await axios.post(
      globalDetails.redisBackend + "send_job_interview_mail",
      {
        email: email,
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
      setTimeout(() => setSuccess(false), [4000]);
    } else {
    }
    //   // setSubmit(!submit);

    // axios.
  };
  // // console.log(roles);

  useEffect(() => {}, [currentPage]);
  useEffect(() => {
    const dataFetch = async () => {
      const data = await axios.post(
        globalDetails.redisBackend + "get",
        {
          role: jobRole,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log(data["data"]);
      dispatch(handleFetchData(jobRole, data["data"]));
      return data["data"];
    };
    dataFetch();
  }, []);
  function toTitleCase(sentence) {
    if (typeof sentence !== "string") {
      return "Invalid input. Please provide a valid string.";
    }

    return sentence
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  }
  titleRole = toTitleCase(String(role));
  const roleLength = userDetails[jobRole].length;
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
            Candidate {titleRole} Results
          </h1>

          {success && (
            <div className="z-1 absolute my-[20px] bg-white top-[30%] left-[25%] w-[50%] h-[20%] flex justify-center items-center border-gray rounded-lg border-[1px] border-solid">
              <h1 className="text-[35px] inline text-center text-[green] ">
                {" "}
                Successfully sent the mail!{" "}
              </h1>
            </div>
          )}
          {roleLength >= 1 && (
            <>
              {roles?.map((user, userIndex) => {
                return (
                  <div className={`py-[10px] text-[30px] `} key={user.id}>
                    <div
                      className={`mx-[20px]  ${
                        user.isGoodCandidate ? "bg-[#c6ffb3]" : "bg-[#ffb3b3]"
                      }  flex items-center justify-between border-[1px] border-solid border-black`}
                    >
                      {" "}
                      <div className="w-full">
                        <div className="flex justify-between items-center">
                          <div className="flex inline items-center">
                            <div className="p-[20px] ">
                              <img
                                alt="profile picture"
                                src={
                                  user?.imageLink ||
                                  "https://avatars.githubusercontent.com/u/53965821?v=4"
                                }
                                className="w-[100px] rounded-full border-[1px] border-solid"
                              />
                            </div>
                            <div>
                              <h1 className=" mx-[20px] truncate ">
                                {user.username}
                              </h1>
                            </div>
                          </div>
                          <div className="flex">
                            <div className="flex   items-center">
                              <div className="mx-[35px]">
                                {!user.evaluated ? (
                                  <MdRemoveDone className="text-[40px]" />
                                ) : (
                                  <MdOutlineDoneAll className="text-[40px]" />
                                )}
                              </div>
                            </div>
                            {/* <div className="flex flex-col  items-center ml-[10px]  w-[20px] ">
                              <div className="">
                                {" "}
                                <RxLapTimer />
                              </div>
                              <div className="text-[18px]">
                                {user.timeComplexity}
                              </div>
                            </div>
                            <div className="flex flex-col items-center mx-[40px]">
                              <div>
                                <FaMemory />
                              </div>
                              <div className="text-[18px]">
                                {user.spaceComplexity}
                              </div>
                            </div> */}
                            <div
                              className={`  ${
                                user.isGoodCandidate
                                  ? "hover:bg-[#E5FFDD]"
                                  : "hover:bg-[#FFF8F8]"
                              } hover:text-black-800 hover:border-gray-400 mr-[30px] flex items-center border-[1px] border-solid px-[5px] rounded-lg border-black`}
                              onClick={(e) =>
                                handleRecruit(
                                  e,
                                  user.email,
                                  user.role,
                                  user.level
                                )
                              }
                            >
                              <div className="mx-[10px]" onClick={(e) => {}}>
                                <button> Recruit </button>
                              </div>
                              {/* <FaArrowRight /> */}
                            </div>
                            <div
                              className={`  ${
                                user.isGoodCandidate
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
                            </div>
                          </div>
                        </div>
                        {userIndex == userDetails.currentActiveIndex && (
                          <div className="mx-[20px] my-[10px] border-[1px] border-solid border-black">
                            <div>
                              <div className="mx-[4%]  my-[5%] p-[5px]">
                                <div className="p-[30px] text-[40px] border-[1px] border-black border-solid">
                                  {question}
                                </div>
                              </div>
                              <div className="mx-[4%]  my-[5%] p-[5px]">
                                {user.answers.map((answer, index) => {
                                  console.log(answer);
                                  return (
                                    index === userDetails.currentPage && (
                                      <CodeEditor key={index} hint={answer} />
                                    )
                                  );
                                })}
                              </div>
                            </div>
                            <Buttons
                              next={handleUpdateRecNextQuestion}
                              prev={handleUpdateRecPrevQuestion}
                              questionNumber={userDetails.currentPage}
                            />
                          </div>
                        )}
                      </div>
                      {/* {user.expand && <div className="flex"> hello </div>} */}
                    </div>
                    {/* <div>Button</div> */}
                  </div>
                );
              })}
            </>
          )}
        </div>
        {roleLength == 0 && (
          <div className="mt-[40px] mb-[1000px] mx-auto text-center w-full max-w-[90%]  border-[1px] border-solid border-black text-[26px] p-[20px]">
            {" "}
            Please, Initiate your coding challenge.
          </div>
        )}
      </div>
    </>
  );
};

export default RectruiterRole;
{
  /* <div className="text-center w-full max-w-[90%] mx-auto mt-[10%] border-[1px] border-solid border-black text-[26px] p-[20px]">
          {" "}
          The Model is not yet evaluated
        </div> */
}
