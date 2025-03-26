import  { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';

const doctors = [
  {
    id: 1,
    name: 'Dr. Michael',
    specialty: 'Spine Surgeon',
    image: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
    experience: '15 years',
  },
  {
    id: 2,
    name: 'Dr. Diamond',
    specialty: 'Orthopedic Surgeon',
    image: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
    experience: '12 years',
  },
];

const DoctorsList = () => {
  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Specialists</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our team of internationally trained orthopedic specialists is committed to providing the highest standard of care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="h-64 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{doctor.name}</h3>
                <p className="text-sky-600 font-medium mb-3">{doctor.specialty}</p>
                <p className="text-gray-600 mb-4">Experience: {doctor.experience}</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <button className="p-2 text-gray-600 hover:text-sky-600 transition-colors">
                      <Phone size={18} />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-sky-600 transition-colors">
                      <Mail size={18} />
                    </button>
                  </div>
                  <Link 
                    to={`/doctors#${doctor.id}`}
                    className="text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/doctors" className="btn btn-primary">
            View All Doctors
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DoctorsList;
 