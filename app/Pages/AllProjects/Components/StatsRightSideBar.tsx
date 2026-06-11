"use client";
import React, { useMemo } from "react";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import { useContextApp } from "@/app/contextApp";
import "react-circular-progressbar/dist/styles.css";
import {
  CircularProgressbar as CircularProgressbarBase,
  buildStyles,
} from "react-circular-progressbar";
import { Project } from "@/app/Data/AllProjects";

const CircularProgressbar = CircularProgressbarBase as unknown as React.FC<{
  value: number;
  text?: string;
  styles?: object;
}>;

function StatsRightSideBar() {
  const {
    allProjectsObject: { allProjects },
  } = useContextApp();

  const { completedProjects, completedTasks, completionPercentage } =
    useMemo(() => {
      let completedProjects: Project[] = [];
      let totalTasks = 0;
      let completedTasks = 0;

      allProjects.forEach((project) => {
        const projectCompleted = project.tasks.every(
          (task) => task.status === "Completed"
        );
        if (projectCompleted) completedProjects.push(project);

        project.tasks.forEach((task) => {
          totalTasks++;
          if (task.status === "Completed") completedTasks++;
        });
      });

      const percentage =
        completedProjects.length > 0
          ? (completedProjects.length / allProjects.length) * 100
          : 0;

      return {
        completedProjects,
        completedTasks,
        completionPercentage: percentage,
      };
    }, [allProjects]);

  return (
    <div className="w-[22%] flex justify-end items-center max-lg:hidden">
      <div className="h-[92%] w-[94%] bg-white rounded-l-3xl p-3 flex flex-col">
        <Header />
        <div className="flex flex-col gap-11 items-center justify-center mt-6">
          <CircularChart percentage={completionPercentage} />
          <ProjectsCompletedLabels
            completedProjects={completedProjects}
            completedTasks={completedTasks}
          />
        </div>
        <ProjectsList completedProjects={completedProjects} />
      </div>
    </div>
  );

  function Header() {
    return (
      <h2 className="text-[22px] font-bold text-center mt-7">
        Projects Completed
      </h2>
    );
  }

  function CircularChart({ percentage }: { percentage: number }) {
    return (
      <div className="w-40 h-40 mt-7 mb-1">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textSize: "16px",
            pathColor: `rgba(234, 88, 12, 1)`,
            textColor: "#f97316",
            trailColor: "#f1f5f9",
            backgroundColor: "#3e98c7",
          })}
        />
      </div>
    );
  }

  function ProjectsCompletedLabels({
    completedProjects,
    completedTasks,
  }: {
    completedProjects: Project[];
    completedTasks: number;
  }) {
    return (
      <div className="flex justify-center flex-col gap-1 items-center">
        <p className="font-bold text-[17px]">
          {completedProjects.length} Completed
        </p>
        <p className="text-[13px] text-slate-400">{completedTasks} Tasks done</p>
      </div>
    );
  }

  function ProjectsList({
    completedProjects,
  }: {
    completedProjects: Project[];
  }) {
    return (
      <ul className="flex flex-col gap-3 mt-16 mx-4 overflow-auto">
        {completedProjects.length === 0 && (
          <div className="h-[100%] flex items-center justify-center py-20 w-full">
            <div className="p-1 gap-5 flex flex-col items-center justify-center opacity-40 pb-8">
              <NotAchievedProjectsIcon />
              <div className="flex flex-col items-center gap-2">
                <p className="text-slate-700 text-[12px] mb-1 text-center">
                  No projects completed yet!
                </p>
              </div>
            </div>
          </div>
        )}

        {completedProjects.map((project, index) => (
          <div key={project.id}>
            <SingleProject project={project} />
            {index < completedProjects.length - 1 && (
              <hr className="w-[80%] mx-auto text-slate-100 opacity-50" />
            )}
          </div>
        ))}
      </ul>
    );
  }

  function SingleProject({ project }: { project: Project }) {
    return (
      <li className="p-3 flex gap-2 items-center">
        <div className="w-8 h-8 bg-orange-600 rounded-md justify-center items-center flex text-slate-100">
          <SplitscreenIcon sx={{ fontSize: "19px" }} />
        </div>
        <ul>
          <li className="text-[14px] font-semibold">
            {truncate(project.title, 40)}
          </li>
          <li className="text-[12px] text-slate-400">
            {project.tasks.length} Tasks
          </li>
        </ul>
      </li>
    );
  }

  function NotAchievedProjectsIcon() {
    return (
      <svg
        fill="#94a3b8"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488.765 488.766"
        height={"90px"}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g>
            <g>
              <path d="M484.765,120.766h-80v-20c0-5.523-4.477-10-10-10h-20v-80c0-5.523-4.477-10-10-10h-20V0c0-5.523-4.477-10-10-10H244.765 c-5.523,0-10,4.477-10,10v20h-20c-5.523,0-10,4.477-10,10v80h-80c-5.523,0-10,4.477-10,10v20h80v80c0,5.523,4.477,10,10,10 h20v80c0,5.523,4.477,10,10,10h20v80c0,5.523,4.477,10,10,10h20v-80h80c5.523,0,10-4.477,10-10v-80h80c5.523,0,10-4.477,10-10v-20 C494.765,125.243,490.288,120.766,484.765,120.766z M244.765,30h20v80c0,5.523,4.477,10,10,10h80v20c0,5.523,4.477,10,10,10 h20v80h-80c-5.523,0-10,4.477-10,10v80h-20v-80c0-5.523-4.477-10-10-10h-80v-20c0-5.523-4.477-10-10-10h-20V120 c0-5.523,4.477-10,10-10h80V30z" />
              <path d="M244.765,150c-52.935,0-96,43.065-96,96s43.065,96,96,96s96-43.065,96-96S297.7,150,244.765,150z M244.765,320 c-41.355,0-75-33.645-75-75s33.645-75,75-75s75,33.645,75,75S286.12,320,244.765,320z" />
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

export default StatsRightSideBar;

function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
}