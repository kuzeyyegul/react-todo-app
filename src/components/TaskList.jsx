
import TaskItem from './TaskItem';


import styles from './TaskList.module.css';



const TaskList = ({tasks, deleteTask, toggleTask, enterEditMode}) => {
  return (
    <ul className={styles.tasks}>
    {/*   display tasks from new to old */}
      {tasks.sort((a, b) => b.id - a.id).map(task => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      ))
      }
    </ul>
  )
}
export default TaskList