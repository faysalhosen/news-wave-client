import { TypeAnimation } from "react-type-animation";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState } from 'react';



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import useAxiosPublic from "../../hooks/useAxios";
import { useEffect } from "react";
import CountUp from "react-countup";

const Hero = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    const axiosPublic = useAxiosPublic();
    const [article, setArticle] = useState();
    useEffect(() => {
        axiosPublic.get("/posts")
            .then(data => {

                setArticle(data.data)
            })
    }, [])

    return (
        <div className="">
                


            <div className="mt-4">
                <Swiper

                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    onAutoplayTimeLeft={onAutoplayTimeLeft}
                    className="mySwiper h-[70vh]"
                >
                    {/* <SwiperSlide>Slide 1</SwiperSlide> */}
                    {
                        article?.map(element => <SwiperSlide key={element._id}>
                            <div className="">
                                <img src={element.photoURL} alt="" className="w-full"/>
                            </div>
                        </SwiperSlide>).slice(0, 6)
                    }
                    {/* <SwiperSlide>Slide 2</SwiperSlide>
                    <SwiperSlide>Slide 3</SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide>
                    <SwiperSlide>Slide 5</SwiperSlide>
                    <SwiperSlide>Slide 6</SwiperSlide>
                    <SwiperSlide>Slide 7</SwiperSlide>
                    <SwiperSlide>Slide 8</SwiperSlide>
                    <SwiperSlide>Slide 9</SwiperSlide> */}
                    <div className="autoplay-progress" slot="container-end">
                        <svg viewBox="0 0 1 1" ref={progressCircle}>
                            <circle cx="24" cy="24" r="1"></circle>
                        </svg>
                        <span ref={progressContent}></span>
                    </div>
                </Swiper>

            </div>



        </div >
    );
};

export default Hero;