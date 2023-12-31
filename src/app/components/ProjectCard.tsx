// src/app/components/ProjectCard.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";

interface TaskType {
  title: string;
  done: boolean;
  subtasks: TaskType[];
}

interface ProjectCardProps {
  title: string;
  projectID: string;
  tasks: TaskType[]; // Updated type for tasks
  onDelete: () => void; // Add this line
  onUpdateTitle: (newTitle: string) => void;
}
const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  projectID,
  tasks,
  onDelete,
  onUpdateTitle,
}) => {
  const [editableTitle, setEditableTitle] = useState(title);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditableTitle(event.target.value);
  };

  const handleBlur = () => {
    onUpdateTitle(editableTitle);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onUpdateTitle(editableTitle);
      event.currentTarget.blur(); // Optionally blur the input on enter
    }
  };

  const countTasks = (tasks: TaskType[]) => {
    let total = 0;
    let completed = 0;

    const count = (tasks: TaskType[]) => {
      tasks.forEach((task) => {
        total++;
        if (task.done) {
          completed++;
        }
        if (task.subtasks.length > 0) {
          count(task.subtasks);
        }
      });
    };

    count(tasks);
    return { total, completed };
  };

  const { total, completed } = countTasks(tasks);

  return (
    <div
      className="relative flex w-full items-center justify-center rounded-md bg-gradient-to-t from-zinc-700 via-zinc-600 to-zinc-500 drop-shadow-sm"
      style={{ padding: 1 }}
    >
      <div
        className="flex h-full w-full flex-col items-start rounded-full bg-[#252525] text-[14px] text-zinc-500 drop-shadow-sm hover:bg-[#202020]"
        style={{ borderRadius: 5 }}
      >
        <div className="flex w-full items-center justify-between px-4 pt-1">
          <p className="text-sm text-zinc-500">{`${completed}/${total} tasks done`}</p>
          <button
            className="rotate-45 text-2xl font-light text-zinc-500"
            onClick={onDelete}
          >
            +
          </button>
        </div>

        <Link className="w-full" href={`/project/${projectID}`}>
          <div className="h-40 w-full"></div>
        </Link>

        <input
          aria-label="project title"
          className="border-none bg-transparent px-4 pb-4 text-left text-2xl text-zinc-100 focus:outline-none"
          value={editableTitle}
          onChange={handleTitleChange}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default ProjectCard;
