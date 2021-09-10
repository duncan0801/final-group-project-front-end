import { keys } from "@material-ui/core/styles/createBreakpoints";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useStore, { Appointment, LoggedinUser } from "../store";
import "../styles/user.css";

function User() {
  const loggedinUser = useStore((state) => state.loggedinUser);
  const user = useStore((state) => state.user);
  let counsellors = useStore((state) => state.counsellors);
  const fetchUser = useStore((state) => state.fetchUser);
  const onDelete = useStore((state) => state.onDelete);
  const setAppointments = useStore((state) => state.setAppointments);

  useEffect(() => {
    if (loggedinUser) {
      fetchUser(loggedinUser as LoggedinUser);
    }
  }, []);

  if (!user) {
    return <>Loading..</>;
  }

  let foundCounsellor = counsellors?.find(
    (counsellor) => counsellor.id === user.counsellor_ID
  );

  function appointmentCounsellor(appointment: Appointment) {
    return counsellors?.find((c) => c.id === appointment.counsellor_ID);
  }

  return (
    <section className="user-section">
      <h1>
        Hello, {user.firstName} {user.lastName}!
      </h1>
      <div className="user-img-and-username-div">
        <div className="frame-img-user-page">
          <img src={user.avatar} alt="img" />
        </div>
        <h2 className="usernameuUserPage">{user.username}</h2>
      </div>
      <div className="appointments-grid">
        <h3 className="next-appointment">Next appointment: </h3>

        {user.appointments?.length ? (
          user.appointments?.map((appointment: Appointment) => (
            <>
              <ul className="appointmentsList">
                <li>{appointment.date}</li>
                <li>{appointment.time}</li>
                <Link to={`/counsellors/${appointment.counsellor_ID}`}>
                  <li>
                    {appointmentCounsellor(appointment)?.firstName}
                    {appointmentCounsellor(appointment)?.lastName}
                  </li>
                </Link>
                <button
                  onClick={(e) => {
                    onDelete(appointment).then((updatedAppointments) => {
                      if (updatedAppointments) {
                        setAppointments(updatedAppointments);
                      }
                    });
                  }}
                  className="remove-user-page-button"
                >
                  remove
                </button>
              </ul>
            </>
          ))
        ) : (
          <>
            <ul className="appointmentsList">
              <li>No</li>
              <li>Bookings</li>
              <li>Avalible</li>
            </ul>
          </>
        )}
      </div>
      <div className="userPageLinks">
        <Link to="/add-review" className="post-review">
          Add a review
        </Link>
        <Link to={`/chat/user/${user.id}`} className="message-counsellor">
          Message counsellor
        </Link>
      </div>
    </section>
  );
}

export default User;
