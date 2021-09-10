import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Banner from "../components/Banner";
import FooterComponent from "../components/FooterComponent";
import useStore from "../store";
import "../styles/faq.css";

type QuestionAndAnswer = {
  question: string;
  answer: string;
};

function QuestionAndAnswer({ question, answer }: QuestionAndAnswer) {
  return (
    <li>
      <button>{question}</button>
      <p>{answer}</p>
      <hr></hr>
    </li>
  );
}
function FAQ() {
  const faqs = useStore((state) => state.faqs);
  const fetchFaqs = useStore((state) => state.fetchFaqs);

  useEffect(() => {
    fetchFaqs();
  }, []);

  if (!faqs) {
    return <h2>loading...</h2>;
  }
  return (
    <>
      <Banner
        title="FAQs"
        imageLink="https://images.pexels.com/photos/3771060/pexels-photo-3771060.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      />
      <section className={"faqs"}>
        <ul className="faq-list">
          {faqs.map((faq: QuestionAndAnswer, index: number) => {
            return (
              <QuestionAndAnswer
                question={faq.question}
                answer={faq.answer}
                key={index}
              />
            );
          })}
        </ul>
      </section>
      <FooterComponent />
    </>
  );
}

export default FAQ;
