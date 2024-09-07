import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleUpdateNextQuestion,
  handleUpdatePrevQuestion,
} from "../Redux/Features/globalDetails";
import { handleUpdateUserCompleted } from "@/Redux/Features/challengeDetails";
import axios from "axios";
const Buttons = ({ next, prev, questionNumber, name, role }) => {
  const dispatch = useDispatch();
  const globalDetails = useSelector((state) => state.globalDetails);
  const challengeDetails = useSelector((state) => state.challengeDetails.value);
  return (
    <div className="flex justify-between text-[25px] mb-[40px] mx-[10px] ">
      <div>
        <button
          className="inline text-[25px] rounded p-[10px] px-[35px] border-solid border-black border-[1px]  hover:bg-gray-100 hover:text-gray-800 hover:border-gray-400 "
          onClick={() => dispatch(prev(questionNumber))}
        >
          {" "}
          Prev
        </button>
      </div>
      <div>
        {globalDetails.question == 2 ? (
          <button
            onClick={async () => {
              const data = await axios.post(
                globalDetails.redisBackend + "submit_results",
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
            }}
            className="inline text-[25px] rounded p-[10px] px-[35px] border-solid border-black border-[1px] hover:bg-gray-100 hover:text-gray-800 hover:border-gray-400 "
          >
            Submit
          </button>
        ) : (
          <button
            onClick={() => {
              let question_number = null;
              if (globalDetails.question >= 1) {
                question_number = globalDetails.question + 1;
              }

              dispatch(next(questionNumber));
            }}
            className="inline text-[25px] rounded p-[10px] px-[35px] border-solid border-black border-[1px] hover:bg-gray-100 hover:text-gray-800 hover:border-gray-400 "
          >
            {" "}
            Next{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default Buttons;
