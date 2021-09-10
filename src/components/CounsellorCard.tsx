import "../styles/counsellor-card.css";
import { Counsellor } from "../store";
import { Link } from "react-router-dom";

type CounsellorCardProps = {
  counsellor: Counsellor;
};

function CounsellorCard({ counsellor }: CounsellorCardProps) {
  return (
    <>
      <Link to={`/counsellors/${counsellor.id}`}>
        <article className="counsellor-card">
          <img
            className="counsellor-image"
            src={counsellor.avatar}
            alt={counsellor.firstName}
          />
          <h3 className="counsellor-name">
            {counsellor.firstName + " " + counsellor.lastName}
          </h3>
          <h4 className="counsellor-specialties">{counsellor.specialties.map(({ name }) => name).join(", ")}</h4>
        </article>
      </Link>
    </>
  );
}

export default CounsellorCard;
