// src/app/components/Task.tsx
"use client";
import React from "react";

interface TaskProps {
  title: string;
  done: boolean;
  onTitleChange: (newTitle: string) => void;
  onToggleDone: () => void;
  onAddSubtask: () => void;
}

const Task: React.FC<TaskProps> = ({
  title,
  done,
  onTitleChange,
  onToggleDone,
  onAddSubtask,
}) => {
  return (
    <div
      className={`relative flex h-12 w-64 items-center rounded-lg border px-4 ${
        done
          ? "border-white bg-white text-black"
          : "border-white bg-black text-white"
      }`}
    >
      <input
        className="w-full bg-transparent font-normal focus:outline-none"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Add task"
      />
      <button
        className={`absolute right-1 top-1 h-3 w-3 rounded-full border hover:bg-white ${
          done ? "border-black bg-white" : "border-white bg-black"
        }`}
        type="button"
        aria-label="toggle done"
        onClick={(e) => {
          console.trace(); // Add this line for console trace
          e.stopPropagation(); // Prevent event bubbling
          onToggleDone();
        }}
      ></button>

      <button
        className="absolute bottom-0 right-1 rounded-full text-xl"
        type="button"
        onClick={onAddSubtask}
        aria-label="add subtask"
      >
        +
      </button>
    </div>
  );
};

export default Task;
