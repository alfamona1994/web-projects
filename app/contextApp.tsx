"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { AppType, Project, SidebarMenuItem, IconData, DropDownPositions, TabsOption, Task } from "./Pages/types/AppType";
import { allIconArray } from "./Data/AllIcons";
import { allProjectsData } from "./Data/AllProjects";

const defaultState: AppType = {

    projectClickedObject: {
    projectClicked: null,
    setProjectClicked: () => {},
},

    openTasksWindowObject: {
        openTasksWindow: false,
        setOpenTasksWindow: () => {},
    },
    openSideBarObject: { openSideBar: false, setOpenSideBar: () => {} },
    sideBarMenuObject: { sideBarMenu: [], setSideBarMenu: () => {} },
    openProjectWindowObject: {
        openProjectWindow: false,
        setOpenProjectWindow: () => {},
    },
    allIconsDataObject: {
        allIconsData: [],
        setAllIconsData: () => {},
    },
    openIconWindowObject: {
        openIconWindow: false,
        setOpenIconWindow: () => {},
    },
    selectedIconObject: {
        selectedIcon: null,
        setSelectedIcon: () => {},
    },
    allProjectsObject: {
        allProjects: [],
        setAllProjects: () => {},
    },
    openDropDownObject: {
        openDropDown: false,
        setOpenDropDown: () => {},
    },
    dropDownPositionsObject: {
        dropDownPositions: { top: 0, left: 0, width: 0 },
        setDropDownPositions: () => {},
    },
    selectedProjectObject: {
        selectedProject: null,
        setSelectedProject: () => {},
    },
    selectedTaskObject: {
        selectedTask: null,
        setSelectedTask: () => {},
    },
    openConfirmationWindowObject: {
        openConfirmationWindow: false,
        setOpenConfirmationWindow: () => {},
    },
    sortingOptionObject: {
        sortingOptions: [],
        setSortingOptions: () => {},
    },
    sortingDropDownPositionsObject: {
        sortingDropDownPositions: { top: 0, left: 0, width: 0 },
        setSortingDropDownPositions: () => {},
    },
    openSortingDropDownObject: {
        openSortingDropDown: false,
        setOpenSortingDropDown: () => {},
    },
    chosenProjectObject: {
        chosenProject: null,
        setChosenProject: () => {},
    },
    tabsOptionsObject: {
        tabsOptions: [],
        setTabsOptions: () => {},
    },
    openProjectDropDownObject: {
        openProjectsDropDown: false,
        setOpenProjectsDropDown: () => {},
    },
    projectsDropDownPositionsObject: {
        projectsDropDownPositions: { top: 0, left: 0 },
        setProjectsDropDownPositions: () => {},
    },
    allTasksObject: {
        allTasks: [],
        setAllTasks: () => {},
    },
   
    
};

const ContextApp = createContext<AppType>(defaultState);

export default function ContextAppProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [openTasksWindow, setOpenTasksWindow] = useState(false);
    const [openSideBar, setOpenSideBar] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [sideBarMenu, setSideBarMenu] = useState<SidebarMenuItem[]>([
        { id: 1, name: "All Projects", isSelected: true },
        { id: 2, name: "All Tasks", isSelected: false },
        { id: 3, name: "Logout", isSelected: false },
    ]);

    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const [openProjectWindow, setOpenProjectWindow] = useState(false);
    const [allIconsData, setAllIconsData] = useState<IconData[]>(allIconArray);
    const [openIconWindow, setOpenIconWindow] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState<IconData | null>(null);
    const [openDropDown, setOpenDropDown] = useState(false);
    const [dropDownPositions, setDropDownPositions] = useState<DropDownPositions>({ top: 0, left: 0, width: 0 });
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    
    const [openConfirmationWindow, setOpenConfirmationWindow] = useState<boolean>(false);
    const [allProjectsState, setAllProjectsState] = useState<Project[]>([]);
    const [sortingDropDownPositions, setSortingDropDownPositions] = useState<DropDownPositions>({ top: 0, left: 0, width: 0 });
    const [openSortingDropDown, setOpenSortingDropDown] = useState(false);
    const [chosenProject, setChosenProject] = useState<Project | null>(null);
    const [tabsOptions, setTabsOptions] = useState<TabsOption[]>([
        { id: 1, name: "On Going Tasks", isSelected: true },
        { id: 2, name: "Completed Tasks", isSelected: false },
    ]);
    const [openProjectsDropDown, setOpenProjectsDropDown] = useState(false);
    const [projectsDropDownPositions, setProjectsDropDownPositions] = useState({
        top: 0,
        left: 0,
    });
    const [sortingOptions, setSortingOptions] = useState([
        {
            category: "Order",
            options: [
                { label: "A-Z", value: "asc", selected: true },
                { label: "Z-A", value: "desc", selected: false },
            ],
        },
        {
            category: "Date",
            options: [
                { label: "Newest", value: "newest", selected: false },
                { label: "Oldest", value: "oldest", selected: false },
            ],
        },
    ]);

    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [projectClicked, setProjectClicked] = useState<Project | null>(null);

    // ✅ FIX: Load from localStorage and apply default A-Z sort on mount
    useEffect(() => {
        const stored = localStorage.getItem("allProjects");
        let projects: Project[] = [];

        if (stored) {
            const parsed = JSON.parse(stored);
            projects = parsed.length === 0 ? allProjectsData : parsed;
        } else {
            projects = allProjectsData;
            localStorage.setItem("allProjects", JSON.stringify(allProjectsData));
        }

        // Apply default A-Z sort to match the default selected option
        const sorted = [...projects].sort((a, b) =>
            a.title.localeCompare(b.title)
        );
        setAllProjectsState(sorted);
    }, []);

    useEffect(() => {
        try {
            const extractAllTasks = allProjectsState.flatMap(
                (project) => project.tasks
            );
            setAllTasks(extractAllTasks);
        } catch (error) {
            console.log(error);
        }
    }, [allProjectsState]);

    function setAllProjects(projects: Project[] | ((prev: Project[]) => Project[])) {
        setAllProjectsState((prev) => {
            const updated =
                typeof projects === "function" ? projects(prev) : projects;
            localStorage.setItem("allProjects", JSON.stringify(updated));
            return updated;
        });
    }

    useEffect(() => {
        function handleResize() {
            setIsMobileView(window.innerWidth <= 940);
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (isMobileView) {
            setOpenSideBar(false);
        }
    }, [isMobileView]);

    useEffect(() => {
        setOpenSideBar(false);
    }, [sideBarMenu]);

    return (
        <ContextApp.Provider
            value={{
                openTasksWindowObject: { openTasksWindow, setOpenTasksWindow },
                openSideBarObject: { openSideBar, setOpenSideBar },
                sideBarMenuObject: { sideBarMenu, setSideBarMenu },
                openProjectWindowObject: { openProjectWindow, setOpenProjectWindow },
                allIconsDataObject: { allIconsData, setAllIconsData },
                openIconWindowObject: { openIconWindow, setOpenIconWindow },
                selectedIconObject: { selectedIcon, setSelectedIcon },
                allProjectsObject: { allProjects: allProjectsState, setAllProjects },
                dropDownPositionsObject: { dropDownPositions, setDropDownPositions },
                openDropDownObject: { openDropDown, setOpenDropDown },
                selectedProjectObject: { selectedProject, setSelectedProject },
                selectedTaskObject: { selectedTask, setSelectedTask },
                openConfirmationWindowObject: { openConfirmationWindow, setOpenConfirmationWindow },
                sortingOptionObject: { sortingOptions, setSortingOptions },
                sortingDropDownPositionsObject: { sortingDropDownPositions, setSortingDropDownPositions },
                openSortingDropDownObject: { openSortingDropDown, setOpenSortingDropDown },
                chosenProjectObject: { chosenProject, setChosenProject },
                tabsOptionsObject: { tabsOptions, setTabsOptions },
                projectsDropDownPositionsObject: {
                    projectsDropDownPositions,
                    setProjectsDropDownPositions,
                },
                openProjectDropDownObject: {
                    openProjectsDropDown,
                    setOpenProjectsDropDown,
                },
                allTasksObject: { allTasks, setAllTasks },
                projectClickedObject: { projectClicked, setProjectClicked },
                
            }}
        >
            {children}
        </ContextApp.Provider>
    );
}

export function useContextApp() {
    return useContext(ContextApp);
}