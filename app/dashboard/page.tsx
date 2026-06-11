"use client"

import SideBar from "../Components/SideBar";
import AllProjects from "../Pages/AllProjects/AllProjects"
import AllTasksContainer from "../Pages/AllTasks/AllTasks";
import { useContextApp } from "../contextApp";
import { ProjectWindow } from "../Components/Windows/ProjectWindow";
import { Toaster } from "react-hot-toast";
import IconWindow from "../Components/Windows/IconWindow";
import MoreDropDown from "../Components/DropDowns/MoreDropDown";
import ConfirmationWindow from "../Components/Windows/ConfirmationWindow";
import ProjectsDropDown from "../Components/DropDowns/ProjectsDropDown";
import SortingDropDown from "../Components/DropDowns/SortingDropDown";
import { TasksWindow } from "../Components/Windows/TasksWindow";

export default function Home() {
  const {
    openSideBarObject: { openSideBar },
    sideBarMenuObject: { sideBarMenu },
    openProjectWindowObject: { openProjectWindow },
    openConfirmationWindowObject: { openConfirmationWindow },
  } = useContextApp();

  const componentMap: Record<number, React.ReactNode> = {
    1: <AllProjects />,
    2: <AllTasksContainer />,
  };

  const componentKey = sideBarMenu.findIndex((item) => item.isSelected);
  const selectedComponent = componentMap[componentKey + 1] || null;

  return (
    <div className="flex w-full h-screen poppins overflow-hidden ">

      {/* 1. OVERLAY — behind modals */}
      {(openSideBar || openProjectWindow || openConfirmationWindow) && (
        <div
          className={`w-full h-full fixed bg-slate-800 opacity-30 ${
            openProjectWindow || openConfirmationWindow ? "z-[70]" : "z-[50]"
          }`}
        />
      )}

      {/* 2. MODALS — on top of overlay */}
      <ProjectsDropDown />
      <SortingDropDown />
      <Toaster />
      <ConfirmationWindow />
      <MoreDropDown />
      <IconWindow />
      <ProjectWindow />
      <TasksWindow />

      {/* 3. SIDEBAR */}
      <SideBar />

      {/* 4. MAIN CONTENT */} 
      {selectedComponent && selectedComponent}

    </div>
  );
}