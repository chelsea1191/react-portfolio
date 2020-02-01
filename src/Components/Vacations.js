import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import "./Vacation.css";

const API = "https://acme-users-api-rev.herokuapp.com/api";


export default function Vacations({ vacation }) {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const userId = window.localStorage.getItem("userId");

	const createVac = async vac => {
		if (vac.startDate === "" || vac.endDate === "") {
			alert("Cannot Add Empty Vacations");
			return;
		}
		return axios.post(`${API}/users/${userId}/vacations`, vac).catch(error => {
			console.log(error);
		});
	};

	const delVac = delVac => {
		return axios
		.delete(`${API}/users/${userId}/vacations/${delVac.id}`)
	}

	const handleSubmit = async e => {
		e.preventDefault();
		await createVac({ startDate, endDate });
		setStartDate(moment().format("MM/DD/YYYY"));
		setEndDate(moment().format("MM/DD/YYYY"));
	};

	return (
		<div>
			<div>
				<form>
					Start Date:{" "}
					<input
						value={startDate}
						type="date"
						onChange={ev => setStartDate(ev.target.value)}
					></input>
				</form>
				<form>
					End Date:{" "}
					<input
						value={endDate}
						type="date"
						onChange={ev => setEndDate(ev.target.value)}
					></input>
				</form>
				<button onClick={handleSubmit}>Create</button>
			</div>
			<div className="list">
				<ul>
					{vacation.map(each => (
						<div className="vacationList">
							{moment(each.startDate).format("dddd MM/DD/YYYY")} to{" "}
							{moment(each.endDate).format("dddd MM/DD/YYYY")} (
							{moment(each.endDate).diff(moment(each.startDate), "days")} days)
							<button onClick={() => delVac(each)}>Delete</button>
						</div>
					))}
				</ul>
			</div>
		</div>
	);
}
