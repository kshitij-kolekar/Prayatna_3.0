/**
 * prisma/seed.js
 * Seeds the database with the same hospital data used in mockData.js.
 * Run with:  node prisma/seed.js
 */
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─── Hospital data mirroring mockData.js ──────────────────────────────────────
const hospitals = [
  {
    id: 'h1',
    name: 'Apollo Multispeciality Hospital',
    address: 'Jubilee Hills, Hyderabad, Telangana 500033',
    city: 'Hyderabad', state: 'Telangana', pincode: '500033',
    phone: '+91 40-2355-8888', email: 'info@apollohyd.com',
    lat: 17.4326, lng: 78.4071,
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=250&fit=crop',
    rating: 4.7,
    accreditation: 'NABH', password: 'apollo123',
    resources: {
      totalBeds: 500, availableBeds: 78, totalIcuBeds: 60, availableIcuBeds: 12,
      totalVentilators: 45, availableVentilators: 15,
      oxygenCapacity: 10000, oxygenAvailable: 7800,
      bloodAPos: 45, bloodANeg: 12, bloodBPos: 38, bloodBNeg: 8,
      bloodABPos: 15, bloodABNeg: 5, bloodOPos: 52, bloodONeg: 10,
    },
    specialists: [
      { name: 'Dr. Rajesh Kumar', specialty: 'Cardiology', available: true },
      { name: 'Dr. Priya Sharma', specialty: 'Neurology', available: true },
      { name: 'Dr. Arun Patel', specialty: 'Orthopedics', available: false },
      { name: 'Dr. Meena Reddy', specialty: 'Oncology', available: true },
      { name: 'Dr. Vikram Singh', specialty: 'Pulmonology', available: true },
    ],
    equipment: [
      { name: 'MRI Scanner', model: 'MRI-3T Pro', quantity: 1 },
      { name: 'CT Scanner', model: 'CT-64S Ultra', quantity: 2 },
      { name: 'X-Ray Machine', model: 'XR-2000D', quantity: 4 },
      { name: 'Ultrasound', model: 'US-Elite 5', quantity: 3 },
      { name: 'ECG Machine', model: 'ECG-12L', quantity: 10 },
      { name: 'Dialysis Machine', model: 'DLY-500', quantity: 5 },
      { name: 'Defibrillator', model: 'DEF-AX200', quantity: 8 },
      { name: 'Surgical Robot', model: 'SR-DaVinci', quantity: 1 },
    ],
  },
  {
    id: 'h2',
    name: 'AIIMS New Delhi',
    address: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi 110029',
    city: 'New Delhi', state: 'Delhi', pincode: '110029',
    phone: '+91 11-2658-8500', email: 'info@aiims.edu',
    lat: 28.5672, lng: 77.2100,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop',
    rating: 4.9,
    accreditation: 'NABH', password: 'aiims123',
    resources: {
      totalBeds: 2500, availableBeds: 320, totalIcuBeds: 200, availableIcuBeds: 45,
      totalVentilators: 150, availableVentilators: 42,
      oxygenCapacity: 50000, oxygenAvailable: 38000,
      bloodAPos: 120, bloodANeg: 35, bloodBPos: 95, bloodBNeg: 22,
      bloodABPos: 40, bloodABNeg: 15, bloodOPos: 140, bloodONeg: 28,
    },
    specialists: [
      { name: 'Dr. S.K. Gupta', specialty: 'Cardiology', available: true },
      { name: 'Dr. Anita Desai', specialty: 'Neurology', available: true },
      { name: 'Dr. Ramesh Nair', specialty: 'General Surgery', available: true },
      { name: 'Dr. Kavita Joshi', specialty: 'Pediatrics', available: false },
      { name: 'Dr. Ajay Mathur', specialty: 'Nephrology', available: true },
      { name: 'Dr. Deepa Verma', specialty: 'Oncology', available: true },
    ],
    equipment: [
      { name: 'MRI Scanner', model: 'MRI-3T Pro', quantity: 3 },
      { name: 'CT Scanner', model: 'CT-64S Ultra', quantity: 5 },
      { name: 'X-Ray Machine', model: 'XR-2000D', quantity: 12 },
      { name: 'Ultrasound', model: 'US-Elite 5', quantity: 8 },
      { name: 'ECG Machine', model: 'ECG-12L', quantity: 25 },
      { name: 'Dialysis Machine', model: 'DLY-500', quantity: 15 },
      { name: 'Defibrillator', model: 'DEF-AX200', quantity: 20 },
      { name: 'Surgical Robot', model: 'SR-DaVinci', quantity: 2 },
    ],
  },
  {
    id: 'h3',
    name: 'Fortis Memorial Research Institute',
    address: 'Sector 44, Gurugram, Haryana 122002',
    city: 'Gurugram', state: 'Haryana', pincode: '122002',
    phone: '+91 124-4962-222', email: 'info@fortis.com',
    lat: 28.4520, lng: 77.0266,
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=250&fit=crop',
    rating: 4.6,
    accreditation: 'NABH, JCI', password: 'fortis123',
    resources: {
      totalBeds: 1000, availableBeds: 145, totalIcuBeds: 100, availableIcuBeds: 22,
      totalVentilators: 80, availableVentilators: 28,
      oxygenCapacity: 25000, oxygenAvailable: 19500,
      bloodAPos: 65, bloodANeg: 18, bloodBPos: 55, bloodBNeg: 12,
      bloodABPos: 22, bloodABNeg: 8, bloodOPos: 75, bloodONeg: 15,
    },
    specialists: [
      { name: 'Dr. Ashok Rajgopal', specialty: 'Orthopedics', available: true },
      { name: 'Dr. Neena Kohli', specialty: 'Gastroenterology', available: true },
      { name: 'Dr. Sanjay Parikh', specialty: 'Cardiology', available: true },
      { name: 'Dr. Ritu Bhan', specialty: 'Pediatrics', available: true },
    ],
    equipment: [
      { name: 'MRI Scanner', model: 'MRI-3T Pro', quantity: 1 },
      { name: 'CT Scanner', model: 'CT-64S Ultra', quantity: 2 },
      { name: 'X-Ray Machine', model: 'XR-2000D', quantity: 5 },
      { name: 'ECG Machine', model: 'ECG-12L', quantity: 12 },
    ],
  },
  {
    id: 'h4',
    name: 'Medanta - The Medicity',
    address: 'CH Baktawar Singh Rd, Sector 38, Gurugram, Haryana 122001',
    city: 'Gurugram', state: 'Haryana', pincode: '122001',
    phone: '+91 124-4141-414', email: 'info@medanta.org',
    lat: 28.4395, lng: 77.0421,
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400&h=250&fit=crop',
    rating: 4.8,
    accreditation: 'NABH, JCI', password: 'medanta123',
    resources: {
      totalBeds: 1600, availableBeds: 210, totalIcuBeds: 350, availableIcuBeds: 55,
      totalVentilators: 120, availableVentilators: 35,
      oxygenCapacity: 40000, oxygenAvailable: 32000,
      bloodAPos: 88, bloodANeg: 25, bloodBPos: 72, bloodBNeg: 18,
      bloodABPos: 30, bloodABNeg: 10, bloodOPos: 95, bloodONeg: 20,
    },
    specialists: [
      { name: 'Dr. Naresh Trehan', specialty: 'Cardiology', available: true },
      { name: 'Dr. Arvind Kumar', specialty: 'Pulmonology', available: true },
      { name: 'Dr. Sushila Kataria', specialty: 'Emergency Medicine', available: true },
      { name: 'Dr. Randeep Guleria', specialty: 'Pulmonology', available: false },
    ],
    equipment: [
      { name: 'MRI Scanner', model: 'MRI-3T Pro', quantity: 2 },
      { name: 'CT Scanner', model: 'CT-64S Ultra', quantity: 3 },
      { name: 'X-Ray Machine', model: 'XR-2000D', quantity: 6 },
      { name: 'ECG Machine', model: 'ECG-12L', quantity: 15 },
    ],
  },
  {
    id: 'h5',
    name: 'Kokilaben Dhirubhai Ambani Hospital',
    address: 'Rao Saheb, Achutrao Patwardhan Marg, Mumbai 400053',
    city: 'Mumbai', state: 'Maharashtra', pincode: '400053',
    phone: '+91 22-3066-6666', email: 'info@kokilabenhospital.com',
    lat: 19.1286, lng: 72.8269,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=250&fit=crop',
    rating: 4.5,
    accreditation: 'NABH', password: 'kokilaben123',
    resources: {
      totalBeds: 750, availableBeds: 95, totalIcuBeds: 80, availableIcuBeds: 18,
      totalVentilators: 55, availableVentilators: 20,
      oxygenCapacity: 18000, oxygenAvailable: 14200,
      bloodAPos: 55, bloodANeg: 15, bloodBPos: 48, bloodBNeg: 10,
      bloodABPos: 18, bloodABNeg: 6, bloodOPos: 62, bloodONeg: 12,
    },
    specialists: [
      { name: 'Dr. Ram Narain', specialty: 'Neurology', available: true },
      { name: 'Dr. Santosh Shetty', specialty: 'Cardiology', available: true },
      { name: 'Dr. Jalil Parkar', specialty: 'Pulmonology', available: true },
    ],
    equipment: [
      { name: 'MRI Scanner', model: 'MRI-3T Pro', quantity: 1 },
      { name: 'CT Scanner', model: 'CT-64S Ultra', quantity: 2 },
      { name: 'ECG Machine', model: 'ECG-12L', quantity: 8 },
    ],
  },
  {
    id: 'h6',
    name: 'Christian Medical College (CMC)',
    address: 'Ida Scudder Road, Vellore, Tamil Nadu 632004',
    city: 'Vellore', state: 'Tamil Nadu', pincode: '632004',
    phone: '+91 416-228-1000', email: 'info@cmcvellore.ac.in',
    lat: 12.9249, lng: 79.1338,
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=250&fit=crop',
    rating: 4.8,
    accreditation: 'NABH', password: 'cmc123',
    resources: {
      totalBeds: 2700, availableBeds: 380, totalIcuBeds: 180, availableIcuBeds: 38,
      totalVentilators: 100, availableVentilators: 32,
      oxygenCapacity: 45000, oxygenAvailable: 36000,
      bloodAPos: 100, bloodANeg: 30, bloodBPos: 85, bloodBNeg: 20,
      bloodABPos: 35, bloodABNeg: 12, bloodOPos: 120, bloodONeg: 25,
    },
    specialists: [
      { name: 'Dr. George Chandy', specialty: 'Nephrology', available: true },
      { name: 'Dr. Sunil Chandy', specialty: 'ENT', available: true },
      { name: 'Dr. Anna Pulimood', specialty: 'Gastroenterology', available: true },
      { name: 'Dr. V. Raju', specialty: 'Dermatology', available: false },
      { name: 'Dr. Prasanna Samuel', specialty: 'Ophthalmology', available: true },
    ],
    equipment: [
      { name: 'MRI Scanner', model: 'MRI-3T Pro', quantity: 3 },
      { name: 'CT Scanner', model: 'CT-64S Ultra', quantity: 4 },
      { name: 'ECG Machine', model: 'ECG-12L', quantity: 20 },
    ],
  },
  {
    id: 'h7',
    name: 'Manipal Hospital',
    address: '98, HAL Old Airport Rd, Bengaluru, Karnataka 560017',
    city: 'Bengaluru', state: 'Karnataka', pincode: '560017',
    phone: '+91 80-2502-4444', email: 'info@manipalhospitals.com',
    lat: 12.9588, lng: 77.6475,
    image: 'https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?w=400&h=250&fit=crop',
    rating: 4.4,
    accreditation: 'NABH', password: 'manipal123',
    resources: {
      totalBeds: 600, availableBeds: 88, totalIcuBeds: 70, availableIcuBeds: 15,
      totalVentilators: 50, availableVentilators: 18,
      oxygenCapacity: 15000, oxygenAvailable: 11500,
      bloodAPos: 42, bloodANeg: 10, bloodBPos: 35, bloodBNeg: 8,
      bloodABPos: 14, bloodABNeg: 4, bloodOPos: 48, bloodONeg: 9,
    },
    specialists: [
      { name: 'Dr. H. Sudarshan Ballal', specialty: 'Nephrology', available: true },
      { name: 'Dr. Muralidhar Pai', specialty: 'Urology', available: true },
      { name: 'Dr. Vidya Rao', specialty: 'Psychiatry', available: true },
    ],
    equipment: [
      { name: 'MRI Scanner', model: 'MRI-3T Pro', quantity: 1 },
      { name: 'CT Scanner', model: 'CT-64S Ultra', quantity: 1 },
      { name: 'ECG Machine', model: 'ECG-12L', quantity: 6 },
    ],
  },
  {
    id: 'h8',
    name: 'Tata Memorial Hospital',
    address: 'Dr Ernest Borges Rd, Parel, Mumbai 400012',
    city: 'Mumbai', state: 'Maharashtra', pincode: '400012',
    phone: '+91 22-2417-7000', email: 'info@tmc.gov.in',
    lat: 19.0048, lng: 72.8432,
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=250&fit=crop',
    rating: 4.7,
    accreditation: 'NABH', password: 'tata123',
    resources: {
      totalBeds: 800, availableBeds: 60, totalIcuBeds: 50, availableIcuBeds: 8,
      totalVentilators: 35, availableVentilators: 10,
      oxygenCapacity: 20000, oxygenAvailable: 16000,
      bloodAPos: 70, bloodANeg: 20, bloodBPos: 60, bloodBNeg: 15,
      bloodABPos: 25, bloodABNeg: 8, bloodOPos: 80, bloodONeg: 18,
    },
    specialists: [
      { name: 'Dr. R.A. Badwe', specialty: 'Oncology', available: true },
      { name: 'Dr. Shripad Banavali', specialty: 'Oncology', available: true },
      { name: 'Dr. Pankaj Chaturvedi', specialty: 'General Surgery', available: true },
    ],
    equipment: [
      { name: 'MRI Scanner', model: 'MRI-3T Pro', quantity: 2 },
      { name: 'CT Scanner', model: 'CT-64S Ultra', quantity: 3 },
      { name: 'ECG Machine', model: 'ECG-12L', quantity: 10 },
    ],
  },
  {
    id: 'h10',
    name: 'Max Super Speciality Hospital',
    address: '1, 2, Press Enclave Road, Saket, New Delhi 110017',
    city: 'New Delhi', state: 'Delhi', pincode: '110017',
    phone: '+91 11-2651-5050', email: 'info@maxhealthcare.com',
    lat: 28.5273, lng: 77.2117,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop',
    rating: 4.6,
    accreditation: 'NABH', password: 'max123',
    resources: {
      totalBeds: 500, availableBeds: 45, totalIcuBeds: 50, availableIcuBeds: 10,
      totalVentilators: 30, availableVentilators: 8,
      oxygenCapacity: 12000, oxygenAvailable: 9500,
      bloodAPos: 30, bloodANeg: 8, bloodBPos: 25, bloodBNeg: 5,
      bloodABPos: 10, bloodABNeg: 3, bloodOPos: 35, bloodONeg: 8,
    },
    specialists: [
      { name: 'Dr. Sandeep Budhiraja', specialty: 'Internal Medicine', available: true },
    ],
    equipment: [
      { name: 'MRI Scanner', model: 'MRI-3T Pro', quantity: 1 },
    ],
  },
  {
    id: 'h11',
    name: 'Lilavati Hospital & Research Centre',
    address: 'A-791, Bandra Reclamation, Bandra (W), Mumbai 400050',
    city: 'Mumbai', state: 'Maharashtra', pincode: '400050',
    phone: '+91 22-2675-1000', email: 'info@lilavatihospital.com',
    lat: 19.0514, lng: 72.8228,
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=250&fit=crop',
    rating: 4.7,
    accreditation: 'NABH', password: 'lilavati123',
    resources: {
      totalBeds: 320, availableBeds: 28, totalIcuBeds: 40, availableIcuBeds: 6,
      totalVentilators: 20, availableVentilators: 4,
      oxygenCapacity: 8000, oxygenAvailable: 5200,
      bloodAPos: 20, bloodANeg: 5, bloodBPos: 18, bloodBNeg: 4,
      bloodABPos: 8, bloodABNeg: 2, bloodOPos: 25, bloodONeg: 6,
    },
    specialists: [
      { name: 'Dr. V. Ravishankar', specialty: 'Cardiology', available: true },
    ],
    equipment: [
      { name: 'CT Scanner', model: 'CT-64S Ultra', quantity: 1 },
    ],
  },
  {
    id: 'h12',
    name: 'Sir Ganga Ram Hospital',
    address: 'Rajinder Nagar, New Delhi 110060',
    city: 'New Delhi', state: 'Delhi', pincode: '110060',
    phone: '+91 11-2573-5205', email: 'info@sgrh.com',
    lat: 28.6385, lng: 77.1895,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=250&fit=crop',
    rating: 4.5,
    accreditation: 'NABH', password: 'gangaram123',
    resources: {
      totalBeds: 675, availableBeds: 55, totalIcuBeds: 70, availableIcuBeds: 14,
      totalVentilators: 40, availableVentilators: 12,
      oxygenCapacity: 15000, oxygenAvailable: 11000,
      bloodAPos: 40, bloodANeg: 12, bloodBPos: 35, bloodBNeg: 10,
      bloodABPos: 15, bloodABNeg: 6, bloodOPos: 50, bloodONeg: 12,
    },
    specialists: [
      { name: 'Dr. D.S. Rana', specialty: 'Nephrology', available: true },
    ],
    equipment: [
      { name: 'MRI Scanner', model: 'MRI-3T Pro', quantity: 1 },
    ],
  }
];

// ─── System Users (Admins and System Doctors) ────────────────────────────────
const systemUsers = [
  {
    name: 'Main Admin',
    email: 'admin@medilink.com',
    password: 'admin123',
    role: 'ADMIN',
  },
  {
    name: 'Dr. Sarah Wilson',
    email: 'doctor1@medilink.com',
    password: 'doc123',
    role: 'DOCTOR',
  },
  {
    name: 'Dr. James Chen',
    email: 'doctor2@medilink.com',
    password: 'doc123',
    role: 'DOCTOR',
  },
  {
    name: 'Dr. Robert Brown',
    email: 'doctor3@medilink.com',
    password: 'doc123',
    role: 'DOCTOR',
  },
  {
    name: 'Dr. Emily Davis',
    email: 'doctor4@medilink.com',
    password: 'doc123',
    role: 'DOCTOR',
  },
];

// ─── Patient Requests for testing conflict resolution ────────────────────────
const patientRequests = [
  // h1 Requests
  { hospitalId: 'h1', patientName: 'John Doe', patientPhone: '+91 98765 43210', type: 'patient-admission', condition: 'Acute chest pain, potentially MI', urgency: 'high', priority: 'HIGH', status: 'PENDING' },
  { hospitalId: 'h1', patientName: 'Jane Smith', patientPhone: '+91 98765 43211', type: 'patient-admission', condition: 'Severe abdominal trauma', urgency: 'high', priority: 'HIGH', status: 'PENDING' },
  { hospitalId: 'h1', fromHospitalId: 'h2', patientName: 'Rahul Verma', type: 'hospital-transfer', condition: 'Post-op recovery requiring ICU', facility: 'ICU', urgency: 'normal', priority: 'MEDIUM', status: 'ACCEPTED' },
  { hospitalId: 'h1', fromHospitalId: 'h3', type: 'blood-request', bloodType: 'O-', units: 4, urgency: 'critical', priority: 'CRITICAL', status: 'PENDING' },
  { hospitalId: 'h1', patientName: 'Anita Gupta', patientPhone: '+91 88877 66554', type: 'patient-admission', condition: 'Difficulty breathing, COVID suspected', urgency: 'high', priority: 'HIGH', status: 'PENDING' },
  { hospitalId: 'h1', patientName: 'Sanjay Malik', patientPhone: '+91 77766 55443', type: 'patient-admission', condition: 'Accidental poisoning', urgency: 'critical', priority: 'CRITICAL', status: 'ASSIGNED' },
  { hospitalId: 'h1', patientName: 'Meera Das', type: 'patient-admission', condition: 'High fever and dehydration', urgency: 'normal', priority: 'MEDIUM', status: 'COMPLETED' },

  // h2 Requests
  { hospitalId: 'h2', patientName: 'Robert Wilson', patientPhone: '+91 99887 76655', type: 'patient-admission', condition: 'Suspected stroke', urgency: 'critical', priority: 'CRITICAL', status: 'PENDING' },
  { hospitalId: 'h2', patientName: 'Mary Johnson', patientPhone: '+91 88776 65544', type: 'patient-admission', condition: 'Fractured leg, stable', urgency: 'normal', priority: 'MEDIUM', status: 'PENDING' },
  { hospitalId: 'h2', fromHospitalId: 'h1', type: 'equipment-request', condition: 'Ventilator needed for pediatric ward', urgency: 'high', priority: 'HIGH', status: 'PENDING' },
  { hospitalId: 'h2', fromHospitalId: 'h10', type: 'blood-request', bloodType: 'AB+', units: 2, urgency: 'normal', priority: 'MEDIUM', status: 'REJECTED', responseNotes: 'Blood units reserved for scheduled surgeries' },
  { hospitalId: 'h2', patientName: 'David Miller', type: 'patient-admission', condition: 'Severe allergic reaction', urgency: 'high', priority: 'HIGH', status: 'ACCEPTED' },

  // h3 Requests
  { hospitalId: 'h3', patientName: 'Karan Mehra', type: 'patient-admission', condition: 'Severe burn injury', urgency: 'critical', priority: 'CRITICAL', status: 'ASSIGNED' },
  { hospitalId: 'h3', patientName: 'Sophia Lee', patientPhone: '+91 11223 34455', type: 'patient-admission', condition: 'Appendicitis, needs surgery', urgency: 'high', priority: 'HIGH', status: 'PENDING' },
  { hospitalId: 'h3', fromHospitalId: 'h7', type: 'hospital-transfer', patientName: 'Vikram Rao', condition: 'Advanced oncology treatment', urgency: 'normal', priority: 'MEDIUM', status: 'PENDING' },

  // h4 Requests
  { hospitalId: 'h4', patientName: 'Alice Green', type: 'patient-admission', condition: 'Labor pains, active labor', urgency: 'high', priority: 'HIGH', status: 'PENDING' },
  { hospitalId: 'h4', fromHospitalId: 'h2', type: 'blood-request', bloodType: 'B-', units: 5, urgency: 'critical', priority: 'CRITICAL', status: 'ACCEPTED' },

  // h10 Requests (Saket)
  { hospitalId: 'h10', patientName: 'Om Prakash', patientPhone: '+91 95544 33221', type: 'patient-admission', condition: 'Head injury from fall', urgency: 'critical', priority: 'CRITICAL', status: 'PENDING' },
  { hospitalId: 'h10', fromHospitalId: 'h12', type: 'equipment-request', condition: 'Temporary ICU beds needed', urgency: 'normal', priority: 'MEDIUM', status: 'PENDING' },

  // Ambulance Requests
  { toAmbulanceId: 'a1', hospitalId: 'h2', patientName: 'Rohit Verma', patientPhone: '+91 77665 54433', type: 'ambulance-request', pickupLocation: 'Connaught Place, New Delhi', condition: 'Unconscious person, possible heatstroke', urgency: 'critical', priority: 'CRITICAL', status: 'PENDING' },
  { toAmbulanceId: 'a2', hospitalId: 'h1', patientName: 'Sita Ram', patientPhone: '+91 99000 11000', type: 'ambulance-request', pickupLocation: 'Hitech City, Hyderabad', condition: 'Breathlessness, asthma attack', urgency: 'high', priority: 'HIGH', status: 'PENDING' },
  { toAmbulanceId: 'a3', hospitalId: 'h7', patientName: 'Kevin Peters', patientPhone: '+91 12345 67890', type: 'ambulance-request', pickupLocation: 'MG Road, Bangalore', condition: 'Chest pain, sweating', urgency: 'critical', priority: 'CRITICAL', status: 'ACCEPTED' },
  { toAmbulanceId: 'a6', hospitalId: 'h5', patientName: 'Lata Mangeshkar', type: 'ambulance-request', pickupLocation: 'Andheri West, Mumbai', condition: 'Weakness, unable to walk', urgency: 'normal', priority: 'MEDIUM', status: 'PENDING' },
  { toAmbulanceId: 'a7', hospitalId: 'h11', patientName: 'Arun Gawli', type: 'ambulance-request', pickupLocation: 'Bandra Reclamation, Mumbai', condition: 'Stomach pain, severe', urgency: 'high', priority: 'HIGH', status: 'PENDING' },
  { toAmbulanceId: 'a1', hospitalId: 'h10', patientName: 'Prakash Raj', type: 'ambulance-request', pickupLocation: 'Saket, New Delhi', condition: 'Eye injury, bleeding', urgency: 'normal', priority: 'MEDIUM', status: 'REJECTED', responseNotes: 'Ambulance currently assisting another emergency' },

  // Completed Requests for History
  { hospitalId: 'h1', patientName: 'Old Case 1', type: 'patient-admission', status: 'COMPLETED', priority: 'LOW', urgency: 'normal', condition: 'Routine checkup' },
  { hospitalId: 'h2', patientName: 'Old Case 2', type: 'patient-admission', status: 'COMPLETED', priority: 'MEDIUM', urgency: 'normal', condition: 'Minor flu' },
  { hospitalId: 'h3', patientName: 'Old Case 3', type: 'patient-admission', status: 'COMPLETED', priority: 'HIGH', urgency: 'high', condition: 'Blood transfusion done' },
  { hospitalId: 'h5', patientName: 'Old Case 4', type: 'patient-admission', status: 'COMPLETED', priority: 'CRITICAL', urgency: 'critical', condition: 'Cardiac emergency resolved' },
];

async function main() {
  console.log('🌱 Seeding MediLink database...\n');

  // Clear existing data (order matters due to foreign keys)
  await prisma.resourceUpdateHistory.deleteMany();
  await prisma.patientRequest.deleteMany();
  await prisma.systemUser.deleteMany();
  await prisma.ambulance.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.equipment.deleteMany();
  await prisma.specialist.deleteMany();
  await prisma.hospitalResource.deleteMany();
  await prisma.hospital.deleteMany();
  console.log('✅ Cleared existing data');

  // Insert system users
  const systemUsersWithIds = [
    { id: 'admin1', ...systemUsers[0] },
    { id: 'doc1', ...systemUsers[1] },
    { id: 'doc2', ...systemUsers[2] },
  ];
  for (const user of systemUsersWithIds) {
    await prisma.systemUser.create({ data: user });
  }
  console.log('✅ Seeded system users (Admins & Doctors)');

  // Insert hospitals
  for (const h of hospitals) {
    const { resources, specialists, equipment, ...hospitalData } = h;

    await prisma.hospital.create({
      data: {
        ...hospitalData,
        resources: { create: resources },
        specialists: { create: specialists },
        equipment: { create: equipment },
      },
    });

    console.log(`  ✔ Seeded: ${h.name} (id: ${h.id})`);
  }

  // Insert demo Patients
  const patients = [
    { id: 'p1', name: 'Amit Patel', email: 'amit@gmail.com', phone: '+919988776655', password: 'amit123' },
    { id: 'p2', name: 'John Doe', email: 'john@gmail.com', phone: '+919876543210', password: 'patient123' },
    { id: 'p3', name: 'Jane Smith', email: 'jane@gmail.com', phone: '+919876543211', password: 'patient123' },
    { id: 'p4', name: 'Rahul Verma', email: 'rahul@gmail.com', phone: '+919876543212', password: 'patient123' },
    { id: 'p5', name: 'Sita Ram', email: 'sita@gmail.com', phone: '+919876543213', password: 'patient123' },
    { id: 'p6', name: 'Anita Gupta', email: 'anita@gmail.com', phone: '+919876543214', password: 'patient123' },
    { id: 'p7', name: 'Sanjay Malik', email: 'sanjay@gmail.com', phone: '+919876543215', password: 'patient123' },
    { id: 'p8', name: 'Robert Wilson', email: 'robert@gmail.com', phone: '+919876543216', password: 'patient123' },
    { id: 'p9', name: 'Mary Johnson', email: 'mary@gmail.com', phone: '+919876543217', password: 'patient123' },
    { id: 'p10', name: 'Sophia Lee', email: 'sophia@gmail.com', phone: '+919876543218', password: 'patient123' },
  ];
  for (const p of patients) {
    await prisma.patient.create({ data: p });
  }
  console.log(`✅ Seeded ${patients.length} demo patients`);

  // Insert demo Ambulances
  const ambulances = [
    { id: 'a1', driverName: 'Raju Prasad', email: 'raju@gmail.com', vehicleNo: 'DL-01-AB-1234', phone: '+919876543210', password: 'raju123', hospitalId: 'h2', type: 'ALS', lat: 28.5730, lng: 77.2150, status: 'available' },
    { id: 'a2', driverName: 'Suresh Kumar', email: 'suresh@medilink.com', vehicleNo: 'TS-09-EA-5678', phone: '+919988776655', password: 'ambulance123', hospitalId: 'h1', type: 'BLS', lat: 17.4350, lng: 78.4100, status: 'available' },
    { id: 'a3', driverName: 'Vikram Singh', email: 'vikram@medilink.com', vehicleNo: 'KA-01-MG-9012', phone: '+919876543211', password: 'ambulance123', hospitalId: 'h7', type: 'ALS', lat: 12.9600, lng: 77.6500, status: 'available' },
    { id: 'a4', driverName: 'Mohit Sharma', email: 'mohit@medilink.com', vehicleNo: 'DL-02-CB-4321', phone: '+919876543212', password: 'ambulance123', hospitalId: 'h2', type: 'BLS', lat: 28.5600, lng: 77.2000, status: 'available' },
    { id: 'a5', driverName: 'Anil Gupta', email: 'anil@medilink.com', vehicleNo: 'MH-01-RT-8888', phone: '+919876543213', password: 'ambulance123', hospitalId: 'h5', type: 'ALS', lat: 19.1300, lng: 72.8300, status: 'available' },
    { id: 'a6', driverName: 'Kishore Kumar', email: 'kishore@medilink.com', vehicleNo: 'MH-02-KK-1111', phone: '+919876543214', password: 'ambulance123', hospitalId: 'h5', type: 'BLS', lat: 19.1200, lng: 72.8200, status: 'available' },
    { id: 'a7', driverName: 'Sunil Shetty', email: 'sunil@medilink.com', vehicleNo: 'MH-03-SS-2222', phone: '+919876543215', password: 'ambulance123', hospitalId: 'h11', type: 'ALS', lat: 19.0500, lng: 72.8200, status: 'available' },
    { id: 'a8', driverName: 'Akshay Kumar', email: 'akshay@medilink.com', vehicleNo: 'DL-03-AK-3333', phone: '+919876543216', password: 'ambulance123', hospitalId: 'h10', type: 'BLS', lat: 28.5200, lng: 77.2100, status: 'available' },
    { id: 'a9', driverName: 'Salman Khan', email: 'salman@medilink.com', vehicleNo: 'DL-04-SK-4444', phone: '+919876543217', password: 'ambulance123', hospitalId: 'h12', type: 'ALS', lat: 28.6300, lng: 77.1800, status: 'available' },
    { id: 'a10', driverName: 'Shahrukh Khan', email: 'srk@medilink.com', vehicleNo: 'MH-04-SRK-5555', phone: '+919876543218', password: 'ambulance123', hospitalId: 'h8', type: 'BLS', lat: 19.0000, lng: 72.8400, status: 'available' },
    { id: 'a11', driverName: 'Aamir Khan', email: 'aamir@medilink.com', vehicleNo: 'MH-05-AK-6666', phone: '+919876543219', password: 'ambulance123', hospitalId: 'h8', type: 'ALS', lat: 19.0100, lng: 72.8500, status: 'available' },
    { id: 'a12', driverName: 'Hrithik Roshan', email: 'hrithik@medilink.com', vehicleNo: 'KA-02-HR-7777', phone: '+919876543220', password: 'ambulance123', hospitalId: 'h7', type: 'BLS', lat: 12.9500, lng: 77.6400, status: 'available' },
    { id: 'a13', driverName: 'Ranbir Kapoor', email: 'ranbir@medilink.com', vehicleNo: 'DL-05-RK-8888', phone: '+919876543221', password: 'ambulance123', hospitalId: 'h2', type: 'ALS', lat: 28.5800, lng: 77.2200, status: 'available' },
    { id: 'a14', driverName: 'Ranveer Singh', email: 'ranveer@medilink.com', vehicleNo: 'MH-06-RS-9999', phone: '+919876543222', password: 'ambulance123', hospitalId: 'h5', type: 'BLS', lat: 19.1400, lng: 72.8400, status: 'available' },
    { id: 'a15', driverName: 'John Abraham', email: 'john@medilink.com', vehicleNo: 'DL-06-JA-0000', phone: '+919876543223', password: 'ambulance123', hospitalId: 'h1', type: 'ALS', lat: 17.4400, lng: 78.4200, status: 'available' },
  ];

  for (const amb of ambulances) {
    await prisma.ambulance.create({ data: amb });
  }
  console.log(`✅ Seeded ${ambulances.length} ambulances`);

  // Insert patient requests (moved after ambulances due to foreign key)
  for (const req of patientRequests) {
    await prisma.patientRequest.create({ data: req });
  }
  console.log('✅ Seeded patient requests');

  console.log(`\n✅ Seeded ${hospitals.length} hospitals successfully!`);

  console.log('\nLogin credentials:');
  console.log('  ADMIN: admin@medilink.com / admin123');
  console.log('  DOCTOR: doctor1@medilink.com / doc123');
  console.log('  PATIENT: amit@gmail.com / amit123');
  console.log('  AMBULANCE: raju@gmail.com / raju123');
  hospitals.slice(0, 3).forEach(h => console.log(`  ${h.name}: "${h.password}"`));
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
