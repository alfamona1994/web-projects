"use client";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CircleIcon from "@mui/icons-material/Circle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import TasksDropDown from "../DropDowns/TasksDropDown";
import { useContextApp } from "@/app/contextApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {
    createContext,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { getIconComponent } from "@/app/functions/IconsActions";
import { Project } from "@/app/Pages/types/AppType";
import {
    useForm,
    SubmitHandler,
    UseFormRegister,
    FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type SelectionOption = "priority" | "project";

export type Priority = {
    id: number;
    name: string;
    icon: React.ReactNode;
    isSelected: boolean;
};

export type ProjectWithSelection = Project & { isSelected: boolean };

// Define the structure of our context
type TaskFormType = {
    clickedSelection: SelectionOption | null;
    setClickedSelection: React.Dispatch<React.SetStateAction<SelectionOption | null>>;
    openTasksDropDown: boolean;
    setOpenTasksDropDown: React.Dispatch<React.SetStateAction<boolean>>;
    tasksDropDownPositions: { left: number; top: number; width: number };
    setTasksDropDownPositions: React.Dispatch<
        React.SetStateAction<{ left: number; top: number; width: number }>
    >;
    priority: Priority | null;
    setPriority: React.Dispatch<React.SetStateAction<Priority | null>>;
    project: Project | null;
    setProject: React.Dispatch<React.SetStateAction<Project | null>>;
    priorityListObject: {
        priorityList: Priority[];
        setPriorityList: React.Dispatch<React.SetStateAction<Priority[]>>;
    };
    updatedAllProjectsObject: {
        updatedAllProjects: ProjectWithSelection[];
        setUpdatedAllProjects: React.Dispatch<React.SetStateAction<ProjectWithSelection[]>>;
    };
    selectionErrorsObject: {
        selectionErrors: { id: number; label: string; message: string; show: boolean }[];
        setSelectionErrors: React.Dispatch<
            React.SetStateAction<{ id: number; label: string; message: string; show: boolean }[]>
        >;
    };
};

// Set the default state
const taskFormDefaultState: TaskFormType = {
    clickedSelection: null,
    setClickedSelection: () => {},
    openTasksDropDown: false,
    setOpenTasksDropDown: () => {},
    tasksDropDownPositions: { left: 0, top: 0, width: 0 },
    setTasksDropDownPositions: () => {},
    priority: null,
    setPriority: () => {},
    project: null,
    setProject: () => {},
    priorityListObject: {
        priorityList: [],
        setPriorityList: () => {},
    },
    updatedAllProjectsObject: {
        updatedAllProjects: [],
        setUpdatedAllProjects: () => {},
    },
    selectionErrorsObject: {
        selectionErrors: [],
        setSelectionErrors: () => {},
    },
};

// Create context
const TaskFormContext = createContext<TaskFormType>(taskFormDefaultState);

// Create a custom hook to consume our context
export function useTaskFormContext() {
    return useContext(TaskFormContext);
}

// Zod schema
const schema = z.object({
    taskName: z
        .string()
        .min(1, { message: "Task name is required" })
        .max(30, { message: "Task name must be less than 30 characters" }),
});

// Infer the type from the schema
type FormData = z.infer<typeof schema>;

export function TasksWindow() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        setFocus,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const [clickedSelection, setClickedSelection] =
        useState<SelectionOption | null>(null);

    const [openTasksDropDown, setOpenTasksDropDown] = useState(false);
    const [tasksDropDownPositions, setTasksDropDownPositions] = useState<{
        left: number;
        top: number;
        width: number;
    }>({
        left: 0,
        top: 0,
        width: 0,
    });

    const [priority, setPriority] = useState<Priority | null>(null);
    const [project, setProject] = useState<Project | null>(null);

    const [priorityList, setPriorityList] = useState<Priority[]>([
        {
            id: 1,
            name: "Low",
            icon: <CircleIcon className="text-[14px] text-green-500" />,
            isSelected: false,
        },
        {
            id: 2,
            name: "Medium",
            icon: <CircleIcon className="text-[14px] text-yellow-500" />,
            isSelected: false,
        },
        {
            id: 3,
            name: "High",
            icon: <CircleIcon className="text-[14px] text-red-500" />,
            isSelected: false,
        },
    ]);

    const [selectionErrors, setSelectionErrors] = useState([
        {
            id: 1,
            label: "priority",
            message: "Please select a priority",
            show: false,
        },
        {
            id: 2,
            label: "project",
            message: "Please select a project",
            show: false,
        },
    ]);

    const {
        allProjectsObject: { allProjects },
        openTasksWindowObject: { openTasksWindow, setOpenTasksWindow },
    } = useContextApp();

    const [updateAllProjects, setUpdateAllProjects] = useState<
        ProjectWithSelection[]
    >([]);

    // Whenever allProjects updates, add the isSelected property
    useEffect(() => {
        const tempAllProjects: ProjectWithSelection[] = allProjects.map(
            (project) => ({
                ...project,
                isSelected: false,
            })
        );
        setUpdateAllProjects(tempAllProjects);
    }, [allProjects]);

    useLayoutEffect(() => {
        // Reset the input
        reset();
        // Reset the priority and project states
        setPriority(null);
        setProject(null);
        // Focus on the input
        setTimeout(() => {
            setFocus("taskName");
        }, 0);
        // Set the show properties to false
        setSelectionErrors((prevState) =>
            prevState.map((error) => ({ ...error, show: false }))
        );
    }, [openTasksWindow]);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const newErrors = selectionErrors.map((error) => {
            if (error.label === "priority" && !priority) {
                return { ...error, show: true };
            }
            if (error.label === "project" && !project) {
                return { ...error, show: true };
            }
            return { ...error, show: false };
        });

        // If the show properties are false when the user clicks submit
        // Then update or add a task
        if (newErrors.every((error) => error.show === false)) {
            console.log("success");
        }

        setSelectionErrors(newErrors);
    };

    return (
        <TaskFormContext.Provider
            value={{
                clickedSelection,
                setClickedSelection,
                openTasksDropDown,
                setOpenTasksDropDown,
                tasksDropDownPositions,
                setTasksDropDownPositions,
                priority,
                setPriority,
                project,
                setProject,
                priorityListObject: {
                    priorityList,
                    setPriorityList,
                },
                updatedAllProjectsObject: {
                    updatedAllProjects: updateAllProjects,
                    setUpdatedAllProjects: setUpdateAllProjects,
                },
                selectionErrorsObject: {
                    selectionErrors,
                    setSelectionErrors,
                },
            }}
        >
            <div
                className={`w-[48%] max-[600px]:w-[93%] z-[80] p-3 left-1/2 top-[47%] -translate-y-1/2
                -translate-x-1/2 absolute flex flex-col gap-3 border border-slate-50
                bg-white rounded-lg shadow-md ${openTasksWindow ? "" : "hidden"}`}
            >
                {/* FIX 1: Render TasksDropDown conditionally so it never intercepts
                    clicks when closed. Previously it was always mounted and its
                    absolutely-positioned overlay was blocking the "New Task" button. */}
                {openTasksDropDown && <TasksDropDown />}

                <Header />
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-2 pt-8 px-7 mt-3"
                >
                    {/* Input and icon */}
                    <TaskInput register={register} errors={errors} />
                    {/* Both selections components */}
                    <div className="flex justify-between gap-3 mt-5">
                        <PrioritySelection />
                        <ProjectsSelection />
                    </div>
                    <Footer />
                </form>
            </div>
        </TaskFormContext.Provider>
    );
}

function Header() {
    const {
        openTasksWindowObject: { setOpenTasksWindow },
    } = useContextApp();

    return (
        <div className="flex justify-between items-center pt-7 px-7">
            <div className="flex items-center gap-2">
                <div className="p-[7px] bg-orange-200 rounded-lg flex items-center justify-center">
                    <ListAltIcon
                        sx={{ fontSize: "21px" }}
                        className="text-orange-600 cursor-pointer"
                    />
                </div>
                <span className="font-semibold text-lg">New Task</span>
            </div>
            <span
                onClick={() => setOpenTasksWindow(false)}
                className="text-slate-300 cursor-pointer text-sm"
            >
                ✕
            </span>
        </div>
    );
}

// Priority selection
function PrioritySelection() {
    const {
        setClickedSelection,
        setOpenTasksDropDown,
        openTasksDropDown,
        setTasksDropDownPositions,
        priority,
        clickedSelection,
        selectionErrorsObject: { selectionErrors, setSelectionErrors },
    } = useTaskFormContext();

    const prioritySelectionRef = useRef<HTMLDivElement>(null);

    function handleClickedSelection() {
        if (prioritySelectionRef.current) {
            const rect = prioritySelectionRef.current.getBoundingClientRect();
            const { left, top, width } = rect;
            setTasksDropDownPositions({ left, top, width });
        }
        setOpenTasksDropDown(true);
        setClickedSelection("priority");
        // Hide the priority error if shown
        setSelectionErrors((prevState) =>
            prevState.map((error) => ({
                ...error,
                show: error.label === "priority" ? false : error.show,
            }))
        );
    }

    // FIX 2: Use .find() instead of hard-coded index [0] — safer if array order ever changes
    const priorityError = selectionErrors.find((e) => e.label === "priority");

    return (
        <div
            ref={prioritySelectionRef}
            onClick={handleClickedSelection}
            className="flex flex-col gap-2 w-full relative cursor-pointer"
        >
            <span className="text-[14px] font-medium text-slate-600">
                Priority
            </span>
            <div className="flex justify-between items-center border h-[42px] px-2 rounded-md">
                <span className="w-full text-[13px] text-slate-400">
                    {priority ? (
                        <div className="flex gap-1 items-center">
                            <div>{priority.icon}</div>
                            <span className="mt-[3px]">{priority.name}</span>
                        </div>
                    ) : (
                        <span>Select Priority</span>
                    )}
                </span>
                <KeyboardArrowDownIcon className="absolute top-[40px] right-3 text-slate-400" />
            </div>
            {priorityError?.show && (
                <span className="text-red-500 text-[12px] mt-1">
                    {priorityError.message}
                </span>
            )}
        </div>
    );
}

function Footer() {
    const {
        openTasksWindowObject: { setOpenTasksWindow },
        selectedIconObject: { setSelectedIcon },
    } = useContextApp();

    return (
        <div className="w-full p-[12px] mt-8 mb-4 flex gap-3 justify-end items-center">
            <button
                type="button"
                onClick={() => {
                    setOpenTasksWindow(false);
                    setSelectedIcon(null);
                }}
                className="border border-slate-200 text-slate-400 text-[13px] p-2 px-6 rounded-md hover:border-slate-300 transition-all"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white text-[13px] p-2 px-4 rounded-md transition-all"
            >
                Add Task
            </button>
        </div>
    );
}

function TaskInput({
    register,
    errors,
}: {
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>;
}) {
    const {
        selectedIconObject: { selectedIcon },
        openIconWindowObject: { setOpenIconWindow },
    } = useContextApp();

    return (
        <div className="flex flex-col gap-2">
            <span className="text-[14px] font-medium text-slate-600">
                Task Name
            </span>
            <div className="flex gap-3 justify-between">
                <div className="w-full">
                    <input
                        {...register("taskName")}
                        placeholder="Enter Task Name..."
                        className="p-[10px] text-[13px] w-full rounded-md border outline-none"
                    />
                    {errors.taskName && (
                        <p className="text-red-500 text-[12px] mt-1">
                            {errors.taskName.message}
                        </p>
                    )}
                </div>
                <div
                    onClick={() => setOpenIconWindow(true)}
                    className="w-12 h-10 text-white flex items-center justify-center bg-orange-600 rounded-lg cursor-pointer"
                >
                    {selectedIcon ? (
                        getIconComponent(selectedIcon.name, "text-white")
                    ) : (
                        <LibraryBooksIcon />
                    )}
                </div>
            </div>
        </div>
    );
}

// Projects selection
function ProjectsSelection() {
    const {
        setClickedSelection,
        setOpenTasksDropDown,
        setTasksDropDownPositions,
        project,
        selectionErrorsObject: { selectionErrors, setSelectionErrors },
    } = useTaskFormContext();

    const projectSelectionRef = useRef<HTMLDivElement>(null);

    function handleClickedSelection() {
        if (projectSelectionRef.current) {
            const rect = projectSelectionRef.current.getBoundingClientRect();
            const { left, top, width } = rect;
            setTasksDropDownPositions({ left, top, width });
        }
        setOpenTasksDropDown(true);
        setClickedSelection("project");
        // FIX 3: ProjectsSelection was missing error clearing — added to match PrioritySelection
        setSelectionErrors((prevState) =>
            prevState.map((error) => ({
                ...error,
                show: error.label === "project" ? false : error.show,
            }))
        );
    }

    // FIX 2 (same): Use .find() instead of hard-coded index [1]
    const projectError = selectionErrors.find((e) => e.label === "project");

    return (
        <div
            ref={projectSelectionRef}
            onClick={handleClickedSelection}
            className="flex flex-col gap-2 w-full relative cursor-pointer"
        >
            <span className="text-[14px] font-medium text-slate-600">
                Projects
            </span>
            <div className="flex justify-between items-center border h-[42px] px-2 rounded-md">
                <span className="w-full text-[13px] text-slate-400">
                    {project ? (
                        <div className="flex gap-1 items-center">
                            <div>{getIconComponent(project.icon, "text-[16px]")}</div>
                            <span className="mt-[3px]">{project.title}</span>
                        </div>
                    ) : (
                        <span>Select Project</span>
                    )}
                </span>
                <KeyboardArrowDownIcon className="absolute top-[40px] right-3 text-slate-400" />
            </div>
            {projectError?.show && (
                <span className="text-red-500 text-[12px] mt-1">
                    {projectError.message}
                </span>
            )}
        </div>
    );
}