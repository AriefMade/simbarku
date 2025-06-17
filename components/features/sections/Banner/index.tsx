import Image from "next/image";

const Banner = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center pt-20"
      style={{ backgroundImage: "url('/images/banner/landing.jpg')" }}
    >
      <div className="z-10 text-center px-6">
        <h1 className="text-5xl lg:text-8xl font-bold text-white drop-shadow-lg">
          Welcome to <br /> Simbarku.co
        </h1>
        <a
          href="#product-section"
          className="mt-8 inline-block text-sm md:text-xl font-semibold hover:shadow-xl bg-brightblue text-white py-3 px-6 md:py-5 md:px-14 rounded-full hover:bg-hoblue"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Banner;
