import  { useState, useEffect } from 'react';
import { getAllDoctors, Doctor } from '../services/doctorService';

interface DoctorsState {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
}

export const useDoctors = () => {
  const [state, setState] = useState<DoctorsState>({
    doctors: [],
    loading: true,
    error: null,
  });

  const fetchDoctors = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const doctors = await getAllDoctors();
      setState({
        doctors,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        doctors: [],
        loading: false,
        error: 'Failed to fetch doctors',
      });
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return {
    ...state,
    refreshDoctors: fetchDoctors,
  };
};
 