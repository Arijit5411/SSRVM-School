import React, { Fragment } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const isProduction = process.env.NODE_ENV === 'production';

const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

export const getStaticProps = async () => {
    const res = await fetch(`${siteUrl}/api/thank-you-page`)

    const data = await res.json()

    return {
        props: {
            content: data?.data
        }
    }
}

const ThankYou = ({ content }) => {
    console.log(content);
    return (
        <>
            <Fragment>
                <NavBar />
                <section>
                    <div className="vh-100 d-flex justify-content-center align-items-center">
                        <div className="col-md-6 col-11">
                            <div className="border border-3 border-success"></div>
                            <div className="card  bg-white shadow p-md-5 p-4">
                                <div className="mb-4 text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-success bi bi-check-circle" width="120" height="100"
                                        fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path
                                            d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                                    </svg>
                                </div>
                                <div className="text-center">
                                    <h1 dangerouslySetInnerHTML={{ __html: content?.attributes?.Heading }}></h1>
                                    {/* <p dangerouslySetInnerHTML={{ __html: content?.attributes?.Subheading }}></p> */}
                                    <a href='/'>
                                        <button className="btn-thank">Back Home</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >

                <Footer />
            </Fragment >
        </>
    );
}

export default ThankYou;