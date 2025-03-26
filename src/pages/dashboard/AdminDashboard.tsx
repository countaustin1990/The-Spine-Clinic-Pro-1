import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, FileText, BarChart2, Edit, Trash, CheckCircle, X, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../../components/ui/Loading';
import { getAllAppointments, updateAppointment, deleteAppointment, Appointment } from '../../services/appointmentService';
import { getAllUsers } from '../../services/userService';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('today');
  const [error, setError] = useState('');
  const [analyticsData, setAnalyticsData] = useState({
    totalAppointments: 0,
    appointmentsThisMonth: 0,
    newPatientsThisMonth: 0,
    appointmentCompletionRate: 0,
  });
  
  const { currentUser, userRole } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (userRole !== 'admin') {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError('');
        
        // Fetch appointments
        const appointmentsData = await getAllAppointments();
        setAppointments(appointmentsData);
        
        // Fetch users for analytics
        const users = await getAllUsers();
        
        // Calculate analytics
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        const appointmentsThisMonth = appointmentsData.filter(app => {
          const appDate = new Date(app.date);
          return appDate.getMonth() === currentMonth && appDate.getFullYear() === currentYear;
        }).length;
        
        const completedAppointments = appointmentsData.filter(app => app.status === 'completed').length;
        const completionRate = appointmentsData.length > 0 
          ? Math.round((completedAppointments / appointmentsData.length) * 100) 
          : 0;
        
        const newPatientsThisMonth = users.filter(user => {
          if (!user.createdAt) return false;
          const createdDate = user.createdAt.toDate();
          return createdDate.getMonth() === currentMonth && createdDate.getFullYear() === currentYear;
        }).length;
        
        setAnalyticsData({
          totalAppointments: appointmentsData.length,
          appointmentsThisMonth,
          newPatientsThisMonth,
          appointmentCompletionRate: completionRate,
        });
        
        filterAppointmentsByTab('today');
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userRole]);

  const filterAppointmentsByTab = (tab: string) => {
    setActiveTab(tab);
    
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
    if (tab === 'today') {
      const todayAppointments = appointments.filter(app => app.date === today);
      setFilteredAppointments(todayAppointments);
    } else if (tab === 'upcoming') {
      const upcomingAppointments = appointments.filter(app => {
        return app.date > today && app.status !== 'cancelled';
      });
      setFilteredAppointments(upcomingAppointments);
    } else if (tab === 'all') {
      setFilteredAppointments(appointments);
    }
  };

  const handleUpdateAppointmentStatus = async (id: string, status: 'confirmed' | 'completed' | 'cancelled') => {
    try {
      await updateAppointment(id, { status });
      
      // Update local state
      setAppointments(prev => 
        prev.map(app => app.id === id ? { ...app, status } : app)
      );
      
      // Re-filter appointments
      filterAppointmentsByTab(activeTab);
    } catch (err) {
      console.error('Error updating appointment status:', err);
      setError('Failed to update appointment status');
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this appointment? This action cannot be undone.')) {
      return;
    }
    
    try {
      await deleteAppointment(id);
      
      // Update local state
      setAppointments(prev => prev.filter(app => app.id !== id));
      
      // Re-filter appointments
      filterAppointmentsByTab(activeTab);
    } catch (err) {
      console.error('Error deleting appointment:', err);
      setError('Failed to delete appointment');
    }
  };

  if (loading) {
    return <Loading />;
  }

  // Check if user is admin
  if (userRole !== 'admin') {
    return (
      <div className="pt-24 pb-16">
        <div className="container-custom py-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex">
              <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-red-800">Access Denied</h3>
                <p className="text-red-700">
                  You do not have permission to access the admin dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="bg-gray-800 text-white py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">
            Welcome back, {currentUser?.displayName || 'Admin'}
          </p>
        </div>
      </div>
      
      <div className="container-custom py-8">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-8">
            <div className="flex">
              <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
              <div>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-8 w-8 text-sky-600" />
              <span className="text-3xl font-bold">{analyticsData.appointmentsThisMonth}</span>
            </div>
            <p className="text-gray-600">Appointments This Month</p>
          </motion.div>
          
          <motion.div
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-green-600" />
              <span className="text-3xl font-bold">{analyticsData.newPatientsThisMonth}</span>
            </div>
            <p className="text-gray-600">New Patients This Month</p>
          </motion.div>
          
          <motion.div
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <FileText className="h-8 w-8 text-amber-600" />
              <span className="text-3xl font-bold">{analyticsData.totalAppointments}</span>
            </div>
            <p className="text-gray-600">Total Appointments</p>
          </motion.div>
          
          <motion.div
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <BarChart2 className="h-8 w-8 text-indigo-600" />
              <span className="text-3xl font-bold">{analyticsData.appointmentCompletionRate}%</span>
            </div>
            <p className="text-gray-600">Completion Rate</p>
          </motion.div>
        </div>
        
        <motion.div
          className="bg-white rounded-lg shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'today'
                    ? 'text-sky-600 border-b-2 border-sky-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => filterAppointmentsByTab('today')}
              >
                Today's Appointments
              </button>
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'upcoming'
                    ? 'text-sky-600 border-b-2 border-sky-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => filterAppointmentsByTab('upcoming')}
              >
                Upcoming Appointments
              </button>
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'all'
                    ? 'text-sky-600 border-b-2 border-sky-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => filterAppointmentsByTab('all')}
              >
                All Appointments
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {filteredAppointments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Doctor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAppointments.map((appointment) => (
                      <tr key={appointment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{appointment.patientName}</div>
                          <div className="text-gray-500 text-sm">{appointment.patientEmail}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">{appointment.date}</div>
                          <div className="text-gray-500">{appointment.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">{appointment.service}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">{appointment.doctorName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {appointment.status === 'confirmed' ? (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Confirmed
                            </span>
                          ) : appointment.status === 'pending' ? (
                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                              Pending
                            </span>
                          ) : appointment.status === 'completed' ? (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              Completed
                            </span>
                          ) : (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                              Cancelled
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2">
                            {appointment.status === 'pending' && (
                              <button
                                onClick={() => handleUpdateAppointmentStatus(appointment.id!, 'confirmed')}
                                className="text-green-600 hover:text-green-900"
                                aria-label="Confirm appointment"
                                title="Confirm"
                              >
                                <CheckCircle className="h-5 w-5" />
                              </button>
                            )}
                            {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                              <button
                                onClick={() => handleUpdateAppointmentStatus(appointment.id!, 'completed')}
                                className="text-blue-600 hover:text-blue-900"
                                aria-label="Mark as completed"
                                title="Mark as completed"
                              >
                                <CheckCircle className="h-5 w-5" />
                              </button>
                            )}
                            <button
                              className="text-sky-600 hover:text-sky-900"
                              aria-label="Edit appointment"
                              title="Edit"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleUpdateAppointmentStatus(appointment.id!, 'cancelled')}
                              className="text-amber-600 hover:text-amber-900"
                              aria-label="Cancel appointment"
                              title="Cancel"
                            >
                              <X className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteAppointment(appointment.id!)}
                              className="text-red-600 hover:text-red-900"
                              aria-label="Delete appointment"
                              title="Delete"
                            >
                              <Trash className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">No Appointments</h3>
                <p className="text-gray-500">There are no appointments scheduled for this period.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
 