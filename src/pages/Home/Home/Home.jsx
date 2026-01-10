import FeaturedSection from "../../../components/Home/FeaturedSection ";
import HeroSection from "../../../components/Home/HeroSection ";
import HowItWorks from "../../../components/Home/HowItWorks";
import PopularCategories from "../../../components/Home/PopularCategories";
import WhyJoin from "../../../components/Home/WhyJoin";
import About from "../about/About";
import CTA from "../CTA/CTA";
import Highlights from "../highlights/Highlights";
import HomeFAQ from "../HomeFAQ";
import Newsletter from "../newsletter/NewsLetter";
import Testimonials from "../testimonials/Testimonials";

const Home = () => {
  return (
    <main className="font-sans">
      <HeroSection />
      <PopularCategories/>
      <FeaturedSection />
      <HowItWorks />
      <Highlights/>
      <WhyJoin />
      <Testimonials/>
      <HomeFAQ/>
      <Newsletter/>
      <CTA/>
    </main>
  );
};

export default Home;
