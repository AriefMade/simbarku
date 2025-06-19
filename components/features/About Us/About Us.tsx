import Image from "next/image";

const AboutUs = () => {
  return (
    <div id="aboutus-section" className="mx-auto max-w-7xl py-24 lg:px-8 bg-faqblue rounded-2xl my-16 faq-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h3 className='text-center text-[#007BFF] font-semibold text-lg tracking-widest'>About Us</h3>
          <h3 className="text-center text-4xl sm:text-6xl font-bold">Bringing nature closer to you.</h3>
          <p className="mt-6 text-3xl sm:text-x1 text-black">
            At Simbarku.co, we are passionate about bringing the beauty of staghorn ferns into everyday spaces. As a dedicated online store, we provide high-quality plants, care essentials, and stylish accessories tailored for fern lovers of all levels. Our mission is to make staghorn fern ownership easy, enjoyable, and inspiring—whether you're a beginner, collector, or designer. With a focus on quality, sustainability, and customer satisfaction, we aim to be your go-to destination for everything staghorn.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
