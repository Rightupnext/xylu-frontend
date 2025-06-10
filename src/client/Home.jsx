import React from "react";
import Hero from "./Hero";
import OurCollection from "./OurCollection";
import BestSellers from "./BestSellers";
import VideoBanner from './VideoBanner'
import NewArrivals from "./NewArrivals";
import StylishWomenSection from "./StylishWomenSection";
import Scroll from "./Scroll";
import WelcomPage from "./WelcomPage";
import ProductsPage from "./demoProduct";
function Home() {
  return (
    <>
    {/* <WelcomPage/> */}
      <Hero />
      {/* <ProductsPage/> */}
      <OurCollection/>
      <BestSellers/>
      <VideoBanner/>
      <NewArrivals/>
      <StylishWomenSection/>
      <Scroll/>
    </>
  );
}

export default Home;
