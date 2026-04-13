import React, { useRef } from "react";
import { useTaskFormContext } from "../../Windows/TasksWindow";
import PriorityListComponent from "./PriorityListComponent";
import ProjectsListComponent from "./ProjectsListComponent";

export default function TasksDropDown() {
    const { clickedSelection, tasksDropDownPositions, openTasksDropDown } = useTaskFormContext();

    const menuRef = useRef<HTMLDivElement>(null);

    let updatedRightPos = 0;
    let updatedLeftPos = 0;

    if (clickedSelection) {
        if (clickedSelection === "priority") {
            updatedRightPos = 0;
            updatedLeftPos = 40;
        } else {
            updatedRightPos = 40;
            updatedLeftPos = 0;
        }
    }

    const dropDownToggle = openTasksDropDown ? "" : "hidden";

    return (
        <div
            ref={menuRef}
            style={{
                left: clickedSelection === "priority" ? updatedLeftPos : "auto",
                right: clickedSelection === "priority" ? "auto" : updatedRightPos,
                top: tasksDropDownPositions.top - 49,
                width: tasksDropDownPositions.width,
            }}
            className={` ${dropDownToggle} bg-white absolute p-3 z-[90] border
            border-slate-50 select-none shadow-md rounded-lg flex flex-col gap-2  `}
        >
            { clickedSelection === "priority" ? (
                <PriorityListComponent />
            ) : (
                <ProjectsListComponent />
            )}
        </div>
    );
}