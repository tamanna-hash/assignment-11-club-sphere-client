import FeaturedSection from "../../../components/Home/FeaturedSection ";
import HeroSection from "../../../components/Home/HeroSection ";
import HowItWorks from "../../../components/Home/HowItWorks";
import PopularCategories from "../../../components/Home/PopularCategories";
import WhyJoin from "../../../components/Home/WhyJoin";

const Home = () => {
  return (
    <main className="font-sans">
      <HeroSection />
      <FeaturedSection />
      <PopularCategories/>
      <HowItWorks />
      <WhyJoin />
    </main>
  );
};

export default Home;
