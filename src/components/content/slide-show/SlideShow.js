import React, { useEffect, useState } from 'react';
import './SlideShow.scss';

function SlideShow(props) {
  const { images, auto, showArrow } = props;

  const [state, setState] = useState({
    slideShow: images[0],
    slideIndex: 0
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderInterval, setSliderInterval] = useState(0);

  const { slideShow, slideIndex } = state;

  let currentSlideIndex = 0;

  useEffect(() => {
    if (auto) {
      const timeInterval = setInterval(() => {
        autoMoveSlide();
      }, 5000);
      setSliderInterval(timeInterval);
      return () => {
        clearInterval(timeInterval);
        clearInterval(sliderInterval);
      };
    }

    // eslint-disable-next-line
  }, []);

  const autoMoveSlide = () => {
    let lastIndex = 0;
    lastIndex = currentSlideIndex + 1;
    currentSlideIndex = lastIndex === images.length ? 0 : lastIndex;
    setState((prev) => ({
      ...prev,
      slideIndex: currentSlideIndex,
      slideShow: images[currentSlideIndex]
    }));
  };

  const moveSlideWithArrows = (type) => {
    let index = currentIndex;
    if (type === 'prev') {
      if (currentIndex <= 0) {
        index = images.length - 1;
      } else {
        index = index - 1;
      }
    } else {
      if (index === images.length - 1) {
        index = 0;
      }
      if (currentIndex < images.length - 1) {
        index = index + 1;
      }
    }
    setCurrentIndex(index);
    setState({
      ...state,
      slideShow: images[index],
      slideIndex: index
    });
  };

  const RenderArrows = () => {
    return (
      <div className="slider-arrows">
        <div className="slider-arrow slider-arrow--left" onClick={() => moveSlideWithArrows('prev')} />
        <div className="slider-arrow slider-arrow--right" onClick={() => moveSlideWithArrows('next')} />
      </div>
    );
  };

  const Indicators = (props) => {
    // eslint-disable-next-line react/prop-types
    const { currentSlide } = props;
    const listIndicators = images.map((slide, i) => {
      const btnClasses = i === currentSlide ? 'slider-navButton slider-navButton--active' : 'slider-navButton';
      return <button className={btnClasses} key={i} />;
    });
    return <div className="slider-nav">{listIndicators}</div>;
  };

  return (
    <>
      <div className="slider">
        {images && images.length > 0 && slideShow && <div className="slider-slides">{<div className="slider-image" style={{ backgroundImage: `url(${slideShow.url})` }}></div>}</div>}
        <Indicators currentSlide={slideIndex} />
        {showArrow ? <RenderArrows /> : null}
      </div>
    </>
  );
}

export default SlideShow;
