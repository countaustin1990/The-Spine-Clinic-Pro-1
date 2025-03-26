import  { useEffect } from 'react';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import ServicesList from '../components/home/ServicesList';
import DoctorsList from '../components/home/DoctorsList';
import Testimonials from '../components/home/Testimonials';
import CTASection from '../components/home/CTASection';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Hero />
      <Stats />
      <ServicesList />
      <DoctorsList />
      <Testimonials />
      <CTASection />
    </div>
  );
};

export default Home;
 