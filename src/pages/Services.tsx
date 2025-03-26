import  { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const services = [
  {
    id: 'spinal-surgery',
    title: 'Spinal Surgery',
    description: 'Our spine specialists provide advanced surgical treatments for a wide range of spinal conditions, including herniated discs, spinal stenosis, scoliosis, and degenerative disc disease. Using minimally invasive techniques whenever possible, our surgeons aim to relieve pain and restore function with reduced recovery time.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
    procedures: ['Discectomy', 'Laminectomy', 'Spinal Fusion', 'Artificial Disc Replacement']
  },
  {
    id: 'hip-replacement',
    title: 'Hip Replacement',
    description: 'Our hip replacement program utilizes the latest techniques and implant technologies to restore mobility and reduce pain. From traditional total hip replacement to minimally invasive approaches, our surgeons customize the treatment to your specific condition, age, and activity level.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
    procedures: ['Total Hip Arthroplasty', 'Partial Hip Replacement', 'Hip Resurfacing', 'Revision Hip Surgery']
  },
  {
    id: 'knee-replacement',
    title: 'Knee Replacement',
    description: 'Our knee replacement specialists have extensive experience in all aspects of knee reconstruction. Using advanced computer navigation and patient-specific instrumentation, we provide personalized care that optimizes outcomes and accelerates recovery time.',
    image: 'https://images.unsplash.com/photo-1530213786676-41ad9f7736f6?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
    procedures: ['Total Knee Arthroplasty', 'Partial Knee Replacement', 'ACL Reconstruction', 'Arthroscopic Knee Surgery']
  },
  {
    id: 'chiropractic-care',
    title: 'Chiropractic Care',
    description: 'Our chiropractors use gentle, non-invasive techniques to address misalignments in the spine and other joints, relieving pain and improving function. Chiropractic care is effective for back pain, neck pain, headaches, and many other conditions.',
    image: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
    procedures: ['Spinal Adjustment', 'Mobilization', 'Soft Tissue Therapy', 'Corrective Exercises']
  },
  {
    id: 'physiotherapy',
    title: 'Physiotherapy',
    description: 'Our physiotherapy program offers comprehensive rehabilitation services for patients recovering from surgery, injury, or managing chronic conditions. Our physiotherapists develop personalized treatment plans that include therapeutic exercises, manual therapy, and education on preventing future injuries.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
    procedures: ['Manual Therapy', 'Therapeutic Exercise', 'Electrotherapy', 'Gait Training']
  },
  {
    id: 'pain-management',
    title: 'Pain Management',
    description: 'Our multidisciplinary pain management program addresses both acute and chronic pain conditions. We offer a range of interventions, from medication management and injections to advanced techniques like radiofrequency ablation and spinal cord stimulation.',
    image: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
    procedures: ['Epidural Steroid Injections', 'Facet Joint Injections', 'Nerve Blocks', 'Radiofrequency Ablation']
  }
];

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-16">
      <div className="bg-sky-700 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-sky-100 max-w-3xl">
            Comprehensive orthopedic care tailored to your specific needs, delivered by our team of specialists.
          </p>
        </div>
      </div>
      
      <div className="container-custom py-16">
        <div className="grid gap-16">
          {services.map((service, index) => (
            <div 
              key={service.id}
              id={service.id}
              className="scroll-mt-24"
            >
              <motion.div 
                className="grid md:grid-cols-2 gap-8 items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className={index % 2 === 0 ? 'order-1 md:order-1' : 'order-1 md:order-2'}>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="rounded-lg shadow-lg w-full h-auto object-cover"
                    style={{ maxHeight: '400px' }}
                  />
                </div>
                
                <div className={index % 2 === 0 ? 'order-2 md:order-2' : 'order-2 md:order-1'}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{service.title}</h2>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2 text-gray-700">Procedures Include:</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.procedures.map((procedure, i) => (
                        <li key={i} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                          {procedure}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link 
                    to="/book-appointment" 
                    className="btn btn-primary inline-flex items-center"
                  >
                    <Calendar size={18} className="mr-2" />
                    Book a Consultation
                  </Link>
                </div>
              </motion.div>
              
              {index < services.length - 1 && (
                <hr className="my-16 border-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-sky-50 py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Have Questions About Our Services?</h2>
            <p className="text-gray-600 mb-8">
              Our team is ready to answer any questions you might have about our services and how we can help with your specific condition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn btn-outline">
                Contact Us
              </Link>
              <Link to="/book-appointment" className="btn btn-primary">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
 