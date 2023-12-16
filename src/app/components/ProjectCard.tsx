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

  return (
    <div
      className="relative flex w-full items-center justify-center rounded-md bg-gradient-to-t from-zinc-700 via-zinc-600 to-zinc-500 drop-shadow-sm"
      style={{ padding: 1 }}
    >
      <div
        className="flex h-full w-full flex-col items-start rounded-full bg-[#252525] text-[14px] text-zinc-500 drop-shadow-sm hover:bg-[#202020]"
        style={{ borderRadius: 5 }}
      >
        <div className="flex w-full justify-end">
          <button className="px-4 pt-2 text-white " onClick={onDelete}>
            x
          </button>
        </div>

        <Link className="w-full" href={`/project/${projectID}`}>
          <div className="h-40 w-full"></div>
        </Link>
        <input
          aria-label="project title"
          className="border-none bg-transparent px-4 py-4 text-left text-2xl text-zinc-100 focus:outline-none"
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
