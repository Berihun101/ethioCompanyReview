import Image from "next/image";
import Navbar from "../component/Navbar";
import Hero from "../component/Hero";
import CategoryMenu from "../component/categoryMenu/CategoryMenu";
import Contact from "../component/Contact";
import FeatureCompany from "../component/FeatureCompany";
import About from "../component/About";
import RecentReview from "../component/RecentReview";
import ReadMore from "../component/ReadMore";
import Footer from "../component/Footer";
import apiService from "../services/apiServices";
import { getUserId } from "../lib/actions";
import { userDetailType } from "../component/writeReviews/WriteReviews";
const Home = async () => {
  let userDetail: userDetailType | null = null;

  try {
      const userId = await getUserId();
      if (userId) {
          userDetail = await apiService.get(`auth/${userId}`);
      }
  } catch (error) {
      console.log("You are not logged in");
  }
    
  return (
    <>
      
      <Hero />
      <CategoryMenu />
      <Contact />
      <FeatureCompany />
      <About />
      <RecentReview />
      <ReadMore />
      <Footer />
    </>
  );
}

export default Home;
