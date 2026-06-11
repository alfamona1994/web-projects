"use client";

import React, { useState } from "react";
import { Project, Task } from "@/app/Pages/types/AppType";  // ✅ added Project import
import { getIconComponent } from "@/app/functions/IconsActions";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useContextApp } from "@/app/contextApp";

interface SingleTaskProps {
  task: Task;
}

const SingleTask = ({ task }: SingleTaskProps) => {
  const IconComponent = getIconComponent(task.icon);

  // ✅ All context at the top level — no nested component
  const {
    selectedTaskObject: { setSelectedTask },
    openTasksWindowObject: { setOpenTasksWindow },
    openConfirmationWindowObject: { setOpenConfirmationWindow },
    allProjectsObject: { allProjects, setAllProjects },
    allTasksObject: { allTasks, setAllTasks },
    chosenProjectObject: { chosenProject, setChosenProject },
  } = useContextApp();

  // ✅ Fixed: was "const [checked, setChecked] = useContextApp()" — that's completely wrong
  const [checked, setChecked] = useState<boolean>(task.status === "Completed");

  const priorityColors: Record<string, string> = {
    Low: "text-green-500",
    Medium: "text-yellow-500",
    High: "text-red-500",
  };

  const priorityBgColors: Record<string, string> = {
    Low: "bg-green-100",
    Medium: "bg-yellow-100",
    High: "bg-red-100",
  };

  const isCompleted = task.status === "Completed";

  // ✅ Fixed: renamed updateStatus consistently, fixed broken arrow function syntax in .map()
  function updateStatus() {
    const newStatus: "In Progress" | "Completed" = checked ? "In Progress" : "Completed";

    // Update allProjects
    const updatedProjects: Project[] = allProjects.map((project) => ({
      ...project,
      tasks: project.tasks.map((t) =>
        t.id === task.id ? { ...t, status: newStatus } : t
      ),
    }));

    // Update allTasks
    const updatedAllTasks: Task[] = allTasks.map((t) =>
      t.id === task.id ? { ...t, status: newStatus } : t
    );

    // Update chosenProject if it exists
    if (chosenProject) {
      const updatedChosenProject: Project = {
        ...chosenProject,
        tasks: chosenProject.tasks.map((t) =>  // ✅ Fixed: was broken with "return" in wrong place
          t.id === task.id ? { ...t, status: newStatus } : t
        ),
      };
      setChosenProject(updatedChosenProject);
    }

    // Update all state
    setAllProjects(updatedProjects);
    setAllTasks(updatedAllTasks);
    setChecked(!checked);
  }

  return (
    <div className="flex items-center gap-4 p-3 bg-white rounded-md border border-slate-200 hover:shadow-md transition-shadow">
      
      {/* ✅ Fixed: CheckBoxIcon sx prop was broken object syntax, removed invalid "checked" prop */}
      <button onClick={updateStatus} className="flex-shrink-0">
        {checked ? (
          <CheckBoxIcon
            sx={{ color: "orangered" }}
            className="cursor-pointer"
          />
        ) : (
          <CheckBoxOutlineBlankIcon
            className="text-slate-400 cursor-pointer"
          />
        )}
      </button>

      {/* Task Icon */}
      <div className="flex-shrink-0 text-slate-500">
        {IconComponent}
      </div>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${isCompleted ? "line-through text-slate-400" : "text-slate-800"}`}>
          {task.title}
        </p>
        <p className="text-xs text-slate-500 mt-1">{task.projectName}</p>
      </div>

      {/* Priority Badge */}
      <div className={`flex-shrink-0 px-2 py-1 rounded text-xs font-medium ${priorityBgColors[task.priority]} ${priorityColors[task.priority]}`}>
        {task.priority}
      </div>

      {/* Action Buttons */}
      <div className="flex-shrink-0 flex gap-2">
        <button
          onClick={() => {
            setSelectedTask(task);
            setOpenTasksWindow(true);
          }}
          className="p-2 rounded-lg bg-orange-100 hover:bg-orange-200 transition-colors flex items-center justify-center"
        >
          <EditOutlinedIcon sx={{ fontSize: 18 }} className="text-orange-600" />
        </button>

        <button
          onClick={() => {
            setSelectedTask(task);
            setOpenConfirmationWindow(true);
          }}
          className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition-colors flex items-center justify-center"
        >
          <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} className="text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default SingleTask;