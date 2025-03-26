import  { Link } from 'react-router-dom';
import { Calendar, Clock, CheckCircle, X } from 'lucide-react';
import { Appointment } from '../../services/appointmentService';

interface UserAppointmentListProps {
  appointments: Appointment[];
  onCancel: (id: string) => Promise<boolean>;
  emptyMessage?: string;
  emptyAction?: React.ReactNode;
}

const UserAppointmentList = ({ 
  appointments, 
  onCancel, 
  emptyMessage = "You don't have any appointments.",
  emptyAction
}: UserAppointmentListProps) => {
  
  const handleCancelClick = async (id: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      await onCancel(id);
    }
  };

  if (appointments.length === 0) {
    return (
      <div className="text-center py-8">
        <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
        <h3 className="text-lg font-medium text-gray-700 mb-1">No Appointments</h3>
        <p className="text-gray-500 mb-4">{emptyMessage}</p>
        {emptyAction}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
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
              ) : appointment.status === 'pending' ? (
                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Pending
                </span>
              ) : appointment.status === 'completed' ? (
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
              
              {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                <button 
                  onClick={() => handleCancelClick(appointment.id!)}
                  className="ml-4 text-red-500 hover:text-red-700"
                  aria-label="Cancel appointment"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
          
          {appointment.notes && (
            <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
              <span className="font-medium">Notes:</span> {appointment.notes}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserAppointmentList;
 