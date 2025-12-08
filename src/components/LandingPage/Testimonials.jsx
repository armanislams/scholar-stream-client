import React from 'react';
import Swiper from 'swiper';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import TestimonialCards from './Testimonials/TestimonialCards';
import { SwiperSlide } from 'swiper/react';

const Testimonials = () => {
    return (
      <section className="py-10 bg-base-200 mt-10 rounded-md">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Hear from students who achieved their dreams with ScholarStream
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Swiper
              effect={"coverflow"}
              loop={true}
              autoplay={true}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"3"}
              coverflowEffect={{
                rotate: 30,
                stretch: "50%",
                depth: 200,
                scale: 0.75,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              className="mySwiper"
            >
              {/* {reviews.map((r, i) => (
                <SwiperSlide key={i}>
                  <ReviewCard r={r}></ReviewCard>
                </SwiperSlide>
              ))} */}
              <SwiperSlide>
                <TestimonialCards />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
    );
};

export default Testimonials;