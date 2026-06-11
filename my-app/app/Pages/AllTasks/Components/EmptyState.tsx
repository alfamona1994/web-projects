"use client";

import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

interface EmptyStateProps {
  isCompletedTab: boolean;
}

const EmptyState = ({ isCompletedTab }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[400px] gap-4 text-slate-500">
      {isCompletedTab ? (
        <>
          <CelebrationOutlinedIcon sx={{ fontSize: 48 }} />
          <p className="text-lg font-medium">No completed tasks yet</p>
          <p className="text-sm">Complete some tasks to see them here</p>
        </>
      ) : (
        <>
          <AssignmentOutlinedIcon sx={{ fontSize: 48 }} />
          <p className="text-lg font-medium">No tasks in progress</p>
          <p className="text-sm">Create a new task to get started</p>
        </>
      )}
    </div>
  );
};

export default EmptyState;
