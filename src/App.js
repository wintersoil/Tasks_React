import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react'

function App() {
  const [data, setData] = useState([])

  const makeDataState = (data) => {
    let users = data.map((user) =>
      <div key={user.id}>
        <img className="profile-picture" src={user.image}/> {user.name} is {user.age} years old
        <div onClick={() => deleteUser(user.id)}>Delete User</div>
      </div>
    )
    setData(users);
  }

  const deleteUser = (id) =>{
    fetch('/delete_user/' + id).then(response => {
      if(response.ok)
        return response.json();
      else {
        throw response;
      }
    }).then(data =>{
      makeDataState(data);
    }).catch((error) => {
      console.log("Error fetching data: " + error);
    })
  }

  const deleteUsers = () =>{
    fetch('/delete_users').then(response => {
      if(response.ok)
        return response.json();
      else {
        throw response;
      }
    }).then(data =>{
      makeDataState(data);
    }).catch((error) => {
      console.log("Error fetching data: " + error);
    })
  }

  useEffect(() =>{
    fetch('/profile').then(response => {
      if(response.ok)
        return response.json();
      else {
        throw response;
      }
    }).then(data =>{
      makeDataState(data);
    }).catch((error) => {
      console.log("Error fetching data: " + error);
    })
  }, []);

  const sendFormData = () => {
    const data = new URLSearchParams();
    let formElement = document.getElementById("add_user_form");
    for (const pair of new FormData(formElement)) {
        data.append(pair[0], pair[1]);
    }
    console.log(data);
    fetch('/add_user', {
        method: 'post',
        body: data

    }).then(response => {
      if(response.ok)
        return response.json();
      else {
        throw response;
      }
    }).then(data =>{
      makeDataState(data);
    }).catch((error) => {
      console.log("Error fetching data: " + error);
    })
  }

  return (
    <div>
        <div>
        Hello This the <a href="/">Home Page</a>
        </div>
        <div>
          {data}
        </div>
        <div onClick={() => deleteUsers()}>Delete Users</div>
        <div>
          <form id="add_user_form">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name"/>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email"/>
            <label htmlFor="age">Age:</label>
            <input type="number" id="age" name="age"/>
            <label htmlFor="image">Image:</label>
            <input type="text" id="image" name="image"/>
            <div onClick={ () => sendFormData()}>Add User</div>
          </form>
        </div>
      </div>
  );
}

export default App;
