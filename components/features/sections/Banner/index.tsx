import Image from "next/image";

const Banner = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: "url('/images/banner/landing.jpg')" }}
    >
      {/* Overlay optional jika ingin membuat teks lebih kontras */}
      {/* <div className="absolute inset-0 bg-black opacity-50 z-0"></div> */}

      <div className="z-10 text-center px-6">
        <h1 className="text-5xl lg:text-8xl font-bold text-white drop-shadow-lg">
          Welcome to <br /> Simbarku.co
        </h1>
        <button className="mt-8 text-sm md:text-xl font-semibold hover:shadow-xl bg-brightblue text-white py-3 px-6 md:py-5 md:px-14 rounded-full hover:bg-hoblue">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Banner;
