import  { Link } from 'react-router-dom';
import { Activity, MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Activity size={28} className="text-sky-400" />
              <span className="text-xl font-bold">The Spine Clinic</span>
            </div>
            <p className="text-gray-300 mb-4">
              Advanced orthopedic care for knee, hip, and spine conditions. Our specialized team is dedicated to improving your quality of life.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-sky-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-sky-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-sky-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-sky-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-sky-400 transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-300 hover:text-sky-400 transition-colors">Our Doctors</Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-300 hover:text-sky-400 transition-colors">Testimonials</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-sky-400 transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-sky-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 hover:text-sky-400 transition-colors">
                <Link to="/services">Spinal Surgery</Link>
              </li>
              <li className="text-gray-300 hover:text-sky-400 transition-colors">
                <Link to="/services">Hip Replacement</Link>
              </li>
              <li className="text-gray-300 hover:text-sky-400 transition-colors">
                <Link to="/services">Knee Replacement</Link>
              </li>
              <li className="text-gray-300 hover:text-sky-400 transition-colors">
                <Link to="/services">Chiropractic Care</Link>
              </li>
              <li className="text-gray-300 hover:text-sky-400 transition-colors">
                <Link to="/services">Physiotherapy</Link>
              </li>
              <li className="text-gray-300 hover:text-sky-400 transition-colors">
                <Link to="/services">Pain Management</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-sky-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-300">123 Medical Center Drive, Healthcare City, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-sky-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-sky-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">info@spineclinic.com</span>
              </li>
              <li className="flex items-start">
                <Clock size={20} className="text-sky-400 mr-2 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>Mon-Fri: 8:00 AM - 7:00 PM</p>
                  <p>Saturday: 9:00 AM - 5:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-950 py-4">
        <div className="container-custom text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} The Spine Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
 