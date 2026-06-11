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
import { Project, Task } from "@/app/Pages/types/AppType";
import {
    useForm,
    SubmitHandler,
    UseFormRegister,
    FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { addNewTask, updateTaskAndProjects } from "@/app/functions/tasksFunction";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export type SelectionOption = "priority" | "project";

export type Priority = {
    id: number;
    name: string;
    icon: React.ReactNode;
    isSelected: boolean;
};

// ✅ Fixed: removed the broken merged interface block, replaced with clean versions
interface DeleteTaskProps {
    taskToDelete: Task;
    allProjects: Project[];
    chosenProject: Project | null;
    setAllTasks: Dispatch<SetStateAction<Task[]>>;
    setChosenProject: Dispatch<SetStateAction<Project | null>>;
    setAllProjects: (projects: Project[] | ((prev: Project[]) => Project[])) => void;
}

export type ProjectWithSelection = Project & { isSelected: boolean };

export type TaskFormType = {
    clickedSelection: SelectionOption | null;
    setClickedSelection: Dispatch<SetStateAction<SelectionOption | null>>;
    openTasksDropDown: boolean;
    setOpenTasksDropDown: Dispatch<SetStateAction<boolean>>;
    tasksDropDownPositions: { left: number; top: number; width: number };
    setTasksDropDownPositions: Dispatch<SetStateAction<{ left: number; top: number; width: number }>>;
    priority: Priority | null;
    setPriority: Dispatch<SetStateAction<Priority | null>>;
    project: Project | null;
    setProject: Dispatch<SetStateAction<Project | null>>;
    priorityListObject: {
        priorityList: Priority[];
        setPriorityList: Dispatch<SetStateAction<Priority[]>>;
    };
    updatedAllProjectsObject: {
        updatedAllProjects: ProjectWithSelection[];
        setUpdatedAllProjects: Dispatch<SetStateAction<ProjectWithSelection[]>>;
    };
    selectionErrorsObject: {
        selectionErrors: { id: number; label: string; message: string; show: boolean }[];
        setSelectionErrors: Dispatch<SetStateAction<{ id: number; label: string; message: string; show: boolean }[]>>;
    };
};

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
    priorityListObject: { priorityList: [], setPriorityList: () => {} },
    updatedAllProjectsObject: { updatedAllProjects: [], setUpdatedAllProjects: () => {} },
    selectionErrorsObject: { selectionErrors: [], setSelectionErrors: () => {} },
};

const TaskFormContext = createContext<TaskFormType>(taskFormDefaultState);

export function useTaskFormContext() {
    return useContext(TaskFormContext);
}

const schema = z.object({
    taskName: z
        .string()
        .min(1, { message: "Task name is required" })
        .max(30, { message: "Task name must be less than 30 characters" }),
});

type FormData = z.infer<typeof schema>;

// ✅ Fixed: deleteTask now has its own proper type definition right above it
export const deleteTask = ({
    taskToDelete,
    allProjects,
    chosenProject,
    setAllTasks,
    setChosenProject,
    setAllProjects,
}: DeleteTaskProps): void => {
    const updatedProjects = allProjects.map((proj: Project) => ({
        ...proj,
        tasks: proj.tasks.filter((task: Task) => task.id !== taskToDelete.id),
    }));

    const updatedAllTasks = updatedProjects.flatMap((proj: Project) => proj.tasks);
    setAllTasks(updatedAllTasks);

    if (chosenProject && chosenProject.tasks.some((task: Task) => task.id === taskToDelete.id)) {
        const updatedChosenProject: Project = {
            ...chosenProject,
            tasks: chosenProject.tasks.filter((task: Task) => task.id !== taskToDelete.id),
        };
        setChosenProject(updatedChosenProject);
    }

    setAllProjects(updatedProjects);
};

export function TasksWindow() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        setFocus,
        setError,
        setValue,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const [clickedSelection, setClickedSelection] = useState<SelectionOption | null>(null);
    const [openTasksDropDown, setOpenTasksDropDown] = useState(false);
    const [tasksDropDownPositions, setTasksDropDownPositions] = useState<{
        left: number; top: number; width: number;
    }>({ left: 0, top: 0, width: 0 });

    const [priority, setPriority] = useState<Priority | null>(null);
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [priorityList, setPriorityList] = useState<Priority[]>([
        { id: 1, name: "Low",    icon: <CircleIcon className="text-[14px] text-green-500" />,  isSelected: false },
        { id: 2, name: "Medium", icon: <CircleIcon className="text-[14px] text-yellow-500" />, isSelected: false },
        { id: 3, name: "High",   icon: <CircleIcon className="text-[14px] text-red-500" />,    isSelected: false },
    ]);

    const [selectionErrors, setSelectionErrors] = useState([
        { id: 1, label: "priority", message: "Please select a priority", show: false },
        { id: 2, label: "project",  message: "Please select a project",  show: false },
    ]);

    const {
        allProjectsObject: { allProjects, setAllProjects },
        openTasksWindowObject: { openTasksWindow, setOpenTasksWindow },
        selectedIconObject: { selectedIcon },
        chosenProjectObject: { chosenProject, setChosenProject },
        allTasksObject: { allTasks, setAllTasks },
        selectedTaskObject: { selectedTask, setSelectedTask },
        projectClickedObject: { projectClicked, setProjectClicked },
    } = useContextApp();

    const [updateAllProjects, setUpdateAllProjects] = useState<ProjectWithSelection[]>([]);

    useEffect(() => {
        const tempAllProjects: ProjectWithSelection[] = allProjects.map(
            (p) => ({ ...p, isSelected: false })
        );
        setUpdateAllProjects(tempAllProjects);
    }, [allProjects]);

    // ✅ Fixed: pre-fill form when editing an existing task
    useLayoutEffect(() => {
        // Reset the input when opening the window
        if (!selectedTask) {
            if (projectClicked) {
                setProject(projectClicked);
                setUpdateAllProjects((prevProjects) =>
                    prevProjects.map((proj) => ({
                        ...proj,
                        isSelected: proj.id === projectClicked.id,
                    }))
                );
            } else {
                setProject(null);
            }
            reset();
            setPriority(null);
        } else {
            // Update the form for task editing
            setValue("taskName", selectedTask.title);
            setPriorityList((prevList) =>
                prevList.map((list) => ({
                    ...list,
                    isSelected: list.name === selectedTask.priority,
                }))
            );

            reset({ taskName: selectedTask.title });
            const matchedProject = allProjects.find((p) => p.title === selectedTask.projectName) || null;
            setProject(matchedProject);
        }

        setTimeout(() => setFocus("taskName"), 0);
        setSelectionErrors((prev) => prev.map((e) => ({ ...e, show: false })));
    }, [openTasksWindow, selectedTask, projectClicked, allProjects, reset, setFocus]);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        if (project) {
            const findProject = updateAllProjects.find((proj) => proj.id === project.id);
           // ✅ After:
            const findTask = findProject?.tasks.find(
            (task: Task) =>
            task.title?.toLowerCase() === data.taskName.toLowerCase() && // ← added ? guard
            task.id !== selectedTask?.id
            );
            if (findTask) {
                setError("taskName", {
                    type: "manual",
                    message: "A task with this name already exists in the selected project",
                });
                setFocus("taskName");
                return;
            }
        }

        const newErrors = selectionErrors.map((error) => ({
            ...error,
            show:
                (error.label === "priority" && !priority) ||
                (error.label === "project" && !project),
        }));
        setSelectionErrors(newErrors);

        if (newErrors.every((error) => !error.show)) {
            tasksFunction(data);
        }
    };

    // ✅ Fixed: cleaned up tasksFunction — removed all the duplicate logic from finally block
    async function tasksFunction(data: FormData) {
        try {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));

            if (!selectedTask) {
                // ADD new task
                const newTask: Task = {
                    id: uuid(),
                    title: data.taskName,
                    icon: selectedIcon ? selectedIcon.name : "MenuBook",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    priority: priority ? (priority.name as "Low" | "Medium" | "High") : "Low",
                    projectName: project?.title || "",
                    status: "In Progress",
                };

                addNewTask(
                    newTask,
                    allProjects,
                    setAllProjects,
                    chosenProject,
                    setChosenProject,
                    allTasks,
                    setAllTasks,
                    project
                );
            } else {
                // EDIT existing task
                const updateTask: Task = {
                    ...selectedTask,
                    title: data.taskName,
                    icon: selectedIcon?.name || "MenuBook",
                    status: selectedTask.status,
                    projectName: project?.title || "",
                    priority: (priority?.name as "Low" | "Medium" | "High") || "Low",
                    updatedAt: new Date().toISOString(),
                };

                updateTaskAndProjects({
                    updateTask,
                    project,
                    allProjects,
                    chosenProject,
                    setAllTasks,
                    setChosenProject,
                    setAllProjects,
                });
            }

            toast.success(
            `the task has been ${selectedTask ? "edited" : "added"} successfully`
            );
            setIsLoading(false);
            setOpenTasksWindow(false);
            setSelectedTask(null); // ✅ reset after save
            setProjectClicked(null);

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

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
                priorityListObject: { priorityList, setPriorityList },
                updatedAllProjectsObject: {
                    updatedAllProjects: updateAllProjects,
                    setUpdatedAllProjects: setUpdateAllProjects,
                },
                selectionErrorsObject: { selectionErrors, setSelectionErrors },
            }}
        >
            <div
                className={`w-[48%] max-[600px]:w-[93%] z-[80] p-3 left-1/2 top-[47%] -translate-y-1/2
                -translate-x-1/2 absolute flex flex-col gap-3 border border-slate-50
                bg-white rounded-lg shadow-md ${openTasksWindow ? "" : "hidden"}`}
            >
                {openTasksDropDown && <TasksDropDown />}
                <Header />
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-2 pt-8 px-7 mt-3"
                >
                    <TaskInput register={register} errors={errors} />
                    <div className="flex justify-between gap-3 mt-5">
                        <PrioritySelection />
                        <ProjectsSelection />
                    </div>
                    <Footer isLoading={isLoading} selectedTask={selectedTask} />
                </form>
            </div>
        </TaskFormContext.Provider>
    );
}

function Header() {
    const {
        openTasksWindowObject: { setOpenTasksWindow },
        selectedTaskObject: { selectedTask }, 
        projectClickedObject: { setProjectClicked },   // ✅ show correct title
    } = useContextApp();

    return (
        <div className="flex justify-between items-center pt-7 px-7">
            <div className="flex items-center gap-2">
                <div className="p-[7px] bg-orange-200 rounded-lg flex items-center justify-center">
                    <ListAltIcon 
                        sx={{ fontSize: "21px" }}
                        className="text-orange-600"
                        onClick={() => {
                        setProjectClicked(null);
                        setOpenTasksWindow(false) 
                        }}
                        />
                </div>
                <span className="font-semibold text-lg">
                    {selectedTask ? "Edit Task" : "Add New Task"} {/* ✅ dynamic title */}
                </span>
            </div>

            <CloseOutlinedIcon 
                sx={{ fontSize: "18px" }}
                className="text-slate-300 cursor-pointer"
                onClick={() => {
                    setOpenTasksWindow(false);
                    setProjectClicked(null); // ✅ reset on close
                }}

                />
        </div>
    );
}

// ✅ Fixed: Footer now shows "Edit Task" vs "Add Task" correctly
function Footer({ isLoading, selectedTask }: { isLoading: boolean; selectedTask: Task | null }) {
    const {
        openTasksWindowObject: { setOpenTasksWindow },
        selectedIconObject: { setSelectedIcon },
        selectedTaskObject: { setSelectedTask },
        projectClickedObject: { setProjectClicked },
    } = useContextApp();

    return (
        <div className="w-full p-[12px] mt-8 mb-4 flex gap-3 justify-end items-center">
            <button
                type="button"
                onClick={() => {
                    setOpenTasksWindow(false);
                    setSelectedIcon(null);
                    setSelectedTask(null);
                    setProjectClicked(null);
                }}
                className="border border-slate-200 text-slate-400 text-[13px] p-2 px-6 rounded-md hover:border-slate-300 transition-all"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={isLoading}
                className="bg-orange-600 hover:bg-orange-700 text-white text-[13px] p-2 px-4 rounded-md transition-all disabled:opacity-60"
            >
                {isLoading
                    ? selectedTask ? "Updating..." : "Adding..."
                    : selectedTask ? "Edit Task" : "Add Task"}
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
            <span className="text-[14px] font-medium text-slate-600">Task Name</span>
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
                    {selectedIcon ? getIconComponent(selectedIcon.name, "text-white") : <LibraryBooksIcon />}
                </div>
            </div>
        </div>
    );
}

function PrioritySelection() {
    const {
        setClickedSelection,
        setOpenTasksDropDown,
        setTasksDropDownPositions,
        priority,
        selectionErrorsObject: { selectionErrors, setSelectionErrors },
    } = useTaskFormContext();

    const prioritySelectionRef = useRef<HTMLDivElement>(null);

    function handleClickedSelection() {
        if (prioritySelectionRef.current) {
            const { left, top, width } = prioritySelectionRef.current.getBoundingClientRect();
            setTasksDropDownPositions({ left, top, width });
        }
        setOpenTasksDropDown(true);
        setClickedSelection("priority");
        setSelectionErrors((prev) =>
            prev.map((e) => ({ ...e, show: e.label === "priority" ? false : e.show }))
        );
    }

    const priorityError = selectionErrors.find((e) => e.label === "priority");

    return (
        <div
            ref={prioritySelectionRef}
            onClick={handleClickedSelection}
            className="flex flex-col gap-2 w-full relative cursor-pointer"
        >
            <span className="text-[14px] font-medium text-slate-600">Priority</span>
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
                <span className="text-red-500 text-[12px] mt-1">{priorityError.message}</span>
            )}
        </div>
    );
}

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
            const { left, top, width } = projectSelectionRef.current.getBoundingClientRect();
            setTasksDropDownPositions({ left, top, width });
        }
        setOpenTasksDropDown(true);
        setClickedSelection("project");
        setSelectionErrors((prev) =>
            prev.map((e) => ({ ...e, show: e.label === "project" ? false : e.show }))
        );
    }

    const projectError = selectionErrors.find((e) => e.label === "project");

    return (
        <div
            ref={projectSelectionRef}
            onClick={handleClickedSelection}
            className="flex flex-col gap-2 w-full relative cursor-pointer"
        >
            <span className="text-[14px] font-medium text-slate-600">Projects</span>
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
                <span className="text-red-500 text-[12px] mt-1">{projectError.message}</span>
            )}
        </div>
    );
}