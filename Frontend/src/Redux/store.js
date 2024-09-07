"use client";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import globalOptionsReducer from "./Features/globalDetails";
import userDetailsReducer from "./Features/userDetails";
import challengeReducer from "./Features/challengeDetails";
export const store = configureStore({
  reducer: {
    globalDetails: globalOptionsReducer,
    userDetails: userDetailsReducer,
    challengeDetails: challengeReducer,
  },
});
