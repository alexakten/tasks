// src/app/components/Task.tsx
import React from "react";

interface AddTaskBtnProps {
  onAddSubtask: () => void;
}

const AddTaskBtn: React.FC<AddTaskBtnProps> = ({ onAddSubtask }) => {
  return (
    <button
      className="flex h-12 w-64 items-center justify-center rounded-lg border border-dotted border-zinc-500 text-zinc-500 drop-shadow-sm hover:border-zinc-400 hover:text-zinc-400"
      onClick={onAddSubtask}
    >
      + Add task at this level
    </button>
  );
};

export default AddTaskBtn;
