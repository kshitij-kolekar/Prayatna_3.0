# MediLink – Roles and Permissions

This document defines the roles and permissions available in the MediLink system.

The platform uses Role-Based Access Control (RBAC) to ensure that each user can only perform actions allowed for their role.

# System Roles

The MediLink system includes three primary roles:

1. Patient
2. Hospital
3. Admin

Each role has a dedicated dashboard with specific capabilities.

# 1. Patient Role

Patients use the system to search hospitals, request treatment, and request ambulance services.

## Patient Permissions

Patients are allowed to:

- Register an account
- Login to the system
- Search hospitals
- View hospital resource availability
- Request hospital admission
- Request ambulances
- View ambulance details
- Track ambulance location
- Receive admission request status
- Receive notifications

## Patient Restrictions

Patients cannot:

- Modify hospital resources
- Manage ambulances
- Approve or reject requests
- Access other patients’ data
- Resolve hospital resource conflicts

# 2. Hospital Role

Hospitals manage local resources, admission requests, and ambulances associated with the hospital.

## Hospital Permissions

Hospitals are allowed to:

- Register hospital account
- Login to hospital dashboard
- Update hospital resource availability
- Manage hospital beds
- Update ICU bed availability
- Update ventilator availability
- Update oxygen supply
- Update blood bank availability
- View incoming patient requests
- Accept or reject admission requests
- Escalate resource conflicts to admin
- Manage registered ambulances
- Track ambulance locations
- Assign ambulances to requests
- Receive transfer requests
- Accept or reject transfer requests

## Hospital Restrictions

Hospitals cannot:

- Resolve multi-hospital resource conflicts
- Override admin decisions
- Access system-wide analytics
- Modify other hospitals' resources


# 3. Admin Role

The Admin acts as the central coordinator of the MediLink network.

Admin manages network-level decisions and hospital coordination.

## Admin Permissions

Admins are allowed to:

- Login to admin dashboard
- Monitor hospital resources across the network
- View all hospital data
- View patient requests across hospitals
- Resolve patient resource conflicts
- Prioritize patients during emergencies
- Place patients on waitlists
- Approve hospital transfers
- Coordinate resource distribution
- Monitor ambulance availability across the network
- View real-time system activity
- Receive system alerts
- Manage emergency resource shortages

## Admin Restrictions

Admins do not directly modify hospital internal operations, such as:

- Updating hospital bed counts
- Managing ambulance drivers
- Editing hospital profiles

These actions remain under hospital control.

# Permission Summary Table

| Feature | Patient | Hospital | Admin |
|-------|--------|--------|--------|
| Register Account | ✅ | ✅ | ❌ |
| Login | ✅ | ✅ | ✅ |
| Search Hospitals | ✅ | ❌ | ✅ |
| View Hospital Resources | ✅ | ✅ | ✅ |
| Request Admission | ✅ | ❌ | ❌ |
| View Patient Requests | ❌ | ✅ | ✅ |
| Accept / Reject Admission | ❌ | ✅ | ❌ |
| Escalate Conflict | ❌ | ✅ | ❌ |
| Resolve Resource Conflict | ❌ | ❌ | ✅ |
| Update Hospital Resources | ❌ | ✅ | ❌ |
| Manage Ambulances | ❌ | ✅ | ❌ |
| Track Ambulances | ✅ | ✅ | ✅ |
| Approve Hospital Transfers | ❌ | ❌ | ✅ |
| Monitor Network Resources | ❌ | ❌ | ✅ |


# Security Model

MediLink implements Role-Based Access Control (RBAC) using authentication tokens.

Workflow:

```
User Login
↓
JWT Authentication
↓
Role Verification
↓
Access Granted to Role-Specific Dashboard
```

Each API endpoint validates the user role before allowing access.

Example:

- `/api/patient/*` → Patient only
- `/api/hospital/*` → Hospital only
- `/api/admin/*` → Admin only


# Key Design Principle

MediLink separates responsibilities into two levels of management:

### Local Management

Handled by Hospitals

Examples:

- Updating resources
- Managing ambulances
- Handling admission requests

### Network Management

Handled by Admin

Examples:

- Resolving resource conflicts
- Coordinating patient transfers
- Balancing hospital load

This structure ensures the system remains:

- Organized
- Scalable
- Efficient for large healthcare networks

