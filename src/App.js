import React, { useState, useEffect } from "react";
import axios from 'axios'
import Navbar from './Components/Navbar'

const API = 'https://acme-users-api-rev.herokuapp.com/api';

const fetchUser = async ()=> {
  const storage = window.localStorage;
  const userId = storage.getItem('userId')
  if(userId){
    try {
      return (await axios.get(`${API}/users/detail/${userId}`)).data
    }
    catch(ex){
      storage.removeItem('userId')
      return fetchUser()
    }
  }
  const user = (await axios.get(`${API}/users/random`)).data
  storage.setItem('userId', user.id)
  return  user
};


function App() {

  const [ user, setUser ] = useState([])
  const [ note, setNote ] = useState([])
  const [ vacation, setVacation ] = useState([])

  async function handleClick() {
    const storage = window.localStorage;
    const user = (await axios.get(`${API}/users/random`)).data
    storage.setItem('userId', user.id)
    setUser(user)
  }

  useEffect(() => {
    fetchUser().then(response => {
      setUser(response)
    })
  }, [])
  console.log(user)

	return (
		<div>
      <Navbar user={user} handleClick={handleClick}/>
		</div>
	);
}

export default App;
