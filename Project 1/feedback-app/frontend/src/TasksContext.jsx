import { createContext, useState, useEffect } from 'react';

export const TasksContext = createContext();

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage on first mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('feedbackTasks'));
    if (Array.isArray(saved)) setTasks(saved);
  }, []);

  // Sync to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('feedbackTasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
}
