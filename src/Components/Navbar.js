import React from "react";
import "./Navbar.css";

export default function Navbar({ params, user, handleClick, home }) {
	return (
		<div className="navBar">
			<img
				src={user.avatar}
				alt="NoImage"
				onClick={e => {
					e.preventDefault();
					window.location = "";
				}}
			/>
			<h1>Welcome {user.email}</h1>
			<button onClick={() => handleClick()}>Change User</button>
		</div>
	);
}
