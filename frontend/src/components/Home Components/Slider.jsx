import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import sliderimg1 from '../../images/sliderimg1.jpg'
import sliderimg2 from '../../images/sliderimg2.webp'
import sliderimg3 from '../../images/sliderimg3.png'
import sliderimg4 from '../../images/sliderimg4.jpg'

const images = [sliderimg1, sliderimg2, sliderimg3, sliderimg4];

const FullScreenSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: false,
  };

  return (
    <div className="relative w-screen h-[500px] overflow-hidden outfit-text">

      <div className="absolute inset-0 z-10 flex items-center justify-center text-white text-center bg-black/30">
        <div>
          <h1 className="text-3xl font-bold drop-shadow-xl">5<sup>TH</sup> WORLD CONFERENCE ON INNOVATIONS IN MANAGEMENT, SCIENCE AND ENGINEERING</h1>
          <p className="text-xl mt-2 drop-shadow">December 27-28 2025</p>
          <br />
          <h1 className="text-xl mt-2 drop-shadow">Venue : Avani Pattaya Resort, Thailand</h1>
          <p className="text-xl mt-2 drop-shadow">HYBRID CONFERENCE</p>
        </div>
      </div>

      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              className="w-screen h-screen object-fill"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FullScreenSlider;


