"use client";
import React, { useLayoutEffect, useEffect } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useContextApp } from "@/app/contextApp";

import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { getIconComponent } from "@/app/functions/IconsActions";

const schema = z.object({
  projectName: z
    .string()
    .min(1, { message: "Project name is required." })
    .max(30, { message: "Project name must be at most 30 characters or less." }),
});

type FormData = z.infer<typeof schema>;

export function ProjectWindow() {
  const {
    openProjectWindowObject: { openProjectWindow, setOpenProjectWindow },
  } = useContextApp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleClose = () => {
    reset();
    setOpenProjectWindow(false);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form submitted:", data);
    handleClose();
  };

  useLayoutEffect(() => {
    if (openProjectWindow) reset();
  }, [openProjectWindow, reset]);

  return (
    <div
      className={`${
        openProjectWindow ? "block" : "hidden"
      } w-[48%] max-sm:w-[82%] max-[600px]:w-[93%] z-[80] p-3 left-1/2 top-[47%] 
      -translate-y-1/2 -translate-x-1/2 absolute flex flex-col gap-3 
      border border-slate-50 bg-white rounded-lg shadow-md`}
    >
      <Header handleClose={handleClose} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 pt-8 px-7 mt-3"
      >
        <ProjectInput register={register} errors={errors} />
        <Footer handleClose={handleClose} />
      </form>
    </div>
  );
}

function Header({ handleClose }: { handleClose: () => void }) {
  const contextApp = useContextApp();
  const setSelectedIcon = contextApp?.selectedIconObject?.setSelectedIcon || (() => {});

  return (
    <div className="flex justify-between items-center pt-7 px-7">
      <div className="flex items-center gap-2">
        <div className="p-[7px] bg-orange-200 rounded-lg flex items-center justify-center">
          <BorderAllIcon
            sx={{ fontSize: "21px" }}
            className="text-orange-600 cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <span className="font-semibold text-lg">Add Project</span>
      </div>

      <CloseOutlinedIcon
        sx={{ fontSize: "18px" }}
        className="text-slate-300 cursor-pointer"
        onClick={() => {
          handleClose();
          setSelectedIcon(null);
          console.log("Close icon clicked");
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
  const openProjectWindow = contextApp?.openProjectWindowObject?.openProjectWindow || false;
  const setOpenIconWindow = contextApp?.openIconWindowObject?.setOpenIconWindow || (() => {});
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
              {errors.projectName.message}
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

function Footer({ handleClose }: { handleClose: () => void }) {
  const contextApp = useContextApp();
  const selectedIcon = contextApp?.selectedIconObject?.selectedIcon || null;
  const setSelectedIcon = contextApp?.selectedIconObject?.setSelectedIcon || (() => {});
  console.log("Footer rendered");
  
  return (
    <div className="w-[102%] p-[12px] mt-8 mb-4 flex gap-3 justify-end items-center">
      <button
        type="button"
        onClick={() => {
          handleClose();
          setSelectedIcon(null);
        }}
        className="border border-slate-200 text-slate-400 text-[13px] p-2 px-6 rounded-md
        hover:border-slate-300 transition-all"
      >
        Cancel
      </button>

      <button
        type="submit"
        className="bg-orange-600 hover:bg-orange-700 text-white text-[13px] p-2 px-4 rounded-md transition-all"
      >
        Add Project
      </button>
    </div>
  );
}

export default ProjectWindow;
