# REVISED PROJECT REQUEST DOCUMENT: HYBRID ECOSYSTEM OPTIMIZATION
## Developer Specialist Execution Authority

---

## EXECUTIVE SUMMARY
This document outlines a strategic realignment of the `advisory-practice` platform development. The approach shifts from building a general-purpose TAMP to optimizing the platform as a **comprehensive practice management hub** that *integrates with* leading industry TAMP providers (like LPL's offerings) and other best-of-breed third-party services. The primary objective is to leverage the existing, robust codebase (`apps/web`, `apps/api`, `packages/shared`) as the strategic integration hub, focusing development efforts on building the unique, differentiating features that provide a unified, branded experience while integrating with specialized external services where building in-house offers no advantage.

---

## I. DEVELOPMENT FOCUS: HYBRID ECOSYSTEM STRATEGY

### A. Internal Development Priorities (Build)
**Objective**: Complete and optimize the core platform components that provide unique value, ensure a unified user experience, and manage the integration ecosystem.

**1. Core Platform Services (`apps/api`)**

- **Authentication & Authorization Service**:
  - **Task**: Complete the OAuth 2.0 PKCE flow, MFA enforcement, session management, and RBAC system as defined in the knowledge base blueprint. Integrate with an external Identity Provider (IDP) like Auth0 for core authentication, but manage internal permissions and user lifecycle orchestration.
  - **Deliverable**: Fully functional authentication service with secure session management and role-based access control for Advisor, Client, and Compliance Officer roles.

- **Client Management Service**:
  - **Task**: Implement the complete client profile management, including core data (name, contact, risk tolerance), advisor assignment, and integration mapping (external IDs for TAMP, CRM). Build the client onboarding workflow UI in `apps/web`.
  - **Deliverable**: CRUD operations for client profiles, secure data storage, and synchronization points for external service IDs.

- **Compliance Engine Service**:
  - **Task**: Finalize the implementation of SEC Marketing Rule 206(4)-1 and FINRA Rule 2210 validation logic, approval workflows, and audit trail generation as defined in the blueprint. This handles internal compliance tasks (marketing content, client communications) and potentially oversees data from integrated services.
  - **Deliverable**: Automated compliance checking for internal content, approval workflows, and comprehensive audit logging.

- **Reporting & Analytics Service**:
  - **Task**: Develop the service to aggregate data from internal platform activities (user actions, compliance events) and *integrated* external services (portfolio performance from TAMP, AUM from CRM). Create APIs for unified reporting.
  - **Deliverable**: Aggregated data models and API endpoints for advisor and firm-level reporting dashboards.

- **Integration Orchestration Service**:
  - **Task**: Build the core framework within `apps/api` to connect to external APIs (TAMP, CRM, Market Data). Implement data normalization, secure credential storage (HashiCorp Vault or similar), webhook handling, and API rate limiting/fallbacks.
  - **Deliverable**: Reusable adapter patterns and services for connecting to external providers.

**2. Frontend Applications (`apps/web`, `apps/admin`)**

- **Advisor Dashboard (UI)**:
  - **Task**: Create the unified advisor interface. Pull together client lists (from internal service), basic portfolio summaries (fetched from TAMP via internal API), compliance tasks (from internal engine), marketing leads (from CRM via internal API), and communication history (internal). Focus on advisor workflow efficiency.
  - **Deliverable**: A single-page application dashboard providing a holistic view of the advisor's practice.

- **Client Portal (UI)**:
  - **Task**: Create the branded client interface. Display their profile (internal), portfolio performance summary (fetched from TAMP via internal API), goal progress (if integrated with planning tool), communication history (internal), and documents (internal + synced). Prioritize client experience and understanding.
  - **Deliverable**: A secure, branded portal for clients to view their information and interact with their advisor.

- **Admin Dashboard (UI)**:
  - **Task**: Complete the UI for compliance officers and administrators. Manage users (internal), review marketing content (using internal engine), monitor system events (audit logs from internal service), and oversee client management processes. This is the internal operations hub.
  - **Deliverable**: A comprehensive administrative interface for platform oversight and compliance management.

- **Marketing & Lead Capture (UI)**:
  - **Task**: Refine the public-facing website, landing pages, and lead capture forms. Implement the workflow for new lead data (validated by internal rules) to be passed to the CRM (via internal integration service). Ensure all marketing content flows through the internal compliance engine.
  - **Deliverable**: A lead generation and marketing compliance workflow integrated into the platform.

- **Communication Center (UI)**:
  - **Task**: Build the interface for advisors and clients to communicate securely within the platform (messages, potentially linking to external tools). Store communication history internally and link to client profiles.
  - **Deliverable**: A central hub for advisor-client communication managed within the platform.

**3. Internal Data Management & Infrastructure**

- **Document Management (Internal Storage)**:
  - **Task**: Complete the UI and backend logic for managing internal documents (notes, custom agreements) stored securely (MinIO/S3) with SEC Rule 17a-4(f) compliance. Integrate with external e-signature tools.
  - **Deliverable**: A secure, compliant document vault accessible within the advisor and client portals.

### B. Third-Party Integration Priorities (Buy/Integrate)

**Objective**: Strategically integrate with 5-7 key third-party providers for specialized financial services.

- **Primary TAMP Provider Integration**:
  - **Provider**: LPL (MWP, OMP, GWP, MS, SAM), Envestnet, or SEI.
  - **Scope**: Integrate portfolio data (holdings, performance, allocation), model assignment, and rebalancing execution/status into the advisor and client dashboards via the internal API.

- **Primary CRM Integration**:
  - **Provider**: Redtail CRM, Wealthbox.
  - **Scope**: Sync client contact information, interaction history, tasks, and pipeline data. Use this for lead management and advisor workflow.

- **Market Data Integration**:
  - **Provider**: Morningstar, Refinitiv.
  - **Scope**: Fetch real-time and historical pricing, fund/ETF data for display in advisor/client UIs and internal calculations.

- **Document Generation & e-Signature Integration**:
  - **Provider**: DocuSign, Adobe Sign.
  - **Scope**: Trigger document generation/signing from workflows, link signed documents back to client profiles.

- **Identity Provider (IDP) Integration**:
  - **Provider**: Auth0, Okta.
  - **Scope**: Handle core user authentication, SSO, MFA. The internal service manages authorization and user lifecycle *within* the platform.

---

## II. SCOPE OF WORK: KEY EPICS & FEATURES

### Workstream I: Complete Internal Platform Core (`apps/api`, `packages/shared`)

**Epic 1: Core Services Completion**
- **Goal**: Finalize the internal services identified as "Build".
- **Tasks**:
  - Complete Authentication Service implementation.
  - Complete Client Management Service implementation.
  - Complete Compliance Engine implementation (validation, workflows, audit trails).
  - Build Reporting & Analytics aggregation service.
  - Build Integration Orchestration framework.
- **Deliverable**: All internal services fully functional and tested.

### Workstream II: Frontend Implementation (`apps/web`, `apps/admin`)

**Epic 2: Advisor Portal UI**
- **Goal**: Build the unified advisor dashboard.
- **Tasks**:
  - Implement Advisor Dashboard layout and core widgets (AUM, activity feed, tasks).
  - Implement Client List Page with search/filter.
  - Implement Client Detail Page with tabs (Overview, Portfolio, Documents, Notes).
  - Implement Compliance Center UI (Review queue, detail view).
- **Deliverable**: Fully functional Advisor Portal with mock data integration for external services initially.

**Epic 3: Client Portal UI**
- **Goal**: Build the branded client portal.
- **Tasks**:
  - Implement Client Dashboard layout with portfolio summary.
  - Implement Client Profile Management.
  - Implement Document Vault UI.
  - Implement Communication Center UI.
- **Deliverable**: Fully functional Client Portal with mock data integration for external services initially.

**Epic 4: Admin Portal UI**
- **Goal**: Complete the administrative dashboard.
- **Tasks**:
  - Implement User Management (Advisor list, add/edit).
  - Implement Compliance Oversight (Review queue, audit logs).
- **Deliverable**: Fully functional Admin Portal.

### Workstream III: Integration Framework & Mocking

**Epic 5: API Contract Definition & Mocking**
- **Goal**: Define the data contracts for integration and implement mocking for development.
- **Tasks**:
  - Define TypeScript interfaces for data models exchanged with TAMP, CRM, Market Data providers.
  - Implement MSW (Mock Service Worker) to simulate external API responses using these contracts.
  - Ensure `apps/web` and `apps/admin` consume data from the mock service during `dev:mock` mode.
- **Deliverable**: Clear API contracts and a fully functional mock environment for rapid UI development.

**Epic 6: Initial External Integrations**
- **Goal**: Integrate with 1-2 key external services (e.g., TAMP, CRM) using the internal orchestration service.
- **Tasks**:
  - Configure API credentials for target providers securely.
  - Implement adapter logic in `apps/api` to fetch/sync data from providers.
  - Update `apps/web` and `apps/admin` to consume real data from the internal API for these services.
- **Deliverable**: Live data from integrated external services displayed in the frontend applications.

---

## III. OUT OF SCOPE

- **Building a TAMP**: No investment in core investment management, rebalancing, or custodial functions internally.
- **Building a CRM**: No development of client relationship management features beyond internal mappings and sync.
- **Building a Financial Planning Tool**: No development of complex financial modeling software.
- **Building a Document Generation Engine**: No development of complex document templates or e-signature logic beyond API integration.
- **Full Integration Implementation**: This PR focuses on the internal platform and the framework for integration. Full integration with all providers will be phased in later.

---

## IV. ACCEPTANCE CRITERIA & SUCCESS METRICS

- **Final Deliverable**: A functional, integrated platform where core features (authentication, client management, compliance, basic reporting, communication) are built internally, and data from key external services (TAMP, CRM) is displayed in the advisor and client portals.
- **Success Metric**: The `dev:mock` mode provides a complete, interactive experience for all defined UI features using mock data.
- **Success Metric**: The internal API can successfully connect to and retrieve data from at least one external provider (e.g., TAMP).
- **Success Metric**: The advisor and client portals display a unified view combining internal data and data from integrated external services.
- **Success Metric**: The API Contract for core external integrations is documented and committed.
- **Acceptance Criterion**: A stakeholder can log in (advisor or client), navigate the relevant portal, view client/portfolio data (combining internal and mock/real external data), and perform basic actions (e.g., view compliance tasks, communicate with advisor) without critical errors.

---

## V. DEVELOPER SPECIALIST AUTHORITY & CONSTRAINTS

### A. Developer Specialist Authority
- **Full authority** over the implementation of internal platform features defined in the "Build" section.
- **Authority** to select specific UI libraries for data visualization within the existing Next.js/Tailwind stack.
- **Authority** to define the structure and implementation details of the integration adapters.
- **Authority** to refine the API contracts based on actual external provider APIs encountered during integration.

### B. Non-Negotiable Constraints
- **Compliance Adherence**: All internal features must strictly support and enforce the underlying regulatory compliance requirements (SEC, FINRA, GLBA).
- **Security Standards**: All internal code and integrations must meet SOC 2 Type II standards as defined in the original blueprint.
- **Architecture Adherence**: Must build upon the existing monorepo structure (`apps/`, `packages/`) and technology stack (Next.js, NestJS, TypeScript, Tailwind CSS).
- **Integration Strategy**: Focus must remain on the hybrid approach, building core platform features while integrating with external services for specialized functions. Avoid building full-featured replacements for established providers within the scope of this PR.

---

## CONCLUSION
This PRD refocuses development efforts on leveraging the existing, strong foundation of the `advisory-practice` platform. It prioritizes completing the internal platform components that provide unique value and control while strategically integrating with best-in-class external services. This hybrid approach is designed to deliver maximum value to advisors and clients efficiently and scalably.