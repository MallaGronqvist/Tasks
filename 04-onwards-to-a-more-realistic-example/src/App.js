import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);



  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transfromTasks = (tasksObject) => {
      const loadedTasks = [];
  
      for (const taskKey in tasksObject) {
        loadedTasks.push({ id: taskKey, text: tasksObject[taskKey].text });
      }
  
      setTasks(loadedTasks);
    };

    fetchTasks({
      url: "https://react-http-6016b-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
    }, transfromTasks);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
