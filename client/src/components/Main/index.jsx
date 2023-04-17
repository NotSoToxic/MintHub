import styles from "./styles.module.css";
import { Link } from 'react-router-dom';
import React, { useState } from "react";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	  
		

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>⁕MintHub⁕</h1>
			<Link to="/Market">
				<button className={styles.white_btn} >
					Market
				</button>
			</Link>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
	);
};

export default Main;
