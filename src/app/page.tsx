// src/app/page.tsx
"use client";
import React, { useState } from "react";
import Task from "./components/Task";

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
      <div className="flex items-center gap-24">
        <div className="flex flex-col gap-4">
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
        <div className="flex flex-col gap-4">
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
      let taskToUpdate = newTasks;

      for (let i = 0; i < path.length - 1; i++) {
        taskToUpdate = taskToUpdate[path[i]].subtasks;
      }

      taskToUpdate[path[path.length - 1]].done =
        !taskToUpdate[path[path.length - 1]].done;

      console.log(
        "Toggle done for:",
        path,
        "new done status:",
        taskToUpdate[path[path.length - 1]].done,
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

      return newTasks;
    });
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <section className="flex h-screen w-screen items-center justify-start gap-4 overflow-x-auto overflow-y-auto px-4">
        {renderTasks(tasks)}
      </section>
    </main>
  );
}
