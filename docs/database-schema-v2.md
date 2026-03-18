# MediLink Database Schema v2

## Overview

This version improves the original schema for better:

- scalability
- authentication design
- role-based authorization
- auditability
- real-time operations
- future expansion

The biggest improvement is introducing a **central users table** and separating authentication from role-specific profile data.

---

## Core Design Principles

1. Each role (Hospital, Patient, Ambulance, SystemUser) has its own table but shares a common `email` and `password` structure for unified login.
2. Mutable operational data such as resources, requests, and updates are properly normalized.
3. Statuses use enums and structured types.
4. Requests are centralized into a single `PatientRequest` table that handles all types of requests (patient-admission, hospital-transfer, blood-request, equipment-request, ambulance-request).

---

## 1. Hospital Profile

Stores hospital organization data.

Fields:

- `id` (PK, UUID)
- `name`
- `email` (unique)
- `phone`
- `address`, `city`, `state`, `pincode`
- `lat`, `lng`
- `image`
- `rating`
- `accreditation`
- `password`
- `createdAt`, `updatedAt`

---

## 2. Patient Profile

Stores patient data.

Fields:

- `id` (PK, UUID)
- `name`
- `email` (unique)
- `phone` (unique)
- `password`
- `createdAt`, `updatedAt`

---

## 3. Ambulance Profile

Stores ambulance unit data.

Fields:

- `id` (PK, UUID)
- `driverName`
- `email` (unique)
- `vehicleNo` (unique)
- `phone`
- `password`
- `type` (`BLS`, `ALS`)
- `status` (`available`, `busy`, `offline`)
- `lat`, `lng`
- `hospitalId` (FK → Hospital)
- `createdAt`, `updatedAt`

---

## 4. System Users

Stores system admin and system doctor data.

Fields:

- `id` (PK, UUID)
- `name`
- `email` (unique)
- `password`
- `role` (`ADMIN`, `DOCTOR` enum)
- `createdAt`, `updatedAt`

---

## 5. Hospital Resources

Stores real-time hospital capacity snapshot.

Fields:

- `id` (PK, UUID)
- `hospitalId` (FK → Hospital, unique)
- `totalBeds`, `availableBeds`
- `totalIcuBeds`, `availableIcuBeds`
- `totalVentilators`, `availableVentilators`
- `oxygenCapacity`, `oxygenAvailable`
- `bloodAPos`, `bloodANeg`, `bloodBPos`, `bloodBNeg`, `bloodABPos`, `bloodABNeg`, `bloodOPos`, `bloodONeg`
- `updatedAt`

---

## 6. Specialists

Stores doctor availability at hospitals.

Fields:

- `id` (PK, UUID)
- `hospitalId` (FK → Hospital)
- `name`
- `specialty`
- `available`
- `createdAt`, `updatedAt`

---

## 7. Medical Equipment Inventory

Fields:

- `id` (PK, UUID)
- `hospitalId` (FK → Hospital)
- `name`
- `model`
- `quantity`
- `createdAt`, `updatedAt`

---

## 8. Patient Requests & Conflict Resolution

Handles all types of requests across the platform.

Fields:

- `id` (PK, UUID)
- `hospitalId` (FK → Hospital, nullable)  - Target Hospital
- `toAmbulanceId` (FK → Ambulance, nullable) - Target Ambulance
- `patientId` (FK → Patient, nullable) - Origin Patient
- `fromHospitalId` (String, nullable) - Origin Hospital ID
- `patientName`, `patientPhone`  - (For unregistered/emergency cases)
- `type` (`patient-admission`, `hospital-transfer`, `blood-request`, `equipment-request`, `ambulance-request`)
- `condition`, `urgency`
- `facility`, `bloodType`, `units`, `transferReason`, `pickupLocation`
- `notes`
- `responseNotes` (mandatory on rejection)
- `priority` (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL` enum)
- `status` (`PENDING`, `ACCEPTED`, `REJECTED`, `ASSIGNED`, `RESOLVED`, `COMPLETED` enum)
- `assignedDoctorId` (FK → SystemUser, nullable)
- `createdAt`, `updatedAt`

---

## 9. Resource Update History

Audit trail for resource changes.

Fields:

- `id` (PK, UUID)
- `hospitalId` (FK → Hospital)
- `resourceType`
- `oldValue`
- `newValue`
- `updatedAt`

---

## Recommended Relationships

- `users` → one-to-one → `patient_profiles`
- `users` → one-to-one → `hospital_admin_profiles`
- `users` → one-to-one → `ambulance_driver_profiles`
- `hospitals` → one-to-many → `ambulances`
- `hospitals` → one-to-one → `hospital_resources`
- `hospitals` → one-to-many → `blood_bank_inventory`
- `hospitals` → one-to-many → `specialists`
- `hospitals` → one-to-many → `medical_equipment_inventory`
- `ambulances` → one-to-many → `ambulance_location_logs`

---

## Why this schema is better than v1

1. It supports **single auth + multiple roles** cleanly.
2. It keeps login logic separate from domain data.
3. It makes **RBAC middleware** simpler.
4. It supports **multiple hospital staff accounts**.
5. It supports better **audit logs** and **real-time sync fallback**.
6. It gives room for future modules without redesigning auth.