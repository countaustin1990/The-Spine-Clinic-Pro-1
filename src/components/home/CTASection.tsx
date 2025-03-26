import  { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Phone } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-sky-600 to-sky-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Schedule Your Consultation Today
            </h2>
            <p className="text-sky-100 text-lg mb-8">
              Don't let pain limit your life. Our team of orthopedic specialists is ready to provide you with personalized care and effective treatment options.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/book-appointment" 
                className="btn bg-white text-sky-800 hover:bg-sky-50 inline-flex items-center justify-center"
              >
                <Calendar size={20} className="mr-2" />
                Book Appointment
              </Link>
              
              <Link 
                to="/contact" 
                className="btn bg-transparent border-2 border-white hover:bg-white/10 inline-flex items-center justify-center"
              >
                <Phone size={20} className="mr-2" />
                Contact Us
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Appointment Request</h3>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="Your phone number"
                />
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Required
                </label>
                <select
                  id="service"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  <option value="">Select a service</option>
                  <option value="spine_surgery">Spine Surgery</option>
                  <option value="knee_replacement">Knee Replacement</option>
                  <option value="hip_replacement">Hip Replacement</option>
                  <option value="physiotherapy">Physiotherapy</option>
                  <option value="pain_management">Pain Management</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Brief Message (Optional)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="Describe your condition briefly"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full btn btn-primary"
              >
                Request Appointment
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
 