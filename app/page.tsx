import Banner from '../components/features/sections/Banner/index';
import Product from '../components/features/sections/Product/product';
import AboutUs from '../components/features/About Us/About Us';
import Featured from '../components/features/Featured/index';
import FAQ from '@/components/features/sections/FAQ/Faq';
import Testimonials from '../components/features/sections/Testimonials/index';
import Insta from '../components/features/Insta/index';
import Shop from '../components/features/Product Display/shop';
import Supplies from '../components/features/Product Display/supplies';
import Accesories from '../components/features/Product Display/accesories';


export default function Home() {
  return (
    <main>
      <Banner />
      <Product />
      <Shop />
      <Supplies />
      <Accesories />
      <AboutUs />
      <FAQ />
      <Testimonials />
      <Featured />
      <Insta />
    </main>
  )
}
