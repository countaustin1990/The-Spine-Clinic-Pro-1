import  { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Mail, Calendar, MapPin, Clock, FileText } from 'lucide-react';

const doctors = [
  {
    id: 1,
    name: 'Dr. Diamond',
    title: 'MD, FAAOS',
    specialty: 'Orthopedic Surgeon',
    image: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
    education: [
      'Medical School: Harvard Medical School',
      'Residency: Massachusetts General Hospital',
      'Fellowship: Spine Surgery, Johns Hopkins Hospital'
    ],
    certifications: [
      'Board Certified in Orthopedic Surgery',
      'Fellow of the American Academy of Orthopedic Surgeons',
      'Member of the North American Spine Society'
    ],
    expertise: [
      'Minimally Invasive Spine Surgery',
      'Disc Replacement',
      'Spinal Fusion',
      'Scoliosis Correction'
    ],
    bio: 'Dr. Johnson is a fellowship-trained spine surgeon with over 15 years of experience treating complex spinal conditions. Her expertise includes both minimally invasive techniques and complex reconstructive surgery. She has published numerous research articles on advancing spine surgery techniques and is committed to providing personalized care for each patient.'
  },
  {
    id: 2,
    name: 'Dr. Michael',
    title: 'MD, FAAOS',
    specialty: 'Spine Surgeon',
    image: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
    education: [
      'Medical School: Johns Hopkins University School of Medicine',
      'Residency: Hospital for Special Surgery',
      'Fellowship: Joint Replacement, Mayo Clinic'
    ],
    certifications: [
      'Board Certified in Orthopedic Surgery',
      'Fellow of the American Academy of Orthopedic Surgeons',
      'Member of the American Association of Hip and Knee Surgeons'
    ],
    expertise: [
      'Total Hip Replacement',
      'Total Knee Replacement',
      'Partial Knee Replacement',
      'Joint Revision Surgery'
    ],
    bio: 'Dr. Chen specializes in hip and knee replacement surgery with a focus on minimally invasive techniques that promote faster recovery. He has performed over 2,000 joint replacement procedures and is recognized for his expertise in complex revision surgeries. Dr. Chen is dedicated to helping patients regain mobility and improve their quality of life through advanced surgical techniques.'
  },
  {
    id: 3,
    name: 'Dr. Elizabeth Taylor',
    title: 'MD',
    specialty: 'Pain Management Specialist',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
    education: [
      'Medical School: Yale School of Medicine',
      'Residency: Anesthesiology, Stanford University Medical Center',
      'Fellowship: Pain Medicine, University of California, San Francisco'
    ],
    certifications: [
      'Board Certified in Anesthesiology',
      'Board Certified in Pain Medicine',
      'Member of the American Society of Interventional Pain Physicians'
    ],
    expertise: [
      'Interventional Pain Management',
      'Epidural Steroid Injections',
      'Radiofrequency Ablation',
      'Spinal Cord Stimulation'
    ],
    bio: 'Dr. Taylor is a double board-certified physician specializing in interventional pain management. She takes a comprehensive approach to treating pain, utilizing both interventional procedures and medication management. Dr. Taylor is committed to helping patients find relief from chronic pain while minimizing the use of opioid medications.'
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    title: 'PT, DPT',
    specialty: 'Physical Therapist',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzM0NDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
    education: [
      'Doctor of Physical Therapy: University of Southern California',
      'Orthopedic Residency: Emory University',
      'Manual Therapy Certification: North American Institute of Orthopedic Manual Therapy'
    ],
    certifications: [
      'Board Certified Specialist in Orthopedic Physical Therapy',
      'Certified in Dry Needling',
      'Certified Strength and Conditioning Specialist'
    ],
    expertise: [
      'Post-surgical Rehabilitation',
      'Sports Injury Rehabilitation',
      'Manual Therapy',
      'Therapeutic Exercise'
    ],
    bio: 'Dr. Wilson is a Doctor of Physical Therapy with specialized training in orthopedic physical therapy. He has extensive experience in rehabilitating patients after spine and joint surgeries, as well as treating athletes with sports-related injuries. Dr. Wilson creates individualized treatment plans that focus on restoring function and preventing future injuries.'
  }
];

const Doctors = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-16">
      <div className="bg-sky-700 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Medical Team</h1>
          <p className="text-xl text-sky-100 max-w-3xl">
            Meet our team of highly qualified and experienced orthopedic specialists dedicated to your care.
          </p>
        </div>
      </div>
      
      <div className="container-custom py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Specialist Physicians</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our physicians are leaders in their fields with advanced training and years of experience treating orthopedic conditions.
          </p>
        </div>
        
        <div className="grid gap-12">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              id={`doctor-${doctor.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="scroll-mt-28"
            >
              <div className={`grid md:grid-cols-3 gap-8 items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:col-span-1">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="rounded-lg shadow-lg w-full h-auto object-cover aspect-[3/4]"
                  />
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="h-5 w-5 text-sky-600" />
                      <span>Mon, Wed, Fri: 9am - 5pm</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="h-5 w-5 text-sky-600" />
                      <span>Main Office, 3rd Floor</span>
                    </div>
                    <div className="pt-3 flex space-x-3">
                      <Link 
                        to="/contact" 
                        className="p-2.5 bg-sky-100 rounded-full text-sky-600 hover:bg-sky-200 transition-colors"
                        aria-label={`Contact ${doctor.name}`}
                      >
                        <Phone className="h-5 w-5" />
                      </Link>
                      <Link 
                        to="/contact" 
                        className="p-2.5 bg-sky-100 rounded-full text-sky-600 hover:bg-sky-200 transition-colors"
                        aria-label={`Email ${doctor.name}`}
                      >
                        <Mail className="h-5 w-5" />
                      </Link>
                      <Link 
                        to="/book-appointment" 
                        className="p-2.5 bg-sky-100 rounded-full text-sky-600 hover:bg-sky-200 transition-colors"
                        aria-label={`Book appointment with ${doctor.name}`}
                      >
                        <Calendar className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold">{doctor.name}</h3>
                    <p className="text-gray-700">{doctor.title}</p>
                    <p className="text-sky-600 font-medium">{doctor.specialty}</p>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{doctor.bio}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-2 flex items-center">
                        <FileText className="h-5 w-5 text-sky-600 mr-2" />
                        Education
                      </h4>
                      <ul className="space-y-1 text-gray-600">
                        {doctor.education.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-lg mb-2 flex items-center">
                        <Award className="h-5 w-5 text-sky-600 mr-2" />
                        Certifications
                      </h4>
                      <ul className="space-y-1 text-gray-600">
                        {doctor.certifications.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold text-lg mb-2">Areas of Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {doctor.expertise.map((item, i) => (
                        <span 
                          key={i} 
                          className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link 
                      to="/book-appointment" 
                      className="btn btn-primary inline-flex items-center"
                    >
                      <Calendar size={18} className="mr-2" />
                      Book with Dr. {doctor.name.split(' ')[1]}
                    </Link>
                  </div>
                </div>
              </div>
              
              {index < doctors.length - 1 && (
                <hr className="my-12 border-gray-200" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="bg-sky-50 py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Join Our Team</h2>
            <p className="text-gray-600 mb-8">
              We're always looking for talented and passionate healthcare professionals to join our team. If you're interested in working with us, please send your resume to careers@spineclinic.com.
            </p>
            <Link to="/contact" className="btn btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Award = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

export default Doctors;
 