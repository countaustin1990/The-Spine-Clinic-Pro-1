import  { 
  collection, 
  getDocs, 
  getDoc, 
  doc 
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  procedures: string[];
  details?: string;
}

export const getAllServices = async (): Promise<Service[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'services'));
    const services: Service[] = [];
    
    querySnapshot.forEach((doc) => {
      services.push({
        id: doc.id,
        ...doc.data()
      } as Service);
    });
    
    return services;
  } catch (error) {
    console.error('Error getting all services:', error);
    throw error;
  }
};

export const getServiceById = async (id: string): Promise<Service | null> => {
  try {
    const serviceDoc = await getDoc(doc(db, 'services', id));
    
    if (!serviceDoc.exists()) {
      return null;
    }
    
    return {
      id: serviceDoc.id,
      ...serviceDoc.data()
    } as Service;
  } catch (error) {
    console.error('Error getting service:', error);
    throw error;
  }
};
 