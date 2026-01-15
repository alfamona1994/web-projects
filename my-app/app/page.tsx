"use client"
import { useCallback, useState } from "react"; 
import SideBar from "./Components/SideBar";
import AllProjects from "./Pages/AllProjects/AllProjects"
import AllTasksContainer from "./Pages/AllTasks/AllTasks";
import { useContextApp } from "./contextApp";
import { ProjectWindow } from "./Components/Windows/ProjectWindow";
import IconWindow from "./Components/Windows/IconWindow";

export default function Home() {
  const {
    openSideBarObject: { openSideBar },
    sideBarMenuObject: { sideBarMenu },
    openProjectWindowObject: { openProjectWindow},
  } = useContextApp();

  const componentMap: Record<number, React.ReactNode> = {
    1:  <AllProjects />,
    2:  <AllTasksContainer />,
  };

  const componentKey = sideBarMenu.findIndex((item) => item.isSelected);

  const selectedComponent = componentMap[componentKey + 1] || null;

  return (
   <div className=" flex w-full h-screen poppins ">
      {/* Icon Window */}
      <IconWindow />
      {/* Project Window */}
      <ProjectWindow />
      {/* Soft layer */}
      { (openSideBar || openProjectWindow) && (
        <div className={` w-full h-full ${
          openProjectWindow ? "z-[70]": "z-50"
         } bg-slate-800 fixed opacity-30`}
        ></div>
      )}

      {/* SideBar */}
      <SideBar />
      
      { /* Selected Component */}
      {selectedComponent && selectedComponent}
   </div>
  );
}
