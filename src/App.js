import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Components/Navbar";
import Stats from "./Components/Stats"

import qs from 'qs'
import "./App.css"

const API = "https://acme-users-api-rev.herokuapp.com/api";

const fetchUser = async () => {
	const storage = window.localStorage;
	const userId = storage.getItem("userId");
	if (userId) {
		try {
			return (await axios.get(`${API}/users/detail/${userId}`)).data;
		} catch (ex) {
			storage.removeItem("userId");
			return fetchUser();
		}
	}
	const user = (await axios.get(`${API}/users/random`)).data;
	storage.setItem("userId", user.id);
	return user;
};

function App() {

	const getHash = ()=> {
		return window.location.hash.slice(1);
	}

	useEffect(()=> {
		window.addEventListener('hashchange', ()=> {
			setParams(qs.parse(getHash()));
		});
		setParams(qs.parse(getHash()));
	}, []);

	const [user, setUser] = useState([]);
	const [note, setNote] = useState([]);
	const [vacation, setVacation] = useState([]);
	const [followingCompanies, setFollowingCompanies] = useState([]);
	const [ params, setParams ] = useState(qs.parse(getHash()));

	async function handleClick() {
		const storage = window.localStorage;
		const user = (await axios.get(`${API}/users/random`)).data;
		storage.setItem("userId", user.id);
		setUser(user);
	}

	async function fetchNotes() {
		const storage = window.localStorage;
		const userId = storage.getItem("userId");
		const notes = (await axios.get(`${API}/users/${userId}/notes`)).data;
		return notes;
	}

	async function fetchVacs() {
		const storage = window.localStorage;
		const userId = storage.getItem("userId");
		const vacs = (await axios.get(`${API}/users/${userId}/vacations`)).data;
		return vacs;
	}

	async function fetchFollowingCompanies() {
		const storage = window.localStorage;
		const userId = storage.getItem("userId");
		const companies = (await axios.get(`${API}/users/${userId}/followingCompanies`)).data;
		return companies;
	}

	useEffect(() => {
		fetchUser().then(response => {
			setUser(response);
		});
	}, []);

	useEffect(() => {
		fetchNotes().then(response => {
			setNote(response);
		});
		fetchVacs().then(response => {
			setVacation(response);
		});
		fetchFollowingCompanies().then(response => {
			setFollowingCompanies(response);
		});
	}, [user]);

	return (
		<div className="App">
			<Navbar user={user} handleClick={handleClick} />
			<div className="flex-container">
			 { <Stats note={note} vacs={vacation} followingCompanies={followingCompanies} params={params}/> }
			</div>
		</div>
	);
}


export default App;
