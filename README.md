# Financial Advisor MVP Platform

Enterprise-grade financial advisory practice platform with FINRA/SEC regulatory compliance and SOC 2
Type II security standards.

## 🚀 Overview

This platform provides a complete solution for financial advisory practices, featuring:

- **Client Relationship Management** - Comprehensive client data management with KYC/AML compliance
- **Document Management** - SEC Rule 17a-4(f) compliant document storage with immutable audit trails
- **Compliance Engine** - Automated compliance checking for SEC Marketing Rule 206(4)-1 and FINRA Rule
  2210
- **Marketing & Lead Management** - FINRA-compliant marketing workflows with approval chains
- **Reporting & Analytics** - Regulatory reporting with complete audit trail generation

## 📁 Project Structure

```
financial-advisor-mvp/
├── apps/
│   ├── web/                    # Next.js frontend application
│   ├── api/                    # NestJS backend microservices
│   └── admin/                  # Admin dashboard (planned)
├── packages/
│   └── shared/                 # Shared types, utilities, and validation
├── configs/                    # Shared configurations
├── scripts/                    # Automation scripts
├── infra/                      # Infrastructure as Code
└── .github/workflows/          # CI/CD pipelines
```

## 🛠️ Technology Stack

| Layer            | Technology                    | Purpose                               |
| ---------------- | ----------------------------- | ------------------------------------- |
| **Frontend**     | Next.js 14, React 18          | Server-side rendering, enterprise UI  |
| **Styling**      | Tailwind CSS                  | WCAG 2.1 AA accessible design         |
| **Backend**      | NestJS, TypeScript            | Enterprise-grade API with validation  |
| **Database**     | PostgreSQL                    | Row-level security, audit logging     |
| **Caching**      | Redis                         | Session management, rate limiting     |
| **Storage**      | MinIO/S3                      | Secure document storage               |
| **CI/CD**        | GitHub Actions                | Automated testing and deployment      |
| **Orchestration** | Turborepo                    | Monorepo task management              |

## 📋 Prerequisites

- Node.js 20.x or later
- npm 10.x or later
- Docker and Docker Compose (for local development)
- Git with signed commits enabled

## 🚦 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd advisory-practice
npm install
```

### 2. Set Up Environment

```bash
# Copy environment files
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env

# Start local services (PostgreSQL, Redis, MinIO, MailHog)
docker-compose up -d
```

### 3. Run Development Servers

```bash
# Run all applications in development mode
npm run dev

# Or run specific applications
npm run dev --workspace=apps/web
npm run dev --workspace=apps/api
```

### 4. Access Applications

- **Web Application**: http://localhost:3000
- **API Server**: http://localhost:4000
- **API Documentation**: http://localhost:4000/api/docs
- **Mail Testing UI**: http://localhost:8025

## 📜 Available Scripts

| Command                    | Description                                |
| -------------------------- | ------------------------------------------ |
| `npm run dev`              | Start all apps in development mode         |
| `npm run build`            | Build all applications                     |
| `npm run lint`             | Run ESLint across all packages             |
| `npm run test`             | Run tests across all packages              |
| `npm run test:coverage`    | Run tests with coverage reports            |
| `npm run typecheck`        | Run TypeScript type checking               |
| `npm run format`           | Format code with Prettier                  |
| `npm run security:audit`   | Run security audit on dependencies         |
| `npm run compliance:check` | Run compliance validation                  |

## 🔒 Security Features

- **Zero Trust Architecture** - Continuous verification with MFA enforcement
- **Data Encryption** - AES-256 at rest, TLS 1.3+ in transit
- **Access Control** - Role-based access with attribute-based policies
- **Audit Logging** - Immutable audit trails with cryptographic signatures
- **Rate Limiting** - Distributed rate limiting to prevent abuse
- **Security Headers** - Comprehensive HTTP security headers (CSP, HSTS, etc.)

## 📊 Compliance Framework

### Supported Regulations

- **SEC Marketing Rule 206(4)-1** - Content review workflows and performance advertising controls
- **FINRA Rule 2210** - Communication classification and approval workflows
- **GLBA Safeguards Rule** - Information security program requirements
- **SEC Regulation S-P** - Privacy notice and opt-out mechanisms
- **AML/KYC** - Customer identification and risk-based monitoring

### Retention Policies

| Record Type          | Retention Period |
| -------------------- | ---------------- |
| Communications       | 3 years          |
| Contracts            | 6 years          |
| Financial Records    | 7 years          |
| Marketing Materials  | 6 years          |
| Audit Logs           | 7 years          |

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run specific workspace tests
npm run test --workspace=apps/api
npm run test --workspace=apps/web
```

## 📦 Deployment

The platform supports multiple deployment strategies:

- **Blue-Green Deployment** - Zero-downtime deployments
- **Progressive Delivery** - Canary releases with gradual rollout
- **Multi-Region** - Active-active deployment capability

See the `infra/` directory for Kubernetes manifests and Terraform configurations.

## 📚 Documentation

- [Architecture Documentation](./docs/architecture.md) - System design and data flows
- [API Documentation](http://localhost:4000/api/docs) - OpenAPI/Swagger documentation
- [Security Guidelines](./docs/security.md) - Security best practices
- [Compliance Guide](./docs/compliance.md) - Regulatory implementation details

## 🤝 Contributing

1. Create a feature branch from `develop`
2. Make changes following coding standards
3. Ensure all tests pass
4. Submit a pull request for review

All contributions must pass:

- ESLint and Prettier checks
- TypeScript type checking
- Unit and integration tests
- Security scanning
- Compliance validation

## 📄 License

This project is proprietary software. All rights reserved.

---

**Built with ❤️ for financial advisors who value compliance and security.**

