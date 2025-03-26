import  { motion } from 'framer-motion';
import { Award, Users, Calendar, ThumbsUp } from 'lucide-react';

const statData = [
  {
    icon: <Award className="w-10 h-10 text-sky-600" />,
    value: '25+',
    label: 'Years of Experience',
  },
  {
    icon: <Users className="w-10 h-10 text-sky-600" />,
    value: '15,000+',
    label: 'Satisfied Patients',
  },
  {
    icon: <ThumbsUp className="w-10 h-10 text-sky-600" />,
    value: '98%',
    label: 'Success Rate',
  },
  {
    icon: <Calendar className="w-10 h-10 text-sky-600" />,
    value: '12+',
    label: 'Specialist Doctors',
  },
];

const Stats = () => {
  return (
    <section className="bg-sky-50 py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statData.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
 