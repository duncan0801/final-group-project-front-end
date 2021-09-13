import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useParams, Link } from "react-router-dom";
import useStore from "../store";
import "../styles/appointments.css";
import { backEndBaseURL } from "../helpers";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: "flex",
			flexWrap: "wrap",
		},
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			width: 200,
		},
	})
);

function Appointments() {
	const classes = useStyles();
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const loggedinUser = useStore((state) => state.loggedinUser);
	const user = useStore((state) => state.user);
	const setUser = useStore((state) => state.setUser);

	const { id }: { id: string } = useParams();
	const counsellorId = Number(id);

	if (!loggedinUser) {
		return <>Please loggin or create account</>;
	}

	function bookAppointment(e: any) {
		e.preventDefault();

		const newAppointment = {
			date: date,
			time: time,
			user_ID: loggedinUser?.id,
			counsellor_ID: counsellorId,
		};

		fetch(`${backEndBaseURL}/appointments`, {
			credentials: "include",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newAppointment),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("Failed to login");
				}
			})
			.then((res) => {
				alert(
					`Thank you ${user?.username}, appointment was succesfully booked. `
				);
			})
			.catch((error) => alert("Please choose different time.."));
	}

	return (
		<section className="appointments">
			<div className="top-login-page">
				<h1 className="Book-appointment-page-header">
					Make an appointment
				</h1>
				<h2 className="book-appointment-page-h2">
					PLease sselect preferable date and time beetwen 9:00 - 18:00
				</h2>
			</div>
			<form className={classes.container} noValidate>
				<TextField
					id="date"
					label="Date"
					type="date"
					onChange={(e) => setDate(e.target.value)}
					defaultValue="2021-09-10"
					className={classes.textField}
					InputLabelProps={{
						shrink: true,
					}}
				/>

				<TextField
					onChange={(e) => setTime(e.target.value)}
					id="time"
					label="Time"
					type="time"
					defaultValue="10:30"
					className={classes.textField}
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</form>
			<Link to={`/user/${loggedinUser.id}`} className="book-link">
				<button
					onClick={(e) => bookAppointment(e)}
					className="book--appointment-button"
				>
					Book
				</button>
			</Link>
		</section>
	);
}

export default Appointments;
