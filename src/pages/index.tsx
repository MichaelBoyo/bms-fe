import { Carousel } from '@/components/Carousel';
import { Layout } from '@/components/Layout';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="">
      <Layout>
        <div
          className="hero h-[27rem]"
          style={{
            backgroundImage:
              'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)',
            width: '100%',
            objectFit: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            MozBackgroundSize: 'cover',
            WebkitBackgroundSize: 'cover',
            OBackgroundSize: 'cover'
          }}
        >
          <div className="text-center text-neutral-content p-5">
            <div className="card w-[30rem] bg-neutral shadow-xl">
              <div className="card-body">
                <h1 className="mt-5 text-4xl font-bold">
                  Be Confident
                </h1>
                <p className="mb-10 text-lg">
                  Discover and book beauty services with professionals near you
                </p>
                <Link href="/Login" className="btn btn-primary">
                  Book an Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="py-20 flex bg-neutral flex-col justify-center items-center md:w-full">
          <h1 className="text-4xl font-semibold my-10 text-gray-400">
            Services we offer
          </h1>
          <Carousel />
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
