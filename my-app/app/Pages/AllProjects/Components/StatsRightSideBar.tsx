import React from "react";

import SplitscreenIcon from "@mui/icons-material/Splitscreen";

function StatsRightSideBar() {
    return (
        <div className=" w-[22%] flex justify-end items-center max-lg:hidden">
            { /* White background */}
            <div className="h-[92%] w-[94%] bg-white rounded-l-3xl p-3 flex flex-col ">
                { /* Header */}
                <Header />
                { /* Circular Chart and the labels */}
                <div className="flex flex-col gap-11 items-center justify-center mt-6 ">
                    <CircularChart />
                    <ProjectsCompletedLabels />
                </div>
                { /* Projects List */ }
                <ProjectsList />
            </div>
        </div>
    );

    function Header() {
        return (
            <h2 className="text-[22px] font-bold text-center mt-7 ">
                Projects Completed
            </h2>
        );
    }

    function CircularChart() {
        return (
            <div className="flex justify-center items-center">
                <div
                    className=" w-40 h-40 bg-slate-100 mt-5 rounded-full flex
                    items-center justify-center" 
                >
                    <div
                        className="w-[86%] flex justify-center items-center h-[86%]
                        bg-white rounded-full"
                    >
                        <span className="text-xl font-semibold text-orange-600">90%</span>
                    </div>
                </div>
            </div>
        );
    }

    function ProjectsCompletedLabels() {
        return(
            <div className="flex justify-center flex-col gap-1 items-center">
                <p className="font-bold text-[17px]">3 Completed</p>
                <p className="text-[13px] text-slate-400">20 Tasks done</p>
            </div>
        );
    }

    function ProjectsList() {
        return (
            <ul className=" flex flex-col gap-3 mt-16 mx-4 overflow-auto ">
                <SingleProject />

                <hr className="w-[80%] mx-auto text-slate-100 opacity-50"></hr>

                <SingleProject />
                <hr className="w-[80%] mx-auto text-slate-100 opacity-50"></hr>

                <SingleProject />
            </ul>
        );
    }

    function SingleProject() {
        return(
            <li className="p-3 flex gap-2 items-center">
                <div className="w-8 h-8 bg-orange-600 rounded-md justify-center items-center flex 
                text-slate-100">
                    <SplitscreenIcon sx={{ fontSize: "19px" }} />
                </div>

                <ul>
                    <li className="text-[14px] font-semibold">Project 1</li>
                    <li className="text-[12px] text-slate-400">3 Tasks</li>
                </ul>
            </li>
        );
    }
}

export default StatsRightSideBar;