"use client";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useContextApp } from "@/app/contextApp";

function ProjectsSubHeader() {
  return (
    <div className="mt-20 flex justify-between font-bold items-center">
      <MyProjectsText />
      <SortByButton />
    </div>
  );
}

function MyProjectsText() {
  return <p className="text-[18px] text-slate-800">My Projects</p>;
}

function SortByButton() {
  const {
    openSortingDropDownObject: { openSortingDropDown, setOpenSortingDropDown },
    sortingDropDownPositionsObject: { setSortingDropDownPositions },
    sortingOptionObject: { sortingOptions },
  } = useContextApp();

  const sortingLinkRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = sortingOptions
    .flatMap((category) => category.options)
    .find((option) => option.selected);

  let sortingLabel = "Recent Project";

  if (selectedOption) {
    if (selectedOption.label === "A-Z" || selectedOption.label === "Z-A") {
      sortingLabel = `Order ${selectedOption.label}`;
    } else {
      sortingLabel = `${selectedOption.label} Projects`;
    }
  }

  function clickSortingLink() {
    if (sortingLinkRef.current) {
      const rect = sortingLinkRef.current.getBoundingClientRect();
      const { top, left, width } = rect;
      setSortingDropDownPositions({
        top: top + window.scrollY + 30,
        left: left + window.scrollX,
        width: width,
      });
    }
    setOpenSortingDropDown((prev) => !prev);
  }

  return (
    <div className="flex text-[15px] max-sm:text-[14px] font-semibold gap-3 max-sm:gap-1">
      <span className="text-slate-300">Sort By</span>
      <div
        ref={sortingLinkRef}
        onClick={clickSortingLink}
        className="flex items-center gap-1 cursor-pointer text-slate-800 hover:text-orange-600"
      >
        <span>{sortingLabel}</span>
        {openSortingDropDown ? (
          <KeyboardArrowUpIcon sx={{ fontSize: "19px" }} />
        ) : (
          <KeyboardArrowDownIcon sx={{ fontSize: "19px" }} />
        )}
      </div>
    </div>
  );
}

export default ProjectsSubHeader;