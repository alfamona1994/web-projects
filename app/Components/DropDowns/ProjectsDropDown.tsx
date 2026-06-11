import { getIconComponent } from "@/app/functions/IconsActions";
import { useContextApp } from "@/app/contextApp";
import { useEffect, useRef } from "react";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import { Project } from "@/app/Pages/types/AppType";

function ProjectsDropDown() {
    const {
        allProjectsObject: { allProjects },
        openProjectDropDownObject: { 
            openProjectsDropDown, 
            setOpenProjectsDropDown,
        },
        projectsDropDownPositionsObject: {
            projectsDropDownPositions,
        },
    } = useContextApp();

    const dropDownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropDownRef.current &&
                !dropDownRef.current.contains(event.target as Node)
            ) {
                setOpenProjectsDropDown(false);
            }
        }

        function handleResize() {
            setOpenProjectsDropDown(false);
        }

        if (openProjectsDropDown) {
            document.addEventListener("mousedown", handleClickOutside);
            window.addEventListener("resize", handleResize);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("resize", handleResize);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("resize", handleResize);
        };
    }, [openProjectsDropDown]);

    return (
        <div
            ref={dropDownRef}
            style={{
                top: projectsDropDownPositions.top + 36,
                left: projectsDropDownPositions.left,
            }}
            className={`${
                openProjectsDropDown ? "block" : "hidden"
            } bg-white absolute p-3 z-[90] border w-[210px] border-slate-50 select-none shadow-md rounded-lg flex flex-col gap-2`}
        >
            <AllProjectsItem />
            <hr className="w-[80%] text-slate-400 mx-auto my-1 opacity-55" />
            <>
                {allProjects.map((singleProject) => (
                    <SingleProject key={singleProject.id} singleProject={singleProject} />
                ))}
            </>
        </div>
    );
}

export default ProjectsDropDown;

function AllProjectsItem() {
    const {
        chosenProjectObject: { setChosenProject },
        openProjectDropDownObject: { setOpenProjectsDropDown },
    } = useContextApp();

    return (
        <div
            onClick={() => {
                setChosenProject(null);
                setOpenProjectsDropDown(false);
            }}
            className="flex items-center justify-between gap-7 p-2 rounded-lg text-slate-600 cursor-pointer"
        >
            <div className="flex gap-2 items-center">
                <div>
                    <DensitySmallIcon className="text-orange-600 text-[22px]" />
                </div>
                <span className="text-[13px] mt-1 hover:text-orange-600 cursor-pointer">
                    All Projects
                </span>
            </div>
        </div>
    );
}

function SingleProject({ singleProject }: { singleProject: Project }) {
    const {
        chosenProjectObject: { chosenProject, setChosenProject },
        allProjectsObject: { allProjects },
        openProjectDropDownObject: { setOpenProjectsDropDown },
    } = useContextApp();

    function handleTheProjectClicked(projectId: string) {
        const findProject = allProjects.find((project) => project.id === projectId);
        if (findProject) {
            setChosenProject(findProject);
        }
        setOpenProjectsDropDown(false);
    }

    return (
        <div
            onClick={() => handleTheProjectClicked(singleProject.id)}
            className={`${
                chosenProject?.id === singleProject.id
                    ? "border border-orange-600 bg-orange-50"
                    : ""
            } flex items-center justify-between gap-7 p-2 rounded-lg text-slate-600 cursor-pointer`}
        >
            <div className="flex gap-2 items-center">
                <div>
                    {getIconComponent(singleProject.icon, "text-orange-600 text-[22px]")}
                </div>
                <span className="text-[13px] mt-1 hover:text-orange-600 cursor-pointer">
                    {singleProject.title}
                </span>
            </div>
        </div>
    );
}