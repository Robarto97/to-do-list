import React, { useEffect, useState } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [toDo, setToDo] = useState(null);

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/tasks")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setToDo(data);
      });
  }, []);

  const addTask = () => {
    if (newTask) {
      let index = toDo.length + 1;
      let newEntry = { id: index, title: newTask };
      setToDo([...toDo, newEntry]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };

  const handleKey = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="App">
      <h1>To do list</h1>
      <div className="row">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKey}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="tasks">
        {toDo && toDo.length ? "" : "No Tasks!"}
        {toDo &&
          toDo.map((task, index) => {
            return (
              <React.Fragment key={task.id}>
                <li className="task">
                  {index + 1}. {task.title}
                  <span onClick={() => deleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </li>
              </React.Fragment>
            );
          })}
      </ul>
    </div>
  );
}

export default App;
