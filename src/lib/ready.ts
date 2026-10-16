import { createContext, useContext } from "react";

/** True once the preloader curtain has opened — gates hero animations & counters. */
export const ReadyContext = createContext(true);
export const useReady = () => useContext(ReadyContext);

export const container = "mx-auto w-full max-w-[1500px] px-6 lg:px-[4.5%]";
export const EASE = [0.22, 1, 0.36, 1] as const;
