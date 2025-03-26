import  { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  serverTimestamp, 
  Timestamp,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface Appointment {
  id?: string;
  userId: string;
  doctorId: string;
  doctorName: string;
  service: string;
  date: string;
  time: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt?: Timestamp;
}

export const createAppointment = async (appointmentData: Omit<Appointment, 'id' | 'createdAt'>): Promise<string> => {
  try {
    // Check doctor availability
    const isAvailable = await checkDoctorAvailability(
      appointmentData.doctorId, 
      appointmentData.date, 
      appointmentData.time
    );
    
    if (!isAvailable) {
      throw new Error('The selected time slot is no longer available. Please choose another time.');
    }
    
    const docRef = await addDoc(collection(db, 'appointments'), {
      ...appointmentData,
      createdAt: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

export const updateAppointment = async (id: string, appointmentData: Partial<Appointment>): Promise<void> => {
  try {
    const appointmentRef = doc(db, 'appointments', id);
    await updateDoc(appointmentRef, {
      ...appointmentData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw error;
  }
};

export const deleteAppointment = async (id: string): Promise<void> => {
  try {
    const appointmentRef = doc(db, 'appointments', id);
    await deleteDoc(appointmentRef);
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};

export const getAppointmentById = async (id: string): Promise<Appointment | null> => {
  try {
    const appointmentDoc = await getDoc(doc(db, 'appointments', id));
    
    if (!appointmentDoc.exists()) {
      return null;
    }
    
    return {
      id: appointmentDoc.id,
      ...appointmentDoc.data()
    } as Appointment;
  } catch (error) {
    console.error('Error getting appointment:', error);
    throw error;
  }
};

export const getAppointmentsByUser = async (userId: string): Promise<Appointment[]> => {
  try {
    const q = query(
      collection(db, 'appointments'), 
      where('userId', '==', userId),
      orderBy('date', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    const appointments: Appointment[] = [];
    
    querySnapshot.forEach((doc) => {
      appointments.push({
        id: doc.id,
        ...doc.data()
      } as Appointment);
    });
    
    return appointments;
  } catch (error) {
    console.error('Error getting user appointments:', error);
    throw error;
  }
};

export const getAppointmentsByDoctor = async (doctorId: string): Promise<Appointment[]> => {
  try {
    const q = query(
      collection(db, 'appointments'), 
      where('doctorId', '==', doctorId),
      orderBy('date', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    const appointments: Appointment[] = [];
    
    querySnapshot.forEach((doc) => {
      appointments.push({
        id: doc.id,
        ...doc.data()
      } as Appointment);
    });
    
    return appointments;
  } catch (error) {
    console.error('Error getting doctor appointments:', error);
    throw error;
  }
};

export const getDoctorAppointmentsByDate = async (doctorId: string, date: string): Promise<Appointment[]> => {
  try {
    const q = query(
      collection(db, 'appointments'), 
      where('doctorId', '==', doctorId),
      where('date', '==', date),
      where('status', 'in', ['confirmed', 'pending'])
    );
    
    const querySnapshot = await getDocs(q);
    const appointments: Appointment[] = [];
    
    querySnapshot.forEach((doc) => {
      appointments.push({
        id: doc.id,
        ...doc.data()
      } as Appointment);
    });
    
    return appointments;
  } catch (error) {
    console.error('Error getting doctor appointments by date:', error);
    throw error;
  }
};

export const getAllAppointments = async (): Promise<Appointment[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'appointments'));
    const appointments: Appointment[] = [];
    
    querySnapshot.forEach((doc) => {
      appointments.push({
        id: doc.id,
        ...doc.data()
      } as Appointment);
    });
    
    return appointments;
  } catch (error) {
    console.error('Error getting all appointments:', error);
    throw error;
  }
};

export const checkDoctorAvailability = async (doctorId: string, date: string, time: string): Promise<boolean> => {
  try {
    const q = query(
      collection(db, 'appointments'),
      where('doctorId', '==', doctorId),
      where('date', '==', date),
      where('time', '==', time),
      where('status', 'in', ['confirmed', 'pending'])
    );
    
    const querySnapshot = await getDocs(q);
    
    // If no appointments found for this time slot, it's available
    return querySnapshot.empty;
  } catch (error) {
    console.error('Error checking doctor availability:', error);
    throw error;
  }
};

export const getAvailableTimeSlots = async (doctorId: string, date: string): Promise<string[]> => {
  try {
    // Get all doctor appointments for this date
    const bookedAppointments = await getDoctorAppointmentsByDate(doctorId, date);
    
    // These would typically come from your configuration or doctor's settings
    const allTimeSlots = [
      '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
      '4:00 PM', '4:30 PM'
    ];
    
    // Filter out booked time slots
    const bookedTimes = bookedAppointments.map(appointment => appointment.time);
    const availableTimeSlots = allTimeSlots.filter(time => !bookedTimes.includes(time));
    
    return availableTimeSlots;
  } catch (error) {
    console.error('Error getting available time slots:', error);
    throw error;
  }
};
 