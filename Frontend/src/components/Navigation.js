"use client";
import { FaCaretDown } from "react-icons/fa";
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navigation = ({ currentPage }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="mt-[20px] ">
      <div className="flex justify-between items-center mt-[30px]">
        <Link href="/" className="text-[35px] font-semibold font-kanit">
          <div className="ml-[250px]">
            {/* <Image
              src="/Logo.png"
              width={100}
              height={100}
              className="rounded rounded-full border-[1px] border-solid border-gray"
            /> */}
          </div>
        </Link>{" "}
        <div className="flex mx-[200px] justify-around text-[30px]">
          {currentPage != "recruiter" && (
            <div className="mx-[30px]">
              <Link
                href="/foodwaste"
                className="text-[35px] font- "
                style={{ fontFamily: "Kanit, sans-serif" }}
              >
                "Waste Not Want Not!"
              </Link>
            </div>
          )}
         
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="mx-[30px] cursor-pointer flex items-center text-[35px] font-"
              style={{ fontFamily: "Kanit, sans-serif" }}
            >
              <Link href="/results">Results </Link>
              
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
