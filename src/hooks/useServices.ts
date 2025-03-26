import  { useState, useEffect } from 'react';
import { getAllServices, Service } from '../services/serviceService';

interface ServicesState {
  services: Service[];
  loading: boolean;
  error: string | null;
}

export const useServices = () => {
  const [state, setState] = useState<ServicesState>({
    services: [],
    loading: true,
    error: null,
  });

  const fetchServices = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const services = await getAllServices();
      setState({
        services,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        services: [],
        loading: false,
        error: 'Failed to fetch services',
      });
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    ...state,
    refreshServices: fetchServices,
  };
};
 