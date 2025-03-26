import  { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Check } from 'lucide-react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-16">
      <div className="bg-sky-700 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our Clinic</h1>
          <p className="text-xl text-sky-100 max-w-3xl">
            Leading the way in orthopedic care with a team of specialists dedicated to improving your quality of life.
          </p>
        </div>
      </div>
      
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 1995, The Spine Clinic began as a small specialized practice focused on treating spinal conditions. Our founder, Dr. Robert Williams, envisioned a medical center where patients could receive comprehensive orthopedic care under one roof.
            </p>
            <p className="text-gray-600 mb-4">
              Over the years, we have expanded our expertise to include hip and knee replacements, physiotherapy, pain management, and more. Today, we are proud to be one of the leading orthopedic clinics in the region, known for our innovative treatments and patient-centered approach.
            </p>
            <p className="text-gray-600">
              Our mission remains unchanged: to provide exceptional orthopedic care that helps our patients regain mobility, reduce pain, and improve their quality of life.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1584467735815-f778f274e296?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800" 
              alt="Doctor wearing a mask" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </motion.div>
        </div>
        
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Our Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mt-4">
              These core principles guide our practice and ensure we provide the highest standard of care to every patient.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-sky-100 p-3 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Award className="text-sky-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from medical procedures to patient interactions. Our team is committed to ongoing education and implementing the latest evidence-based practices.
              </p>
            </motion.div>
            
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-green-100 p-3 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="text-green-600 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Compassion</h3>
              <p className="text-gray-600">
                We understand that our patients are more than their medical conditions. Our compassionate approach ensures that each person feels heard, respected, and cared for throughout their treatment journey.
              </p>
            </motion.div>
            
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-indigo-100 p-3 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="text-indigo-600 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-600">
                We embrace innovation and continuously seek better ways to treat orthopedic conditions. Our clinic invests in advanced technology and surgical techniques to provide optimal outcomes for our patients.
              </p>
            </motion.div>
          </div>
        </div>
        
        <div className="mt-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <img 
                src="https://images.unsplash.com/photo-1530213786676-41ad9f7736f6?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800" 
                alt="Human anatomy figure" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Approach</h2>
              <p className="text-gray-600 mb-6">
                We believe in a holistic approach to orthopedic care that addresses not just the symptoms but the underlying causes of pain and mobility issues. Our treatment plans are personalized to each patient's specific needs and goals.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Comprehensive Evaluation</h4>
                    <p className="text-gray-600">
                      We conduct thorough evaluations to understand the full extent of your condition before recommending treatment options.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Multidisciplinary Team</h4>
                    <p className="text-gray-600">
                      Our team includes surgeons, physical therapists, pain specialists, and rehabilitation experts who work together on your care.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Conservative First</h4>
                    <p className="text-gray-600">
                      We prioritize non-surgical approaches when appropriate, reserving surgery for when it's truly the best option for your condition.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Long-term Support</h4>
                    <p className="text-gray-600">
                      Our care doesn't end after treatment; we provide ongoing support to ensure lasting results and improved quality of life.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="bg-sky-50 py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Experience Our Care?</h2>
            <p className="text-gray-600 mb-8">
              Schedule a consultation with our specialists and take the first step toward improved mobility and less pain.
            </p>
            <Link to="/book-appointment" className="btn btn-primary">
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
 