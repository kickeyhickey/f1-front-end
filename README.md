# F1 Frontend Application

A React + TypeScript + Vite frontend application for an F1 fantasy league, with Ionic Capacitor support for mobile deployments.

## 🏎️ Overview

This is the frontend interface for the F1 fantasy league application, providing:

- User profile management
- F1 team and driver selection
- Points tracking and leaderboards
- Mobile app support via Capacitor (iOS & Android)

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Mobile**: Ionic Capacitor (iOS & Android)
- **API Client**: Axios
- **Styling**: CSS with Ionic components
- **Containerization**: Docker (for development environment)

## 📋 Prerequisites

- [Docker](https://www.docker.com/get-started) and Docker Compose
- Node.js 20+ (if running locally outside Docker)

## 🚀 Getting Started

### Development Architecture

This frontend communicates with a separate **backend API service**. Both services run in Docker containers and share a **Docker network** (`f1-network`) for inter-container communication.

**Why a shared network?**

- Frontend can make API requests directly to the backend using `http://backend:8080` internally
- Avoids CORS issues during development (handled by Vite proxy)
- Port mappings (`5000`, `5174`) are still exposed for debugging from your host machine
- Clean separation of concerns - each service has its own docker-compose.yml

### One-Time Setup: Create Shared Network

**Before starting any containers**, create the shared Docker network once:

```bash
docker network create f1-network
```

> **Note**: This is a one-time setup. The network persists even when containers are stopped, and you only need to create it once per development machine.

### Starting the Frontend

#### Full Development Stack

1. **Start the backend** (required for API communication):

   ```bash
   cd ../f1-backend
   docker-compose up -d
   ```

2. **Start the frontend** (from this directory):
   ```bash
   docker-compose up -d
   ```

This will:

- Start the Vite dev server on port `5174` (accessible at `http://localhost:5174`)
- Enable SSH access on port `2223` for remote development
- Enable ADB on port `5037` for Android debugging
- Connect to the `f1-network` to communicate with the backend

### Accessing the Application

Once running:

- **Web App**: <http://localhost:5174> (from your host machine browser)
- **Backend API Proxy**: Requests to `/local-api/*` are proxied to `http://backend:8080/api/*`
- **SSH (for VS Code Remote)**: `localhost:2223` (password: `0000`)

### Development Workflow

The recommended workflow for full-stack development:

1. **Start backend** (from `../f1-backend`):

   ```bash
   docker-compose up -d
   ```

2. **Start frontend** (from this directory):

   ```bash
   docker-compose up -d
   ```

3. **Connect via VS Code Remote-SSH**:
   - Backend: `root@localhost:2222` (password: `0000`)
   - Frontend: `root@localhost:2223` (password: `0000`)

4. **Develop in separate VS Code windows**:
   - Code changes hot-reload automatically via volume mounts
   - Backend API is accessible via `/local-api` proxy in development

5. **View logs**:
   ```bash
   docker-compose logs -f
   ```

### Stopping the Frontend

```bash
docker-compose down
```

## 🔧 Configuration

### API Endpoints

The frontend uses different API configurations per environment:

- **Development** (`.env.development`): Uses Vite proxy to `http://backend:8080`
- **Production** (`.env.production`): Direct API URL (e.g., deployed backend URL)

### Environment Variables

- `VITE_API_BASE_URL`: Base URL for external F1 API calls
- Proxy configuration in `vite.config.ts` handles internal backend communication

## 📱 Mobile Development

The project includes Capacitor for iOS and Android builds:

### Android

```bash
# Inside the container (via SSH)
ionic capacitor build android
```

### iOS

```bash
# Inside the container (via SSH)
ionic capacitor build ios
```

## 🐛 Troubleshooting

### Frontend can't reach backend

**Symptom**: API calls fail with connection errors

**Solution**:

1. Verify the shared network exists: `docker network inspect f1-network`
2. Ensure both containers are running: `docker ps`
3. Check both services are on the network: `docker network inspect f1-network`
4. Restart both containers: `docker-compose down && docker-compose up -d`

### Port conflicts

**Symptom**: Container fails to start due to port already in use

**Solution**: Stop conflicting services or change port mappings in `docker-compose.yml`

## 📚 Additional Resources

- [Vite Documentation](https://vite.dev/)
- [React Documentation](https://react.dev/)
- [Ionic Capacitor](https://capacitorjs.com/)

---

**Related Projects**: See `../f1-backend/README.md` for backend setup instructions.
