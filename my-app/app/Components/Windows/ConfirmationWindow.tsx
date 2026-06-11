"use client";
import React, { useEffect, useState } from "react";
import { useContextApp } from "@/app/contextApp";
import toast from "react-hot-toast";

function ConfirmationWindow() {
  const {
    openConfirmationWindowObject: {
      openConfirmationWindow,
      setOpenConfirmationWindow,
    },
    selectedProjectObject: { selectedProject, setSelectedProject },
    selectedTaskObject: { selectedTask, setSelectedTask },
    allProjectsObject: { allProjects, setAllProjects },
    allTasksObject: { allTasks, setAllTasks },
    chosenProjectObject: { chosenProject, setChosenProject },
  } = useContextApp();

  const [loading, setLoading] = useState(false);
  const [header, setHeader] = useState("");
  const [message, setMessage] = useState("");

  function closeConfirmationWindow() {
    setOpenConfirmationWindow(false);
    setSelectedProject(null);
    setSelectedTask(null);
  }

  async function deleteFunction() {
    const deletionType = selectedProject ? "Project" : selectedTask ? "Task" : "";

    if (!deletionType) {
      return;
    }

    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (selectedProject) {
        const updatedProjects = allProjects.filter(
          (project) => project.id !== selectedProject.id
        );
        const updatedAllTasks = updatedProjects.flatMap((project) => project.tasks);

        setAllProjects(updatedProjects);
        setAllTasks(updatedAllTasks);

        if (chosenProject?.id === selectedProject.id) {
          setChosenProject(null);
        }
      } else if (selectedTask) {
        const updatedProjects = allProjects.map((project) => ({
          ...project,
          tasks: project.tasks.filter((task) => task.id !== selectedTask.id),
        }));

        const updatedAllTasks = updatedProjects.flatMap((project) => project.tasks);

        setAllProjects(updatedProjects);
        setAllTasks(updatedAllTasks);

        if (
          chosenProject &&
          chosenProject.tasks.some((task) => task.id === selectedTask.id)
        ) {
          setChosenProject({
            ...chosenProject,
            tasks: chosenProject.tasks.filter((task) => task.id !== selectedTask.id),
          });
        }
      }

      toast.success(`${deletionType} deleted successfully.`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setOpenConfirmationWindow(false);
      setSelectedProject(null);
      setSelectedTask(null);
    }
  }


  useEffect(() => {
    if (selectedProject) {
      setHeader("Project");
      setMessage(
        "Are you sure you want to delete the project? This action cannot be undone and will remove all tasks associated with it."
      );
    } else if (selectedTask) {
      setHeader("Task");
      setMessage(
        "Are you sure you want to delete the task? This action cannot be undone."
      );
    } else {
      setHeader("");
      setMessage("");
    }
  }, [openConfirmationWindow, selectedProject, selectedTask]);

  return (
    <div
      className={`${openConfirmationWindow ? "block" : "hidden"}
        w-[38%] bg-white max-sm:w-[91%] max-lg:w-[80%] p-6 fixed shadow-md
        z-[90] rounded-lg top-[30%] left-1/2 -translate-x-1/2`}
    >
      <div className="rounded-lg p-6">
        <h2 className="text-xl font-bold mb-5">Delete {header}</h2>
        <p className="text-gray-600 mb-4 text-sm">
          {message}
        </p>
        <div className="flex justify-end gap-2 mt-10 text-[13px]">
          <button
            onClick={closeConfirmationWindow}
            disabled={loading}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={deleteFunction}
            disabled={loading}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-white disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationWindow;