import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, FileText, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../../components/ui/Loading';
import { useAppointments } from '../../hooks/useAppointments';
import { getUserProfile, UserProfile } from '../../services/userService';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const { 
    appointments, 
    loading: appointmentsLoading, 
    error: appointmentsError,
    cancelAppointment,
    refreshAppointments
  } = useAppointments(currentUser?.uid);
  
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchUserProfile = async () => {
      if (currentUser?.uid) {
        try {
          const profile = await getUserProfile(currentUser.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        } finally {
          setProfileLoading(false);
        }
      } else {
        setProfileLoading(false);
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  const handleCancelAppointment = async (id: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      const success = await cancelAppointment(id);
      if (success) {
        refreshAppointments();
      }
    }
  };

  if (appointmentsLoading || profileLoading) {
    return <Loading />;
  }

  // Get next appointment
  const upcomingAppointments = appointments
    .filter(app => app.status !== 'cancelled' && app.status !== 'completed')
    .sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
  
  const nextAppointment = upcomingAppointments.length > 0 ? upcomingAppointments[0] : null;

  return (
    <div className="pt-24 pb-16">
      <div className="bg-sky-700 text-white py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-2">Patient Dashboard</h1>
          <p className="text-sky-100">
            Welcome back, {userProfile?.displayName || currentUser?.displayName || 'Patient'}
          </p>
        </div>
      </div>
      
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <motion.div
              className="bg-white rounded-lg shadow-md p-6 h-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-sky-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Next Appointment</h3>
                  {nextAppointment ? (
                    <p className="text-sm text-gray-600">
                      {nextAppointment.date} at {nextAppointment.time}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600">No upcoming appointments</p>
                  )}
                </div>
              </div>
              
              <hr className="my-4" />
              
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <a 
                  href="/book-appointment" 
                  className="flex items-center p-2 hover:bg-gray-50 rounded-md text-gray-700"
                >
                  <Calendar className="h-5 w-5 mr-3 text-sky-600" />
                  Book New Appointment
                </a>
                <a 
                  href="#medical-records" 
                  className="flex items-center p-2 hover:bg-gray-50 rounded-md text-gray-700"
                >
                  <FileText className="h-5 w-5 mr-3 text-sky-600" />
                  View Medical Records
                </a>
              </div>
            </motion.div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Upcoming Appointments</h2>
                <a href="/book-appointment" className="text-sm font-medium text-sky-600 hover:text-sky-700">
                  + New Appointment
                </a>
              </div>
              
              {appointmentsError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-red-700">{appointmentsError}</span>
                  </div>
                </div>
              )}
              
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div 
                      key={appointment.id}
                      className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div>
                          <div className="flex items-center mb-2">
                            <Clock className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-600">
                              {appointment.date} at {appointment.time}
                            </span>
                          </div>
                          <h3 className="font-semibold">{appointment.service}</h3>
                          <p className="text-sm text-gray-600">{appointment.doctorName}</p>
                        </div>
                        
                        <div className="mt-3 sm:mt-0 flex items-center">
                          {appointment.status === 'confirmed' ? (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Confirmed
                            </span>
                          ) : (
                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </span>
                          )}
                          
                          <button 
                            onClick={() => handleCancelAppointment(appointment.id!)}
                            className="ml-4 text-red-500 hover:text-red-700"
                            aria-label="Cancel appointment"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium text-gray-700 mb-1">No Appointments</h3>
                  <p className="text-gray-500 mb-4">You don't have any upcoming appointments.</p>
                  <a href="/book-appointment" className="btn btn-primary py-2">
                    Book an Appointment
                  </a>
                </div>
              )}
            </motion.div>
            
            {/* Past Appointments */}
            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-6">Past Appointments</h2>
              
              {appointments
                .filter(app => app.status === 'completed' || app.status === 'cancelled')
                .length > 0 ? (
                <div className="space-y-4">
                  {appointments
                    .filter(app => app.status === 'completed' || app.status === 'cancelled')
                    .map((appointment) => (
                      <div 
                        key={appointment.id}
                        className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div>
                            <div className="flex items-center mb-2">
                              <Clock className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm text-gray-600">
                                {appointment.date} at {appointment.time}
                              </span>
                            </div>
                            <h3 className="font-semibold">{appointment.service}</h3>
                            <p className="text-sm text-gray-600">{appointment.doctorName}</p>
                          </div>
                          
                          <div className="mt-3 sm:mt-0 flex items-center">
                            {appointment.status === 'completed' ? (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Completed
                              </span>
                            ) : (
                              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center">
                                <X className="h-3 w-3 mr-1" />
                                Cancelled
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium text-gray-700 mb-1">No Past Appointments</h3>
                  <p className="text-gray-500">Your past appointment history will appear here.</p>
                </div>
              )}
            </motion.div>
            
            {/* Medical Records */}
            <motion.div
              id="medical-records"
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-6">Medical Records</h2>
              
              {/* We'll fetch real medical records from the database in the future */}
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">No Records Yet</h3>
                <p className="text-gray-500 mb-4">Your medical records will appear here after your first appointment.</p>
              </div>
            </motion.div>
            
            {/* Important Notices */}
            <motion.div
              className="bg-sky-50 border-l-4 border-sky-500 p-4 rounded-r-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex">
                <AlertCircle className="h-6 w-6 text-sky-600 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sky-800 mb-1">Appointment Reminder</h3>
                  <p className="text-sm text-sky-700">
                    Please arrive 15 minutes before your scheduled appointment time. Don't forget to bring your insurance card and any relevant medical records.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
 