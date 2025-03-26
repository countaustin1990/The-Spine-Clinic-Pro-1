import  { useState } from 'react';
import { Appointment } from '../../services/appointmentService';
import { Clock, CheckCircle, X, Edit, Trash } from 'lucide-react';

interface AppointmentTableProps {
  appointments: Appointment[];
  onUpdateStatus: (id: string, status: 'confirmed' | 'completed' | 'cancelled') => void;
  onDelete: (id: string) => void;
}

const AppointmentTable = ({ appointments, onUpdateStatus, onDelete }: AppointmentTableProps) => {
  const [filter, setFilter] = useState('all');
  
  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'all') return true;
    return appointment.status === filter;
  });

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-md text-sm ${
            filter === 'all' 
              ? 'bg-gray-200 text-gray-800' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-3 py-1 rounded-md text-sm ${
            filter === 'pending' 
              ? 'bg-amber-200 text-amber-800' 
              : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('confirmed')}
          className={`px-3 py-1 rounded-md text-sm ${
            filter === 'confirmed' 
              ? 'bg-green-200 text-green-800' 
              : 'bg-green-50 text-green-700 hover:bg-green-100'
          }`}
        >
          Confirmed
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded-md text-sm ${
            filter === 'completed' 
              ? 'bg-blue-200 text-blue-800' 
              : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('cancelled')}
          className={`px-3 py-1 rounded-md text-sm ${
            filter === 'cancelled' 
              ? 'bg-red-200 text-red-800' 
              : 'bg-red-50 text-red-700 hover:bg-red-100'
          }`}
        >
          Cancelled
        </button>
      </div>
    
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
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{appointment.patientName}</div>
                    <div className="text-gray-500 text-sm">{appointment.patientEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      <div>
                        <div className="text-gray-900">{appointment.date}</div>
                        <div className="text-gray-500">{appointment.time}</div>
                      </div>
                    </div>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      {appointment.status === 'pending' && (
                        <button
                          onClick={() => onUpdateStatus(appointment.id!, 'confirmed')}
                          className="text-green-600 hover:text-green-900"
                          aria-label="Confirm appointment"
                          title="Confirm"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                      )}
                      {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                        <button
                          onClick={() => onUpdateStatus(appointment.id!, 'completed')}
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
                      {appointment.status !== 'cancelled' && (
                        <button
                          onClick={() => onUpdateStatus(appointment.id!, 'cancelled')}
                          className="text-amber-600 hover:text-amber-900"
                          aria-label="Cancel appointment"
                          title="Cancel"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() => onDelete(appointment.id!)}
                        className="text-red-600 hover:text-red-900"
                        aria-label="Delete appointment"
                        title="Delete"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center">
                  <p className="text-gray-500">No appointments found matching your criteria.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTable;
 