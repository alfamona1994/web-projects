import type { ReactNode, Dispatch, SetStateAction } from "react";

/* ---------------- Sidebar Menu ---------------- */
export type SidebarMenuItem = {
  id: number;
  name: string;
  isSelected: boolean;
};

/* ---------------- Tabs Options ---------------- */
export type TabsOption = {
  id: number;
  name: string;
  isSelected: boolean;
};

/* ---------------- Task ---------------- */
export type Task = {
  id: string;
  // FIX: was "name" in AppType but "title" in TasksWindow — unified to "title"
  title: string;
  icon: string;
  projectName: string;
  status: "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  createdAt: string;
  updatedAt: string;
};

/* ---------------- Project ---------------- */
export type Project = {
  id: string;
  clerkUserId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  icon: string;
  tasks: Task[];
};

/* ---------------- Icon ---------------- */
export type IconData = {
  id: number;
  name: string;
  icon: ReactNode;
  isSelected: boolean;
};

/* ---------------- Sorting Options ---------------- */
export type SortingOption = {
  category: string;
  options: {
    label: string;
    value: string;
    selected: boolean;
  }[];
};

/* ---------------- Dropdown Position ---------------- */
export type DropDownPositions = {
  top: number;
  left: number;
  width: number;
};

/* ---------------- App Context Type ---------------- */
export type AppType = {
  openTasksWindowObject: {
    openTasksWindow: boolean;
    setOpenTasksWindow: Dispatch<SetStateAction<boolean>>;
  };

  projectsDropDownPositionsObject: {
    projectsDropDownPositions: { top: number; left: number };
    setProjectsDropDownPositions: Dispatch<SetStateAction<{ top: number; left: number }>>;
  };

  openProjectDropDownObject: {
    openProjectsDropDown: boolean;
    setOpenProjectsDropDown: Dispatch<SetStateAction<boolean>>;
  };

  sortingDropDownPositionsObject: {
    sortingDropDownPositions: DropDownPositions;
    setSortingDropDownPositions: Dispatch<SetStateAction<DropDownPositions>>;
  };

  openSortingDropDownObject: {
    openSortingDropDown: boolean;
    setOpenSortingDropDown: Dispatch<SetStateAction<boolean>>;
  };

  sortingOptionObject: {
    sortingOptions: SortingOption[];
    setSortingOptions: Dispatch<SetStateAction<SortingOption[]>>;
  };

  openSideBarObject: {
    openSideBar: boolean;
    setOpenSideBar: Dispatch<SetStateAction<boolean>>;
  };

  sideBarMenuObject: {
    sideBarMenu: SidebarMenuItem[];
    setSideBarMenu: Dispatch<SetStateAction<SidebarMenuItem[]>>;
  };

  openProjectWindowObject: {
    openProjectWindow: boolean;
    setOpenProjectWindow: Dispatch<SetStateAction<boolean>>;
  };

  allIconsDataObject: {
    allIconsData: IconData[];
    setAllIconsData: Dispatch<SetStateAction<IconData[]>>;
  };

  openIconWindowObject: {
    openIconWindow: boolean;
    setOpenIconWindow: Dispatch<SetStateAction<boolean>>;
  };

  selectedIconObject: {
    selectedIcon: IconData | null;
    setSelectedIcon: Dispatch<SetStateAction<IconData | null>>;
  };

  allProjectsObject: {
    allProjects: Project[];
    setAllProjects: (projects: Project[] | ((prev: Project[]) => Project[])) => void;
  };

  // Add this to the AppType definition (in the AppType object):


  // FIX: allTasksObject was used everywhere but missing from AppType entirely
  allTasksObject: {
    allTasks: Task[];
    setAllTasks: Dispatch<SetStateAction<Task[]>>;
  };

  openDropDownObject: {
    openDropDown: boolean;
    setOpenDropDown: Dispatch<SetStateAction<boolean>>;
  };

  dropDownPositionsObject: {
    dropDownPositions: DropDownPositions;
    setDropDownPositions: Dispatch<SetStateAction<DropDownPositions>>;
  };

  selectedProjectObject: {
    selectedProject: Project | null;
    setSelectedProject: Dispatch<SetStateAction<Project | null>>;
  };

  selectedTaskObject: {
    selectedTask: Task | null;
    setSelectedTask: Dispatch<SetStateAction<Task | null>>;
  };

  openConfirmationWindowObject: {
    openConfirmationWindow: boolean;
    setOpenConfirmationWindow: Dispatch<SetStateAction<boolean>>;
  };

  chosenProjectObject: {
    chosenProject: Project | null;
    setChosenProject: Dispatch<SetStateAction<Project | null>>;
  };

  tabsOptionsObject: {
    tabsOptions: TabsOption[];
    setTabsOptions: Dispatch<SetStateAction<TabsOption[]>>;
  };

  projectClickedObject: {
    projectClicked: Project | null;
    setProjectClicked: React.Dispatch<React.SetStateAction<Project | null>>;
}; 
};