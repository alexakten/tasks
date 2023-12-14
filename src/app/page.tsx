// src/app/page.tsx
"use client";
import React, { useState } from "react";
import Task from "./components/Task";
import Nav from "./components/Nav";

interface TaskType {
  title: string;
  done: boolean;
  subtasks: TaskType[];
}

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([
    {
      title: "Root Task",
      done: false,
      subtasks: [],
    },
  ]);

  const renderTasks = (tasks: TaskType[], path: number[] = []) => {
    return (
      <div className="flex items-center gap-16">
        <div className="task-wrapper flex flex-col gap-3">
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
        <div className="flex flex-col gap-3">
          {tasks.map((task, index) =>
            task.subtasks.length > 0 ? (
              <div key={path.concat(index).join("-") + "-sub"}>
                {renderTasks(task.subtasks, [...path, index])}
              </div>
            ) : null,
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

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-[#151515]">
      <Nav />
      <section className="flex w-screen items-center justify-start gap-4 px-10">
        {renderTasks(tasks)}
      </section>
    </main>
  );
}
