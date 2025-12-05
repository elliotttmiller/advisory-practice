# PR TASK DOCUMENT: TAMP FRONTEND UI/UX DEVELOPMENT
## DEVELOPER SPECIALIST EXECUTION AUTHORITY

---

## EXECUTIVE SUMMARY
This document defines the comprehensive development tasks required to complete the frontend user interface and experience for a Turnkey Asset Management Platform (TAMP) within the financial advisory practice platform. Based on analysis of the existing GitHub repository and industry standards, this blueprint focuses exclusively on building professional, compliant, and efficient TAMP-specific user interfaces within the `apps/web` application. The developer specialist will leverage the existing UI/UX-only development mode (`dev:mock`) to rapidly iterate and polish core TAMP interfaces to production-grade quality.

---

## I. CURRENT DEVELOPMENT WORKFLOW UTILIZATION

### A. Leveraging Existing UI/UX-Only Development Mode
**Objective**: Utilize the already implemented development environment where frontend UI/UX for TAMP features can be iterated rapidly without starting backend services.

**Current State**:
- **TAMP Mock Data Layer**: Comprehensive, realistic static JSON mock data sets representing API responses for TAMP features (Models, Holdings, Transactions, Performance, Rebalancing, Model Portfolios) across various application states (loading, success, error, empty, populated) are available.
- **TAMP Mock API Service**: A service/module within `apps/web` intercepts TAMP-specific API calls (e.g., `/api/models`, `/api/portfolios`, `/api/rebalancing`) when the `NEXT_PUBLIC_MOCK_MODE=true` environment variable is enabled, returning pre-defined mock data.
- **Development Script**: The dedicated script `npm run dev:mock` (or equivalent) starts the frontend in the isolated TAMP UI/UX development mode.
- **Documentation**: Project documentation explains how to use the TAMP UI/UX-only mode, update TAMP-specific mock data, and switch back to full-stack development.

**Execution Requirement**:
- **Primary Development Mode**: All TAMP UI/UX development tasks must be executed using the existing `dev:mock` environment to maximize iteration speed and efficiency.
- **Mock Data Maintenance**: Ensure mock data accurately reflects TAMP workflows and is updated as UI requirements evolve.

**Expected Outcome**: Rapid development and refinement of TAMP UI components and investment workflows without dependency on backend services, leveraging the established mock infrastructure.

### B. Component Development Environment Usage
**Objective**: Utilize the existing optimal environment for isolated UI component development and testing, specifically tailored for financial data visualization and TAMP workflows.

**Current State**:
- **Storybook Integration**: Storybook is set up within `apps/web` for isolated component development.
- **Financial Data Visualization Library**: A robust charting library is integrated.
- **Design Token System**: A comprehensive design token system using Tailwind CSS variables is implemented.
- **Component Library Structure**: UI components are organized with clear separation.
- **Accessibility Testing Integration**: axe-core accessibility testing is integrated.

**Execution Requirement**:
- **Leverage Existing Tools**: Utilize Storybook for developing and testing TAMP-specific components in isolation.
- **Adhere to Design Tokens**: Strictly follow the established design token system for consistent styling.
- **Prioritize Accessibility**: Ensure all new TAMP components meet accessibility standards during development.

**Expected Outcome**: Efficient and consistent development of high-quality TAMP UI components using the established toolchain.

---

## II. CORE TAMP UI/UX IMPLEMENTATION SPECIFICATIONS

### A. Advisor TAMP Dashboard Interface Development
**Objective**: Deliver a comprehensive, professional dashboard for advisors to manage client portfolios, models, and investment workflows.

**Required Components**:
- **Dashboard Layout**: Create a responsive, accessible dashboard layout with navigation, header, and content areas optimized for financial data density and workflows, following WCAG 2.1 AA standards.
- **Client Portfolio Overview Section**: Design and implement visual components for managing client portfolios linked to models, including:
  - **Portfolio List View**: Table showing client name, account value, assigned model, current drift from target, performance YTD/1Y/3Y, last rebalanced date.
  - **Quick Actions**: Buttons/links for common tasks (Rebalance, View Details, Assign Model).
  - **Drift Visualization**: Quick visual indicators (e.g., gauges, sparklines) for portfolio drift from assigned model.
- **Model Management Section**: Interface for advisors to browse, select, and assign model portfolios to clients:
  - **Model Library**: Grid or table view of available models with name, objective, risk level, performance, and holdings summary.
  - **Model Details Modal/Panel**: Detailed view showing full holdings, weightings, performance history, and risk metrics for a selected model.
  - **Assignment Workflow**: Intuitive process to select a client and assign a model, with confirmation steps.
- **Rebalancing Center Section**: Interface for managing rebalancing tasks:
  - **Rebalance Queue**: List of portfolios requiring rebalancing, showing current holdings vs. target, suggested trades (buys/sells), and drift amount.
  - **Rebalance Actions**: Buttons to approve, modify, or skip rebalancing recommendations for individual accounts or in bulk.
  - **Rebalance History**: View of past rebalancing activities with details on trades executed.
- **Performance Analytics Section**: Tools for advisors to analyze portfolio and model performance:
  - **Performance Charts**: Interactive charts comparing client portfolio performance to assigned model and benchmarks over time.
  - **Attribution Analysis**: (If applicable) Breakdown of performance drivers.
  - **Goal Tracking**: (If goals are linked) Progress visualization against client objectives.

**Design Requirements**:
- Professional financial services aesthetic with clean typography and strategic use of color (e.g., green/red for performance, neutral tones for data).
- Consistent spacing system based on 8px baseline grid optimized for data density.
- Responsive design supporting desktop (primary), tablet, and mobile viewports (with appropriate feature prioritization).
- WCAG 2.1 AA compliance with proper color contrast (especially for data visualization), keyboard navigation, and screen reader support for complex tables/charts.
- Loading states and error handling for all asynchronous operations (portfolio fetch, rebalance calculation, etc.).

### B. Client TAMP Portfolio View Interface Development
**Objective**: Deliver a clear, professional interface for clients to view their managed portfolio performance and allocation.

**Required Components**:
- **Portfolio Overview Section**: Design and implement visual components for client portfolio performance visualization, including:
  - **Performance Summary**: Key metrics like current value, YTD change ($ and %), 1Y change ($ and %).
  - **Performance Charts**: Line chart showing portfolio value and performance over time (1M, 1Y, 3Y, 5Y, YTD, etc.), ideally compared to a broad benchmark.
  - **Asset Allocation Visualization**: Pie or bar chart showing current holdings by asset class or security, with clear labels and values.
  - **Goal Progress (if applicable)**: Visual indicator of progress towards defined financial goals.
- **Model Information Section**: Provide context about the underlying investment strategy:
  - **Model Name & Objective**: Clearly display the name and investment objective of the assigned model portfolio.
  - **Model Holdings Summary**: (Optional, simplified) High-level view of major holdings or asset classes within the model.
  - **Benchmark Information**: Show the benchmark the model aims to track or outperform.
- **Activity/Transaction History Section**: Display recent activity related to the portfolio:
  - **Rebalancing History**: List of recent rebalancing events with dates and brief descriptions ("Portfolio rebalanced to target allocation").
  - **Dividend/Income**: (If applicable) List of income distributions.
- **Document Access Section**: Link to relevant documents (e.g., model fact sheets, performance reports) stored in the document management system.

**Design Requirements**:
- Clear, uncluttered layout focusing on key performance and allocation data.
- Use of positive/negative color coding for performance figures.
- Consistent with overall brand identity while emphasizing financial data clarity.
- Responsive design ensuring charts and tables remain readable on smaller screens.
- WCAG 2.1 AA compliance, especially for color use in data visualization and table accessibility.

### C. Marketing & Lead Capture Interface (TAMP Context)
**Objective**: Enhance the existing public-facing website experience to highlight TAMP benefits and convert visitors to leads while maintaining regulatory compliance.

**Required Components (Enhanced for TAMP)**:
- **Landing Page Enhancement (TAMP Focus)**: Enhance the existing landing page to emphasize TAMP benefits:
  - **Hero Section**: Value proposition focusing on "Outsourced Investment Management," "Professional Oversight," "Access to Institutional Strategies."
  - **Services Overview**: Highlight TAMP services (Portfolio Management, Rebalancing, Reporting) with relevant icons.
  - **Advisor Bio Section**: Maintain focus on advisor expertise, potentially mentioning TAMP partnership/philosophy.
  - **Testimonials Section**: Include testimonials related to investment management quality, performance clarity, or peace of mind (with proper regulatory disclosures).
  - **Contact Form**: Maintain existing compliance-approved fields.
- **Services Page (TAMP Detail)**: Create detailed service descriptions focusing on the TAMP offering:
  - **Investment Philosophy**: How the advisor leverages TAMP models.
  - **Model Selection Process**: How models are chosen and monitored.
  - **Rebalancing Frequency & Process**: Explain the automated rebalancing benefit.
  - **Performance Reporting**: Detail the reporting provided through the platform.
  - **FAQs Section**: Address common questions about TAMPs, model portfolios, and fees.

**Compliance Requirements (Maintained)**:
- All marketing content must include required regulatory disclosures.
- Testimonials must include proper context and representative sample disclaimer.
- Performance claims (if any) must include required benchmark comparisons and time periods.
- Contact forms must include privacy policy links and consent checkboxes.

### D. Authentication & Onboarding Flows (TAMP Context)
**Objective**: Ensure existing seamless and secure user authentication and onboarding experiences correctly support TAMP access.

**Required Components**:
- **Login/Registration Flow**: Maintain existing secure authentication with role-based access (Advisor vs. Client).
- **Advisor Onboarding Wizard (if applicable)**: (For new advisors joining the platform, if relevant) Process for linking to TAMP provider accounts, setting preferences.
- **Client Onboarding Wizard**: Maintain general client onboarding (risk profiling, goals, documents) but ensure integration points with TAMP model assignment are clear for advisors during the advisor-assisted setup.

**Security Requirements (Maintained)**:
- Password fields with visibility toggle and strength indicators.
- Proper session management with timeout handling.
- Secure form submission with CSRF protection.
- Role-based UI rendering based on permissions (Advisor sees TAMP tools, Client sees portfolio view).

---

## III. DESIGN SYSTEM & BRANDING INTEGRATION

### A. Brand Identity Implementation (TAMP Context)
**Objective**: Apply the firm's brand identity consistently across all TAMP UI components while ensuring financial data clarity.

**Core Requirements**:
- **Typography System**: Implement the brand's typography system with appropriate hierarchy for financial data (e.g., clear distinction between labels, values, and performance figures).
- **Color Palette**: Configure the Tailwind CSS color palette, ensuring brand colors work well for financial data visualization (positive/negative colors must be clear and accessible).
- **Logo Integration**: Add the firm's logo to header components.
- **Icon System**: Implement a consistent icon system using SVG icons relevant to investment management (portfolio, chart, rebalance, etc.).
- **Financial Data Styling**: Apply brand-consistent styling to financial elements like performance figures, tables, and charts, prioritizing clarity and readability.

**Expected Outcome**: A cohesive brand experience within the TAMP interface that maintains professional identity while ensuring financial data is presented clearly and accessibly.

### B. Responsive Design Implementation (TAMP Context)
**Objective**: Ensure optimal user experience for TAMP features across all device sizes, acknowledging that advisor tasks may be primarily desktop while client views might be mobile-heavy.

**Core Requirements**:
- **Mobile-First Approach**: Develop client-facing components using a mobile-first responsive design strategy.
- **Advisor Desktop Focus**: Optimize advisor dashboard for desktop/larger screens to handle complex data tables and multiple panels.
- **Breakpoint Strategy**: Implement a consistent breakpoint strategy using Tailwind CSS responsive utilities, considering data density needs.
- **Touch Targets**: Ensure all interactive elements on client views have appropriate touch target sizes.
- **Navigation Patterns**: Implement responsive navigation suitable for both advisor (potentially complex) and client (simpler) needs.
- **Content Flow**: Ensure financial charts and tables reflow appropriately or become horizontally scrollable if necessary on smaller screens.

**Expected Outcome**: A seamless TAMP user experience that adapts to any device while maintaining usability and data clarity for both advisors and clients.

---

## IV. UI/UX TESTING & QUALITY ASSURANCE (TAMP Context)

### A. Visual Quality Assurance (TAMP Focus)
**Objective**: Ensure pixel-perfect UI implementation for complex financial data displays.

**Core Requirements**:
- **Visual Regression Testing**: Implement visual regression testing for TAMP components, especially charts and data tables, to detect unintended UI changes.
- **Cross-Browser Testing**: Test TAMP UI components across supported browsers, paying special attention to chart rendering and table display.
- **Design Handoff Validation**: Validate TAMP UI implementation against design mockups, focusing on data visualization accuracy and clarity.
- **Color Contrast Verification**: Ensure WCAG 2.1 AA compliance for all text and data visualization elements, especially performance figures.
- **Spacing Consistency Check**: Verify consistent spacing implementation for financial data elements.

**Expected Outcome**: Professional-grade TAMP UI quality with consistent visual implementation and cross-browser compatibility for financial data.

### B. User Experience Validation (TAMP Focus)
**Objective**: Ensure intuitive and efficient TAMP workflows through comprehensive testing.

**Core Requirements**:
- **Advisor Workflow Testing**: Develop test scripts for critical advisor TAMP journeys:
  - Assigning a model portfolio to a client.
  - Reviewing the rebalance queue and approving trades.
  - Viewing client portfolio performance vs. model.
- **Client Workflow Testing**: Test client portfolio viewing experience:
  - Understanding portfolio allocation.
  - Interpreting performance charts.
  - Navigating to relevant documents.
- **Accessibility Testing (TAMP Focus)**: Conduct comprehensive accessibility testing for financial data tables and charts.
- **Performance Optimization (TAMP Focus)**: Optimize UI performance for rendering potentially large datasets (e.g., detailed holdings, long performance histories) using techniques like virtualization.
- **Error State Handling (TAMP Focus)**: Implement comprehensive error handling for TAMP-specific scenarios (e.g., failed performance data fetch, rebalance calculation errors).

**Expected Outcome**: An intuitive, accessible, and high-performance TAMP user experience that meets professional standards.

---

## V. DELIVERABLES & ACCEPTANCE CRITERIA

### A. TAMP UI/UX Deliverables
**Required Outputs**:
- **Advisor TAMP Dashboard**: Fully functional interface for managing client portfolios, models, rebalancing, and performance.
- **Client TAMP Portfolio View**: Clear interface for clients to view their managed portfolio performance and allocation.
- **Marketing Website (TAMP Context)**: Landing page and services page highlighting TAMP benefits.
- **Authentication Flows**: Secure login/role separation supporting TAMP access.
- **TAMP Component Library**: Reusable components for financial data display and TAMP-specific actions (e.g., model selector, rebalance grid).
- **Design Token System**: Implementation including financial data state tokens.

**Quality Requirements**:
- Consistent visual design following brand guidelines within the TAMP context.
- WCAG 2.1 AA accessibility compliance across all TAMP interfaces.
- Responsive design supporting advisor (desktop-focused) and client (mobile-friendly) needs.
- Optimized performance for rendering financial data.
- Comprehensive error handling for TAMP-specific operations.

### B. Development Environment Deliverables
**Required Outputs**:
- **TAMP UI/UX-Only Development Mode**: Confirmed functional mock data system for TAMP features and development script (already implemented).
- **Storybook Setup**: Configured with TAMP-specific component examples.
- **Development Documentation**: Confirmed instructions for using the TAMP UI/UX-only development workflow (already documented).
- **Testing Setup**: (If applicable) Visual regression testing configuration for TAMP components.

**Quality Requirements**:
- Seamless developer experience for TAMP-specific UI work using existing tools.
- Clear documentation available.
- Efficient iteration cycles for TAMP features using `dev:mock`.

### C. Acceptance Criteria
**Functional Acceptance (TAMP)**:
- Advisor can view client portfolios with model assignment and drift.
- Advisor can assign models to clients.
- Advisor can see and interact with the rebalance queue.
- Client can view their portfolio performance and allocation.
- All TAMP UI components render correctly in `dev:mock` mode.
- TAMP-specific user flows function as specified.
- Existing `dev:mock` mode operates correctly for all new TAMP features.

**Quality Acceptance (TAMP)**:
- Zero ESLint and Prettier errors in TAMP frontend code.
- 100% TypeScript type safety for UI components.
- All TAMP UI elements pass automated accessibility tests.
- Financial data visualizations are clear and accurate.
- Performance metrics for data-heavy components are acceptable.

**Compliance Acceptance (Maintained)**:
- All marketing content includes required disclosures.
- Performance data display includes appropriate context/disclaimers if shown.
- UI supports underlying compliance checks (e.g., displaying compliance status of models).

---

## VI. EXECUTION AUTHORITY & CONSTRAINTS

### A. Developer Specialist Authority
**Full Implementation Authority (TAMP Focus)**:
- Complete authority over TAMP UI component implementation details within specified requirements.
- Authority to select specific UI libraries for financial data visualization (within existing project constraints).
- Authority to define TAMP component APIs and props interfaces.
- Authority to structure the TAMP component library.
- Authority to implement visual design details within brand guidelines for TAMP features.

**Required Consultation Points**:
- Final TAMP visual design approval from brand stakeholders.
- Compliance review of TAMP-specific messaging or data displays.
- Accessibility audit sign-off.
- Performance benchmark approval for data-heavy components.

### B. Non-Negotiable Constraints
**Brand Requirements**:
- Must adhere to provided brand guidelines.
- Maintain professional financial services aesthetic.

**Compliance Requirements**:
- All marketing content must include required regulatory disclosures.
- UI must support underlying compliance logic (e.g., showing compliance status).

**Technical Constraints**:
- Must use Next.js 14, Tailwind CSS, TypeScript as defined.
- Maintain monorepo structure.
- Ensure compatibility with existing API contracts for TAMP data.
- Leverage the existing `dev:mock` mode for development.

---

## CONCLUSION
This blueprint defines the complete specification for achieving a production-grade TAMP frontend experience for the financial advisory practice platform. The focus is exclusively on TAMP-specific UI/UX development, leveraging the existing streamlined local development environment (`dev:mock`). The developer specialist is authorized to execute all frontend implementation decisions within the defined constraints, with final acceptance based on the specified acceptance criteria.

The deliverable will be a polished, professional, and compliant TAMP user interface that provides exceptional experience for advisors managing client portfolios and clients viewing their managed investments, ready for integration with the backend services when development progresses to that stage.