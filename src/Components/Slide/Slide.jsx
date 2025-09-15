// <==========> <==========> <==========>
// <==========> Slide.jsx imports <==========>
// <==========> <==========> <==========>
import "./Slide.css";
import React from "react";
import { api } from "../../api";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// <==========> <==========> <==========>
// <==========> Slide.jsx Code <==========>
// <==========> <==========> <==========>
const Slide = () => {
  // <==========> Slide.jsx State <==========>
  const [slides, setSlides] = React.useState([]);

  // <==========> Slide.jsx Effects <==========>
  React.useEffect(() => {
    api
      .get("/slide/all")
      .then((res) => {
        console.log(res.data.slides);
        setSlides(res.data.slides);
      })
      .catch((error) => {
        console.error("Slide yuklashda xatolik", error);
        toast.error("Slide yuklashda xatolik");
      });
  }, []);

  // <==========> Slide.jsx Return <==========>
  return (
    <div className="slide">
      <div id="container">
        <div className="slide__container">
          <Swiper
            modules={[Autoplay, Pagination, EffectCoverflow]}
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            style={{
              borderRadius: "30px",
            }}
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <img src={slide.image} alt={slide.imageAlt} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Slide;
