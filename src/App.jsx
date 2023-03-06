import { useState } from 'react'

import useLocalStorage from './hooks/useLocalStorage'

import CustomForm from './components/CustomForm'
import EditForm from './components/EditForm'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useLocalStorage('react-todo.tasks', []);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const addTask = (task) => { //adding tasks
    setTasks(prevState => [...prevState, task])
  }

  const deleteTask = (id) => { //deleting tasks
    setTasks(prevState => prevState.filter(t => t.id !== id));
  }

  const toggleTask = (id) => { // update UI and logic when item is checked
    setTasks(prevState => prevState.map(t => (
      t.id === id
        ? { ...t, checked: !t.checked }
        : t
    )))
  } 

  const updateTask = (task) => { // update the task
    setTasks(prevState => prevState.map(t => (
      t.id === task.id
        ? { ...t, name: task.name }
        : t
    )))
    closeEditMode(); 
  }

  const closeEditMode = () => { //leaving the edit mode 
    setIsEditing(false);

    previousFocusEl.focus(); //return focus to previous state
  }

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);

    setPreviousFocusEl(document.activeElement); //set focus back to original
  }

  return (
    <div className="container">
      <header>
        <h1>My Tasks</h1>
      </header>
      {
        isEditing && ( //whenever its true, open the editing form
          <EditForm
            editedTask={editedTask}
            updateTask={updateTask}
            closeEditMode={closeEditMode}
          />
        )
      }
      <CustomForm addTask={addTask}/>
      {tasks && (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}
    </div>
  )
}

export default App