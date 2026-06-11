"use client";

import React from "react";
import AllProjectsSection from "./Components/AllProjectsSection";
import ProjectsHeader from "./Components/ProjectsHeader";
import ProjectsSubHeader from "./Components/ProjectsSubHeader";
import StatsRightSideBar from "./Components/StatsRightSideBar";
import SortingDropDown from "@/app/Components/DropDowns/SortingDropDown"; // ✅ add this import

function AllProjects() {
    return (
        <div className="bg-slate-50 w-full flex-grow overflow-auto flex">
            <AllProjectsArea />
            <StatsRightSideBar />
        </div>
    );

    function AllProjectsArea() {
        return (
            <div className="w-[78%] p-10 flex flex-col gap-3">
                <ProjectsHeader />
                <ProjectsSubHeader />
                <SortingDropDown /> {/* ✅ add this */}
                <AllProjectsSection />
            </div>
        )
    }
}

export default AllProjects;