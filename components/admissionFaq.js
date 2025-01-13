import React, { useState, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const AdmissionFaq = ({ siteUrl }) => {
    const [faqs, setFaqs] = useState([]);
    useEffect(() => {
        fetch(`${siteUrl}/api/admission-faqs?pagination[start]=0&pagination[limit]=100`)
            .then((response) => response.json())
            .then((data) => {
                setFaqs(data.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    return (
        <>
            <section className="container wrap-accord-faq-admission">
                <div className="row g-4 ">
                    {faqs.map((faq, index) => {
                        const isFirstAccordion = index === 0;
                        const accordionId = `accordionExample${isFirstAccordion ? '1' : '2'}`;
                        const questionId = `heading${isFirstAccordion ? 'One' : 'Two'}_${faq.id}`;
                        const answerId = `collapse${isFirstAccordion ? 'One' : 'Two'}_${faq.id}`;
                        const isDefaultOpen = isFirstAccordion;

                        return (
                            <div className="col-lg-6" key={faq.id}>
                                <div className={`row g-4 accordion`} id={accordionId}>
                                    <div className=" col-lg-12 accordion-item">
                                        <h2 className="accordion-header" id={questionId}>
                                            <button className={`accordion-button ${isDefaultOpen ? '' : 'collapsed'}`} type="button"
                                                data-bs-toggle="collapse" data-bs-target={`#${answerId}`}
                                                aria-expanded={isDefaultOpen ? 'true' : 'false'} aria-controls={answerId}>
                                                {faq.attributes.question}
                                            </button>
                                        </h2>
                                        <div id={answerId} className={`accordion-collapse collapse ${isDefaultOpen ? 'show' : ''}`}
                                            aria-labelledby={questionId} data-bs-parent={`#${accordionId}`}>
                                            <div className="accordion-body">
                                                <ReactMarkdown>
                                                    {faq.attributes.answer}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>


        </>

    );
};

export default AdmissionFaq;
