import React, {useState, useEffect} from "react";
import axios from 'axios'

const API = "https://acme-users-api-rev.herokuapp.com/api";


async function fetchCompanies() {
	const companies = (
		await axios.get(`${API}/companies`)
	).data
	return companies
}


export default function Companies({ followingCompanies }) {
	const [companies, setCompanies] = useState([])

	useEffect(() => {
		fetchCompanies().then(response => {
			setCompanies(response)
		})
	}, [followingCompanies])

function findCompany(id) {
	return companies.map(comp=>{
		//console.log(comp)
		if (comp.id===id) {
			console.log('yes')
			return comp.companyName
		}
	})
}
	return (
		<div className="list">
			<p>COMPANIES</p>
			<ul>
				{followingCompanies.map(each => (
					<li>{findCompany(each.id)}</li>
				))}
			</ul>
		</div>
	);
}
