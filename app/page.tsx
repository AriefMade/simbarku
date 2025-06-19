import Banner from '../components/features/sections/Banner/index';
import Product from '../components/features/sections/Product/product';
import AboutUs from '../components/features/About Us/About Us';
import Featured from '../components/features/Featured/index';
import FAQ from '@/components/features/sections/FAQ/Faq';
import Testimonials from '../components/features/sections/Testimonials/index';
import Insta from '../components/features/Insta/index';
import Navbar from '@/components/common/layout/Navbar';
import Footer from '@/components/common/layout/Footer';
import ForumPage from '@/components/features/sections/Forum';
// import Shop from '../pages/shop';
// import Supplies from '../pages/supplies';
// import Accesories from '../pages/accesories';


export default function Home() {
  return (
    <main>
      <Navbar />
      <Banner />
      <Product />
      {/* <Shop /> */}
      {/* <Supplies />
      <Accesories /> */}
      <AboutUs />
      <FAQ />
      <Testimonials />
      {/* <Featured /> */}
      <ForumPage/>
      <Insta />
      <Footer />
    </main>
  )
}
