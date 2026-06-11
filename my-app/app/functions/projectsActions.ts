import React, { Dispatch, SetStateAction } from "react";
import { Project } from "@/app/Pages/types/AppType";
import { v4 as uuidv4 } from "uuid";
import { IconData } from "@/app/Pages/types/AppType";
import { FormData } from "../Components/Windows/ProjectWindow";

export function addNewProject(
    data: FormData,
    allProjects: Project[],
    setAllProjects: Dispatch<SetStateAction<Project[]>>,
    setOpenProjectWindow: Dispatch<SetStateAction<boolean>>,
    selectedIcon: IconData | null,
    reset: () => void
) {
    try {
        const newProject: Project = {
            id: uuidv4(),
            title: data.projectName,
            icon: selectedIcon ? selectedIcon.name : "LocalLibrary",
            description: "",
            tasks: [],
            clerkUserId: "user-123",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        setAllProjects([...allProjects, newProject]);
        setOpenProjectWindow(false);
        reset();
    } catch (error) {
        console.error("Error adding project:", error);
    }
}

export function editProject(
    selectedProject: Project | null,
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>,
    data: FormData,
    selectedIcon: IconData | null,
    allProjects: Project[],
    setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>,
    setOpenProjectWindow: React.Dispatch<React.SetStateAction<boolean>>,
) {
    // ✅ Fixed condition — if selectedProject exists, update it
    if (selectedProject) {
        const updatedProject: Project = {
            ...selectedProject,
            title: data.projectName,
            icon: selectedIcon?.name || "LocalLibrary",
            updatedAt: new Date().toISOString(),
        };

        const updatedAllProjects = allProjects.map((project) => {
            if (project.id === selectedProject.id) {
                return updatedProject;
            }
            return project;
        });

        setAllProjects(updatedAllProjects);
        setSelectedProject(null);
        setOpenProjectWindow(false);
    }
}