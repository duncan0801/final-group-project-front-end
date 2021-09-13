import "../styles/header.css";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import Paper from "@material-ui/core/Paper";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
import { Link, Redirect, Route } from "react-router-dom";
import useStore from "../store";
import { backEndBaseURL } from "../../../helpers";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"& > *": {
				margin: theme.spacing(1),
			},
		},
	})
);

function Header() {
	// const classes = useStyles();
	const loggedinUser = useStore((state) => state.loggedinUser);
	const setLoggedinUser = useStore((state) => state.setLoggedinUser);

	function logOut() {
		fetch(`${backEndBaseURL}/logout`, {
			credentials: "include",
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw Error("Failed to logout");
				}
			})
			.then((data) => {
				console.log(data);
				setLoggedinUser(null);
			})
			.catch((error) => console.error(error));

		<Route path="/" exact>
			<Redirect to="/home" />
		</Route>;
	}

	return (
		<header>
			<Link to="/home">
				<svg
					id="Layer_1"
					data-name="Layer 1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 128 128"
					fill="#175c62"
				>
					<title>x</title>
					<path
						className="cls-1"
						d="M80.56771,76.53471a35.16242,35.16242,0,0,0-69.8603-4.1322c-.23936,1.49942-6.31448,33.85312-8.32073,44.518a1.75586,1.75586,0,0,0,2.47088,1.91473L27.546,108.19855A35.1674,35.1674,0,0,0,80.56771,76.53471ZM27.06728,82.55354a4.6285,4.6285,0,1,1,4.632-4.625A4.62965,4.62965,0,0,1,27.06728,82.55354Zm18.43653,0a4.6285,4.6285,0,1,1,4.632-4.625A4.62363,4.62363,0,0,1,45.50381,82.55354Zm18.43653,0a4.6285,4.6285,0,1,1,4.632-4.625A4.62363,4.62363,0,0,1,63.94034,82.55354Z"
					/>
					<path
						className="cls-2"
						d="M125.30392,84.73578,106.86034,59.47794A39.46624,39.46624,0,1,0,30.756,38.57052a41.8317,41.8317,0,0,1,9.91167-2.38637,30.845,30.845,0,0,1,57.35809,22.611l-.76028,2.147,13.178,18.05637c-6.39191.03523-15.22651.09856-23.01928.15489a41.04513,41.04513,0,0,1-1.14745,8.63047c7.90538-.06337,29.25629-.19713,37.61926-.25341A1.75721,1.75721,0,0,0,125.30392,84.73578Z"
					/>
				</svg>
			</Link>
			<Link to="/home" className="home-link">
				<h1 className="logo">online counselling</h1>
			</Link>
			<div></div>
			<nav>
				<ul className="header-ul">
					<Link to="/home" className="header-links">
						<h3 className="main-nav-heading">Home</h3>
					</Link>
					<Link to="/counsellors" className="header-links">
						<h3 className="main-nav-heading">Counsellors</h3>
					</Link>
					<Link to="/reviews" className="header-links">
						<h3 className="main-nav-heading">Reviews</h3>
					</Link>
					<Link to="/faq" className="header-links">
						<h3 className="main-nav-heading">FAQs</h3>
					</Link>
				</ul>
			</nav>
			<div className="login-out">
				{loggedinUser ? (
					<>
						{`Hello ${loggedinUser.username}`}
						<Link to={`/user/${loggedinUser.id}`}>
							<button className="link-to-user-page">user</button>
						</Link>
					</>
				) : (
					<Link to="/login" className="header-links-log-in">
						log in
					</Link>
				)}
				{loggedinUser ? (
					<Link to="/">
						<button
							onClick={(_e) => {
								logOut();
							}}
							className="header-links-log-out"
						>
							Log out
						</button>
					</Link>
				) : (
					""
				)}
			</div>
		</header>
	);
}

export default Header;
