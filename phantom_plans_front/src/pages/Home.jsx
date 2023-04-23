import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import HomeHeroSection from '../components/home_components/HomeHeroSection';
import HomeFeaturesSection from '../components/home_components/HomeFeaturesSection';
import HomeAboutSection from '../components/home_components/HomeAboutSection';

export default function Home() {

  

  return (
    <div className='home-container'>
        <Navbar/>
        <HomeHeroSection id="hero-section"/>
        <HomeFeaturesSection id="features-section" />
        <HomeAboutSection id="about-section" />
        <Footer/>
    </div>
  )
}
