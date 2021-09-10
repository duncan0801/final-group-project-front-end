import "../styles/counsellor.css";
import { Counsellor, Review, User } from "../store";
import useStore from "../store";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

type SingleCounsellorProps = {
	counsellor: Counsellor;
};

function SingleCounsellor() {
	let counsellor = useStore((state) => state.counsellor);
	const user = useStore((state) => state.user);
	const fetchCounsellorById = useStore((state) => state.fetchCounsellorById);

	const { id }: { id: string } = useParams();

	useEffect(() => {
		fetchCounsellorById(id);
	}, []);

	if (!counsellor) {
		return <h2>loading...</h2>;
	}

	return (
		<section className="single-counsellor-page">
			<section className="single-counsellor-page-header">
				<div className="single-counsellor-top-header">
					<h1 className="single-counsellor-name">
						{counsellor.firstName + " " + counsellor.lastName}
					</h1>
				</div>
				<div className="single-counsellor-bottom-header">
					<ul className="single-counsellor-nav">
						<li>
							<a className="links-singlecounsellor-page" href="#">
								About me
							</a>
						</li>
						<li className="links-singlecounsellor-page">
							<a
								className="links-singlecounsellor-page"
								href="#specialities"
							>
								Specialities
							</a>
						</li>
						<li className="links-singlecounsellor-page">
							<a
								className="links-singlecounsellor-page"
								href="#specialities"
							>
								Licensing
							</a>
						</li>
						<li className="links-singlecounsellor-page">
							<a
								className="links-singlecounsellor-page"
								href="#specialities"
							>
								Reviews
							</a>
						</li>
						<li></li>
					</ul>
				</div>
			</section>
			<main className="main-single-counsellor-page">
				<div className="singleCounsellor-left-column">
					<div className="abbout-me-singCoun-section">
						<h2 className="title-single-counsellor-page">
							about me
						</h2>
						<p className="greeting">
							Hello! Thank you for taking the time to read my
							profile.
						</p>
						<p className="about-info">{counsellor.about}</p>
						<p className="best-wishes">
							I'm wishing you the best of luck on your journey of
							self discovery and I hope to work alongside you!
						</p>
					</div>
					<div className="specialties-singCoun-section">
						<a className="anchor-link" id="specialities"></a>
						<h2 className="title-single-counsellor-page">
							specialities
						</h2>
						<ul className="">
							{counsellor.specialties.map((speciality) => (
								<li>{speciality.name}</li>
							))}
						</ul>
						<p>
							<strong>Years of experience</strong>:{" "}
							{counsellor.yearsExperience}
						</p>
					</div>
					<div className="licensing-singCoun-section">
						<a className="anchor-link" id="licening"></a>
						<h2 className="title-single-counsellor-page">
							licening
						</h2>
						<span>{counsellor.licensing}</span>
					</div>
					<div className="reviews-singCoun-section">
						<a className="anchor-link" id="reviews"></a>
						<h2 className="title-single-counsellor-page">
							reviews
						</h2>
						{counsellor.reviews.map((review) => (
							<>
								<span className="single-counsellor-date-review">
									Date {review.date}
								</span>
								<blockquote className="page-blockquotes">
									"{review.content}"
								</blockquote>
							</>
						))}
					</div>
				</div>
				<div className="singleCounsellor-right-column">
					<div className="frame-img-singleCounsellor-page">
						<img
							src={counsellor.avatar}
							alt={counsellor.firstName}
						/>
					</div>
					<Link
						to={`/bookings/counsellor/${counsellor.id}`}
						className="link-to-book-appointment"
					>
						Book session
					</Link>
				</div>
				<div></div>
			</main>
		</section>
	);
}

export default SingleCounsellor;
