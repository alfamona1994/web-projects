"use client";
import { useContextApp } from "@/app/contextApp";
import React, { useEffect } from "react";

function SortingDropDown() {
  const {
    sortingOptionObject: { sortingOptions, setSortingOptions },
    openSortingDropDownObject: { openSortingDropDown, setOpenSortingDropDown },
    sortingDropDownPositionsObject: { sortingDropDownPositions },
    allProjectsObject: { allProjects, setAllProjects },
  } = useContextApp();

  const dropDownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setOpenSortingDropDown(false);
      }
    }

    function handleResize() {
      setOpenSortingDropDown(false);
    }

    if (openSortingDropDown) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("resize", handleResize);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [openSortingDropDown, setOpenSortingDropDown]);

  function sortProjects(projects: typeof allProjects, sortValue?: string) {
    const sorted = [...projects];
    if (sortValue === "asc") {
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === "desc") {
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortValue === "newest") {
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortValue === "oldest") {
      return sorted.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
    return sorted;
  }

  useEffect(() => {
    const currentSortingOption = sortingOptions
      .flatMap((category) => category.options)
      .find((option) => option.selected);
    const selectedOption = currentSortingOption;

    const sortedProjects = sortProjects(allProjects, selectedOption?.value);
    if (JSON.stringify(sortedProjects) !== JSON.stringify(allProjects)) {
      setAllProjects(sortedProjects);
    }
  }, [allProjects]);

  function handleOptionSelected(categoryIndex: number, optionIndex: number) {
    const updatedSortingOptions = sortingOptions.map((category, cIndex) => ({
      ...category,
      options: category.options.map((option, oIndex) => ({
        ...option,
        selected: cIndex === categoryIndex && oIndex === optionIndex,
      })),
    }));

    const selectedOption = updatedSortingOptions
      .flatMap((category) => category.options)
      .find((option) => option.selected);

    // ✅ Use fresh copy of allProjects to avoid stale closure
    const sortedProjects = sortProjects([...allProjects], selectedOption?.value);
    setAllProjects(sortedProjects);
    setSortingOptions(updatedSortingOptions);
    setOpenSortingDropDown(false);
  }



  return (
    <div
      ref={dropDownRef}
      style={{
        top: `${sortingDropDownPositions.top}px`,
        left: `${sortingDropDownPositions.left}px`,
        width: `${sortingDropDownPositions.width}px`,
      }}
      className={`bg-white text-sm z-[60] px-6 border-slate-50 fixed py-6
        w-[140px] select-none shadow-md rounded-lg
        ${openSortingDropDown ? "flex flex-col" : "hidden"}`}
    >
      {sortingOptions.map((category, categoryIndex) => (
        <div
          key={categoryIndex}
          className="flex flex-col gap-1 text-slate-700 cursor-pointer"
        >
          <span
            className={`text-[13px] font-bold ${
              category.category === "Date" ? "mt-5" : ""
            }`}
          >
            {category.category}
          </span>
          <div className="flex flex-col gap-2 ml-2 mt-[5px]">
            {category.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <span
                  onClick={() =>
                    handleOptionSelected(categoryIndex, optionIndex)
                  }
                  className={`${
                    option.selected ? "text-orange-600" : "text-slate-500"
                  } cursor-pointer hover:text-orange-600`}
                >
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SortingDropDown;
