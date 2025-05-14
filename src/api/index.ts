const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export async function fetchData(endpoint: string, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export const api = {
  // Appointments
  getAppointments: (userId: string) => fetchData(`appointments/${userId}`),
  createAppointment: (data: any) => fetchData('appointments', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateAppointment: (id: string, data: any) => fetchData(`appointments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteAppointment: (id: string) => fetchData(`appointments/${id}`, {
    method: 'DELETE',
  }),
  
  // Doctors
  getDoctors: () => fetchData('doctors'),
  
  // Services
  getServices: () => fetchData('services'),
  
  // Blog posts
  getBlogPosts: () => fetchData('blog'),
  
  // Testimonials
  getTestimonials: () => fetchData('testimonials'),
  
  // Contact
  submitContactForm: (data: any) => fetchData('contact', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};