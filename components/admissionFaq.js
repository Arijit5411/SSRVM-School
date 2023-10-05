import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdmissionFaq = () => {

    const [faqs, setFaqs] = useState([]);

    const isProduction = process.env.NODE_ENV === "production";

    const siteUrl = isProduction
        ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
        : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

    useEffect(() => {
        fetch(`${siteUrl}/api/admission-faqs`)
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
                                                {faq.attributes.answer}
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
