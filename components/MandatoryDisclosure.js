import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';

const MandatoryDisclosure = () => {

    const [data, setData] = useState()

    const isProduction = process.env.NODE_ENV === 'production';

    const siteUrl = isProduction
        ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
        : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;


    const getData = async () => {
        try {
            const res = await fetch(`${siteUrl}/api/home-disclosure-enable-disables?populate=*`)
            const resdata = await res.json()
            setData(resdata)
        } catch (error) {
            console.log('mandatory disclosure error', error);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className={`mandatoryDiv cursor-pointer ${!data?.data[0]?.attributes?.switch && 'd-none'}`} onClick={() => window.open(`/school-info`, '_self')}>
                <Marquee>
                    <span className='mx-3'>{data?.data[0]?.attributes?.Text.toUpperCase()}</span>
                    <span className='mx-3'>{data?.data[0]?.attributes?.Text.toUpperCase()}</span>
                    <span className='mx-3'>{data?.data[0]?.attributes?.Text.toUpperCase()}</span>
                    <span className='mx-3'>{data?.data[0]?.attributes?.Text.toUpperCase()}</span>
                    <span className='mx-3'>{data?.data[0]?.attributes?.Text.toUpperCase()}</span>
                </Marquee>
            </div>
        </>
    )
}

export default MandatoryDisclosure