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
      className="flex h-12 w-64 items-center justify-center rounded-lg bg-gradient-to-t from-zinc-700 via-zinc-600 to-zinc-500 drop-shadow-sm"
      style={{ padding: 1 }}
    >
      <div
        className={`relative flex h-full w-full items-center px-3 drop-shadow-sm ${
          done ? " bg-zinc-100 text-black" : "bg-[#252525] text-white"
        }`}
        style={{ borderRadius: 7 }}
      >
        <input
          className="w-full bg-transparent font-normal focus:outline-none"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Add task"
        />
        <button
          className={`absolute right-1 top-1 h-3 w-3 rounded-full border hover:bg-white ${
            done ? "border-black bg-zinc-100" : "border-zinc-100  bg-[#252525]"
          }`}
          type="button"
          aria-label="toggle done"
          onClick={onToggleDone}
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
    </div>
  );
};

export default Task;
