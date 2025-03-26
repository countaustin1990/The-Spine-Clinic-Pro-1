import  { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Spinal Surgery',
    description: 'Advanced surgical procedures to treat complex spinal conditions including herniated discs, spinal stenosis, and degenerative disc disease.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
  },
  {
    id: 2,
    title: 'Hip & Knee Replacement',
    description: 'State-of-the-art joint replacement procedures that restore mobility and alleviate pain for patients with arthritis and joint injuries.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
  },
  {
    id: 3,
    title: 'Physiotherapy',
    description: 'Personalized rehabilitation programs to improve mobility, strengthen muscles, and promote recovery after surgery or injury.',
    image: 'https://images.unsplash.com/photo-1530213786676-41ad9f7736f6?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
  },
];

const ServicesList = () => {
  return (
    <section className="section">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Specialized Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive orthopedic care with specialized treatments for spine, knee, and hip conditions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="card h-full flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="h-56 w-full object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-5 flex-grow">{service.description}</p>
                <Link 
                  to={`/services#${service.id}`} 
                  className="text-sky-600 font-medium inline-flex items-center hover:text-sky-700"
                >
                  Learn more <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/services" className="btn btn-primary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
 