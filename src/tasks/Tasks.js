import './Tasks.css';
import React, {useEffect, useState} from 'react'

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const makeTaskList = (data) => {
    let tasks = data.map((task) =>
      <div key={task.id} className="task-element">
        <div className="task-element-image">
          <img className="profile-picture-2" src={task.image}/>
        </div>
        <div>
           {task.subject}: {task.info}
        </div>
        <div onClick={() => deleteTask(task.id)}>Delete Task</div>
      </div>
    )
    setTasks(tasks);
  }

  useEffect(() => {
    fetch('/get_tasks').then(response => {
      if(response.ok)
        return response.json();
      else {
        throw response;
      }
    }).then(data =>{
      makeTaskList(data);
    }).catch((error) => {
      console.log("Error fetching data: " + error);
    })
  }, []);

  const addTask = () => {
    var formData = new FormData(document.getElementById("add_task_form"));
    fetch("/add_task", {
      method: "post",
      body: formData
    }).then(response => {
      if(response.ok)
        return response.json();
      else {
        throw response;
      }
    }).then(data =>{
      makeTaskList(data);
    }).catch((error) => {
      console.log("Error fetching data: " + error);
    });
  }


    const deleteTask = (id) =>{
      fetch('/delete_task/' + id).then(response => {
        if(response.ok)
          return response.json();
        else {
          throw response;
        }
      }).then(data =>{
        makeTaskList(data);
      }).catch((error) => {
        console.log("Error fetching data: " + error);
      })
    }

  return(
    <div>
      <div> Tasks List: </div>
      <div className="task-container">
        {tasks}
      </div>
      <div>
        <form id="add_task_form">
          <label htmlFor="subject">Subject:</label>
          <input type="text" id="subject" name="subject"/>
          <label htmlFor="info">Info:</label>
          <input type="textarea" id="info" name="info"/>
          <label htmlFor="image">Image:</label>
          <input type="text" id="image" name="image"/>
          <div onClick={() => addTask()}>Add Task</div>
        </form>
      </div>
    </div>
  );
}

export default Tasks;
