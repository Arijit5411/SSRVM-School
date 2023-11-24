import React, { Fragment, useEffect, useState } from 'react';

const isProduction = process.env.NODE_ENV === "production";

const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

export const getStaticProps = async () => {
    const res = await fetch(`${siteUrl}/api/calender-downloads?populate=*`)

    const data = await res.json()

    return {
        props: {
            calendar: data
        }
    }
}

const School_Calender = ({ calendar }) => {
    const [calendarData, setCalendarData] = useState([]);

    useEffect(() => {
        // fetch(`${siteUrl}/api/calender-downloads?populate=*`)
        //     .then((response) => response.json())
        //     .then((data) => setCalendarData(data.data))
        //     .catch((error) => console.error('Error fetching data:', error));
        if (calendar && calendar?.data) {
            setCalendarData(calendar?.data)
        }
    }, []);

    const formatTitle = (title) => {
        return title.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    return (
        <Fragment>
            <section className="container sec-third">
                <h4 className='title'>School Calendar for</h4>
                <div className='row'>
                    {calendarData.map((item) => (
                        <div className='col-lg-6 wrap-month' key={item.id}>
                            <div className='syl-item'>
                                <h4>{formatTitle(item.attributes.title)}</h4>
                                <a href={`${siteUrl}${item.attributes.pdf?.data?.attributes?.url}`} download>Download</a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Fragment>
    );
}

export default School_Calender;
