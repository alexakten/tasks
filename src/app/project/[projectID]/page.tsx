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

  const getParentTaskTitle = (
    path: number[],
    tasks: TaskType[],
    projectTitle: string,
  ): string => {
    let currentTasks: TaskType[] = tasks;
    // Navigate to the last parent task in the path
    for (let i = 0; i < path.length - 1; i++) {
      if (currentTasks[path[i]] && currentTasks[path[i]].subtasks) {
        currentTasks = currentTasks[path[i]].subtasks;
      }
    }
    // Safely access the parent task's title
    return currentTasks[path[path.length - 1]]?.title || projectTitle;
  };

  const renderTasks = (tasks: TaskType[], path: number[] = []) => {
    const parentTitle =
      path.length === 0
        ? "Tasks"
        : getParentTaskTitle(path.slice(0, -1), tasks, "Test");

    return (
      <div className="flex items-start gap-16">
        <div className="flex flex-col gap-3">
          {/* <p className="text-zinc-100">{parentTitle}</p>{" "} */}
          {/* Display the parent title */}
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
                onDelete={() => handleDeleteTask([...path, index])} // Pass the delete function here
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
                  {renderTasks(task.subtasks, [...path, index])}
                </div>
              ),
          )}
        </div>
      </div>
    );
  };

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

      // Function to recursively toggle child tasks' done status
      const toggleChildTasksDone = (tasks: TaskType[], doneStatus: boolean) => {
        tasks.forEach((task) => {
          task.done = doneStatus;
          if (task.subtasks.length > 0) {
            toggleChildTasksDone(task.subtasks, doneStatus);
          }
        });
      };

      // Function to recursively update parent task status
      const updateParentTasks = (path: number[]) => {
        if (path.length < 2) return;

        const parentPath = path.slice(0, -1);
        let parentTask = newTasks;
        for (let i = 0; i < parentPath.length; i++) {
          parentTask =
            i === parentPath.length - 1
              ? parentTask
              : parentTask[parentPath[i]].subtasks;
        }

        parentTask[parentPath[parentPath.length - 1]].done = parentTask[
          parentPath[parentPath.length - 1]
        ].subtasks.every((subtask) => subtask.done);

        updateParentTasks(parentPath);
      };

      // Navigate to the correct task and toggle its done status
      let taskToUpdate = newTasks;
      for (let i = 0; i < path.length - 1; i++) {
        taskToUpdate = taskToUpdate[path[i]].subtasks;
      }
      const currentTask = taskToUpdate[path[path.length - 1]];
      const newDoneStatus = !currentTask.done;
      currentTask.done = newDoneStatus;

      // If it's a parent task, toggle all child tasks' done status
      if (currentTask.subtasks.length > 0) {
        toggleChildTasksDone(currentTask.subtasks, newDoneStatus);
      }

      // Update parent task status if needed
      updateParentTasks(path);

      return newTasks;
    });
  };

  const handleAddSubtask = (path: number[]) => {
    setTasks((currentTasks) => {
      const newTasks = [...currentTasks];

      // Function to recursively mark parent tasks as not done
      const markParentTasksNotDone = (path: number[]) => {
        if (path.length === 0) return;

        const newTasksCopy = [...currentTasks]; // Create a copy of newTasks
        let taskToUpdate = newTasksCopy;

        // Navigate to the parent task
        for (let i = 0; i < path.length - 1; i++) {
          taskToUpdate = taskToUpdate[path[i]].subtasks;
        }

        // Update the parent task's done status
        taskToUpdate[path[path.length - 1]].done = false;

        // Recursively call for the parent's parent
        markParentTasksNotDone(path.slice(0, -1));

        return newTasksCopy;
      };

      // Navigate to the correct task and add a new subtask
      let taskToUpdate = newTasks;
      for (let i = 0; i < path.length - 1; i++) {
        taskToUpdate = taskToUpdate[path[i]].subtasks;
      }
      taskToUpdate[path[path.length - 1]].subtasks.push({
        title: "",
        done: false,
        subtasks: [],
      });

      // Mark all parent tasks as not done
      markParentTasksNotDone(path);

      return newTasks;
    });
  };

  const handleDeleteTask = (path: number[]) => {
    setTasks((currentTasks) => {
      const deleteTaskRecursive = (
        tasks: TaskType[],
        path: number[],
      ): TaskType[] => {
        if (path.length === 1) {
          // Delete the task at the current level
          return [...tasks.slice(0, path[0]), ...tasks.slice(path[0] + 1)];
        } else {
          // Recurse into subtasks
          const [head, ...rest] = path;
          return tasks.map((task, index) => {
            if (index === head) {
              return {
                ...task,
                subtasks: deleteTaskRecursive(task.subtasks, rest),
              };
            }
            return task;
          });
        }
      };

      return deleteTaskRecursive(currentTasks, path);
    });
  };

  const addNewMainTask = () => {
    setTasks((currentTasks) => {
      return [
        ...currentTasks,
        {
          title: "",
          done: false,
          subtasks: [],
        },
      ];
    });
  };

  // Write data to localStorage on task and project change
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

  const handleProjectTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setProjectTitle(newTitle);
    // Update project title in local storage
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      const projects: Project[] = JSON.parse(savedProjects);
      const updatedProjects = projects.map((project) => {
        if (project.id === projectId) {
          return { ...project, title: newTitle };
        }
        return project;
      });
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
    }
  };

  return (
    <main className="flex flex-col items-start bg-[#151515]">
      <Nav LogoOnly={true} />
      <section className="mb-40 mt-40 flex min-h-screen flex-col items-start justify-start gap-4 bg-[#151515] px-10">
        <Link className="mb-4 text-white" href={"/dashboard"}>
          {"<- All projects"}
        </Link>
        <input
          aria-label="Project Title"
          placeholder="New Project"
          className="mb-4 border-none bg-transparent text-3xl text-zinc-100 focus:outline-none"
          value={projectTitle}
          onChange={handleProjectTitleChange}
        />{" "}
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
