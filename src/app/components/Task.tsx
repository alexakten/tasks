// src/app/components/Task.tsx
"use client";
import React from "react";

interface TaskProps {
  title: string;
  done: boolean;
  onTitleChange: (newTitle: string) => void;
  onToggleDone: () => void;
  onAddSubtask: () => void;
  onDelete: () => void;
}

const Task: React.FC<TaskProps> = ({
  title,
  done,
  onTitleChange,
  onToggleDone,
  onAddSubtask,
  onDelete,
}) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <div
        className="flex h-12 w-64 items-center justify-center rounded-lg bg-gradient-to-t from-zinc-700 via-zinc-600 to-zinc-500 drop-shadow-sm"
        style={{ padding: 1 }}
      >
        <div
          className={`flex h-full w-full items-center justify-between pl-3 pr-1 drop-shadow-sm ${
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
          <div className="flex flex-col justify-between pt-2">
            <button
              className={`h-3 w-3 rounded-full border hover:bg-white ${
                done
                  ? "border-black bg-zinc-100"
                  : "border-zinc-100  bg-[#252525]"
              }`}
              type="button"
              aria-label="toggle done"
              onClick={onToggleDone}
            ></button>
            <button
              className="rotate-45 text-2xl font-light text-zinc-500 hover:text-zinc-300"
              onClick={onDelete}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full border border-dotted border-zinc-500 text-xl font-light text-zinc-500 hover:border-zinc-300 hover:text-zinc-300"
        onClick={onAddSubtask}
      >
        +
      </button>
    </div>
  );
};

export default Task;
