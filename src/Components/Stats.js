import React from "react";
import "./Stats.css";
export default function Stats({ note, vacs }) {
	return (
		<div className="stats">
			<div>Notes {note.length}</div>
			<div>Vacations {vacs.length}</div>
			<div>Following Companies</div>
		</div>
	);
}
