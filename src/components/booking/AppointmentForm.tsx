import  { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { createAppointment } from '../../services/appointmentService';
import { getAllDoctors, Doctor } from '../../services/doctorService';
import { getAvailableTimeSlots } from '../../services/appointmentService';
import Loading from '../ui/Loading';

const services = [
  { id: 'spine-consultation', name: 'Spine Consultation' },
  { id: 'hip-evaluation', name: 'Hip Evaluation' },
  { id: 'knee-evaluation', name: 'Knee Evaluation' },
  { id: 'physiotherapy', name: 'Physiotherapy Session' },
  { id: 'pain-management', name: 'Pain Management Consultation' },
];

interface AppointmentFormProps {
  preSelectedDoctor?: string;
  preSelectedService?: string;
}

const AppointmentForm = ({ preSelectedDoctor, preSelectedService }: AppointmentFormProps) => {
  const [step, setStep] = useState(1);
  const [service, setService] = useState(preSelectedService || '');
  const [doctorId, setDoctorId] = useState(preSelectedDoctor || '');
  const [doctorName, setDoctorName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const doctorsData = await getAllDoctors();
        setDoctors(doctorsData);
        setFormLoading(false);
        
        // If we have a preselected doctor, fetch their name
        if (preSelectedDoctor) {
          const doctor = doctorsData.find(d => d.id === preSelectedDoctor);
          if (doctor) {
            setDoctorName(doctor.name);
          }
        }
      } catch (error) {
        console.error('Error loading doctors:', error);
        setError('Failed to load doctors. Please try again.');
        setFormLoading(false);
      }
    };

    // If currentUser exists, prefill the form
    if (currentUser) {
      setName(currentUser.displayName || '');
      setEmail(currentUser.email || '');
    }

    loadDoctors();
  }, [currentUser, preSelectedDoctor]);

  useEffect(() => {
    if (doctorId && date) {
      const fetchTimeSlots = async () => {
        try {
          setFormLoading(true);
          const slots = await getAvailableTimeSlots(doctorId, date);
          setAvailableTimeSlots(slots);
          setFormLoading(false);
        } catch (error) {
          console.error('Error fetching time slots:', error);
          setError('Failed to load available time slots. Please try again.');
          setFormLoading(false);
        }
      };

      fetchTimeSlots();
    }
  }, [doctorId, date]);

  const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDoctorId = e.target.value;
    setDoctorId(selectedDoctorId);
    
    // Update doctor name for later use
    const selectedDoctor = doctors.find(doctor => doctor.id === selectedDoctorId);
    if (selectedDoctor) {
      setDoctorName(selectedDoctor.name);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!service || !doctorId || !date || !time || !name || !email || !phone) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Create appointment
      await createAppointment({
        userId: currentUser?.uid || 'guest',
        doctorId,
        doctorName,
        service,
        date,
        time,
        patientName: name,
        patientEmail: email,
        patientPhone: phone,
        notes,
        status: 'pending'
      });
      
      setSuccess(true);
      
      // Redirect after short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      
    } catch (err: any) {
      setError(err.message || 'Failed to book appointment. Please try again.');
      console.error('Error booking appointment:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    if (step === 1 && (!service || !doctorId)) {
      setError('Please select both service and doctor');
      return;
    }
    
    if (step === 2 && (!date || !time)) {
      setError('Please select both date and time');
      return;
    }
    
    setError('');
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setError('');
    setStep(step - 1);
  };

  // Min date is today
  const today = new Date().toISOString().split('T')[0];

  if (formLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Progress Steps */}
      <div className="flex border-b">
        <div 
          className={`flex-1 text-center py-4 ${
            step === 1 ? 'text-sky-600 border-b-2 border-sky-600' : 'text-gray-500'
          }`}
        >
          <span className="font-medium">1. Select Service</span>
        </div>
        <div 
          className={`flex-1 text-center py-4 ${
            step === 2 ? 'text-sky-600 border-b-2 border-sky-600' : 'text-gray-500'
          }`}
        >
          <span className="font-medium">2. Choose Date & Time</span>
        </div>
        <div 
          className={`flex-1 text-center py-4 ${
            step === 3 ? 'text-sky-600 border-b-2 border-sky-600' : 'text-gray-500'
          }`}
        >
          <span className="font-medium">3. Your Information</span>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6 rounded">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}
      
      {success ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6"
        >
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
            <div className="flex">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-green-800">Appointment Booked!</h3>
                <p className="text-green-700">
                  Your appointment has been successfully scheduled. You will receive a confirmation email shortly. Redirecting to dashboard...
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-6">
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                  Service <span className="text-red-500">*</span>
                </label>
                <select
                  id="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  disabled={!!preSelectedService}
                >
                  <option value="">Select a service</option>
                  {services.map((svc) => (
                    <option key={svc.id} value={svc.name}>
                      {svc.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor <span className="text-red-500">*</span>
                </label>
                <select
                  id="doctor"
                  value={doctorId}
                  onChange={handleDoctorChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  disabled={!!preSelectedDoctor}
                >
                  <option value="">Select a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} ({doctor.specialty})
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
          
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-6">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="date"
                    min={today}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setTime(''); // Reset time when date changes
                    }}
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    disabled={!date || availableTimeSlots.length === 0}
                  >
                    <option value="">Select a time</option>
                    {availableTimeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                {date && availableTimeSlots.length === 0 && (
                  <p className="mt-2 text-sm text-red-600">
                    No available time slots for this date. Please select another date.
                  </p>
                )}
              </div>
            </motion.div>
          )}
          
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Please share any specific concerns or information that might help us prepare for your visit."
                ></textarea>
              </div>
              
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Appointment Summary</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-600">Service:</div>
                  <div>{service}</div>
                  <div className="text-gray-600">Doctor:</div>
                  <div>{doctorName}</div>
                  <div className="text-gray-600">Date:</div>
                  <div>{date}</div>
                  <div className="text-gray-600">Time:</div>
                  <div>{time}</div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
            )}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="ml-auto px-6 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="ml-auto px-6 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:bg-sky-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Booking...' : 'Book Appointment'}
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default AppointmentForm;
 