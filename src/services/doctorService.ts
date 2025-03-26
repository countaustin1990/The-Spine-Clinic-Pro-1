import  { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where 
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  image: string;
  education: string[];
  certifications: string[];
  expertise: string[];
  bio: string;
  schedule?: {
    monday?: string[];
    tuesday?: string[];
    wednesday?: string[];
    thursday?: string[];
    friday?: string[];
    saturday?: string[];
  };
}

export const getAllDoctors = async (): Promise<Doctor[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'doctors'));
    const doctors: Doctor[] = [];
    
    querySnapshot.forEach((doc) => {
      doctors.push({
        id: doc.id,
        ...doc.data()
      } as Doctor);
    });
    
    return doctors;
  } catch (error) {
    console.error('Error getting all doctors:', error);
    throw error;
  }
};

export const getDoctorById = async (id: string): Promise<Doctor | null> => {
  try {
    const doctorDoc = await getDoc(doc(db, 'doctors', id));
    
    if (!doctorDoc.exists()) {
      return null;
    }
    
    return {
      id: doctorDoc.id,
      ...doctorDoc.data()
    } as Doctor;
  } catch (error) {
    console.error('Error getting doctor:', error);
    throw error;
  }
};

export const getDoctorsBySpecialty = async (specialty: string): Promise<Doctor[]> => {
  try {
    const q = query(collection(db, 'doctors'), where('specialty', '==', specialty));
    const querySnapshot = await getDocs(q);
    const doctors: Doctor[] = [];
    
    querySnapshot.forEach((doc) => {
      doctors.push({
        id: doc.id,
        ...doc.data()
      } as Doctor);
    });
    
    return doctors;
  } catch (error) {
    console.error('Error getting doctors by specialty:', error);
    throw error;
  }
};
 