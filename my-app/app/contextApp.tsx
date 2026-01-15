"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { AppType, SidebarMenuItem, IconData } from "./Pages/types/AppType";
import { allIconArray } from "./Data/AllIcons";

//Setting the structure of the context

//Setting the default state
const defaultState: AppType = {
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
};

//creating the context
const ContextApp = createContext<AppType>(defaultState);

// Creating the provider
export default function ContextAppProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [openSideBar, setOpenSideBar] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [sideBarMenu, setSideBarMenu] = useState<SidebarMenuItem[]>([
        {
            id: 1,
            name: "All Projects",
            isSelected: true,
        },
        {
            id: 2,
            name: "All Tasks",
            isSelected: false,
        },
        {
            id: 3,
            name: "Logout",
            isSelected: false,
        },
    ]);

    const [ openProjectWindow, setOpenProjectWindow] = useState(false);
    const [allIconsData, setAllIconsData] = useState<IconData[]>(allIconArray);
    const [openIconWindow, setOpenIconWindow] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState<IconData | null>(null);

    //Update the window size
    useEffect(() => {
        function handleResize() {
            setIsMobileView(window.innerWidth <= 940);
        }

        // Initial check
        handleResize();

        // Event Listener for window resize
        window.removeEventListener("resize", handleResize);

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize)
        };
    }, []);

    //Close the side bar on mobile view is false
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
                openSideBarObject: { openSideBar, setOpenSideBar}, 
                sideBarMenuObject: { sideBarMenu, setSideBarMenu},
                openProjectWindowObject: {openProjectWindow, setOpenProjectWindow},    
                allIconsDataObject: {allIconsData, setAllIconsData},
                openIconWindowObject: {openIconWindow, setOpenIconWindow},
                selectedIconObject: {selectedIcon, setSelectedIcon},
            }}
        >
            {children}
        </ContextApp.Provider>
    );
}

//Creating the hook
export function useContextApp() {
    return useContext(ContextApp);
}