import  { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <motion.div
        className="w-16 h-16 border-4 border-sky-200 border-t-sky-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default Loading;
 