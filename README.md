# MediLink – Smart Hospital Resource Network

A web-based platform for coordinating **hospital resources, ambulance services, and patient requests** in real time.

The system allows **patients to find hospitals and request medical services**, while **hospitals manage resources and respond to requests efficiently**. Ambulance drivers can receive emergency requests and share live location updates.

MediLink helps reduce delays in emergency care by providing **real-time visibility of hospital resources and ambulance availability**.

# Documentation

Project documentation is organized inside the `docs` directory.

| Document | Description |
|---------|-------------|
| [Workflow](docs/workflow.md) | Detailed workflow for patients, hospitals, and ambulance services |
| [Role Permissions](docs/role_permissions.md) | Role-based access control definitions |
| [ER Diagram](docs/er_diagram.md) | Entity relationship diagram of the database |
| [Database Schema](docs/database-schema.md) | Database tables and relationships |
| [API Contract](docs/api_contract.md) | Complete REST API specification |
| [System Architecture](docs/system_architecture.md) | Overall system architecture and components |
| [Status Transition](docs/status-transition.md) | Request lifecycle and status flow |
| [Seeded Users](docs/seeded_users.md) | Credentials for all pre-seeded testing accounts |

# Run the Project

The project includes helper scripts to start both the **frontend and backend** concurrently.

### Windows

Run the provided batch script from the project root:

```cmd
start.bat
```

This script will:

- Install dependencies for both frontend and backend
- Start the backend server on port 5001
- Start the frontend development server on port 5173

### Linux / macOS

Make the script executable (first time only):

```bash
chmod +x start.sh
```

Run the script from the project root:

```bash
./start.sh
```

This will automatically install dependencies and start both the **frontend and backend services**.



