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
          className="absolute bottom-1 right-1 rounded-full text-xs"
          type="button"
          onClick={onAddSubtask}
          aria-label="add subtask"
        >
          <svg
            width="13"
            height="10"
            viewBox="0 0 13 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="1.99966" cy="4.99991" r="1.66666" fill="white" />
            <circle
              cx="11.1107"
              cy="1.6666"
              r="1.66666"
              transform="rotate(180 11.1107 1.6666)"
              fill="white"
            />
            <circle
              cx="11.1107"
              cy="8.33334"
              r="1.66666"
              transform="rotate(180 11.1107 8.33334)"
              fill="white"
            />
            <line
              x1="1.55566"
              y1="4.99987"
              x2="6.00008"
              y2="4.99987"
              stroke="white"
              stroke-width="1.1111"
            />
            <line
              x1="6.55555"
              y1="2.22217"
              x2="6.55555"
              y2="7.77769"
              stroke="white"
              stroke-width="1.1111"
            />
            <line
              x1="10.4453"
              y1="1.66639"
              x2="6.0009"
              y2="1.66639"
              stroke="white"
              stroke-width="1.1111"
            />
            <line
              x1="10.4453"
              y1="8.33314"
              x2="6.0009"
              y2="8.33314"
              stroke="white"
              stroke-width="1.1111"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Task;
