"use client";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRef } from "react";
import { useContextApp } from "@/app/contextApp";
import { Task, Project } from "@/app/Pages/types/AppType";

function TasksSubHeader() {
  return (
    <div className="mt-24 flex justify-between items-center">
      <MyProjectsText />
      <SortByButton />
    </div>
  );

  function MyProjectsText() {
    const projectTitleRef = useRef<HTMLDivElement>(null);

    const {
      chosenProjectObject: { chosenProject },
      allProjectsObject: { allProjects },
      projectsDropDownPositionsObject: { setProjectsDropDownPositions },
      openProjectDropDownObject: { openProjectsDropDown, setOpenProjectsDropDown },
    } = useContextApp();

    function allTaskInAllProjects() {
      return allProjects.reduce(
        (acc: number, project: Project) => acc + project.tasks.length,
        0
      );
    }

    function calculateCompletedTasks(tasks: Task[]) {
      return tasks.filter((task) => task.status === "Completed").length;
    }

    const totalTasks = chosenProject
      ? chosenProject.tasks.length
      : allTaskInAllProjects();

    const completedTasks = chosenProject
      ? calculateCompletedTasks(chosenProject.tasks)
      : allProjects.reduce(
          (acc: number, project: Project) =>
            acc + calculateCompletedTasks(project.tasks),
          0
        );

    const completionPercentage =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    function openTheProjectDropDown() {
      if (projectTitleRef.current) {
        const rect = projectTitleRef.current.getBoundingClientRect();
        const { top, left } = rect;
        setProjectsDropDownPositions({ top, left });
        setOpenProjectsDropDown(!openProjectsDropDown);
      }
    }

    return (
      <div className="flex items-center max-sm:gap-2 gap-3">
        <div className="w-[41px] -mt-1 flex justify-center items-center h-[44px] rounded-md bg-orange-100">
          <SplitscreenIcon
            sx={{ fontSize: "21px" }}
            className="text-orange-600"
          />
        </div>

        <ul className="flex flex-col gap-[7px] max-sm:gap-[10px]">
          <li className="text-[17px] font-semibold flex gap-2 items-center">
            <div
              ref={projectTitleRef}
              onClick={openTheProjectDropDown}
              className="text-slate-700 flex gap-2 items-center cursor-pointer"
            >
              <span className="text-lg">
                {chosenProject?.title || "All Projects"}
              </span>
              <span className="bg-slate-700 text-white text-[14px] p-[2px] px-2 rounded-md max-[420px]:hidden">
                {totalTasks}
              </span>
            </div>
            <KeyboardArrowDownIcon className="text-slate-600 text-lg" />
          </li>

          <div className="flex gap-1 items-center">
            <li className="text-[12px] h-[4px] w-[280px] max-sm:w-[170px] bg-slate-200 rounded-md overflow-hidden">
              <div
                className="h-full bg-orange-600 rounded-r-xl"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </li>
            <p className="text-[12px] text-slate-400 ml-3 max-sm:hidden">
              {completionPercentage.toFixed(0)}%
            </p>
          </div>
        </ul>
      </div>
    );
  }

  function SortByButton() {
    const {
      sortingDropDownPositionsObject: { sortingDropDownPositions, setSortingDropDownPositions },
      openSortingDropDownObject: { openSortingDropDown, setOpenSortingDropDown },
      sortingOptionObject: { sortingOptions, setSortingOptions },
      
    } = useContextApp();
    const sortRef = useRef<HTMLDivElement>(null);

    let sortingLabel = "";

    const flatten = sortingOptions
      .flatMap((option: { options: Array<{ selected: boolean; label: string }> }) => option.options)
      .find((option: { selected: boolean; label: string }) => option.selected);

    if (flatten) {
      if (flatten.label === "A-Z" || flatten.label === "Z-A") {
        sortingLabel = `Order: ${flatten.label}`;
      } else {
        sortingLabel = `${flatten.label} Tasks`;
      }
    }

    function openTheSortingDropDown() {
      if (sortRef.current) {
        const rect = sortRef.current.getBoundingClientRect();
        const { top, left, width } = rect;
        setSortingDropDownPositions({ left: left, top: top + 30, width: width });
        setOpenSortingDropDown(true);
      }
    }

    return (
      <div
        ref={sortRef}
        className="flex max-sm:flex-col text-[15px] font-semibold gap-3 max-sm:gap-1 hover:cursor-pointer
        hover:text-orange-600 text-slate-800 "
      >
        <span className="text-slate-300">
          Sort By
        </span>
        <div
          onClick={openTheSortingDropDown}
          className="flex gap-1 items-center cursor-pointer"
        >
          <span className="">{sortingLabel}</span>
          {openSortingDropDown ? (
            <KeyboardArrowDownIcon sx={{ fontSize: "19px" }} />
          ) : (
            <KeyboardArrowDownIcon sx={{ fontSize: "19px" }} />
          )}
        </div>
      </div>
    );
  }
}

export default TasksSubHeader;