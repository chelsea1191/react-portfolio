import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Components/Navbar";
import Stats from "./Components/Stats";

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
	const [user, setUser] = useState([]);
	const [note, setNote] = useState([]);
	const [vacation, setVacation] = useState([]);
	const [followingCompanies, setFollowingCompanies] = useState([]);

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
	useEffect(() => {
		fetchUser().then(response => {
			setUser(response);
		});
	}, []);

	useEffect(() => {
		fetchNotes().then(response => {
			setNote(response);
		});
	}, []);

	useEffect(() => {
		fetchVacs().then(response => {
			setVacation(response);
		});
	}, []);

	console.log(user, note, vacation);

	return (
		<div>
			<Navbar user={user} handleClick={handleClick} />
			<Stats note={note} vacs={vacation} />
		</div>
	);
}

export default App;
