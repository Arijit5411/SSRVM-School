import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';

const MandatoryDisclosure = ({siteUrl}) => {
    const [data, setData] = useState()
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
            <div className={`mandatoryDiv cursor-pointer ${!data?.data[0]?.attributes?.switch && 'd-none'}`} onClick={() => window.open(`/mandatory-public-disclosure`, '_self')}>
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