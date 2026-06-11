"use client";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CircleIcon from "@mui/icons-material/Circle";
import { LibraryAdd } from "@mui/icons-material";
import { Project } from "@/app/Pages/types/AppType";
import { getIconComponent } from "@/app/functions/IconsActions";
import { useContextApp } from "@/app/contextApp";

function SingleProjectCard({ project }: { project: Project }) {
  const daysLeft = calculateDaysLeft(project.createdAt);

  const progressPercentage = calculateProgressPercentage(
    project.tasks.length,
    project.tasks.filter((task) => task.status === "Completed").length
  );

  return (
    <li className="w-[300px] max-md:w-[96%] flex flex-col rounded-lg p-7 bg-white min-h-[280px] justify-between">
      <ProjectCardHeader />
      <ProjectCardBody />
      <ProjectCardFooter />
    </li>
  );

  // ================= HEADER =================
  function ProjectCardHeader() {
    const threeDotsRef = React.useRef<HTMLDivElement>(null);

    const {
      dropDownPositionsObject: { setDropDownPositions },
      openDropDownObject: { setOpenDropDown },
      selectedProjectObject: { setSelectedProject },
      chosenProjectObject: { setChosenProject },
      sideBarMenuObject: { setSideBarMenu },
      projectClickedObject: { setProjectClicked },
    } = useContextApp();

    function openDropDown(event: React.MouseEvent) {
      event.preventDefault();
      event.stopPropagation();

      if (threeDotsRef.current) {
        const rect = threeDotsRef.current.getBoundingClientRect();
        const { top, left } = rect;

        setDropDownPositions({
          top: top + window.scrollY + 30,
          left: left + window.scrollX,
          width: 0,
        });

        setSelectedProject(project);
        setOpenDropDown(true);
      }
    }

    function showAllTasksOfProject() {
      //Update the chosen project variable
      setChosenProject(project);

      // Go to the all tasks page by using the side menu items
      setSideBarMenu((prevState) => {
        return prevState.map((item) => ({
          ...item,
          isSelected: item.id === 2 ? true : false,
        }));
      });
    }

    return (
      <div className="flex justify-between items-center mb-1">
        { /* Title and Icon */}
        <div className="flex gap-3 items-center">
          { /* Project Icon */}
          <div className="bg-orange-600 flex justify-center items-center w-[38px] h-[38px] rounded-md">
            {getIconComponent(project.icon, "text-white", "23px")}
          </div>
          { /* Project Title */}
          <div className="flex flex-col">
            <span
              onClick={showAllTasksOfProject}
              className="font-semibold text-[19px] cursor-pointer hover:text-orange-600">
              {truncateString(project.title, 25)}
            </span>

            <span className="text-slate-400 text-[13px]">
              {daysLeft === 0
                ? "Today is the deadline"
                : `${daysLeft} day${daysLeft > 1 ? "s" : ""} ago`}
            </span>
          </div>
        </div>

        <div
          ref={threeDotsRef}
          onClick={openDropDown}
          className="w-6 h-6 flex justify-center items-center rounded-full hover:bg-slate-100"
        >
          <MoreVertIcon className="text-slate-400 text-[19px] cursor-pointer" />
        </div>
      </div>
    );
  }

  // ================= BODY =================
  function ProjectCardBody() {
    const taskSlots = [0, 1, 2];
    const {
      openTasksWindowObject: { setOpenTasksWindow },
      projectClickedObject: { setProjectClicked },
      allProjectsObject: { allProjects },
    } = useContextApp();

    function openTheTaskWindow() {
      setOpenTasksWindow(true);
      const findProject = allProjects.find(
        (proj) => proj.title.toLowerCase() === project.title.toLowerCase()
      );
      if (findProject) {
        setProjectClicked(findProject);
      }
    }

    return (
      <div className="h-[80px] flex flex-col gap-3 mb-1">
        {project.tasks.length === 0 ? (
          <div className="flex flex-col items-center gap-3 mt-[15px] h-full">
            <LibraryAdd
              onClick={openTheTaskWindow}
              className="text-slate-400 opacity-40 text-[26px] cursor-pointer hover:opacity-100 hover:text-orange-600"
            />
            <span className="text-slate-400 opacity-45 text-[13px]">
              No tasks added yet....
            </span>
          </div>
        ) : (
          <>
            <ul className="text-slate-400 text-[13px] flex flex-col gap-2 ml-3">
              {taskSlots.map((slot) => {
                const task = project.tasks[slot];
                return (
                  <li key={slot} className="flex gap-2 items-center h-[20px]">
                    {task ? (
                      <>
                        <CircleIcon className="text-[8px] shrink-0" />
                        <span>{truncateString(task.title ?? "", 30)}</span>
                      </>
                    ) : (
                      <span className="invisible">placeholder</span>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="h-[16px] ml-3">
              {project.tasks.length > 3 && (
                <span className="text-[11px] text-orange-600">
                  +{project.tasks.length - 3} more tasks
                </span>
              )}
            </div>
          </>
        )}
      </div>
    );
}

  // ================= FOOTER =================
  function ProjectCardFooter() {
    return (
      <div className="flex gap-4 flex-col mt-3">
        <div className="text-[12px] gap-3 items-center flex w-full">
          <div className="w-full h-[7px] rounded-xl bg-slate-100 overflow-hidden">
            <div
              style={{ width: `${progressPercentage}%` }}
              className="bg-orange-600 h-full rounded-xl"
            />
          </div>
          <div className="flex gap-1 text-[13px]">
            <p className="text-slate-400">{progressPercentage}%</p>
          </div>
        </div>

        {/* ✅ On Progress label below the bar */}
        <div className="flex justify-between items-center">
          <span className="text-[12px] text-slate-400">On Progress</span>
        </div>
      </div>
    );
  }
}

export default SingleProjectCard;

// ================= HELPERS =================
function truncateString(str: string, maxLength: number): string {
  if (!str) return "";
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
}

function calculateDaysLeft(creationDate: string): number {
  const creation = new Date(creationDate);
  const today = new Date();
  const difference = today.getTime() - creation.getTime();
  return Math.ceil(difference / (1000 * 3600 * 24));
}

function calculateProgressPercentage(
  totalTasks: number,
  completedTasks: number
): number {
  return totalTasks > 0
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;
}