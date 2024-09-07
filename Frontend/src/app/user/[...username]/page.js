"use client";
import React, { useEffect, useState } from "react";
import Timer from "@/components/Timer";
import Buttons from "@/components/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import {
  handleChallengeDataFetch,
  handleUpdateUserAcceptedTime,
} from "@/Redux/Features/challengeDetails";
import {
  handleUpdateNextQuestion,
  handleUpdatePrevQuestion,
  handleOutputUpdate,
} from "@/Redux/Features/globalDetails";
import CodingPage from "@/components/CodingPage";
// import { handleOutputUpdate } from "@/Redux/Features/globalDetails";
const UserName = ({ params: { username } }) => {
  const [name, role] = username;
  const [isChecked, setIsChecked] = useState(false);
  const globalDetails = useSelector((state) => state.globalDetails);
  const challengeDetails = useSelector((state) => state.challengeDetails.value);
  const [validation, setValidation] = useState(false);
  const [acceptedTime, setAcceptedTime] = useState(new Date());

  // const completed = challengeDetails.completed;

  const [time, setTimer] = useState();

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const dispatch = useDispatch();

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
        console.log(user_data, "userdata");
        if (!user_data.iscompleted) {
          setValidation(true);
          console.log("insidet the status", user_data["data"]);
          dispatch(handleChallengeDataFetch(user_data["data"]));
          const data = await axios.post(
            globalDetails.redisBackend + "createfolder",
            {
              name,
              role,
              level: user_data["data"].level,
            },
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );

          const differenceInSeconds = (difference / 60 / 1000) * 60;
          if (differenceInSeconds <= 1) {
            const autoSubmit = async () => {
              const data = await axios.post(
                globalDetails.postgresBackend + "submit_results",
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
              dispatch(handleUpdateUserCompleted());
            };
            autoSubmit();
          }
        } else {
          dispatch(handleUpdateUserCompleted());
        }
      } catch (error) {}
    };

    fetchData();
  }, []);
  const handleSubmit = () => {
    if (isChecked) {
      const currentTime = new Date();

      setAcceptedTime(currentTime);
      console.log("submitted");
      // dispatch(handleUpdateUserAcceptedTime(currentTime));
      axios.post(
        globalDetails.redisBackend + "acceptedtime",
        {
          userName: name,
          acceptedTime: currentTime,
          role,
          expiration: globalDetails.expiration,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      dispatch(handleUpdateUserAcceptedTime(currentTime));
    } else {
      alert("Please accept the terms and conditions to proceed.");
    }
  };

  return (
    <div className="w-full max-w-[80%] mx-auto mt-[20%] border-[1px] border-solid border-black  mb-[1000px]">
      {" "}
      {validation ? (
        <div className="w-full px-[30px] py-[10px] ">
          {!challengeDetails.isaccepted && (
            <div className={`${challengeDetails.isaccepted && "hidden"}`}>
              <h1 className="text-center text-[30px] my-[50px] font-bold ">
                Welcome to Hush Hush Recruitment
              </h1>

              <h3 className="text-[20px] font-semibold my-[20px]">
                Greetings, Aspiring Programmer!
              </h3>
              <div className="scroll-smooth">
                <div className="">
                  <p className="py-[10px] mb-[20px]">
                    You are about to embark on a journey that will test your
                    coding skills and showcase your problem-solving abilities.
                    This coding test is designed to evaluate your proficiency in
                    computer programming across various levels of experience.
                    Whether you are just starting out or you have been coding
                    for years, this test offers challenges that cater to your
                    level of expertise.
                  </p>
                </div>
                <h1 className="text-[20px] font-semibold my-[20px]">
                  Test Details
                </h1>
                <div className="my-[20px]">
                  <p>
                    <strong>Duration:</strong> {globalDetails.expiration}{" "}
                    Minutes
                  </p>
                  <p>
                    <strong>Challenges:</strong> 3 Coding
                  </p>
                  <p>
                    <strong>Challenges Levels:</strong> Beginner, Intermediate,
                    Advanced
                  </p>
                  <p>
                    <strong> Evaluation Criteria: </strong> Correctness
                  </p>
                </div>

                <h3 className="text-[20px] font-semibold my-[20px]">
                  Test Instructions
                </h3>
                <div>
                  <ul className="list-disc list-inside">
                    <li>
                      You will have 30 minutes to complete all 3 coding
                      challenges.
                    </li>
                    <li>
                      Each challenge has 3 correct possible answers that your
                      solution needs to pass. These pertain to different
                      approaches you can take, considering the efficiency and
                      scalability of your solution.
                    </li>
                    <li>
                      Scores will be assigned based on the correctness of your
                      solution and how well it optimizes for time and space
                      complexity.
                    </li>
                    <li>
                      Read each question carefully before you start coding.
                    </li>
                    <li>
                      You can use any programming language you are comfortable
                      with unless a specific language is required by the
                      challenge.
                    </li>
                    <li>
                      Ensure your code is clean, well-commented, and follows
                      standard coding practices.
                    </li>
                    <li>
                      Please <span className="font-semibold">submit </span> your
                      answers{" "}
                      <span className="font-semibold">
                        before the time expires &nbsp;
                      </span>
                      otherwise, they will be{" "}
                      <span className="font-semibold">
                        automatically submitted
                      </span>
                      .
                    </li>
                  </ul>
                </div>
                <p className="my-[20px]">
                  Please make sure you have a{" "}
                  <span className="font-semibold">
                    stable internet connection &nbsp;
                  </span>
                  throughout the test to{" "}
                  <span className="font-semibold">avoid any disruptions</span>.
                  If you encounter any technical issues, please contact support
                  immediately for assistance.
                </p>
                <p className="my-[10px] font-semibold">
                  Please read and accept the terms and conditions above to
                  proceed:
                </p>
                <p>
                  We emphasize data security by stating that your data is
                  securely protected.
                </p>
              </div>

              <div className="flex mb-[10px]">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <p className="mx-[10px]"> I accept the terms and conditions</p>
              </div>
              <button
                onClick={handleSubmit}
                className="border-[1px] border-solid border-gray bg-[#66B96A] rounded-lg px-[30px] py-[15px] hover:bg-[#B0D5B3] hover:text-black-800 hover:border-gray-400"
              >
                Proceed
              </button>
            </div>
          )}
          {!challengeDetails.iscompleted && challengeDetails.isaccepted && (
            <div className="w-full mx-auto mt-[10%] border-[1px] border-solid border-black">
              {
                <>
                  <Timer timerSec={time} username={username} />

                  <Buttons
                    next={handleUpdateNextQuestion}
                    prev={handleUpdatePrevQuestion}
                    questionNumber={globalDetails.question}
                    name={name}
                    role={role}
                  />
                </>
              }
            </div>
          )}
          {challengeDetails.iscompleted && challengeDetails.isaccepted && (
            <div className="">
              {" "}
              <p className="text-[20px] py-[20px] text-center ">
                Unauthorized user! Please contact the admin
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="">
          {" "}
          <p className="text-[20px] py-[20px] text-center ">
            Unauthorized user! Please contact the admin
          </p>
        </div>
      )}
      {/* <WelcomePage username={username} /> */}
      {/* <div className="w-full px-[30px] py-[10px] ">
        {!challengeDetails.isaccepted && (
          <div className={`${challengeDetails.isaccepted && "hidden"}`}>
            <h1 className="text-center text-[30px] my-[50px] font-bold ">
              Welcome to Hush Hush Recruitment
            </h1>

            <h3 className="text-[20px] font-semibold my-[20px]">
              Greetings, Aspiring Programmer!
            </h3>
            <div className="scroll-smooth">
              <div className="">
                <p className="py-[10px] mb-[20px]">
                  You are about to embark on a journey that will test your
                  coding skills and showcase your problem-solving abilities.
                  This coding test is designed to evaluate your proficiency in
                  computer programming across various levels of experience.
                  Whether you are just starting out or you have been coding for
                  years, this test offers challenges that cater to your level of
                  expertise.
                </p>
              </div>
              <h1 className="text-[20px] font-semibold my-[20px]">
                Test Details
              </h1>
              <div className="my-[20px]">
                <p>
                  <strong>Duration:</strong> {globalDetails.expiration} Minutes
                </p>
                <p>
                  <strong>Challenges:</strong> 3 Coding
                </p>
                <p>
                  <strong>Challenges Levels:</strong> Beginner, Intermediate,
                  Advanced
                </p>
                <p>
                  <strong> Evaluation Criteria: </strong> Correctness
                </p>
              </div>

              <h3 className="text-[20px] font-semibold my-[20px]">
                Test Instructions
              </h3>
              <div>
                <ul className="list-disc list-inside">
                  <li>
                    You will have 30 minutes to complete all 3 coding
                    challenges.
                  </li>
                  <li>
                    Each challenge has 3 correct possible answers that your
                    solution needs to pass. These pertain to different
                    approaches you can take, considering the efficiency and
                    scalability of your solution.
                  </li>
                  <li>
                    Scores will be assigned based on the correctness of your
                    solution and how well it optimizes for time and space
                    complexity.
                  </li>
                  <li>Read each question carefully before you start coding.</li>
                  <li>
                    You can use any programming language you are comfortable
                    with unless a specific language is required by the
                    challenge.
                  </li>
                  <li>
                    Ensure your code is clean, well-commented, and follows
                    standard coding practices.
                  </li>
                  <li>
                    Please <span className="font-semibold">submit </span> your
                    answers{" "}
                    <span className="font-semibold">
                      before the time expires &nbsp;
                    </span>
                    otherwise, they will be{" "}
                    <span className="font-semibold">
                      automatically submitted
                    </span>
                    .
                  </li>
                </ul>
              </div>
              <p className="my-[20px]">
                Please make sure you have a{" "}
                <span className="font-semibold">
                  stable internet connection &nbsp;
                </span>
                throughout the test to{" "}
                <span className="font-semibold">avoid any disruptions</span>. If
                you encounter any technical issues, please contact support
                immediately for assistance.
              </p>
              <p className="my-[10px] font-semibold">
                Please read and accept the terms and conditions above to
                proceed:
              </p>
              <p>
                We emphasize data security by stating that your data is securely
                protected.
              </p>
            </div>

            <div className="flex mb-[10px]">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <p className="mx-[10px]"> I accept the terms and conditions</p>
            </div>
            <button
              onClick={handleSubmit}
              className="border-[1px] border-solid border-gray bg-[#66B96A] rounded-lg px-[30px] py-[15px] hover:bg-[#B0D5B3] hover:text-black-800 hover:border-gray-400"
            >
              Proceed
            </button>
          </div>
        )}
        {!challengeDetails.iscompleted && challengeDetails.isaccepted && (
          <div className="w-full mx-auto mt-[10%] border-[1px] border-solid border-black">
            {
              <>
                <Timer timerSec={time} username={username} />

                <Buttons
                  next={handleUpdateNextQuestion}
                  prev={handleUpdatePrevQuestion}
                  questionNumber={globalDetails.question}
                  name={name}
                  role={role}
                />
              </>
            }
          </div>
        )}
        {challengeDetails.iscompleted && challengeDetails.isaccepted && (
          <div className="">
            {" "}
            <p className="text-[20px] py-[20px] text-center ">
              Unauthorized user! Please contact the admin
            </p>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default UserName;
