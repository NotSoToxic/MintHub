import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);// state variable to toggle password visibility 
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};
	const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<div className={styles.password_container}>
						<input
							type={showPassword ? "test" : "password"}
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						<button
                            type="button"
                            className={styles.password_toggle}
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "👁️" : "❌"}
                        </button>
						</div>
						{error && <div className={styles.error_msg}>{error}</div>}
						<Link to =""><button type="button" className={styles.white_btn}>
							Forgot Password?
						</button></Link>
						<button type="submit" className={styles.green_btn}>
							Log in
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/register">
						<button type="button" className={styles.white_btn}>
							Register
						</button>
					</Link>
					
				</div>
			</div>
		</div>
	);
};

export default Login;
