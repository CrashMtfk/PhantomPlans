import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import HomeHeroSection from '../components/HomeHeroSection';
import HomeFeaturesSection from '../components/HomeFeaturesSection';
import HomeAboutSection from '../components/HomeAboutSection';

export default function Home() {
  return (
    <div className='home-container'>
        <Navbar/>
        <HomeHeroSection />
        <HomeFeaturesSection />
        <HomeAboutSection />
        <Footer/>
    </div>
  )
}
