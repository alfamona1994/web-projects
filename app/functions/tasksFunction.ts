import { Project, Task } from "../Pages/types/AppType"; // ✅ Fix: wrong import path
import { Dispatch, SetStateAction } from "react";       // ✅ Fix: import React types properly

// ✅ Fix: Define the missing type here
interface DeleteTaskProps {
    taskToDelete: Task;
    allProjects: Project[];
    chosenProject: Project | null;
    setAllTasks: Dispatch<SetStateAction<Task[]>>;
    setChosenProject: Dispatch<SetStateAction<Project | null>>;
    setAllProjects: (projects: Project[] | ((prev: Project[]) => Project[])) => void;
}

// ✅ Fix: was default export with wrong syntax, missing comma, wrong variable names
export function addNewTask(
    newTask: Task,
    allProjects: Project[],           // ✅ Fix: was Projects[] (typo)
    setAllProjects: (projects: Project[] | ((prev: Project[]) => Project[])) => void,
    chosenProject: Project | null,
    setChosenProject: Dispatch<SetStateAction<Project | null>>,
    allTasks: Task[],
    setAllTasks: Dispatch<SetStateAction<Task[]>>,
    project: Project | null           // ✅ Fix: was missing comma before this param
) {
    // ✅ Fix: was missing "return" and had wrong spread syntax
    const updatedProjects = allProjects.map((proj) => ({
        ...proj,
        tasks: proj.id === project?.id ? [...proj.tasks, newTask] : [...proj.tasks],
        // ✅ Fix: was "project.id === project?.id" (wrong variable)
    }));

    if (chosenProject && chosenProject.id === project?.id) {
        const copyChosenProject: Project = {
            ...chosenProject,
            tasks: [...chosenProject.tasks, newTask],
        };
        setChosenProject(copyChosenProject);
    }

    // ✅ Fix: was "AllTasksContainer" (undefined variable) — should be allTasks
    setAllTasks([...allTasks, newTask]);
    setAllProjects(updatedProjects);
}

export const updateTaskAndProjects = ({
    updateTask,
    project,
    allProjects,
    chosenProject,
    setAllTasks,
    setChosenProject,
    setAllProjects,
}: {
    updateTask: Task;
    project: Project | null;
    allProjects: Project[];
    chosenProject: Project | null;
    setAllTasks: Dispatch<SetStateAction<Task[]>>;
    setChosenProject: Dispatch<SetStateAction<Project | null>>;
    setAllProjects: (projects: Project[] | ((prev: Project[]) => Project[])) => void;
}) => {
    const updatedProjects = allProjects.map((proj) => {
        if (proj.id === project?.id) {
            const taskExists = proj.tasks.some((task) => task.id === updateTask.id);
            if (taskExists) {
                return {
                    ...proj,
                    tasks: proj.tasks.map((task) =>
                        task.id === updateTask.id ? updateTask : task
                    ),
                };
            } else {
                return { ...proj, tasks: [...proj.tasks, updateTask] };
            }
        } else {
            // ✅ Fix: was "task:" (typo) — should be "tasks:"
            return {
                ...proj,
                tasks: proj.tasks.filter((task) => task.id !== updateTask.id),
            };
        }
    }); // ✅ Fix: missing closing ); for .map()

    const updatedAllTasks = updatedProjects.flatMap((proj) => proj.tasks);
    setAllTasks(updatedAllTasks);

    if (chosenProject && project) {
        let updatedTasksOfChosenProject: Task[];

        if (chosenProject.id === project.id) {
            updatedTasksOfChosenProject = chosenProject.tasks.map((task) =>
                task.id === updateTask.id ? updateTask : task
            );
        } else {
            updatedTasksOfChosenProject = chosenProject.tasks.filter(
                (task) => task.id !== updateTask.id
            );
        }

        setChosenProject({ ...chosenProject, tasks: updatedTasksOfChosenProject });
    }

    setAllProjects(updatedProjects);
};

// ✅ Fix: broken syntax throughout — "chosen Project" (space), wrong filter logic,
//         missing closing braces, Task.id instead of task.id
export const deleteTask = ({
    taskToDelete,
    allProjects,
    chosenProject,
    setAllTasks,
    setChosenProject,
    setAllProjects,
}: DeleteTaskProps): void => {
    const updatedProjects = allProjects.map((proj) => ({
        ...proj,
        tasks: proj.tasks.filter((task) => task.id !== taskToDelete.id),
    }));

    const updatedAllTasks = updatedProjects.flatMap((proj) => proj.tasks);
    setAllTasks(updatedAllTasks);

    if (chosenProject && chosenProject.tasks.some((task) => task.id === taskToDelete.id)) {
        const updatedChosenProject: Project = {
            ...chosenProject,
            tasks: chosenProject.tasks.filter((task) => task.id !== taskToDelete.id),
        };
        setChosenProject(updatedChosenProject);
    }

    setAllProjects(updatedProjects);
};