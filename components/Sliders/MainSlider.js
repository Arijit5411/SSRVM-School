/* eslint-disable react-hooks/exhaustive-deps */

'use client'
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const MainSlider = ({ settings, className, children, responsive, NestedItems, NestedClassName, NestedResponsive, Nested, NumberPagination }) => {

  const childrenArray = React.Children.toArray(children);
  const [nestedItemsPerPage, setNestedItemsPerPage] = useState(NestedItems);
  const [currentSlide, setCurrentSlide] = useState(1);

  const convertResponsiveProps = (responsive) => {
    return Object.keys(responsive).map(breakpoint => ({
      breakpoint: parseInt(breakpoint, 10),
      settings: responsive[breakpoint],
    }));
  };

  let resData;
  if (settings?.slidesToShow > 1) {
    resData = [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ];
  } else {
    resData = "";
  }

  const defaultSettings = {
    dots: false,
    infinite: true,
    fade: false,
    speed: 200,
    autoplaySpeed: 3000,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <div className="slick-prev"><i className="fa-solid fa-arrow-left-long"></i></div>,
    nextArrow: <div className="slick-next"><i className="fa-solid fa-arrow-right-long"></i></div>,
    responsive: responsive ? convertResponsiveProps(responsive) : resData,
    afterChange: (index) => setCurrentSlide(index + 1),
  };

  const mergedSettings = {
    ...defaultSettings,
    ...settings,
  };

  const getNestedItemsForWidth = (width) => {
    if (NestedResponsive) {
      const sortedBreakpoints = Object.keys(NestedResponsive)
        .map(breakpoint => parseInt(breakpoint, 10))
        .sort((a, b) => a - b);

      for (let breakpoint of sortedBreakpoints) {
        if (width <= breakpoint) {
          return NestedResponsive[breakpoint]?.NestedItems || NestedItems;
        }
      }
    }
    return NestedItems;
  };

  useEffect(() => {
    const handleResize = () => {
      setNestedItemsPerPage(getNestedItemsForWidth(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    handleResize();  // Call immediately to set initial state

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [NestedResponsive, NestedItems]);

  const groupedChildren = childrenArray.reduce((result, item, index) => {
    const groupIndex = Math.floor(index / nestedItemsPerPage);
    if (!result[groupIndex]) {
      result[groupIndex] = [];
    }
    result[groupIndex].push(item);
    return result;
  }, []);

  const totalSlides = Nested ? groupedChildren.length : childrenArray.length;

  return (
    <>
      {Nested ? (
        <Slider {...mergedSettings} className={className}>
          {groupedChildren.map((group, index) => (
            <div key={index}>
              <div className={NestedClassName}>
                {group}
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <Slider {...mergedSettings} className={className}>
          {childrenArray.map((child, index) => (
            <div key={index}>{child}</div>
          ))}
        </Slider>
      )}
      {NumberPagination &&
        <div className='number-pagination'>
          <span>{currentSlide.toString().padStart(2, '0')}</span>/
          <span>{totalSlides.toString().padStart(2, '0')}</span>
        </div>
      }
    </>
  );
};

export default MainSlider;
