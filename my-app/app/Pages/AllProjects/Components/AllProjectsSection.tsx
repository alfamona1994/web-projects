import React from "react";
import SingleProjectCard from "./SingleProjectCard";

function AllProjectsSection() {
    return (
        <ul className="h-[78%] overflow-auto flex gap-4 flex-wrap mt-6
        max-sm:grid max-sm:grid-cols-1">
            <SingleProjectCard />
            <SingleProjectCard />
            <SingleProjectCard />
            <SingleProjectCard />
            <SingleProjectCard />       
        </ul>
    );
}

export default AllProjectsSection;