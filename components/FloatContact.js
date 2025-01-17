import React, { useState, useEffect } from 'react';

const FloatContact = () => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById('bottomSection');
            if (section) {
                const rect = section.getBoundingClientRect();
                setIsSticky(rect.top <= window.innerHeight && rect.bottom >= 0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="bottomSection" className={isSticky ? 'section-bottom' : ''}>
            <div className="d-lg-none position-relative">
                <div className="text-center">
                    Contact
                </div>
            </div>
        </section>
    );
};

export default FloatContact;
