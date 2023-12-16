"use client";

import React, { useState } from "react";
import Nav from "../components/Nav";
import ProjectCard from "../components/ProjectCard";

export default function Dashboard() {
  //#region

  const [projects, setProjects] = useState([
    { id: "1", title: "Launch Tasktree" },

  ]);

  const addNewProject = () => {
    const newProjectId = `project-${projects.length + 1}`;
    const newProject = {
      id: newProjectId,
      title: `New Project ${projects.length + 1}`,
    };
    setProjects([...projects, newProject]);
  };

  //#endregion

  return (
    <main className="flex flex-col items-center justify-between overflow-hidden bg-[#151515]">
      <Nav LogoOnly={true} />

      {/* Hero Section */}
      <section className="relative mt-40 h-screen w-screen px-10">
        <div className="mb-12 flex flex-col items-start">
          <h1 className="mb-4 text-3xl text-zinc-100">Projects</h1>
          <button
            className="flex items-center justify-center rounded-full bg-gradient-to-t from-zinc-700 via-zinc-600 to-zinc-500 drop-shadow-sm"
            style={{ padding: 1 }}
            onClick={addNewProject}
          >
            <div className="flex h-full w-full items-center rounded-full bg-[#252525] px-4 py-3 text-[14px] text-zinc-100 drop-shadow-sm hover:bg-[#202020]">
              + New project
            </div>
          </button>
        </div>
        <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              projectID={project.id}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
