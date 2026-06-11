"use client";

import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useContextApp } from "@/app/contextApp";

function MoreDropDown() {
  const {
    openDropDownObject: { openDropDown, setOpenDropDown },
    dropDownPositionsObject: { dropDownPositions },
    openConfirmationWindowObject: { setOpenConfirmationWindow },
    openProjectWindowObject: { setOpenProjectWindow },
  } = useContextApp();

  const [dropDownOptions] = useState([
    { id: 1, label: "Edit", icon: <EditIcon className="text-slate-400" /> },
    {
      id: 2,
      label: "Delete",
      icon: <DeleteOutlineOutlinedIcon className="text-slate-400" />,
    },
  ]);

  const menuRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenDropDown(false);
      }
    }

    function handleResize() {
      setOpenDropDown(false);
    }

    if (openDropDown) {
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
  }, [openDropDown, setOpenDropDown]);

  function handleOptionClick(id: number) {
    if (id === 1) {
      setOpenProjectWindow(true);
      setOpenDropDown(false);
    }
    if (id === 2) {
      setOpenConfirmationWindow(true);
      setOpenDropDown(false);
    }
  }

  return (
    <div
      ref={menuRef}
      style={{ top: dropDownPositions.top, left: dropDownPositions.left }}
      className={`bg-white fixed z-[90] px-5 border-slate-50 py-6 w-[130px] select-none
        shadow-md rounded-lg ${openDropDown ? "flex flex-col gap-7" : "hidden"}`}
    >
      {dropDownOptions.map((dropDownOption) => (
        <div
          key={dropDownOption.id}
          onClick={() => handleOptionClick(dropDownOption.id)}
          className={`flex gap-1 items-center text-slate-400 cursor-pointer hover:text-orange-600 ${
            dropDownOption.id === 2 ? "hover:text-red-600" : ""
          }`}
        >
          {dropDownOption.icon}
          <span className="text-[14px]">{dropDownOption.label}</span>
        </div>
      ))}
    </div>
  );
}

export default MoreDropDown; 