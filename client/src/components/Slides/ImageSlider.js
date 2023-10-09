import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImageSlider.css'; // Create a separate CSS file for styling

function ImageSlider() {
  const sliderRef = useRef(null);

  const settings = {
    // Customize your carousel settings here
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    pauseOnHover: true, // Pause autoplay on hover
  };

  const pauseSlider = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPause();
    }
  };

  return (
    <Slider {...settings} ref={sliderRef}>
      <div className="slide">
        <div className="slide-content">
          <img src="/images/banner.png" alt="Image 1" />
          <div>Content for Image 1</div>
        </div>
      </div>
      <div className="slide">
        <div className="slide-content">
          <img src="/images/banner1.png" alt="Image 2" />
          <div>Content for Image 2</div>
        </div>
      </div>
      <div className="slide">
        <div className="slide-content">
          <img src="/images/banner2.png" alt="Image 3" />
          <div>Content for Image 3</div>
        </div>
      </div>
    </Slider>
  );
}

export default ImageSlider;

