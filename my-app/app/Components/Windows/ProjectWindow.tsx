"use client";
import { Project } from "@/app/Pages/types/AppType";
import React, { useLayoutEffect, useEffect } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useContextApp } from "@/app/contextApp";
import { v4 as uuidv4 } from "uuid";
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getIconComponent } from "@/app/functions/IconsActions";
// FIX #9 & #3: Removed import of allProjectsData (static data, not needed here)
// FIX #9: Removed import of editProject to avoid naming conflict with local definition
import { allIconArray } from "@/app/Data/AllIcons";
import { IconData } from "@/app/Pages/types/AppType";
import toast from "react-hot-toast";

const schema = z.object({
  projectName: z
    .string()
    .min(1, { message: "Project name is required." })
    .max(30, { message: "Project name must be at most 30 characters or less." }),
});

export type FormData = z.infer<typeof schema>;

// FIX #5: Moved addNewProject body inside the function (was orphaned outside before)
export function addNewProject(
  data: FormData,
  allProjects: any[],
  setAllProjects: (projects: any[]) => void,
  setOpenProjectWindow: (open: boolean) => void,
  selectedIcon: any,
  reset: () => void
) {
  setAllProjects([
    ...allProjects,
    {
      id: uuidv4(),
      title: data.projectName,
      icon: selectedIcon?.name ?? "LocalLibrary",
      description: "",
      clerkUserId: "",

      tasks: [
  {
    id: uuidv4(),
    title: "Create the UI Design of the task",  // ← fixed
    icon: "Title",
    projectName: data.projectName,
    status: "In Progress" as const,
    priority: "Low" as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Review and finalize the project",   // ← also gave it a different name
    icon: "Title",
    projectName: data.projectName,
    status: "In Progress" as const,
    priority: "Low" as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);
  reset();
  setOpenProjectWindow(false);
}

// FIX #1: Renamed selelctedIcon → selectedIcon
// FIX #2: Fixed .map((task)) → .map((task) =>
// FIX #3: Replaced allProjectsData.map → allProjects.map (uses live state)
// FIX #4: Added setOpenProjectWindow call to close window after edit
export function editProject(
  selectedProject: Project | null,
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>,
  data: FormData,
  selectedIcon: IconData | null,
  allProjects: Project[],
  setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>,
  setOpenProjectWindow: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (!selectedProject) return;

  const updatedProject: Project = {
    ...selectedProject,
    title: data.projectName,
    icon: selectedIcon?.name || "LocalLibrary",  // FIX #1: was selelctedIcon
    tasks: selectedProject.tasks.map((task) => ({  // FIX #2: was .map((task))
      ...task,
      projectName: data.projectName,
    })),
  };

  // FIX #3: was allProjectsData.map — now uses the allProjects state array
  const updatedAllProjects = allProjects.map((project) =>
    project.id === selectedProject.id ? updatedProject : project
  );

  setAllProjects(updatedAllProjects);
  setSelectedProject(null);
  setOpenProjectWindow(false); // FIX #4: was never called before
}

export function ProjectWindow() {
  const {
    openProjectWindowObject: { openProjectWindow, setOpenProjectWindow },
    allProjectsObject: { allProjects, setAllProjects },
    selectedIconObject: { selectedIcon, setSelectedIcon },
    selectedProjectObject: { selectedProject, setSelectedProject },
    allIconsDataObject: { allIconsData },
  } = useContextApp();

  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    setFocus,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleClose = () => {
    reset();
    setSelectedProject(null);
    setOpenProjectWindow(false);
  };

  // FIX #8: Added missing dependencies to useLayoutEffect
  useLayoutEffect(() => {
    if (openProjectWindow) {
      if (!selectedProject) {
        reset();
        setSelectedIcon(null);
      } else {
        reset({ projectName: selectedProject.title });
        setValue("projectName", selectedProject.title);
        const findIconInAllIconsArray = allIconArray.find(
          (icon: IconData) => icon.name === selectedProject.icon
        );
        if (findIconInAllIconsArray) {
          setSelectedIcon(findIconInAllIconsArray);
        }
      }
    }
  }, [openProjectWindow, reset, setValue, setSelectedIcon, selectedProject]); // FIX #8

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    const existingProject = allProjects.find( // FIX #3: was allProjectsData
      (project) =>
        project.title.toLowerCase() === data.projectName.toLowerCase()
    );

    if (existingProject && !selectedProject) {
      setError("projectName", {
        type: "manual",
        message: "A project with this name already exists.",
      });
      setFocus("projectName");
      return;
    }

    ProjectsFunction(data);
  };

  async function ProjectsFunction(data: FormData) {
  try {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (selectedProject) {
      editProject(
        selectedProject,
        setSelectedProject,
        data,
        selectedIcon,
        allProjects,
        setAllProjects,
        setOpenProjectWindow
      );
      toast.success("Project updated successfully.", { id: "project-update" });
    } else {
      addNewProject(
        data,
        allProjects,
        setAllProjects,
        setOpenProjectWindow,
        selectedIcon,
        reset
      );
      toast.success("Project added successfully.", { id: "project-add" });
    }

    handleClose();
  } catch (error) {
    console.error("Error saving project:", error);
    toast.error("Failed to save project. Please try again.", {
      id: "project-error",
    });
  } finally {
    setIsLoading(false);
  }
}

  return (
    <div
      className={`${
        openProjectWindow ? "block" : "hidden"
      } w-[48%] max-sm:w-[82%] max-[600px]:w-[93%] z-[80] p-3 left-1/2 top-[47%] -translate-y-1/2 -translate-x-1/2 fixed flex flex-col gap-3 border border-slate-50 bg-white rounded-lg shadow-md`}
    >
      <Header handleClose={handleClose} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 pt-8 px-7 mt-3"
      >
        <ProjectInput register={register} errors={errors} />
        <Footer handleClose={handleClose} isLoading={isLoading} />
      </form>
    </div>
  );
}

function Header({ handleClose }: { handleClose: () => void }) {
  const {
    selectedIconObject: { setSelectedIcon },
    selectedProjectObject: { selectedProject },
  } = useContextApp();

  return (
    <div className="flex justify-between items-center pt-7 px-7">
      <div className="flex items-center gap-2">
        <div className="p-[7px] bg-orange-200 rounded-lg flex items-center justify-center">
          <BorderAllIcon
            sx={{ fontSize: "21px" }}
            className="text-orange-600 cursor-pointer"
          />
        </div>
        <span className="font-semibold text-lg">
          {selectedProject ? "Edit Project" : "New Project"}
        </span>
      </div>
      <CloseOutlinedIcon
        sx={{ fontSize: "18px" }}
        className="text-slate-300 cursor-pointer"
        onClick={() => {
          handleClose();
          setSelectedIcon(null);
        }}
      />
    </div>
  );
}

function ProjectInput({
  register,
  errors,
}: {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}) {
  const contextApp = useContextApp();
  const openProjectWindow =
    contextApp?.openProjectWindowObject?.openProjectWindow || false;
  const setOpenIconWindow =
    contextApp?.openIconWindowObject?.setOpenIconWindow || (() => {});
  const selectedIcon = contextApp?.selectedIconObject?.selectedIcon || null;

  useEffect(() => {
    if (openProjectWindow) {
      const input = document.querySelector<HTMLInputElement>(
        'input[placeholder="Enter Project Name..."]'
      );
      input?.focus();
    }
  }, [openProjectWindow]);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[14px] font-medium text-slate-600">
        Project Name
      </span>
      <div className="flex gap-3 justify-between">
        <div className="w-full">
          <input
            {...register("projectName")}
            placeholder="Enter Project Name..."
            className="p-[10px] text-[13px] w-full rounded-md border outline-none"
          />
          {errors.projectName && (
            <p className="text-[11px] mt-2 text-red-500">
              {errors.projectName.message as string}
            </p>
          )}
        </div>
        <div
          onClick={() => setOpenIconWindow(true)}
          className="w-12 h-10 text-white flex items-center justify-center bg-orange-600 rounded-lg cursor-pointer"
        >
          {selectedIcon ? (
            getIconComponent(selectedIcon?.name, "text-white")
          ) : (
            <LibraryBooksIcon />
          )}
        </div>
      </div>
    </div>
  );
}

function Footer({
  handleClose,
  isLoading,
}: {
  handleClose: () => void;
  isLoading: boolean;
}) {
  const {
    selectedIconObject: { setSelectedIcon },
    selectedProjectObject: { selectedProject },
  } = useContextApp();

  return (
    <div className="w-full p-[12px] mt-8 mb-4 flex gap-3 justify-end items-center">
      <button
        type="button"
        onClick={() => {
          handleClose();
          setSelectedIcon(null);
        }}
        disabled={isLoading}
        className="border border-slate-200 text-slate-400 text-[13px] p-2 px-6 rounded-md hover:border-slate-300 transition-all disabled:opacity-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-orange-600 hover:bg-orange-700 text-white text-[13px] p-2 px-4 rounded-md transition-all disabled:opacity-50"
      >
        {isLoading
          ? selectedProject
            ? "Updating..."
            : "Adding..."
          : selectedProject
          ? "Edit Project"
          : "Add Project"}
      </button>
    </div>
  );
}

export default ProjectWindow;