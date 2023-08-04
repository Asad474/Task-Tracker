import React, {useState} from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Doctors Appointment',
        day: 'Aug 5th at 2:30pm',
        reminder: true,
    },

    {
        id: 2,
        text: 'Meeting at School',
        day: 'Aug 7th at 4:00pm',
        reminder: true,
    },

    {
        id: 3,
        text: 'Food Shopping',
        day: 'Aug 11th at 2:30pm',
        reminder: false,
    },
  ]);

  //Add Task
  const addTask = newtask => {
    const length = tasks.length;
    setTasks([...tasks, {id:length+1 ,...newtask}]);
  }

  //Delete Task
  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  //Toggle Reminder
  const toggleReminder = id => {
    setTasks(tasks.map(task => 
      task.id === id
        ? {...task, reminder: !task.reminder}
        : task
    ));
  };

  return (
    <div className="container">
      <Header 
        onAdd={() => setShowAddTask(!showAddTask)} 
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 
        ? (<Tasks
              tasks={tasks}
              onDelete={deleteTask} 
              onToggle={toggleReminder}
          />)
        : ('No Tasks to show.')
      }
    </div>
  );
}

export default App;