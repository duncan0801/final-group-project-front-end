import React, { useState } from "react";
import { backEndBaseURL } from "../helpers";
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import useStore from "../store";
import "../styles/addReview.css";
import { userInfo } from "os";

function AddReview() {
	const user = useStore((state) => state.user);
	const [date, setDate] = useState<string | null>(null);
	const [content, setContent] = useState<string | null>(null);

	if (!user) {
		return <>Loading..</>;
	}

	function postReview(e: any) {
		// e.preventDefault();

		const newReview = {
			date: date,
			content: content,
			user_ID: user?.id,
			counsellor_ID: user?.counsellor_ID,
		};

		fetch(`${backEndBaseURL}/reviews`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newReview),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw Error("Failed to add review");
				}
			})
			.then((review) => {
				console.log(review);
				alert(
					`Thank you ${review.data.user.username}! The review has been posted`
				);
			})
			.catch((error) => console.error(error));

		return null;
	}
	return (
		<section className="add-review-container">
			<div className="top-addRevie-page">
				<h1 className="addReview-page-header">Post a review</h1>
				<h2 className="addReview-page-h2">
					We would like to hear your opinion.
				</h2>
			</div>
			<div className="addReview-form-wrapper">
				<form className="add-review-form" noValidate autoComplete="off">
					<TextField
						onChange={(e) => setDate(e.target.value)}
						id="date"
						label="date"
						variant="outlined"
						placeholder="Date"
						fullWidth
						multiline
						rows="1"
					/>
					<TextField
						onChange={(e) => setContent(e.target.value)}
						id="content"
						label="content"
						variant="outlined"
						placeholder="What did you think?"
						fullWidth
						multiline
						rows="9"
					/>
					<div className="post-review-wrapper">
						<Link to="/reviews">
							<button
								onClick={(e) => postReview(e)}
								className="post-review-button"
							>
								Post
							</button>
						</Link>
					</div>
				</form>
			</div>
		</section>
	);
}

export default AddReview;
