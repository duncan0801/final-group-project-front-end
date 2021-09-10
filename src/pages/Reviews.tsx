import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import FooterComponent from "../components/FooterComponent";
import useStore from "../store";
import "../styles/review.css";

type Review = {
  id: number;
  date: string;
  content: string;
  user_ID: number;
  counsellor_ID: number;
};

function Reviews() {
  const reviews = useStore((state) => state.reviews);
  const setReviews = useStore((state) => state.setReviews);
  const fetchReviews = useStore((state) => state.fetchReviews);

  useEffect(() => {
    fetchReviews();
  }, []);

  if (!reviews) {
    return <h2>loading...</h2>;
  }
  return (
    <section className="reviews">
      <Banner
        title={"REVIEWS"}
        imageLink={
          "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        }
      />
      {/* <div className="review-banner">
        <img
          className="review-banner-img"
          src="https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        ></img>
        <h1 className="banner-title">REVIEWS</h1>
      </div> */}

      <h2 className="review-hero">WHAT OUR CUSTOMERS SAY</h2>

      <div className="reviews-wrapper">
        {reviews.map((review) => (
          <div className="review-card">
            <div className="user-details">
              <span className="name-surname">
                Review written by {review.user?.username}{" "}
              </span>
              <span className="city">Date {review.date}</span>
            </div>

            <blockquote>{review.content}</blockquote>
            <div className="bottom-review-card">
              <div className="frame-img-review">
                <img
                  src="https://images.pexels.com/photos/1142069/pexels-photo-1142069.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt="img"
                />
              </div>
              <div className="counsellor-reviews-wrapper">
                <h3 className="counsellor-reviews-name">
                  <Link to={`/counsellors/${review.counsellor?.id}`}>
                    {review.counsellor?.firstName} {review.counsellor?.lastName}{" "}
                    -(More reviews)
                  </Link>
                </h3>
                <h4 className="counsellor-reviews-speciality">
                  {review.counsellor?.licensing}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      <FooterComponent />
    </section>
  );
}

export default Reviews;
