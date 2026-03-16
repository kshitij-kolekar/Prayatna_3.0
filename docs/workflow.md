# MediLink – Smart Hospital Resource Network

# System Workflow

## 1. System Overview

MediLink is a **real-time healthcare coordination platform** connecting **patients, hospitals, and a central admin authority** through a centralized healthcare network.

The platform helps users:

- View real-time hospital resources
- Request hospital admission
- Request ambulances
- Coordinate patient transfers
- Track emergency resources
- Resolve conflicts for limited resources

Unlike traditional systems where hospitals make all decisions independently, **MediLink introduces a central Admin role** responsible for **coordination and priority management across the network**.

All users access the system through **role-based dashboards** after authentication.

### System Roles

1️⃣ Patient Dashboard
2️⃣ Hospital Dashboard
3️⃣ Admin Dashboard


# 2. User Authentication Workflow

## 2.1 Registration

Users register based on their role.

### Hospital Registration

Required information:

- Hospital Name
- Admin Username
- Password
- Address
- Contact Number
- Location (Google Maps coordinates)

### Ambulance Registration

Required information:

- Driver Name
- Phone Number
- Ambulance Number
- Associated Hospital

### Patient Registration

Required information:

- Name
- Phone Number
- Password

### Admin Registration

Admin accounts are created by the system and are responsible for network-wide coordination and decision making.



## 2.2 Login Workflow

User → Login Page → Enter Credentials → Backend Authentication (JWT) → Role Verification → Redirect to Dashboard

Possible outcomes:

- Successful login → Dashboard
- Invalid credentials → Error message


# 3. Hospital Dashboard Workflow

Hospitals manage local resources, patient requests, ambulance operations, and escalation requests to admin.

## 3.1 Resource Management Workflow

Hospitals update real-time hospital resources.

Resources include:

- Total beds
- ICU beds
- Ventilators
- Oxygen supply
- Blood bank availability (by blood type)
- Medical equipment
- Specialist doctors

### Workflow

```
Hospital Login
↓
Open Resource Management
↓
Update Resource Data
↓
Backend API Update
↓
Database Updated
↓
Socket.io Broadcast
↓
All dashboards updated in real-time
```

## 3.2 Patient Admission Request Workflow

Patients send admission requests to hospitals.

### Workflow

```
Patient
↓
Select Hospital
↓
Click "Request Admission"
↓
Backend Stores Request
↓
Hospital Receives Notification
```

Hospital response options:

- Accept admission
- Reject admission
- Escalate to Admin (in case of resource conflict)

Example conflict:

Two patients require ICU
Only one ICU bed available

In such cases:

```
Hospital
↓
Admin Reviews Patient Severity
↓
Admin Makes Final Decision
```

Possible admin decisions:

- Admit patient immediately
- Put patient on waitlist
- Transfer patient to another hospital


## 3.3 Hospital-to-Hospital Transfer Workflow

Hospitals may request transfers when resources are unavailable.

### Example

Hospital A has no ICU beds available.

### Workflow

```
Hospital A
↓
Escalate Transfer Request
↓
Admin Receives Request
↓
Admin Searches Hospitals with Available ICU Beds
↓
Select Hospital B
↓
Transfer Approved
↓
Hospital B Receives Notification
```

Hospital B response options:

- Accept transfer
- Reject transfer

The admin coordinates the transfer process.


## 3.4 Ambulance Management Workflow

Hospitals manage ambulances linked to them.

### Hospital can:

- View registered ambulances
- Track ambulance location
- Assign ambulances to requests
- Monitor status

### Workflow

```
Hospital Dashboard
↓
Open Ambulance Management
↓
View Ambulance List
↓
Check Status (Available / Busy)
↓
Assign Ambulance to Emergency
```

During large emergencies, admin may also coordinate ambulance allocation.

# 4. Admin Dashboard Workflow

The Admin dashboard manages network-wide healthcare coordination.

Admin responsibilities include:

- Conflict resolution
- Resource coordination
- Patient transfer approval
- Monitoring hospital network

---

## 4.1 Conflict Resolution Workflow

Conflicts occur when multiple patients require the same limited resource.

Example:

Two patients need ICU
Only one ICU bed available

### Workflow

```
Hospital Escalates Conflict
↓
Admin Receives Case
↓
Admin Reviews Patient Severity
↓
Admin Makes Decision
```

Possible outcomes:

- Admit patient immediately
- Place patient on waitlist
- Transfer patient to another hospital

## 4.2 Resource Coordination Workflow

Hospitals manage their own resources, but the **admin manages how resources are used across hospitals**.

Hospitals update:

- ICU beds
- Ventilators
- Oxygen supply
- Blood bank
- Medical equipment

Admin monitors the **entire network**.

### Example

Hospital A

ICU beds: 0

Hospital B

ICU beds: 3

Admin can coordinate a patient transfer.

### Workflow

```
Admin Detects Resource Shortage
↓
Search Hospitals with Available Resources
↓
Approve Transfer
↓
Hospital and Patient Notified
```

This helps balance patient load across hospitals.


# 5. Ambulance Dashboard Workflow

Ambulance drivers manage availability and emergency pickup requests.


## 5.1 Ambulance Availability Workflow

```
Driver Login
↓
System Loads Ambulance Profile
↓
Status = Available
↓
Visible Across MediLink Network
```

Drivers can change status to:

- Available
- On Duty
- Offline


## 5.2 GPS Tracking Workflow

Ambulance location is updated in real-time.

```
Driver Device
↓
GPS Coordinates Captured
↓
Location Sent to Backend
↓
Database Updated
↓
Displayed on Map
```

Hospitals and admin can track ambulances live.


# 6. Patient Dashboard Workflow

Patients can search hospitals, request admission, and request ambulances.

## 6.1 Search Hospitals Workflow

Patients search hospitals using filters.

### Filters include

- Beds available
- ICU beds
- Ventilators
- Oxygen supply
- Blood bank availability
- Specialist doctors

### Workflow

```
Patient Opens Search
↓
Apply Filters
↓
Backend Query
↓
Matching Hospitals Returned
```

Displayed information:

- Hospital name
- Address
- Contact details
- Resource availability
- Google Maps location



## 6.2 Admission Request Workflow

```
Patient
↓
Select Hospital
↓
Click "Request Admission"
↓
Request Stored in Backend
↓
Hospital Notification
↓
Hospital Accepts / Rejects / Escalates to Admin
↓
Admin Decision (if escalated)
↓
Patient Receives Response
```

## 6.3 Ambulance Request Workflow

Patients can request nearby ambulances.

### Workflow

```
Patient Clicks "Request Ambulance"
↓
System Finds Nearby Ambulances
↓
List Displayed
↓
Patient Selects Ambulance
↓
Driver Receives Request
↓
Driver Accepts / Rejects
```

Displayed ambulance information:

- Ambulance number
- Driver contact
- Distance
- Estimated arrival time
- Live location

# 7. Real-Time Data Flow

Real-time updates are powered by **Socket.io**.

Events include:

- Resource updates
- Ambulance status updates
- Emergency requests
- Transfer requests
- GPS location updates
- Admin decisions

### Data Flow

```
User Action
↓
Backend API
↓
Database Update
↓
Socket Event Triggered
↓
All Connected Dashboards Updated
```

# 8. Notification Workflow

Notifications are generated for:

- Admission requests
- Transfer requests
- Ambulance requests
- Resource alerts
- Admin decisions

### Workflow

```
Event Occurs
↓
Notification Service Triggered
↓
Push Notification Sent
↓
User Takes Action
```

# 9. Error Handling Workflow

Possible system issues:

- Hospital resource conflict
- Ambulance unavailable
- Request timeout
- GPS tracking failure
- Resource shortages across hospitals

### System Response

- Display error message
- Suggest alternative hospitals
- Escalate to admin
- Retry request
- Log system errors

# 10. Key Concept

The system operates on **two levels of resource management**.

### Local Resource Management

Hospitals manage their own resources.

Examples:

- Update bed count
- Update ventilators
- Update oxygen supply

### Network Resource Management

Admin coordinates resources between hospitals.

Examples:

- Resolving conflicts
- Finding hospitals with available resources
- Approving transfers
- Balancing patient load



