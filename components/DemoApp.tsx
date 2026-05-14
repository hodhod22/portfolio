"use client";

import { useQuery } from "@tanstack/react-query";
import { useUser, SignInButton } from "@clerk/nextjs";
import { useState } from "react";
import { FiCheck, FiTrash2, FiPlus, FiLoader, FiLogIn } from "react-icons/fi";

// Simulerad API-anrop (ersätt med riktig Convex-integration)
const fetchTasks = async () => {
  // Här ansluter du till Convex
  return [
    { id: 1, text: "Bygg en portfolio med Next.js", completed: true },
    { id: 2, text: "Implementera TanStack Query", completed: false },
    { id: 3, text: "Lägg till autentisering med Clerk", completed: false },
  ];
};

export default function DemoApp() {
  const { isSignedIn, user } = useUser();
  const [newTask, setNewTask] = useState("");

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    enabled: isSignedIn,
  });

  if (!isSignedIn) {
    return (
      <section className="py-20 bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prova min demo-app
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Logga in för att testa en realtidsuppdaterad todo-applikation
              byggd med Convex och TanStack Query
            </p>
            <SignInButton mode="modal">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FiLogIn />
                Logga in för att testa
              </button>
            </SignInButton>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <FiLoader className="w-8 h-8 animate-spin mx-auto text-blue-600" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Min Todo App</h2>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Inloggad som {user?.fullName}
            </div>
          </div>

          {/* Add task input */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Lägg till en ny uppgift..."
              className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) =>
                e.key === "Enter" && newTask && alert(`Lägger till: ${newTask}`)
              }
            />
            <button
              onClick={() => newTask && alert(`Lägger till: ${newTask}`)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="w-5 h-5" />
            </button>
          </div>

          {/* Tasks list */}
          <div className="space-y-2">
            {tasks?.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <button
                    className={`p-1 rounded-full border-2 ${task.completed ? "bg-green-500 border-green-500" : "border-slate-400"}`}
                  >
                    {task.completed && (
                      <FiCheck className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <span
                    className={
                      task.completed ? "line-through text-slate-500" : ""
                    }
                  >
                    {task.text}
                  </span>
                </div>
                <button className="text-red-500 hover:text-red-700">
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-sm text-slate-500">
            ✨ Realtidsuppdateringar med Convex + TanStack Query
          </div>
        </div>
      </div>
    </section>
  );
}
