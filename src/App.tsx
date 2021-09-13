import "./App.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Counsellors from "./pages/Counsellors";
import SingleCounsellor from "./pages/SingleCounsellor";
import Appointments from "./pages/Appointments";
import User from "./pages/User";
import Chat from "./pages/Chat";
import Reviews from "./pages/Reviews";
import FAQ from "./pages/FAQ";
import useStore from "./store";
import AddReview from "./pages/AddReview";
import AppointmentSuccess from "./pages/AppointmentSuccess";

function App() {
	const loggedinUser = useStore((state) => state.loggedinUser);

	return (
		<div className="app">
			<Header />
			<main>
				<Switch>
					<Route path="/" exact>
						<Redirect to="/home" />
					</Route>
					<Route path="/home">
						<Home />
					</Route>
					<Route path="/faq">
						<FAQ />
					</Route>
					<Route path="/reviews">
						<Reviews />
					</Route>
					<Route path="/add-review">
						<AddReview />
					</Route>
					<Route path="/chat/user/:id">
						<Chat />
					</Route>
					<Route path="/user/:id">
						<User />
					</Route>
					<Route path="/bookings/counsellor/booking-success/:id">
						<AppointmentSuccess />
					</Route>
					<Route path="/bookings/counsellor/:id">
						<Appointments />
					</Route>
					<Route path="/counsellors/:id">
						<SingleCounsellor />
					</Route>
					<Route path="/counsellors">
						<Counsellors />
					</Route>
					<Route exact path="/signup">
						<Signup />
					</Route>
					<Route exact path="/login">
						{loggedinUser ? (
							<Redirect to={`user/${loggedinUser.id}`} />
						) : (
							<Login />
						)}
					</Route>
				</Switch>
			</main>
		</div>
	);
}

export default App;
