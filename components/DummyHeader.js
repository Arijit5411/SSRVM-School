import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DummyHeader = ({siteUrl}) => {
    const [header, setHeader] = useState([]);

    useEffect(() => {
        fetch(`${siteUrl}/api/home-dummies?populate=*`)
            .then(response => response.json())
            .then(data => {
                setHeader(data.data);
            })
            .catch(error => {
                console.error('Error fetching API data:', error);
            });
    }, []);

    return (
        <div>
            {header.map(event => (
                event.attributes.enable_disable && (
                    <div key={event.id} className='service_area-3 marginTop pd-top-45 pd-bottom-45'>
                        <div className='container'>
                            <div className='row justify-content-center'>
                                <div className='col-lg-5 col-md-5 col-sm-5'>
                                    <div className='solution-item'>
                                        <div className='solution-image'>
                                            <img src={`${siteUrl}${event.attributes.header_one_image.data.attributes.url}`} className='img-fluid' alt='solution image' />
                                        </div>
                                        <h4 className='homeTitle'>{event.attributes.header_one}</h4>
                                    </div>
                                </div>

                                <div className='col-lg-5 col-md-5 col-sm-5'>
                                    <div className='solution-item'>
                                        <div className='solution-image'>
                                            <img src={`${siteUrl}${event.attributes.header_two_image.data.attributes.url}`} className='img-fluid' alt='solution image' />
                                        </div>
                                        <h4 className='homeTitle'>{event.attributes.header_two}</h4>
                                    </div>
                                </div>

                                <div className='col-lg-5 col-md-5 col-sm-5'>
                                    <div className='solution-item'>
                                        <div className='solution-image'>
                                            <img src={`${siteUrl}${event.attributes.header_three_image.data.attributes.url}`} className='img-fluid' alt='solution image' />
                                        </div>
                                        <h4 className='homeTitle'>{event.attributes.header_three}</h4>
                                    </div>
                                </div>

                                <div className='col-lg-5 col-md-5 col-sm-5'>
                                    <div className='solution-item'>
                                        <div className='solution-image'>
                                            <img src={`${siteUrl}${event.attributes.header_four_image.data.attributes.url}`} className='img-fluid' alt='solution image' />
                                        </div>
                                        <h4 className='homeTitle'>{event.attributes.header_four}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}

export default DummyHeader;
