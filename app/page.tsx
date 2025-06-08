import Banner from '../components/features/sections/Banner/index';
import Aboutus from '../components/features/sections/Aboutus/index';
import Ourteam from '../components/features/Ourteam/index';
import Featured from '../components/features/Featured/index';
import FAQ from '../components/features/sections/FAQ/index';
import Testimonials from '../components/features/sections/Testimonials/index';
import Articles from '../components/features/Articles/index';
import Insta from '../components/features/Insta/index';


export default function Home() {
  return (
    <main>
      <Banner />
      <Aboutus />
      <Articles />
      <Ourteam />
      <FAQ />
      <Testimonials />
      <Featured />
      <Insta />
    </main>
  )
}
