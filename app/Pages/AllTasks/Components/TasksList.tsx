"use client";
import React, { useMemo } from "react";
import { useContextApp } from "@/app/contextApp";
import { Task } from "@/app/Pages/types/AppType";
import Tabs from "./Tabs";
import EmptyState from "./EmptyState";
import SingleTask from "./SingleTask";

const TasksList = () => {
  const {
    chosenProjectObject: { chosenProject },
    allProjectsObject: { allProjects },
    tabsOptionsObject: { tabsOptions },
    allTasksObject: { allTasks, setAllTasks },
  } = useContextApp();

  

  const filteredTasks = useMemo(() => {
    let tasks = allTasks;

    if (chosenProject) {
      tasks = tasks.filter((task) => task.projectName === chosenProject.title);
    }

    if (tabsOptions[1].isSelected) {
      tasks = tasks.filter((task) => task.status === "Completed");
    } else {
      tasks = tasks.filter((task) => task.status === "In Progress");
    }

    return tasks;
  }, [chosenProject, tabsOptions, allProjects, allTasks]);

  const isCompletedTab = tabsOptions[1].isSelected;

  if (chosenProject?.tasks.length === 0) {
    return <EmptyState isCompletedTab={isCompletedTab} />;
  }

  return (
    <div className="ml-12 max-sm:ml-0 mt-11 flex-col flex gap-4">
      <Tabs />
      {filteredTasks.length === 0 ? (
        <EmptyState isCompletedTab={isCompletedTab} />
      ) : (
        <div className="flex flex-col w-full overflow-auto gap-4 bg-slate-50">
          {filteredTasks.map((singleTask, index) => (
            <SingleTask key={index} task={singleTask} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksList;