import React from "react";
import Notes from "./Notes";
import Vacations from "./Vacations";
import Companies from "./Companies";
import "./Stats.css";

export default function Stats({ note, vacs, followingCompanies, params }) {
	if (params.view === "notes") {
		return (
			<div>
				<Notes note={note} />
			</div>
		);
	} else if (params.view === "vacations") {
		return (
			<div>
				<Vacations vacation={vacs} />
			</div>
		);
	} else if (params.view === "companies") {
		return (
			<div>
				<Companies followingCompanies={followingCompanies} />
			</div>
		);
	} else {
		return (
			<div className="stats flex-container">
				<div className="circle">
					<a href="#view=notes">Notes</a>
					{params.view === "notes" && <Notes note={note} />}
					<p>You have {note.length} notes.</p>
				</div>
				<div className="circle">
					<a href="#view=vacations">Vacations</a>
					{params.view === "vacations" && <Vacations vacation={vacs} />}
					<p>You have {vacs.length} vacations.</p>
				</div>
				<div className="circle">
					<a href="#view=companies">Following Companies</a>
					{params.view === "companies" && (
						<Companies followingCompanies={followingCompanies} />
					)}
					<p>You are following {followingCompanies.length} companies.</p>
				</div>
			</div>
		);
	}
}
