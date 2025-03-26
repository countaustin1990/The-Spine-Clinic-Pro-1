import  { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'John Stevens',
    procedure: 'Spine Surgery',
    quote: 'After years of chronic back pain, Dr. Johnson performed my spine surgery with incredible precision. Six months later, I am back to playing golf and enjoying life pain-free.',
    rating: 5
  },
  {
    id: 2,
    name: 'Maria Garcia',
    procedure: 'Hip Replacement',
    quote: 'My hip replacement surgery was life-changing. The care I received was exceptional from the first consultation through my entire recovery. I can now walk without pain for the first time in years.',
    rating: 5
  },
  {
    id: 3,
    name: 'Thomas Wright',
    procedure: 'Knee Arthroscopy',
    quote: 'As an active runner, my knee injury was devastating. The team at The Spine Clinic not only performed a successful arthroscopy but guided me through rehabilitation. I have since completed two half-marathons!',
    rating: 5
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((current + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Patients Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Read success stories from patients who've experienced our specialized orthopedic care.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-xl bg-sky-50 p-8 md:p-12 shadow-md">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-amber-400 fill-amber-400" />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl italic text-gray-700 mb-8">
                "{testimonials[current].quote}"
              </blockquote>
              
              <div>
                <h4 className="text-xl font-bold">{testimonials[current].name}</h4>
                <p className="text-sky-600">{testimonials[current].procedure}</p>
              </div>
            </motion.div>
          </div>
          
          <div className="flex justify-between mt-8">
            <button 
              onClick={prev}
              className="p-2 rounded-full bg-white shadow-md text-gray-700 hover:text-sky-600 focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === current ? 'bg-sky-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={next}
              className="p-2 rounded-full bg-white shadow-md text-gray-700 hover:text-sky-600 focus:outline-none"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <a href="/testimonials" className="btn btn-outline">
            Read More Testimonials
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
 