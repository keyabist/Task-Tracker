import React, { useState, useRef, useEffect } from 'react';
import TaskList from './components/TaskList';
import Button from './components/Button';
import './App.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const tasksRef = useRef();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function addTasks() {
    let taskName = tasksRef.current.value;
    let id = Math.floor(Math.random() * 10000);
    if (taskName === '') return alert('Please Add a Task');

    setTasks(prevTasks => {
      return [...prevTasks, { id: id, name: taskName, complete: false }];
    });
    tasksRef.current.value = null;
  }

  function toggleTask(id) {
    const newTasks = [...tasks];
    const task = newTasks.find(task => task.id === id);
    task.complete = !task.complete;
    setTasks(newTasks);
  }

  function removeTasks() {
    const newTasks = tasks.filter(task => !task.complete);
    setTasks(newTasks);
  }

  function removeAllTasks() {
    setTasks([]);
  }

  function clearStorage() {
    localStorage.clear();
    alert('Storage has been cleared, refresh the page for results.');
  }

  return (
    <div className="App">
      <div className="container">
        <h1 className="project-title">Task Tracker</h1>
        {tasks.length > 0 && (
          <h2 className="total-tasks">
            {tasks.filter(task => !task.complete).length} left to do
          </h2>
        )}
        <div className="input-container">
          <input
            className="input-field"
            ref={tasksRef}
            placeholder="Add Task..."
          />
          <Button
            bgColor="#35CF79"
            textColor="white"
            onClick={addTasks}
            text="Add Task"
          />
        </div>
        <div className="task-list">
          {tasks.length > 0 ? (
            <TaskList tasks={tasks} toggleTask={toggleTask} />
          ) : (
            <p>No Tasks to Show</p>
          )}
        </div>
        <div className="button-container">
          <Button
            bgColor="#0000FF"
            textColor="white"
            onClick={removeTasks}
            text="Remove Completed"
          />
          <Button
            bgColor="#F7440B"
            textColor="white"
            onClick={removeAllTasks}
            text="Delete All"
          />
          <Button
            bgColor="#F7CA0B"
            textColor="black"
            onClick={clearStorage}
            text="Clear Storage"
          />
        </div>
      </div>
    </div>
  );
}