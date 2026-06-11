"use client"
import React from "react";
import SingleProjectCard from "./SingleProjectCard";
import { useContextApp } from "@/app/contextApp";
import ProjectsEmptyScreen from "@/app/EmptyScreens/ProjectsEmptyScreen";

function AllProjectsSection() {
    const {
        allProjectsObject: { allProjects },
    } = useContextApp();

    return (
        <div className="overflow-auto mt-6">
            {allProjects.length === 0 ? (
                // ✅ Show empty screen when no projects
                <ProjectsEmptyScreen />
            ) : (
                // ✅ Show project cards when projects exist
                <ul className="flex gap-4 flex-wrap max-sm:grid-cols-1">
                    {allProjects.map((project) => (
                        <SingleProjectCard key={project.id} project={project} />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AllProjectsSection;