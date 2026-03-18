# MediLink Status Transition

## Overview

This document defines the **allowed status lifecycle** for all requests managed via the unified `PatientRequest` table in the backend.
It serves as the source of truth for:

- validation rules
- backend guards
- audit logging
- notification triggers
- real-time socket events

---

## Allowed Status Lifecycle

All platform requests (Patient Admissions, Hospital Transfers, Blood Requests, Equipment Requests, and Ambulance Requests) share the underlying `RequestStatus` enum from the Prisma schema.

### Prisma `RequestStatus` Enum

- `PENDING`
- `ASSIGNED`
- `ACCEPTED`
- `COMPLETED`
- `REJECTED`
- `RESOLVED`

### Default status

- `PENDING`

---

## 1. General Request Workflow (Admissions, Transfers, Resources)

Handled primarily between Patients/Hospitals or Hospital/Hospital.

### Allowed transitions

| Current Status | Next Allowed Status | Triggered By | Condition |
|---|---|---|---|
| PENDING | ACCEPTED | Target Hospital | Approves the request |
| PENDING | REJECTED | Target Hospital | Denies the request (Rejection Reason mandatory) |
| ACCEPTED | COMPLETED | Target Hospital | Patient admitted / Resource transferred |

---

## 2. Ambulance Request Workflow

Handled primarily between Patients/Hospitals and Ambulance Drivers.

### Allowed transitions

| Current Status | Next Allowed Status | Triggered By | Condition |
|---|---|---|---|
| PENDING | ASSIGNED | Hospital | Assigns an ambulance unit to the request |
| ASSIGNED | ACCEPTED | Ambulance Driver | Driver confirms assignment |
| ASSIGNED | REJECTED | Ambulance Driver | Driver denies assignment (Rejection Reason mandatory) |
| ACCEPTED | COMPLETED | Ambulance Driver | Driver marks trip as complete (Patient dropped off) |

---

## 3. Conflict Resolution Workflow

Handled exclusively by **System Admins** and **System Doctors**.

When a request reaches a blocked or unfulfilled state (usually from looping `REJECTED` statuses), it enters the conflict resolution flow.

### Allowed transitions

| Current Status | Next Allowed Status | Triggered By | Condition |
|---|---|---|---|
| REJECTED | ASSIGNED | Admin | Escalate an unfulfilled request to a System Doctor |
| ASSIGNED | RESOLVED | System Doctor | Doctor manually resolves the conflict, bypassing standard rules or assigning alternates |

---

## Detailed Business Rules

### General Constraints

1. **Rejection Mandate**: Any transition to `REJECTED` MUST include a `responseNotes` payload outlining why the request was declined.
2. **Acceptance Processing**: When an `ACCEPTED` transition occurs for admissions or resource transfers, the backend must execute a database transaction to adjust live resource counts (e.g., reduce available beds).
3. **Completion**: Marking a request `COMPLETED` serves as the end of the line for a successful operational request. No further changes can be made.

### Ambulance Constraints

1. An ambulance must be available to be `ASSIGNED` a request.
2. Only the driver currently `ASSIGNED` to a request may mark it `ACCEPTED`.

### Conflict Resolution Constraints

1. A `RESOLVED` status indicates an administrative or medical override that finalized the outcome manually.
2. Only the `SystemUser` (Admin or Doctor) designated as the `assignedDoctorId` on the request may transition it to `RESOLVED`.