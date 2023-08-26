import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import Carousel1 from '../assets/carousel1.avif';
import Carousel2 from '../assets/carousel2.avif';
import Carousel3 from '../assets/carousel3.avif';

type CarouselItem = {
    src: StaticImageData;
    title: string;
    description: string;
};

const carouselItems: CarouselItem[] = [
    {
        src: Carousel1,
        title: 'Nails',
        description: 'Get your nails done by our expert nail technicians for a perfect look and feel.',
    },
    {
        src: Carousel2,
        title: 'Haircut',
        description: 'Experience our top-notch haircuts and styling services by our skilled hairdressers.',
    },
    {
        src: Carousel3,
        title: 'Facials',
        description: 'Revitalize your skin with our rejuvenating facial treatments and skincare services.',
    },
];
export const Carousel = () => {
    return (
        <>
            <div className="carousel w-full md:w-2/5 mx-auto h-[25rem]">
                {carouselItems.map((item, index) => (
                    <div id={`slide${index + 1}`} className="carousel-item relative w-full" key={index}>
                        <div className="card w-full bg-base-100 shadow-xl image-full">
                            <figure className='relative'>
                                <Image src={item.src} alt={item.title} className="w-full" fill sizes="(max-width: 768px) 100vw" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.title}</h2>
                                <p>{item.description}</p>
                                <div className="card-actions justify-end">
                                    <Link href="/Login" className="btn btn-primary">Book Now!</Link>
                                </div>
                            </div>
                        </div>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-50">
                            <a href={`#slide${index === 0 ? carouselItems.length : index}`} className="btn btn-circle">
                                ❮
                            </a>
                            <a href={`#slide${index === carouselItems.length - 1 ? 1 : index + 2}`} className="btn btn-circle">
                                ❯
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
