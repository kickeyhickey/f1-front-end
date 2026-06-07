# F1 Frontend - Production Deployment Guide

Complete guide for deploying the F1 Frontend to a DigitalOcean Droplet.

## 📋 Prerequisites

Before deploying, ensure your DigitalOcean droplet has:

- Docker and Docker Compose installed
- Git installed
- Nginx or reverse proxy configured (for SSL/domain routing)
- SSH access configured
- Port 80 and 443 open (if using SSL)

## 🔧 Initial Setup (First-Time Deployment)

### 1. Connect to Your Droplet

```bash
ssh root@your-droplet-ip
```

### 2. Clone the Repository

```bash
cd /opt  # or your preferred location
git clone https://github.com/your-username/f1-frontend.git
cd f1-frontend
```

### 3. Create the Shared Docker Network

This network allows frontend and backend containers to communicate:

```bash
docker network create f1-network
```

> **Note**: Only needed once. Skip if the network already exists.

### 4. Configure Environment Variables

Create production environment file in the project root:

```bash
cd /opt/f1-frontend

# Copy the example file
cp .env.production.example .env.production

# Edit with your actual values
nano .env.production
```

**Required variables** (copy and paste, then update with your values):

```env
# Clerk Authentication - GET THESE FROM YOUR CLERK DASHBOARD
VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_live_publishable_key

# API Configuration
VITE_API_BASE_URL=/api

# Clerk URLs
VITE_CLERK_SIGN_IN_URL=/sign-in
VITE_CLERK_SIGN_UP_URL=/sign-up
VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
```

> ⚠️ **CRITICAL**:
>
> - The `.env.production` file MUST exist in the project root before building
> - Docker will read these variables during the build process
> - `VITE_CLERK_PUBLISHABLE_KEY` is REQUIRED - get it from [Clerk Dashboard](https://dashboard.clerk.com/)
> - Never commit `.env.production` to version control!

**Get your Clerk publishable key**:

1. Go to https://dashboard.clerk.com/
2. Select your application
3. Go to API Keys
4. Copy the "Publishable key" (starts with `pk_live_` for production)

**Verify your .env.production file**:

```bash
# Check the file exists and contains the key
cat .env.production | grep VITE_CLERK_PUBLISHABLE_KEY

# Should output something like:
# VITE_CLERK_PUBLISHABLE_KEY=pk_live_...
```

### 5. Ensure Backend is Running

The frontend needs the backend API to be running:

```bash
cd /opt/f1-backend
docker-compose -f docker-compose.prod.yml up -d
```

Verify backend is running:

```bash
docker ps | grep backend
```

### 6. Initial Deployment

**IMPORTANT**: Make sure `.env.production` exists and contains `VITE_CLERK_PUBLISHABLE_KEY` before running this command!

Build and start the production container:

```bash
cd /opt/f1-frontend

# Verify environment file exists
ls -la .env.production

# Build with environment variables
docker-compose -f docker-compose.prod.yml up -d --build
```

This will:

- Read environment variables from `.env.production`
- Build the production Docker image with those variables
- Create optimized production bundle with Clerk configured
- Start nginx to serve the app
- Run on `localhost:5174` (accessible via reverse proxy)

### 7. Verify Deployment

Check container status:

```bash
docker ps | grep f1-app-prod
```

Check logs:

```bash
docker-compose -f docker-compose.prod.yml logs -f
```

Test the app locally:

```bash
curl http://localhost:5174
```

## 🔄 Updating/Redeploying

When you have new code to deploy:

### Standard Update Process

```bash
# 1. Navigate to project directory
cd /opt/f1-frontend

# 2. Pull latest code
git pull origin main  # or your branch name

# 3. Stop current container
docker-compose -f docker-compose.prod.yml down

# 4. Rebuild and start container
# Note: 'up -d --build' automatically starts the container after building
docker-compose -f docker-compose.prod.yml up -d --build

# 5. Wait a moment for container to initialize
sleep 3

# 6. Verify deployment
docker-compose -f docker-compose.prod.yml logs -f
```

**What each command does:**

- `down` - Stops and removes the existing container
- `up -d --build` - Rebuilds the image AND starts the container in detached mode
  - `--build` - Forces rebuild of the Docker image
  - `-d` - Runs container in background (detached)
- Container automatically restarts with new code - no separate restart needed!

### Quick Deployment Script

Create a deployment script for easier updates:

```bash
nano deploy.sh
```

Add this content:

```bash
#!/bin/bash
set -e

echo "🚀 Starting F1 Frontend Deployment..."

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin main

# Stop current container
echo "🛑 Stopping current container..."
docker-compose -f docker-compose.prod.yml down

# Rebuild and start
echo "🔨 Building and starting container..."
docker-compose -f docker-compose.prod.yml up -d --build

# Wait for container to initialize
echo "⏳ Waiting for container to start..."
sleep 5

# Show logs
echo "📋 Deployment complete! Showing logs..."
docker-compose -f docker-compose.prod.yml logs --tail=50 -f
```

Make it executable:

```bash
chmod +x deploy.sh
```

Use it for deployments:

```bash
./deploy.sh
```

## 🔙 Rollback Procedure

If a deployment fails, rollback to previous version:

```bash
# 1. Navigate to project
cd /opt/f1-frontend

# 2. Find previous commit
git log --oneline -5

# 3. Checkout previous version
git checkout <previous-commit-hash>

# 4. Redeploy
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build

# 5. Return to main branch when ready
git checkout main
```

## 🌐 Nginx Reverse Proxy Configuration

Configure nginx to proxy requests to the containerized app:

```bash
nano /etc/nginx/sites-available/f1-frontend
```

**Basic HTTP Configuration**:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:5174;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # API proxy to backend
    location /api/ {
        proxy_pass http://localhost:8080/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Enable the site**:

```bash
ln -s /etc/nginx/sites-available/f1-frontend /etc/nginx/sites-enabled/
nginx -t  # Test configuration
systemctl reload nginx
```

## 🔒 SSL/HTTPS Setup (Recommended)

Use Let's Encrypt for free SSL certificates:

```bash
# Install certbot
apt update
apt install certbot python3-certbot-nginx

# Obtain certificate
certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is configured automatically
# Test renewal:
certbot renew --dry-run
```

## 📊 Monitoring & Logs

### View Container Logs

```bash
# Follow logs in real-time
docker-compose -f docker-compose.prod.yml logs -f

# View last 100 lines
docker-compose -f docker-compose.prod.yml logs --tail=100

# View specific service logs
docker logs f1-app-prod
```

### Check Container Status

```bash
# List running containers
docker ps

# Check container resource usage
docker stats f1-app-prod

# Inspect container details
docker inspect f1-app-prod
```

## 🐛 Troubleshooting

### "Missing Clerk Publishable Key" Error

**Symptom**: App shows "Uncaught Error: Missing Clerk Publishable Key" in browser console

**Cause**: Environment variables weren't available during the Docker build

**Solution**:

```bash
cd /opt/f1-frontend

# 1. Verify .env.production exists and has the key
cat .env.production | grep VITE_CLERK_PUBLISHABLE_KEY

# 2. If missing, create/update the file
nano .env.production
# Add: VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_actual_key

# 3. Rebuild with --no-cache to force fresh build
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# 4. Verify the key was embedded in the build
docker exec -it f1-app-prod cat /usr/share/nginx/html/assets/index-*.js | grep -o "pk_live_[a-zA-Z0-9]*" | head -1
# Should output your publishable key
```

**Important Notes**:

- Vite environment variables are embedded at **build time**, not runtime
- Changes to `.env.production` require a rebuild with `--build` flag
- The publishable key (starts with `pk_live_` or `pk_test_`) is safe to embed in client code

### Container Won't Start

```bash
# Check logs for errors
docker-compose -f docker-compose.prod.yml logs

# Verify network exists
docker network inspect f1-network

# Check port conflicts
netstat -tulpn | grep 5174
```

**Verify Container is Actually Running:**

```bash
# Check if container is running
docker ps | grep f1-app-prod

# If not running, check why it stopped
docker ps -a | grep f1-app-prod

# Check container health and restart count
docker inspect f1-app-prod | grep -A 5 "State"
```

### Frontend Can't Reach Backend

```bash
# Verify backend is running
docker ps | grep backend

# Check both containers are on same network
docker network inspect f1-network

# Test backend from frontend container
docker exec -it f1-app-prod wget -O- http://backend:8080/health
```

### Build Fails

```bash
# Clean Docker build cache
docker builder prune -a

# Rebuild from scratch
docker-compose -f docker-compose.prod.yml build --no-cache

# Check available disk space
df -h
```

### Nginx Errors

```bash
# Check nginx configuration
nginx -t

# View nginx logs
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log

# Restart nginx
systemctl restart nginx
```

## 🔐 Security Best Practices

1. **Environment Variables**: Never commit `.env.production` to git
2. **Firewall**: Configure UFW or iptables
   ```bash
   ufw allow 22/tcp   # SSH
   ufw allow 80/tcp   # HTTP
   ufw allow 443/tcp  # HTTPS
   ufw enable
   ```
3. **SSH Keys**: Use SSH keys instead of passwords
4. **Updates**: Keep system and Docker updated
   ```bash
   apt update && apt upgrade -y
   ```
5. **Backups**: Regularly backup environment files and configuration

## 📦 Complete Deployment Checklist

- [ ] Droplet provisioned with Docker & Docker Compose
- [ ] Git repository cloned
- [ ] Docker network created (`f1-network`)
- [ ] Backend deployed and running
- [ ] `.env.production` configured with production values
- [ ] Frontend built and deployed
- [ ] Nginx reverse proxy configured
- [ ] SSL certificate installed (optional but recommended)
- [ ] Firewall configured
- [ ] Monitoring/logging set up
- [ ] Deployment tested in browser

## 📞 Support

For issues specific to:

- **Backend**: See `../f1-backend/DEPLOYMENT.md`
- **Docker**: Check Docker logs and documentation
- **Nginx**: Review nginx configuration and logs

## 🔄 Continuous Deployment (Optional)

For automated deployments, consider setting up:

- GitHub Actions with SSH deployment
- Webhooks to trigger deployments on push
- Docker Hub for pre-built images

Example GitHub Actions workflow in `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Droplet
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.DROPLET_IP }}
          username: root
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/f1-frontend
            ./deploy.sh
```

---

**Last Updated**: June 2026  
**Version**: 1.0.0
