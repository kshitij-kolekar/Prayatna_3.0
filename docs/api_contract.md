# API Contract

## Overview

This document describes the **REST API structure** used in the **MediLink Smart Hospital Resource Network**.

The API enables communication between the **frontend dashboards** (Patient, Hospital, Ambulance, Admin, Doctor) and the **backend server**.

All protected APIs require a **JWT authentication token** in the Authorization header.

## Base URL

`/api`

Example: `/api/login`

## Authorization Header

`Authorization: Bearer <JWT_TOKEN>`

## 1. Authentication & Registration APIs

### Login (Unified)
- **Endpoint**: `POST /api/login`
- **Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "status": "success",
  "token": "JWT_TOKEN",
  "user": {
    "role": "PATIENT",
    "name": "User Name"
  }
}
```

### Register Patient
- **Endpoint**: `POST /api/patient/register`
- **Body**:
```json
{
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "phone": "9876543210",
  "password": "pass"
}
```

### Register Ambulance
- **Endpoint**: `POST /api/ambulance/register`
- **Body**:
```json
{
  "driverName": "Amit",
  "email": "amit@gmail.com",
  "phone": "9876543210",
  "vehicleNo": "MH1212",
  "password": "pass",
  "hospitalId": "h1"
}
```

## 2. Hospital APIs

### Get All Hospitals
- **Endpoint**: `GET /api/hospitals`

### Create Hospital
- **Endpoint**: `POST /api/hospital`
- **Body**:
```json
{
  "name": "City Care",
  "email": "admin@citycare.com",
  "password": "pass"
}
```

### Get / Update Hospital Profile
- **Endpoint**: `GET /api/hospital/:id`
- **Endpoint**: `PUT /api/hospital/:id` (Protected: Hospital Admin)

### Hospital Resources
- **Endpoint**: `GET /api/hospital/:id/resources`
- **Endpoint**: `PUT /api/hospital/:id/resources` (Protected: Hospital Admin)
- **Body**:
```json
{
  "availableBeds": 10,
  "availableIcuBeds": 3,
  "oxygenAvailable": 100
}
```

### Blood Bank
- **Endpoint**: `PUT /api/hospital/:id/bloodbank` (Protected: Hospital Admin)
- **Body**:
```json
{
  "bloodAPos": 10,
  "bloodONeg": 5
}
```

### Hospital Dashboard Summary
- **Endpoint**: `GET /api/hospital/:id/dashboard-summary`

### Specialists
- **Endpoint**: `POST /api/hospital/:id/specialists` (Protected: Hospital Admin)
- **Endpoint**: `PUT /api/hospital/:id/specialists/:specialistId` (Protected: Hospital Admin)
- **Endpoint**: `DELETE /api/hospital/:id/specialists/:specialistId` (Protected: Hospital Admin)

## 3. Patient APIs

### Get Patient Profile
- **Endpoint**: `GET /api/patient/:id`

## 4. Ambulance APIs

### Get All Ambulances
- **Endpoint**: `GET /api/ambulance`

### Get Ambulance Profile
- **Endpoint**: `GET /api/ambulance/:id`

## 5. Request APIs

Handles all platform requests (Admissions, Transfers, Blood, Equipment, Ambulance).

### Create Request
- **Endpoint**: `POST /api/requests` (Protected)
- **Body**:
```json
{
  "type": "patient-admission",
  "hospitalId": "h1",
  "condition": "Fever",
  "priority": "HIGH"
}
```

### Get Requests
- **Endpoint**: `GET /api/requests` (Protected: filters automatically based on user role)

### Update Request Status
- **Endpoint**: `PUT /api/requests/:id/status` (Protected)
- **Body**:
```json
{
  "status": "REJECTED",
  "responseNotes": "Required: No beds available"
}
```

## 6. Admin APIs

### Dashboard Data
- **Endpoint**: `GET /api/admin/hospitals` (Protected: Admin)
- **Endpoint**: `GET /api/admin/system-doctors` (Protected: Admin)
- **Endpoint**: `GET /api/admin/patient-requests` (Protected: Admin)

### Assign Request to Doctor
- **Endpoint**: `POST /api/admin/requests/:requestId/assign` (Protected: Admin)
- **Body**:
```json
{
  "assignedDoctorId": "uuid"
}
```

## 7. System Doctor APIs

### Get Assigned Requests
- **Endpoint**: `GET /api/doctor/assigned-requests` (Protected: Doctor)

### Resolve Conflict
- **Endpoint**: `PUT /api/doctor/requests/:requestId/resolve` (Protected: Doctor)
- **Body**:
```json
{
  "resolutionNotes": "Reassigned to alternate facility"
}
```

## API Error Codes

| Code | Description |
|------|-------------|
| 200 / 201 | Success |
| 400 | Bad Request (Invalid input) |
| 401 | Unauthorized (Missing/invalid token) |
| 403 | Forbidden (Wrong role permissions) |
| 404 | Not Found |
| 500 | Internal Server Error |


