import  { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

// This file contains utility functions for initializing and managing Firebase data

/**
 * Seeds initial data into Firestore
 */
export const seedInitialData = async () => {
  try {
    // Seed doctors
    const doctors = [
      {
        id: 'dr-sarah-johnson',
        name: 'Dr. Sarah Johnson',
        title: 'MD, FAAOS',
        specialty: 'Spine Surgeon',
        image: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzcxMjR8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
        education: [
          'Medical School: Harvard Medical School',
          'Residency: Massachusetts General Hospital',
          'Fellowship: Spine Surgery, Johns Hopkins Hospital'
        ],
        certifications: [
          'Board Certified in Orthopedic Surgery',
          'Fellow of the American Academy of Orthopedic Surgeons',
          'Member of the North American Spine Society'
        ],
        expertise: [
          'Minimally Invasive Spine Surgery',
          'Disc Replacement',
          'Spinal Fusion',
          'Scoliosis Correction'
        ],
        bio: 'Dr. Johnson is a fellowship-trained spine surgeon with over 15 years of experience treating complex spinal conditions. Her expertise includes both minimally invasive techniques and complex reconstructive surgery. She has published numerous research articles on advancing spine surgery techniques and is committed to providing personalized care for each patient.',
        schedule: {
          monday: ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00'],
          wednesday: ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00'],
          friday: ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00']
        }
      },
      {
        id: 'dr-michael-chen',
        name: 'Dr. Michael Chen',
        title: 'MD, FAAOS',
        specialty: 'Orthopedic Surgeon',
        image: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzcxMjR8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
        education: [
          'Medical School: Johns Hopkins University School of Medicine',
          'Residency: Hospital for Special Surgery',
          'Fellowship: Joint Replacement, Mayo Clinic'
        ],
        certifications: [
          'Board Certified in Orthopedic Surgery',
          'Fellow of the American Academy of Orthopedic Surgeons',
          'Member of the American Association of Hip and Knee Surgeons'
        ],
        expertise: [
          'Total Hip Replacement',
          'Total Knee Replacement',
          'Partial Knee Replacement',
          'Joint Revision Surgery'
        ],
        bio: 'Dr. Chen specializes in hip and knee replacement surgery with a focus on minimally invasive techniques that promote faster recovery. He has performed over 2,000 joint replacement procedures and is recognized for his expertise in complex revision surgeries. Dr. Chen is dedicated to helping patients regain mobility and improve their quality of life through advanced surgical techniques.',
        schedule: {
          tuesday: ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00'],
          thursday: ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00'],
          saturday: ['9:00', '10:00', '11:00', '13:00']
        }
      }
    ];

    for (const doctor of doctors) {
      const { id, ...doctorData } = doctor;
      await setDoc(doc(db, 'doctors', id), doctorData);
    }

    // Seed services
    const services = [
      {
        id: 'spinal-surgery',
        title: 'Spinal Surgery',
        description: 'Our spine specialists provide advanced surgical treatments for a wide range of spinal conditions, including herniated discs, spinal stenosis, scoliosis, and degenerative disc disease. Using minimally invasive techniques whenever possible, our surgeons aim to relieve pain and restore function with reduced recovery time.',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzcxMjR8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
        procedures: ['Discectomy', 'Laminectomy', 'Spinal Fusion', 'Artificial Disc Replacement']
      },
      {
        id: 'hip-replacement',
        title: 'Hip Replacement',
        description: 'Our hip replacement program utilizes the latest techniques and implant technologies to restore mobility and reduce pain. From traditional total hip replacement to minimally invasive approaches, our surgeons customize the treatment to your specific condition, age, and activity level.',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzcxMjR8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
        procedures: ['Total Hip Arthroplasty', 'Partial Hip Replacement', 'Hip Resurfacing', 'Revision Hip Surgery']
      },
      {
        id: 'knee-replacement',
        title: 'Knee Replacement',
        description: 'Our knee replacement specialists have extensive experience in all aspects of knee reconstruction. Using advanced computer navigation and patient-specific instrumentation, we provide personalized care that optimizes outcomes and accelerates recovery time.',
        image: 'https://images.unsplash.com/photo-1530213786676-41ad9f7736f6?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxtZWRpY2FsJTIwc3BpbmUlMjBvcnRob3BlZGljJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3NDI4NzcxMjR8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
        procedures: ['Total Knee Arthroplasty', 'Partial Knee Replacement', 'ACL Reconstruction', 'Arthroscopic Knee Surgery']
      }
    ];

    for (const service of services) {
      const { id, ...serviceData } = service;
      await setDoc(doc(db, 'services', id), serviceData);
    }

    console.log('Initial data seeded successfully');
    return true;
  } catch (error) {
    console.error('Error seeding initial data:', error);
    return false;
  }
};

export const setupAdmin = async (userId: string) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      role: 'admin'
    }, { merge: true });
    console.log('Admin role assigned successfully');
    return true;
  } catch (error) {
    console.error('Error assigning admin role:', error);
    return false;
  }
};
 