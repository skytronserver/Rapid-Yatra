import React, { useState, useEffect } from "react";

import "./Slider.css";

function Slider({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDone, setSlideDone] = useState(true);
  const [timeID, setTimeID] = useState(null);
  

  useEffect(() => {
    if (slideDone) {
      setSlideDone(false);
      setTimeID(
        setTimeout(() => {
          slideNext();
          setSlideDone(true);
        }, 3000)
      );
    }
  }, [slideDone]);

  const slideNext = () => {
    setActiveIndex((val) => {
      if (val >= children.length - 1) {
        return 0;
      } else {
        return val + 1;
      }
    });
  };

  const slidePrev = () => {
    setActiveIndex((val) => {
      if (val <= 0) {
        return children.length - 1;
      } else {
        return val - 1;
      }
    });
  };

  const AutoPlayStop = () => {
    if (timeID > 0) {
      clearTimeout(timeID);
      setSlideDone(false);
    }
  };

  const AutoPlayStart = () => {
    if (!slideDone) {
      setSlideDone(true);
    }
  };

  return (
    <div
      className="container__slider absolute inset-0"
      // onMouseEnter={AutoPlayStop}
      // onMouseLeave={AutoPlayStart}
    >
      {children.map((item, index) => {
        return (
          <div
            className={" slider__item slider__item-active-" + (activeIndex + 1)}
            key={index}
          >
            {item}
          </div>
        );
      })}
{/* 
      <div className="container__slider__links">
        {children.map((item, index) => {
          return (
            <button
              key={index}
              className={
                activeIndex === index
                  ? "container__slider__links-small container__slider__links-small-active"
                  : "container__slider__links-small"
              }
              onClick={(e) => {
                e.preventDefault();
                setActiveIndex(index);
              }}
            ></button>
          );
        })}
      </div> */}

      {/* <button
        className="slider__btn-next"
        onClick={(e) => {
          e.preventDefault();
          slideNext();
        }}
      >
        {">"}
      </button>
      <button
        className="slider__btn-prev"
        onClick={(e) => {
          e.preventDefault();
          slidePrev();
        }}
      >
        {"<"}
      </button> */}
    </div>
  );
}

export default Slider;



// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';

// const Slider = () => {
//   return (
//     <div><Carousel>
//     <div>
//         <img src="https://djwaiia8q94ix.cloudfront.net/04.140.00/images/logo/trakzee/image1.jpg" />
//         <p className="legend">Legend 1</p>
//     </div>
//     <div>
//         <img src="https://djwaiia8q94ix.cloudfront.net/04.140.00/images/logo/trakzee/image2.jpg" />
//         <p className="legend">Legend 2</p>
//     </div>
//     <div>
//         <img src="https://djwaiia8q94ix.cloudfront.net/04.140.00/images/logo/trakzee/image3.jpg" />
//         <p className="legend">Legend 3</p>
//     </div>
// </Carousel></div>
//   )
// }

// export default Slider