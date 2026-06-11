import { useTaskFormContext } from "../../Windows/TasksWindow";
import { ProjectWithSelection } from "../../Windows/TasksWindow";
import { getIconComponent } from "@/app/functions/IconsActions";

export default function ProjectsListComponent() {
    const {
        updatedAllProjectsObject: { updatedAllProjects, setUpdatedAllProjects },
    } = useTaskFormContext();

    return (
        <div className="flex flex-col gap-3">
            {updatedAllProjects.map((singleProject, index) => (
                // FIXED: was "(}" — changed to "(" 
                <SingleProject
                    key={index}
                    singleProject={singleProject}
                    index={index}
                />
            ))}
        </div>
    );
}

// FIXED: moved outside parent component
function SingleProject({
    singleProject,
    index,
}: {
    singleProject: ProjectWithSelection;
    index: number;
}) {
    const {
        setProject,
        setOpenTasksDropDown,
        updatedAllProjectsObject: { setUpdatedAllProjects },
    } = useTaskFormContext();

    function updateTheProject(index: number) {
        // Update the project selected
        setProject(singleProject);
        // Update the updateAllProjects array
        setUpdatedAllProjects((prevProjects: ProjectWithSelection[]) =>
            prevProjects.map((project: ProjectWithSelection, i: number) => ({
                ...project,
                isSelected: i === index,
            }))
        );
        // Close the dropdown
        setOpenTasksDropDown(false);
    }

    return (
        <div
            onClick={() => updateTheProject(index)}
            className={`${
                singleProject.isSelected && "bg-orange-50 border border-orange-200"
            } flex items-center gap-2 p-[7px] rounded-md cursor-pointer`}
        >
            <div className="flex gap-2 items-center">
                <div>
                    {getIconComponent(singleProject.icon, "text-[16px]")}
                </div>
                <span className="mt-[3px] hover:text-orange-600 text-slate-500">
                    {singleProject.title}
                </span>
            </div>
        </div>
    );
}