import  { useState, useEffect } from 'react';
import { 
  getAppointmentsByUser, 
  updateAppointment, 
  deleteAppointment, 
  Appointment 
} from '../services/appointmentService';

interface AppointmentsState {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
}

export const useAppointments = (userId: string | undefined) => {
  const [state, setState] = useState<AppointmentsState>({
    appointments: [],
    loading: true,
    error: null,
  });

  const fetchAppointments = async () => {
    if (!userId) {
      setState({
        appointments: [],
        loading: false,
        error: null,
      });
      return;
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const appointments = await getAppointmentsByUser(userId);
      setState({
        appointments,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        appointments: [],
        loading: false,
        error: 'Failed to fetch appointments',
      });
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [userId]);

  const cancelAppointment = async (appointmentId: string) => {
    try {
      await updateAppointment(appointmentId, { status: 'cancelled' });
      // Update local state
      setState(prev => ({
        ...prev,
        appointments: prev.appointments.map(appointment => 
          appointment.id === appointmentId 
            ? { ...appointment, status: 'cancelled' } 
            : appointment
        ),
      }));
      return true;
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      return false;
    }
  };

  const removeAppointment = async (appointmentId: string) => {
    try {
      await deleteAppointment(appointmentId);
      // Update local state
      setState(prev => ({
        ...prev,
        appointments: prev.appointments.filter(
          appointment => appointment.id !== appointmentId
        ),
      }));
      return true;
    } catch (error) {
      console.error('Error removing appointment:', error);
      return false;
    }
  };

  return {
    ...state,
    refreshAppointments: fetchAppointments,
    cancelAppointment,
    removeAppointment,
  };
};
 