import { Title } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";


//Define the structure of a task
export type Task = {
    id: string;
    title: string;
    icon: string;
    projectName: string;
    status: "To Do" | "In Progress" | "Completed";
    priority: "Low" | "Medium" | "High";
    createdAt: string;
    updatedAt: string;
};

// Define the structure of a project
export type Project = {
    id: string;
    clerkUserId: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    tasks: Task[];
};

// Sample data for projects and tasks
export const allProjectsData: Project[] = [
    {
        id: uuidv4(),
        clerkUserId: "user-123",
        title: "Website Redesign",
        description: "Redesign the corporate website for better UX.",
        createdAt: "2026-01-15T10:00:00Z",
        updatedAt: "2026-01-20T12:00:00Z",
        icon: "LocalLibrary",
        tasks: [
            {
                id: uuidv4();
                Title:
                 