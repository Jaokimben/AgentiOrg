# AgentiOrg Deployment Guide

This guide explains how to deploy AgentiOrg to various platforms.

## 📋 Prerequisites

Before deploying, ensure you have:

1. **GitHub Account** - Repository is at https://github.com/Jaokimben/AgentiOrg
2. **Database** - MySQL or TiDB instance (e.g., PlanetScale, AWS RDS, DigitalOcean)
3. **Environment Variables** - All required secrets configured
4. **Node.js 18+** - For local testing before deployment

## 🚀 Deployment Platforms

### 1. Vercel (Recommended)

Vercel is the easiest option with automatic deployments from GitHub.

#### Step 1: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select "Import Git Repository"
4. Choose `Jaokimben/AgentiOrg`
5. Click "Import"

#### Step 2: Configure Environment Variables
In Vercel project settings:
1. Go to "Settings" → "Environment Variables"
2. Add the following variables:

```
DATABASE_URL = your-database-connection-string
JWT_SECRET = your-jwt-secret
VITE_APP_ID = your-manus-app-id
OAUTH_SERVER_URL = https://api.manus.im
VITE_OAUTH_PORTAL_URL = https://auth.manus.im
OWNER_OPEN_ID = your-owner-id
OWNER_NAME = Your Organization Name
BUILT_IN_FORGE_API_URL = https://api.manus.im
BUILT_IN_FORGE_API_KEY = your-api-key
VITE_FRONTEND_FORGE_API_URL = https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY = your-frontend-key
VITE_ANALYTICS_ENDPOINT = https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID = your-analytics-id
VITE_APP_TITLE = AgentiOrg
VITE_APP_LOGO = https://your-logo-url.png
```

3. Set environment for: **Production**
4. Click "Save"

#### Step 3: Deploy
1. Click "Deploy"
2. Vercel will automatically:
   - Install dependencies
   - Build the project
   - Run migrations
   - Deploy to production

Your app will be available at `your-project.vercel.app`

#### Automatic Deployments
- **Main branch**: Automatically deploys to production
- **Other branches**: Preview deployments for testing

---

### 2. Railway

Railway is a great alternative with simple Git integration.

#### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Authorize Railway to access your repositories

#### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose `Jaokimben/AgentiOrg`

#### Step 3: Add Services
1. **Database Service**:
   - Click "Add Service"
   - Select "MySQL"
   - Railway will create a database
   - Copy the `DATABASE_URL`

2. **Web Service**:
   - Click "Add Service" → "GitHub Repo"
   - Select the AgentiOrg repository
   - Configure build command: `pnpm build`
   - Configure start command: `pnpm start`

#### Step 4: Environment Variables
1. Go to project settings
2. Add all required environment variables
3. Railway will automatically deploy on save

---

### 3. Render

Render offers a straightforward deployment process.

#### Step 1: Create Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Authorize Render

#### Step 2: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select `Jaokimben/AgentiOrg`

#### Step 3: Configure Service
- **Name**: agentiorg
- **Environment**: Node
- **Build Command**: `pnpm install && pnpm build`
- **Start Command**: `pnpm start`
- **Instance Type**: Standard (or higher)

#### Step 4: Add Database
1. Create a MySQL database on Render or use external (PlanetScale, AWS RDS)
2. Copy connection string to `DATABASE_URL`

#### Step 5: Environment Variables
Add all required variables in Render dashboard

---

### 4. Self-Hosted (Docker)

For complete control, deploy using Docker.

#### Step 1: Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN pnpm build

# Expose port
EXPOSE 3000

# Start application
CMD ["pnpm", "start"]
```

#### Step 2: Build Docker Image
```bash
docker build -t agentiorg:latest .
```

#### Step 3: Run Container
```bash
docker run -d \
  -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  -e JWT_SECRET="your-secret" \
  -e VITE_APP_ID="your-app-id" \
  # ... other environment variables
  agentiorg:latest
```

#### Step 4: Deploy to Container Registry
- Push to Docker Hub, GitHub Container Registry, or your private registry
- Deploy using Kubernetes, Docker Swarm, or container orchestration platform

---

### 5. AWS (EC2 + RDS)

For enterprise deployments.

#### Step 1: Set Up RDS Database
1. Create MySQL RDS instance
2. Configure security groups
3. Copy connection string

#### Step 2: Launch EC2 Instance
1. Launch Ubuntu 22.04 instance
2. Install Node.js 18+
3. Install pnpm

#### Step 3: Deploy Application
```bash
# Clone repository
git clone https://github.com/Jaokimben/AgentiOrg.git
cd AgentiOrg

# Install dependencies
pnpm install

# Set environment variables
export DATABASE_URL="your-rds-connection-string"
export JWT_SECRET="your-secret"
# ... other variables

# Run migrations
pnpm db:push

# Build and start
pnpm build
pnpm start
```

#### Step 4: Configure Load Balancer (Optional)
- Use AWS Application Load Balancer
- Configure SSL/TLS certificate
- Set up auto-scaling

---

## 🔐 Security Checklist

Before deploying to production:

- [ ] All environment variables are set
- [ ] Database has strong password
- [ ] HTTPS/SSL is enabled
- [ ] CORS is properly configured
- [ ] JWT_SECRET is strong and random
- [ ] OAuth credentials are correct
- [ ] Database backups are configured
- [ ] Monitoring and logging are enabled
- [ ] Rate limiting is configured
- [ ] Regular security updates are planned

---

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install pnpm
        run: npm install -g pnpm
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Run tests
        run: pnpm test
      
      - name: Build
        run: pnpm build
      
      - name: Deploy to Vercel
        run: vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

---

## 📊 Monitoring & Logging

### Recommended Services

1. **Error Tracking**: Sentry, Rollbar
2. **Logging**: LogRocket, Datadog
3. **Performance**: New Relic, Datadog
4. **Uptime Monitoring**: UptimeRobot, Pingdom
5. **Analytics**: Google Analytics, Mixpanel

---

## 🆘 Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check database credentials
- Ensure firewall allows connections
- Run `pnpm db:push` to create tables

### Build Failures
- Check Node.js version (18+)
- Verify all dependencies are installed
- Check for TypeScript errors: `pnpm check`
- Review build logs

### Runtime Errors
- Check environment variables are set
- Review application logs
- Verify OAuth configuration
- Check database connectivity

### Performance Issues
- Enable caching headers
- Use CDN for static assets
- Optimize database queries
- Monitor server resources

---

## 📞 Support

For deployment issues:
- Check platform-specific documentation
- Review application logs
- Open an issue on GitHub
- Contact: support@agentiorg.dev

---

**Happy Deploying! 🚀**
