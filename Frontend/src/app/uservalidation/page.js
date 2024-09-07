"use client";
import React, { useState } from "react";
import { GiLevelEndFlag } from "react-icons/gi";
import { LuFileCode } from "react-icons/lu";
import axios from "axios";
import { GiLevelCrossing } from "react-icons/gi";
import Select from "react-select";
import Navigation from "@/components/Navigation";
import { useSelector } from "react-redux";
const Page = () => {
  const options = [
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "asp_net", label: "Dotnet" },
    { value: "ejs", label: "Nodejs" },
    { value: "vue", label: "Vue" },
    { value: "typescript", label: "Typescript" },
    { value: "javascript", label: "Javascript" },
  ];
  const jobOptions = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];
  const [selected, setSelected] = useState(null);
  const [userName, setUserName] = useState(null);
  const [imageUrl, setImageUrl] = useState(
    "https://avatars.githubusercontent.com/u/53965821?v=4"
  );
  const [warningMessage, setWarningMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [predictedRole, setPredictedRole] = useState(null);
  const [currentJobLevel, setCurrentJobLevel] = useState(null);
  const [predictedEmail, setPredictedEmail] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [mailSent, setMailSent] = useState(false);

  const globalDetails = useSelector((state) => state.globalDetails);
  // const [number, setNumber] = useState(5);
  const [number, setNumber] = useState(5);
  const [jobLevel, setJobLevel] = useState();

  const handleCheckUser = async () => {
    if (selectedOption && userName) {
      setJobLevel(null);
      var myArray = [1, 2, 3, 4, 5];
      var index = 0;

      var intervalId = setInterval(() => {
        if (index >= myArray.length) {
          clearInterval(intervalId);
          return;
        }

        var dots = ".".repeat(myArray[index]);
        console.log(index);
        console.log(dots);
        setSuccess(true);
        setWarningMessage("Fetching Data and Evaluting" + dots);

        index++;
      }, 1000);

      const response = await axios.get(
        globalDetails.postgresBackend + "getsingleuser",

        {
          headers: {
            "Content-Type": "application/json",
            userName,
            jobRole: selectedOption["value"],
          },
        }
      );
      if (response.data["user_role"]) {
        console.log(response.data["all_user_info"]);
        setWarningMessage("Model Evaluated Successfully.");
        setJobLevel(response.data["user_role"]);
        setNumber(response.data["number_of_lines"]);
        setPredictedRole(response.data["user_role"]);
        setImageUrl(response.data["avatar_url"]);
        setPredictedEmail(response.data["email_id"]);
        setUserInfo(response.data["all_user_info"]);
      } else {
        setSuccess(false);
        setWarningMessage("Please enter the correct username");
      }
    }
  };
  return (
    <div>
      <Navigation currentPage="uservalidation" />
      <div
        className="w-full max-w-[70%] mx-auto mt-[10%] border-[1px] my-[200px]"
        style={{ fontFamily: "Ubuntu, sans-serif" }}
      >
        <div className="w-full mx-auto  border-[1px] border-solid border-black">
          <h1
            className="text-center text-[40px] my-[35px] font-semibold "
            style={{ fontFamily: "Varela Round, sans-serif" }}
          >
            User Validation
          </h1>

          <div className="w-[70%] flex mx-auto my-[30px] justify-center items-center border-[1px] border-solid border-gray rounded">
            {" "}
            <div className="w-[70%] my-[30px] ">
              <h1 className="text-[26px] my-[20px]">
                {" "}
                Enter the Github Username
              </h1>
              <input
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                type="text"
                className="px-[10px] w-full h-[40px] border-[1px] border-solid border-gray"
              />
              <h1 className="text-[26px] my-[20px]"> Select a Job Role</h1>
              <Select
                onChange={setSelectedOption}
                options={options}
                className=""
              />
              <h1 className="text-[26px] my-[20px]"> Select a Level</h1>
              <Select
                defaultValue={currentJobLevel}
                onChange={setCurrentJobLevel}
                options={jobOptions}
                className=""
              />
              <div
                className=" bg-[#c6ffb3] rounded-lg border-[1px] border-solid border-gray inline px-[20px] py-[10px]"
                onClick={handleCheckUser}
              >
                <button className="my-[20px] text-[20px] py-[20px]">
                  Evaluate
                </button>
              </div>
              <div
                className=" mx-[20px] bg-[#c6ffb3] rounded-lg border-[1px] border-solid border-gray inline px-[20px] py-[10px]"
                onClick={() => {
                  setSelectedOption("");
                  setJobLevel("");
                  setUserName("");
                  setWarningMessage();
                }}
              >
                <button className="text-[20px] py-[20px]">Clear</button>
              </div>
            </div>
          </div>
          <div>
            {warningMessage && (
              <div
                className={`text-center text-[26px] my-[20px] ${
                  success ? "text-[green]" : "text-[red]"
                }`}
              >
                {warningMessage}
              </div>
            )}
          </div>
          {jobLevel && (
            <div className="w-full max-w-[85%] mx-auto my-[70px]">
              <div
                className={`mx-[20px] ${
                  currentJobLevel.value == predictedRole.toLowerCase()
                    ? "bg-[#c6ffb3]"
                    : "bg-[#ffb3b3]"
                } flex items-center justify-between border-[1px] border-solid border-black`}
              >
                {" "}
                <div className="w-full ">
                  <div className="flex justify-between items-center">
                    <div className="flex inline items-center">
                      <div className="p-[20px] ">
                        <img
                          alt="profile picture"
                          src={imageUrl}
                          className="w-[100px] rounded-full border-[1px] border-solid"
                        />
                      </div>
                      <div>
                        <h1 className=" mx-[20px] truncate text-[26px]">
                          {userName}
                        </h1>
                      </div>
                    </div>
                    <div className="flex justify-between items-center px-[20px] mr-[30px]">
                      <div className="px-[20px] py-[10px] flex flex-col items-center text-[25px] mr-[20px] border-[1px] border-solid border-[gray] rounded-lg">
                        <p className="my-[6px]">
                          <LuFileCode />
                        </p>
                        <p className="text-[20px]">{number}</p>
                      </div>
                      <div className="px-[20px] py-[10px] flex flex-col items-center text-[25px] mr-[20px] border-[1px] border-solid border-[gray]  rounded-lg">
                        <p className="my-[6px]">
                          <GiLevelEndFlag />
                        </p>
                        <p className="text-[20px]">{jobLevel}</p>
                      </div>
                      <div
                        className="ml-[30px] flex items-center border-[1px] border-solid px-[5px] rounded-lg border-black"
                        onClick={(e) => {
                          const postData = async () => {
                            await axios.post(
                              globalDetails.postgresBackend +
                                "send_mail_to_user_selected",
                              {
                                userInfo: userInfo,
                                jobRole: selectedOption["value"],
                                level: jobLevel.toLowerCase(),
                                username: userName,
                              },
                              {
                                headers: {
                                  "Content-Type": "application/json",
                                  "Access-Control-Allow-Origin": "*",
                                },
                              }
                            );
                          };
                          const response = postData();
                          setMailSent(true);
                          setTimeout(function () {
                            setMailSent(false);
                          }, 5000);
                        }}
                      >
                        <div className="mx-[10px] text-[24px]">
                          <button> Send Mail </button>
                        </div>
                        {mailSent && (
                          <div className="border-[1px] border-solid border-[gray] z-1 absolute my-[20px] bg-white top-[98%] left-[25%] w-[50%] h-[20%] flex justify-center items-center border-gray rounded-lg border-[1px] border-solid">
                            <h1 className="text-[35px] inline text-center text-[green] ">
                              {" "}
                              Successfully sent the mail! to {predictedEmail}
                            </h1>
                          </div>
                        )}
                        {/* <FaArrowRight /> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* {user.expand && <div className="flex"> hello </div>} */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
