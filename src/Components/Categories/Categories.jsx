// <==========> <==========> <==========>
// <==========> Categories.jsx Imports <==========>
// <==========> <==========> <==========>
import "./Categories.css";
import React from "react";
import { api } from "../../api";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";

// <==========> <==========> <==========>
// <==========> Categories.jsx Component <==========>
// <==========> <==========> <==========>
const Categories = () => {
  // <==========> Categories.jsx State <==========>
  const [categories, setCategories] = React.useState([]);

  // <==========> Categories.jsx useEffect <==========>
  React.useEffect(() => {
    api
      .get("/category/all")
      .then((res) => {
        console.log(res.data.categories);
        setCategories(res.data.categories);
      })
      .catch((error) => {
        console.error("Kategoriyalarni yuklashda xatolik", error);
        toast.error("Kategoriyalarni yuklashda xatolik");
      });
  }, []);

  // <==========> Categories.jsx Render <==========>
  return (
    <div className="categories">
      <div id="container">
        <h2>Kategoriyalar</h2>
        <Swiper
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          style={{ paddingBottom: 24 }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div>
                <img src={category.image} alt={category.imageAlt} />
                <h3>{category.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Categories;
