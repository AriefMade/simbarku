import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from '@heroicons/react/20/solid'

interface datatype {
    heading: string;
    imgSrc: string;
    paragraph: string;
    link: string;
}

const Aboutdata: datatype[] = [
    {
        heading: "Simbar Plants & Media",
        imgSrc: "/images/aboutus/imgOne.svg",
        paragraph: 'Kami menawarkan tanaman simbar pilihan dengan kualitas terbaik, dilengkapi moss dan media tanam alami yang mendukung pertumbuhan sehat dan tampilan alami yang menawan.',
        link: '/shop'
    },
    {
        heading: "Simbar Care Supplies",
        imgSrc: "/images/aboutus/imgTwo.svg",
        paragraph: 'Produk ini meliputi benang simbar, kawat bonsai, kawat besi, vitamin, dan pupuk yang diformulasikan khusus untuk memudahkan perawatan tanaman agar selalu sehat dan optimal.',
        link: '/supplies'
    },
    {
        heading: "Accessories & Displays",
        imgSrc: "/images/aboutus/imgThree.svg",
        paragraph: 'Kami menyediakan lampu khusus tanaman dan frame dekoratif yang berfungsi mempercantik tampilan simbar di berbagai ruang, menambah nilai estetika dan keindahan tanaman Anda.',
        link: '/accesories'
    },
]

const Product = () => {
    return (

        <div id="product-section">
            <div className='mx-auto max-w-7xl px-4 py-24 my-32 lg:px-10 bg-lightgrey rounded-3xl relative'>
                <Image src="/images/aboutus/dots.svg" width={100} height={100} alt="dots-image" className="absolute bottom-1 -left-20" />
                <h3 className='text-center text-[#007BFF] font-sans font-semibold text-lg tracking-widest'>Our Product</h3>
                <h3 className="text-center text-4xl sm:text-6xl font-bold">Know more about our product.</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-16 gap-x-16 lg:gap-x-32'>
                    {Aboutdata.map((item, i) => (
                        <div key={i} className='hover:bg-navyblue bg-white rounded-3xl mt-16 pt-10 pl-8 pb-10 pr-6 shadow-xl group'>
                            <h4 className='text-4xl font-semibold  text-black mb-5 group-hover:text-white'>{item.heading}</h4>
                            <Image src={item.imgSrc} alt={item.imgSrc} width={100} height={100} className="mb-5" />
                            <h4 className='text-lg font-normal text-black group-hover:text-offwhite mb-5'>{item.paragraph}</h4>
                            <Link href= {item.link} className='text-lg font-semibold group-hover:text-white text-black hover-underline'>
                                Shop Now
                                <ChevronRightIcon width={20} height={20} />
                            </Link>

                            {/* <Link href="#supplies-section" className='text-lg font-semibold group-hover:text-white text-black hover-underline'>
                                Shop Now
                                <ChevronRightIcon width={20} height={20} />
                            </Link> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Product;