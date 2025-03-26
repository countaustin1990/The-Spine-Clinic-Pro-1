import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'John Stevens',
    age: 58,
    procedure: 'Spine Surgery',
    doctor: 'Dr. Sarah Johnson',
    quote: 'After years of chronic back pain, Dr. Johnson performed my spine surgery with incredible precision. Six months later, I am back to playing golf and enjoying life pain-free. The entire team at The Spine Clinic provided exceptional care from my first consultation through my recovery.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0JTIwbWFuJTIwb2xkZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=120&h=120&q=80'
  },
  {
    id: 2,
    name: 'Maria Garcia',
    age: 64,
    procedure: 'Hip Replacement',
    doctor: 'Dr. Michael Chen',
    quote: 'My hip replacement surgery was life-changing. The care I received was exceptional from the first consultation through my entire recovery. I can now walk without pain for the first time in years. Dr. Chen explained every step of the process and made me feel comfortable throughout my treatment journey.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBvcnRyYWl0JTIwd29tYW4lMjBvbGRlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=120&h=120&q=80'
  },
  {
    id: 3,
    name: 'Thomas Wright',
    age: 42,
    procedure: 'Knee Arthroscopy',
    doctor: 'Dr. Michael Chen',
    quote: 'As an active runner, my knee injury was devastating. The team at The Spine Clinic not only performed a successful arthroscopy but guided me through rehabilitation. I have since completed two half-marathons! The physical therapy team was particularly helpful in getting me back to my pre-injury performance level.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHBvcnRyYWl0JTIwbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=120&h=120&q=80'
  },
  {
    id: 4,
    name: 'Rebecca Johnson',
    age: 35,
    procedure: 'Physiotherapy',
    doctor: 'Dr. James Wilson',
    quote: 'After a car accident left me with chronic neck pain, I was referred to Dr. Wilson for physiotherapy. His expertise and personalized treatment plan made a world of difference. After 12 sessions, my pain has decreased by 90% and I have regained full range of motion in my neck. I am immensely grateful for his care.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1499887142886-791eca5918cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHBvcnRyYWl0JTIwd29tYW58ZW58MHx8MHx8&auto=format&fit=crop&w=120&h=120&q=80'
  },
  {
    id: 5,
    name: 'Michael Rodriguez',
    age: 52,
    procedure: 'Spinal Decompression',
    doctor: 'Dr. Sarah Johnson',
    quote: 'I had been suffering from sciatica for years before coming to The Spine Clinic. Dr. Johnson recommended spinal decompression, and it was the best decision I have made. The procedure was minimally invasive, and my recovery was remarkably quick. I can now enjoy activities with my family without constant pain.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cG9ydHJhaXQlMjBtYW58ZW58MHx8MHx8&auto=format&fit=crop&w=120&h=120&q=80'
  },
  {
    id: 6,
    name: 'Jennifer Williams',
    age: 48,
    procedure: 'Pain Management',
    doctor: 'Dr. Elizabeth Taylor',
    quote: 'Living with chronic pain from fibromyalgia had become unbearable. Dr. Taylor comprehensive pain management approach has given me my life back. She took the time to understand my condition and develop a treatment plan that actually works. For the first time in years, I feel hopeful about my future.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBvcnRyYWl0JTIwd29tYW58ZW58MHx8MHx8&auto=format&fit=crop&w=120&h=120&q=80'
  }
];

const categories = [
  'All',
  'Spine Surgery',
  'Hip Replacement',
  'Knee Surgery',
  'Physiotherapy',
  'Pain Management'
];

const Testimonials = () => {
  const [filter, setFilter] = useState('All');
  const [filteredTestimonials, setFilteredTestimonials] = useState(testimonials);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    if (filter === 'All') {
      setFilteredTestimonials(testimonials);
    } else {
      setFilteredTestimonials(
        testimonials.filter(
          (testimonial) => testimonial.procedure === filter || testimonial.procedure.includes(filter)
        )
      );
    }
  }, [filter]);

  return (
    <div className="pt-24 pb-16">
      <div className="bg-sky-700 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Patient Success Stories</h1>
          <p className="text-xl text-sky-100 max-w-3xl">
            Real stories from real patients who have experienced the life-changing care at The Spine Clinic.
          </p>
        </div>
      </div>
      
      <div className="container-custom py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-6">What Our Patients Say</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We're proud to have helped thousands of patients overcome pain and mobility issues. Here are some of their stories.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  filter === category
                    ? 'bg-sky-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex">
                    {testimonial.image ? (
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mr-4">
                        <User className="h-8 w-8 text-sky-600" />
                      </div>
                    )}
                    
                    <div>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-gray-600 text-sm">{testimonial.age} years old</p>
                      <p className="text-sky-600">{testimonial.procedure}</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
                
                <div className="mb-4 relative">
                  <Quote className="absolute top-0 left-0 text-sky-100 w-8 h-8 -translate-x-2 -translate-y-1" />
                  <p className="text-gray-600 italic relative z-10 pl-4">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Patient of {testimonial.doctor}
                  </p>
                  <button className="text-sky-600 flex items-center text-sm">
                    <ThumbsUp className="w-4 h-4 mr-1" /> Helpful
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredTestimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No testimonials found for this category. Please try a different filter.
            </p>
          </div>
        )}
      </div>
      
      <div className="bg-sky-50 py-16">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Share Your Story</h2>
            <p className="text-gray-600">
              We'd love to hear about your experience at The Spine Clinic. Your story could inspire others who are facing similar health challenges.
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-md p-8"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="John Smith"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="procedure" className="block text-sm font-medium text-gray-700 mb-1">
                    Procedure/Treatment
                  </label>
                  <select
                    id="procedure"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="">Select a procedure</option>
                    <option value="Spine Surgery">Spine Surgery</option>
                    <option value="Hip Replacement">Hip Replacement</option>
                    <option value="Knee Surgery">Knee Surgery</option>
                    <option value="Physiotherapy">Physiotherapy</option>
                    <option value="Pain Management">Pain Management</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Doctor
                  </label>
                  <select
                    id="doctor"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="">Select your doctor</option>
                    <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                    <option value="Dr. Michael Chen">Dr. Michael Chen</option>
                    <option value="Dr. Elizabeth Taylor">Dr. Elizabeth Taylor</option>
                    <option value="Dr. James Wilson">Dr. James Wilson</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="testimonial" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Experience
                </label>
                <textarea
                  id="testimonial"
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Please share your experience at The Spine Clinic..."
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Rating
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="text-gray-300 hover:text-amber-400"
                    >
                      <Star className="h-8 w-8" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  id="consent"
                  type="checkbox"
                  className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                />
                <label htmlFor="consent" className="ml-2 block text-sm text-gray-700">
                  I consent to having my testimonial and name displayed on The Spine Clinic website.
                </label>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit Your Story
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const User = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export default Testimonials;
 