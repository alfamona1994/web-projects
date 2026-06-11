"use client";

import React, { useRef } from "react";
import { useTaskFormContext } from "../Windows/TasksWindow";
import PriorityListComponent from "./TasksDropDown/PriorityListComponent";
import ProjectsListComponent from "./TasksDropDown/ProjectsListComponent";

export default function TasksDropDown() {
  const {
    clickedSelection,
    tasksDropDownPositions,
    openTasksDropDown,
  } = useTaskFormContext();

  const menuRef = useRef<HTMLDivElement>(null);

  let updatedRightPos = 0;
  let updatedLeftPos = 0;

  if (clickedSelection === "priority") {
    updatedLeftPos = 40;
  } else if (clickedSelection === "project") {
    updatedRightPos = 40;
  }

  const dropDownToggle = openTasksDropDown ? "" : "hidden";

  return (
    <div
      ref={menuRef}
      style={{
        left: clickedSelection === "priority" ? updatedLeftPos : "auto",
        right: clickedSelection === "priority" ? "auto" : updatedRightPos,
        top: tasksDropDownPositions.top
          ? tasksDropDownPositions.top - 49
          : 0,
        width: tasksDropDownPositions.width,
      }}
      className={`${dropDownToggle} bg-white absolute p-3 z-[70] border
      border-slate-50 select-none shadow-md rounded-lg flex flex-col gap-2`}
    >
      {clickedSelection === "priority" ? (
        <PriorityListComponent />
      ) : (
        <ProjectsListComponent />
      )}
    </div>
  );
}