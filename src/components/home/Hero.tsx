import  { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-pattern"></div>
      
      <div className="container-custom relative z-10 flex flex-col md:flex-row items-center py-20 md:py-32">
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left mb-10 md:mb-0">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Advanced Spine & Orthopedic Care for a Better Life
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-300 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Specialized care for your knee, hip, and spine conditions. Our expert team of orthopedic surgeons is dedicated to restoring your mobility and improving your quality of life.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/book-appointment" className="btn bg-sky-600 hover:bg-sky-700 flex items-center justify-center">
              <Calendar size={20} className="mr-2" />
              Book an Appointment
            </Link>
            <Link to="/services" className="btn bg-white text-gray-900 hover:bg-gray-100">
              Our Services
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1516841273335-e39b37888115?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800" 
            alt="Group of doctors in hospital hallway" 
            className="rounded-lg shadow-2xl object-cover w-full h-auto"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
 