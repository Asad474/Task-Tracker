import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    const getTasks = async() => {
      const tasksfromServer = await fetchTasks();
      setTasks(tasksfromServer);
    };

    getTasks();
  }, []);

  //Fetch Tasks
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:3030/tasks');
    const data = await response.json();
    return data;
  };

  //Fetch Task
  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:3030/tasks/${id}`);
    const data = await response.json();
    return data;
  };

  //Add Task
  const addTask = async(newtask) => {
    const res = await fetch('http://localhost:3030/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newtask)
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  //Delete Task
  const deleteTask = async(id) => {
    await fetch(`http://localhost:3030/tasks/${id}`, {
      method: 'DELETE'
    });

    setTasks(tasks.filter(task => task.id !== id));
  };

  //Toggle Reminder
  const toggleReminder = async(id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder};

    const res = await fetch(`http://localhost:3030/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });

    const data = await res.json();

    setTasks(tasks.map(task => 
      task.id === id
        ? {...task, reminder: data.reminder}
        : task
    ));
  };

  return (
    <Router>
      <div className="container">
        <Header 
          onAdd={() => setShowAddTask(!showAddTask)} 
          showAdd={showAddTask}
        />
        
        <Routes>
          <Route path='/' element={
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 
                ? (<Tasks
                      tasks={tasks}
                      onDelete={deleteTask} 
                      onToggle={toggleReminder}
                  />)
                : ('No Tasks to show.')
              }
            </>
          } />
          <Route path='/about' Component={About} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;