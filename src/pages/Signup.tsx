import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "../styles/signup.css";
// import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
// import useStore from "../store";
import { backEndBaseURL } from "../../../helpers";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"& > *": {
				margin: theme.spacing(1),
				width: "25ch",
			},
		},
	})
);

function Signup() {
	const classes = useStyles();

	const [firstname, setFirstname] = useState<string | null>(null);
	const [lastname, setLastname] = useState<string | null>(null);
	const [username, setUsername] = useState<string | null>(null);
	const [password, setPassword] = useState<string | null>(null);
	const [avatar, setAvatar] = useState<string | null>(null);

	function signUp(e: any) {
		e.preventDefault();

		const signUpDetails = {
			firstName: firstname,
			lastName: lastname,
			username: username,
			password: password,
			avatar: avatar,
		};

		fetch(`${backEndBaseURL}/user`, {
			credentials: "include",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(signUpDetails),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw Error("Failed to add new user");
				}
			})
			.then((newUser) => {
				console.log(newUser);
				alert(
					`Thank you ${newUser.data.username} Your account has been created! Please login to complete autorization.`
				);
			})
			.catch((error) => console.error(error));
	}

	return (
		<div className="sighn-up-container">
			<h1 className="sign-up-page-header">Create your account</h1>

			<div className="sign-up-form-wrapper">
				<form
					// onSubmit={(e) => signUp(e)}
					className="sign-up-form"
					noValidate
					autoComplete="off"
				>
					<div className="first-last-names-form ">
						<TextField
							onChange={(e) => setFirstname(e.target.value)}
							id="firstName"
							label="Name"
							variant="outlined"
						/>
						<TextField
							onChange={(e) => setLastname(e.target.value)}
							id="lastName"
							label="Surname"
							variant="outlined"
						/>
					</div>
					<TextField
						onChange={(e) => setUsername(e.target.value)}
						id="username"
						label="username"
						variant="outlined"
						placeholder="Username"
					/>
					<TextField
						onChange={(e) => setPassword(e.target.value)}
						id="password"
						label="password"
						type="password"
						variant="outlined"
					/>
					<TextField
						onChange={(e) => setAvatar(e.target.value)}
						id="avatar"
						label="avatar"
						variant="outlined"
					/>
					<div className="sign-up-button-wrapper">
						<button
							onClick={(e) => signUp(e)}
							className="sign-up-button"
						>
							<Link to="/login" className="get-started-link">
								Get started
							</Link>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Signup;
