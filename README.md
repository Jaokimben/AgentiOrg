# AgentiOrg - Designing Agentic Organizations

A comprehensive web platform for organizational transformation through Human-AI collaboration, adaptive governance, and proven implementation strategies.

## 🎯 Overview

AgentiOrg is a professional service platform that helps organizations assess and improve their readiness for Agentic Organization transformation. It provides:

- **Organizational Maturity Assessment**: 10-question evaluation across 5 key domains
- **Advanced Analytics**: Radar charts, heatmaps, and detailed performance analysis
- **Sector Benchmarking**: Compare your organization against 10 industry benchmarks
- **Personalized Recommendations**: Tailored action plans based on your assessment results
- **Multi-language Support**: Full French and English interface

## 🚀 Features

### Assessment Tool
- Interactive 10-question questionnaire
- Real-time score calculation
- Maturity level classification (Beginner, Emerging, Progressing, Advanced)
- Detailed results visualization

### Analytics & Visualization
- **Radar Chart**: Overview of maturity across all categories
- **Heatmap**: Detailed performance analysis by category
- **Benchmark Comparison**: Compare against industry standards
- **Strengths & Weaknesses Analysis**: Identify competitive advantages and improvement areas
- **Detailed Recommendations**: Prioritized action plans with timelines

### Sector Benchmarking
Compare your organization against benchmarks for:
- Technology & Software
- Financial Services
- Manufacturing & Industry
- Healthcare & Pharma
- Retail & Commerce
- Energy & Utilities
- Telecommunications
- Education & Research
- Consulting & Professional Services
- Media & Entertainment

### Multi-Language Support
- French (Français)
- English

### Contact & Consultation
- Professional contact form
- Consultation request submission
- Email notifications

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Tailwind CSS 4** for styling
- **Vite** for bundling
- **Wouter** for routing
- **shadcn/ui** for components
- **Recharts** for data visualization
- **Framer Motion** for animations

### Backend
- **Express 4** server
- **tRPC 11** for type-safe API
- **Node.js** runtime

### Database
- **MySQL/TiDB** with Drizzle ORM
- **Migrations** with Drizzle Kit

### Authentication
- **Manus OAuth** integration
- **JWT** session management

### Testing
- **Vitest** for unit tests
- 32+ test cases covering core functionality

## 📋 Project Structure

```
.
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── contexts/         # React contexts (language, theme)
│   │   ├── data/             # Static data (sector benchmarks)
│   │   ├── lib/              # Utilities and helpers
│   │   └── App.tsx           # Main app component
│   ├── index.html
│   └── package.json
├── server/                    # Express backend
│   ├── routers.ts            # tRPC procedures
│   ├── db.ts                 # Database queries
│   ├── _core/                # Core infrastructure
│   └── *.test.ts             # Unit tests
├── drizzle/                   # Database schema
│   └── schema.ts
├── shared/                    # Shared types and constants
├── vercel.json               # Vercel deployment config
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm 8+
- MySQL/TiDB database

### Installation

```bash
# Clone the repository
git clone https://github.com/Jaokimben/AgentiOrg.git
cd AgentiOrg

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run database migrations
pnpm db:push

# Start development server
pnpm dev
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL=mysql://user:password@host:port/database

# Authentication
JWT_SECRET=your-secret-key
VITE_APP_ID=your-manus-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://auth.manus.im

# Owner Information
OWNER_OPEN_ID=your-open-id
OWNER_NAME=Your Name

# Manus APIs
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your-api-key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=your-frontend-key

# Analytics (optional)
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id

# App Configuration
VITE_APP_TITLE=AgentiOrg
VITE_APP_LOGO=https://your-logo-url.png
```

## 📚 Available Scripts

```bash
# Development
pnpm dev              # Start dev server

# Build
pnpm build            # Build for production
pnpm start            # Start production server

# Testing
pnpm test             # Run all tests
pnpm test:watch       # Run tests in watch mode

# Database
pnpm db:push          # Generate and apply migrations
pnpm db:studio        # Open Drizzle Studio

# Code Quality
pnpm check            # TypeScript type checking
pnpm format           # Format code with Prettier
```

## 🧪 Testing

The project includes comprehensive unit tests:

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test server/assessment.test.ts

# Watch mode
pnpm test:watch
```

Test coverage includes:
- Assessment visualization components
- Sector benchmark calculations
- Gap analysis logic
- Recommendation generation
- Authentication flows

## 🌐 Deployment

### Deploy to Vercel

1. **Connect your GitHub repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

2. **Configure Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add all required environment variables from `.env.local`
   - Make sure to set them for Production environment

3. **Deploy**
   - Vercel will automatically deploy when you push to main branch
   - Your app will be available at `your-project.vercel.app`

### Deploy to Other Platforms

The project can also be deployed to:
- **Railway**: Use the Dockerfile or Node.js preset
- **Render**: Connect your GitHub repo and configure build command
- **Heroku**: Use `Procfile` and set environment variables
- **Self-hosted**: Use `pnpm build && pnpm start`

## 📖 Documentation

### Assessment Questionnaire
The assessment covers 5 key domains with 2 questions each:
1. **Organizational Culture** - Readiness for AI integration
2. **Technology Infrastructure** - Technical capabilities
3. **Governance** - Decision-making and control structures
4. **Skills & Talents** - Team capabilities and training
5. **Human-AI Collaboration** - Collaboration maturity

### Sector Benchmarks
Each sector includes:
- Average maturity scores by category
- Sample size of analyzed organizations
- Last update date
- Maturity level classification

### Recommendation System
Recommendations are generated based on:
- Gap analysis (your score vs sector average)
- Category-specific best practices
- Priority levels (High, Medium, Low)
- Estimated timelines (3-6 months, 6-12 months, 12+ months)
- Specific action items and success metrics

## 🔐 Security

- **OAuth 2.0** authentication with Manus
- **JWT** session management
- **HTTPS** enforced in production
- **Environment variables** for sensitive data
- **SQL injection prevention** via Drizzle ORM
- **CSRF protection** via secure cookies

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on [GitHub Issues](https://github.com/Jaokimben/AgentiOrg/issues)
- Contact: support@agentiorg.dev

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with React, Express, and TypeScript
- UI components from shadcn/ui
- Data visualization with Recharts
- Database management with Drizzle ORM
- Authentication via Manus OAuth

## 🔗 Links

- **GitHub Repository**: https://github.com/Jaokimben/AgentiOrg
- **Live Demo**: [Your deployment URL]
- **Documentation**: [Link to docs]

---

**AgentiOrg** - Transforming Organizations Through Human-AI Collaboration
