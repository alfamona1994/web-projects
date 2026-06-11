"use client";
import React from "react";
import AppsIcon from "@mui/icons-material/Apps";
import CloseIcon from "@mui/icons-material/Close";
import AllIcons from "@/app/Data/AllIcons";
import { useContextApp } from "@/app/contextApp";

function IconsWindow() {
  const {
    openIconWindowObject: { openIconWindow, setOpenIconWindow },
  } = useContextApp();

  return (
    <div
      className={`${openIconWindow ? "block" : "hidden"} 
      fixed p-3 h-[530px] w-[50%] max-sm:w-[90%] bg-white shadow-md 
      left-1/2 top-28 rounded-lg -translate-x-1/2 z-[100]`}
    >
      <Header setOpenIconWindow={setOpenIconWindow} />
      <span className="mx-8 text-[13px] mt-12 text-slate-400">
        Please select an icon from the list below to represent your project.
      </span>
      <IconsArea />
    </div>
  );
}

function Header({ setOpenIconWindow }: { setOpenIconWindow: (val: boolean) => void }) {
  return (
    <div className="flex justify-between items-center p-7 px-7 mb-8">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-orange-200 rounded-lg flex items-center justify-center">
          <AppsIcon sx={{ fontSize: "21px" }} className="text-orange-600 cursor-pointer" />
        </div>
        <span className="font-semibold text-lg">Select Icon</span>
      </div>
      <CloseIcon
        sx={{ fontSize: "18px" }}
        className="text-slate-300 cursor-pointer"
        onClick={() => setOpenIconWindow(false)}
      />
    </div>
  );
}

function IconsArea() {
  return (
    <div className="w-full flex flex-col items-center mt-3">
      <div className="border border-slate-100 w-[92%] h-[330px] overflow-auto rounded-md bg-slate-100 p-3">
        <AllIcons />
      </div>
    </div>
  );
}

export default IconsWindow;