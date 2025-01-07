'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";

const slides = [
    {
        id: 1,
        title: "Care Kit Shampoo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, mollitia.",
        url: "/",
        image: "/image/download2.jpeg",
        bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
    },
    {
        id: 2,
        title: "Care Shampoo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, mollitia.",
        url: "/",
        image: "/image/download2.jpeg",
        bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
    },
    {
        id: 3,
        title: "Kit Shampoo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, mollitia.",
        url: "/",
        image: "/image/download2.jpeg",
        bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
    },
    {
        id: 4,
        title: "Shampoo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, mollitia.",
        url: "/",
        image: "/image/download2.jpeg",
        bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
    },
];

export function Carousel(){

    const[current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);


    return(
        <div className="h-[calc(100vh-80px)] overflow-hidden relative">
            <div className="w-max h-full flex transition-all ease-in-out duration-1000"
                style={{transform: `translateX(-${current * 100}vw)`}}
            >
                {
                    slides.map((slide)=>(
                        <div className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`} key={slide.id}>
                            {/* Text Container */}
                            <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 text-center">
                                <h2 className="text-xl lg:text-3xl 2xl:text-5xl">{slide.description}</h2>
                                <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">{slide.title}</h1>
                                <Link href={slide.url}><button className="rounded-md bg-eggPlant text-white py-3 px-4">SHOP NOW</button></Link>
                            </div>

                            {/* Image Container */}
                            <div className="h-1/2 xl:w-1/2 xl:h-full relative">
                                <Image src={slide.image} alt="" fill sizes="100%" className="flex-none object-cover"/>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="absolute top-0 h-full w-full justify-between items-center flex px-10">
                <button onClick={prevSlide}>
                    <IoMdArrowRoundBack />
                </button>
                <button onClick={nextSlide}>
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
}

export default Carousel;