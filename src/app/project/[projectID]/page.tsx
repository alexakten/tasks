"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import Task from "../../components/Task";
import Nav from "../../components/Nav";
import Link from "next/link";

interface TaskType {
  title: string;
  done: boolean;
  subtasks: TaskType[];
}

interface Project {
  id: string;
  title: string;
  tasks: TaskType[];
}

export default function ProjectPage() {
  const pathname = usePathname();
  const projectId = pathname.split("/").pop(); // Assuming the last segment is projectId
  const [projectTitle, setProjectTitle] = useState("");
  const [tasks, setTasks] = useState<TaskType[]>([]); // Initialize tasks state

  useEffect(() => {
    if (typeof projectId === "string") {
      // Load the project data from localStorage
      const savedProjects = localStorage.getItem("projects");
      if (savedProjects) {
        const projects: Project[] = JSON.parse(savedProjects);
        const currentProject = projects.find((p) => p.id === projectId);
        if (currentProject) {
          setProjectTitle(currentProject.title);
          setTasks(currentProject.tasks);
        }
      }
    }
  }, [projectId]);

  const renderTasks = (
    tasks: TaskType[],
    path: number[] = [],
    depth: number = 1,
  ) => {
    return (
      <div className="flex items-start gap-16">
        {/* <p className="text-zinc-100">Depth {depth}</p> */}
        <div className="flex flex-col gap-3">
          {tasks.map((task, index) => (
            <div key={path.concat(index).join("-")}>
              <Task
                title={task.title}
                done={task.done}
                onTitleChange={(newTitle) =>
                  handleTitleChange([...path, index], newTitle)
                }
                onToggleDone={() => handleToggleDone([...path, index])}
                onAddSubtask={() => handleAddSubtask([...path, index])}
              />
            </div>
          ))}
        </div>

        {/* Loop to render subtasks recursively */}
        <div className="flex flex-col gap-3">
          {tasks.map(
            (task, index) =>
              task.subtasks.length > 0 && (
                <div key={path.concat(index).join("-") + "-sub"}>
                  {renderTasks(task.subtasks, [...path, index], depth + 1)}
                </div>
              ),
          )}
        </div>
      </div>
    );
  };

  // Update the handle functions to correctly navigate the nested structure
  const handleTitleChange = (path: number[], newTitle: string) => {
    setTasks((currentTasks) => {
      const newTasks = [...currentTasks];
      let taskToUpdate = newTasks;

      for (let i = 0; i < path.length - 1; i++) {
        taskToUpdate = taskToUpdate[path[i]].subtasks;
      }

      taskToUpdate[path[path.length - 1]].title = newTitle;
      return newTasks;
    });
  };

  const handleToggleDone = (path: number[]) => {
    setTasks((currentTasks) => {
      const newTasks = [...currentTasks];

      // Function to recursively update parent task status
      const updateParentTasks = (path: number[]) => {
        if (path.length < 2) return; // If there's no parent, stop recursion

        const parentPath = path.slice(0, -1);
        const parentIndex = parentPath[parentPath.length - 1];
        let parentTask =
          parentPath.length === 1
            ? newTasks[parentIndex]
            : newTasks[parentPath[0]];

        for (let i = 1; i < parentPath.length; i++) {
          parentTask = parentTask.subtasks[parentPath[i]];
        }

        parentTask.done = parentTask.subtasks.every((subtask) => subtask.done);
        updateParentTasks(parentPath); // Recursively update the status of the parent's parent
      };

      // Toggle the current task's done status
      let taskToUpdate: TaskType[] = newTasks;
      for (let i = 0; i < path.length - 1; i++) {
        taskToUpdate = taskToUpdate[path[i]].subtasks;
      }
      const currentTask = taskToUpdate[path[path.length - 1]];
      currentTask.done = !currentTask.done;

      // Update parent task status if needed
      updateParentTasks(path);

      console.log(
        "Toggle done for:",
        path,
        "new done status:",
        currentTask.done,
      );
      return newTasks;
    });
  };

  const handleAddSubtask = (path: number[]) => {
    setTasks((currentTasks) => {
      const newTasks = [...currentTasks];
      let taskToUpdate = newTasks;

      for (let i = 0; i < path.length - 1; i++) {
        taskToUpdate = taskToUpdate[path[i]].subtasks;
      }

      taskToUpdate[path[path.length - 1]].subtasks.push({
        title: "New Subtask",
        done: false,
        subtasks: [],
      });

      console.log("Added node to:", path);

      return newTasks;
    });
  };

  const addNewMainTask = () => {
    setTasks((currentTasks) => {
      // Add a new main task at the root level
      return [
        ...currentTasks,
        {
          title: "New Task",
          done: false,
          subtasks: [],
        },
      ];
    });
  };

  useEffect(() => {
    if (typeof projectId === "string") {
      const savedProjects = localStorage.getItem("projects");
      if (savedProjects) {
        const projects: Project[] = JSON.parse(savedProjects);
        const updatedProjects = projects.map((project) => {
          if (project.id === projectId) {
            return { ...project, tasks: tasks };
          }
          return project;
        });

        localStorage.setItem("projects", JSON.stringify(updatedProjects));
      }
    }
  }, [tasks, projectId]);

  return (
    <main className="flex min-h-screen w-screen flex-col items-start bg-[#151515]">
      <Nav LogoOnly={true} />
      <section className="mb-40 mt-40 flex flex-col items-start justify-start gap-4 px-10">
        <Link className="mb-4 text-white" href={"/dashboard"}>
          {"Back to Dashboard"}
        </Link>
        <h1 className="mb-4 text-3xl text-zinc-100">{projectTitle}</h1>
        <button
          className="mb-20 flex items-center justify-center rounded-full bg-gradient-to-t from-zinc-700 via-zinc-600 to-zinc-500 drop-shadow-sm"
          style={{ padding: 1 }}
          onClick={addNewMainTask}
        >
          <div className="flex h-full w-full items-center rounded-full bg-[#252525] px-4 py-3 text-[14px] text-zinc-100 drop-shadow-sm hover:bg-[#202020]">
            + New task
          </div>
        </button>
        {renderTasks(tasks)}
      </section>
    </main>
  );
}
