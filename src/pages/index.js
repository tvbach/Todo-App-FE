// src/pages/index.js
import { useState } from "react";
import Task from "@/components/Task";
import CreateTaskModal from "@/components/CreateTaskModal";
import { Button } from "@mui/material";

export default function Home({ tasks: initialTasks, BASE_URL }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreate = async (newTask) => {
    try {
      const response = await fetch(BASE_URL + "tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "task": newTask}),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const task = await response.json();
      setTasks((prev) => [...prev, { ...task, checked: false }]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleCheckboxChange = async (id) => {
    try {
      const response = await fetch(BASE_URL + `tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Task
      </Button>
      <CreateTaskModal open={open} handleClose={handleClose} handleCreate={handleCreate} />
      <div className="bg-white shadow-md rounded mt-4">
        {tasks.map((task, index) => (
          <Task
            key={index}
            {...task}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))}
      </div>
    </div>
  );
}

// Fetch data on each request
export async function getServerSideProps() {
  // Replace this URL with your API endpoint
  const res = await fetch(process.env.BASE_URL + "tasks");
  const tasks = await res.json();

  // You can do additional data transformation if needed
  const transformedTasks = tasks.map(task => ({
    ...task,
    checked: false // Initialize checked state if needed
  }));

  return { props: { tasks: transformedTasks, BASE_URL: process.env.BASE_URL } };
}
