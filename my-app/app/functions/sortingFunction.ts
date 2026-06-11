import { Project } from "../Data/AllProjects";

export function sortProjects( 
    allProjects: Project[],

    selectionOptionValue: string | undefined
){
    const sortedProjects = [...allProjects];
    
    switch (selectionOptionValue) {
        case "asc":
            sortedProjects.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case "desc":
            sortedProjects.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case "newest":
            sortedProjects.sort(
                (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            break;
        case "oldest":
            sortedProjects.sort(
                (a, b) =>
                     new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
            break;
        default:
            return allProjects;
    }

    return sortedProjects;
}