import React, { useEffect, useState } from "react";

import AppsIcon from "@mui/icons-material/Apps";
import CloseIcon from "@mui/icons-material/Close";
import AllIcons from "@/app/Data/AllIcons";

function IconsWindow() {
    return (
        <div className={`
        } absolute p-3 h-[530px] w-[50px] max-sm:w-[90%] bg-white shadow-md  left-1/2 top-28 rounded-lg translate-x-1/2 z-[60]`}
        >
            { /* Header */}

            <Header />

            <span className="mx-8 text-[13px] mt-12 text-slate-400">
                {'Please select an icon from the list below to represent your project.  '}
            </span>
            { /* All Icons Area */}
            <IconsArea />
        </div>
    );
} 

export default IconsWindow;

function Header() {
    return (
        <div className="flex justify-between items-center p-7 px-7 mb-8">
            <div className="flex items-center gap-2">
                { /* Icons */}
                <div className="p-2 bg-orange-200 rounded-lg flex items-center justify-center">
                    <AppsIcon
                        sx={{ fontSize: "21px" }}
                        className="text-orange-600 cursor-pointer"
                    />
                </div>
                <span className="font-semibold text-lg">Select Icon</span>
            </div>
            <CloseIcon
                sx={{ fontSize: "18px" }}
                className="text-slate-300 cursor-pointer"   />
        </div>
    );
}

function IconsArea() {
    return (
        <div className="w-full flex flex-col items-center mt-3">
            <div className="border border-slate-100 w-[92%] h-[330px] overflow-auto
            rounded-md bg-slate-100 p-3">
                <AllIcons />
            </div>
        </div>
    );
}
        

