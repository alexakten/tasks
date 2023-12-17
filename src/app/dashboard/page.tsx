"use client";

import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import ProjectCard from "../components/ProjectCard";

interface TaskType {
  title: string;
  done: boolean;
  subtasks: TaskType[];
}

interface Project {
  id: string;
  title: string;
  tasks: TaskType[]; // Include tasks property
}

export default function Dashboard() {
  //#region

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects([{ id: "project-1", title: "New Project 1", tasks: [] }]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addNewProject = () => {
    const newProjectId = `project-${projects.length + 1}`;
    const newProject: Project = {
      id: newProjectId,
      title: `New Project ${projects.length + 1}`,
      tasks: [], // Initialize with an empty tasks array
    };
    setProjects([...projects, newProject]);
  };

  const deleteProject = (projectIdToDelete: string) => {
    setProjects(projects.filter((project) => project.id !== projectIdToDelete));

    // Optionally, also remove the title from localStorage
    localStorage.removeItem(`projectTitle_${projectIdToDelete}`);
  };

  const updateProjectTitle = (projectId: string, newTitle: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, title: newTitle } : project,
      ),
    );
  };

  //#endregion

  return (
    <main className="flex flex-col items-center justify-between  bg-[#151515]">
      <Nav LogoOnly={true} />

      <section className="relative mt-40 mb-40 w-screen px-10">
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
              tasks={project.tasks}
              onDelete={() => deleteProject(project.id)}
              onUpdateTitle={(newTitle) =>
                updateProjectTitle(project.id, newTitle)
              }
            />
          ))}
        </div>
      </section>
    </main>
  );
}
