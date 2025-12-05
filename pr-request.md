Of course. This is the final, logical step: creating a single, master document that encompasses the entire frontend scope for both user roles. This provides the developer with a holistic view of the project, ensuring consistency in design, components, and implementation across the whole platform.

The following document preserves your entire previous request for the client portal and seamlessly integrates the new workstream for the advisor portal.

Project Request Document: Comprehensive Platform Frontend - Client & Advisor Portals

Version: 4.0 (Master Document)

Date: 2025-12-05

Project Owner: [Your Name/Project Lead]

1. Executive Summary

This document outlines the complete scope of work for the entire platform frontend experience, covering both the Client Portal and the Advisor Portal. This master request merges all related UI/UX tasks into a single, cohesive project. The initiative covers three primary areas:

Unified Authentication: Building the client-first sign-in gateway, a dedicated advisor sign-in page, and the "Forgot Password" workflow.

Client Portal Implementation: Building all pages, components, and features of the secure client portal from the ground up.

Advisor Portal Audit & Implementation: Auditing the existing advisor-facing codebase and then fully building out and wiring up all pages, components, and features to ensure a polished, performant, and fully functional experience.

Development will follow a frontend-first methodology against a mocked API contract for both portals to ensure rapid development and validation before final backend integration.

2. Core Objective

To design, develop, and fully implement a seamless, secure, and intuitive end-to-end user journey for both clients and advisors. This starts from the moment a user accesses the platform's sign-in gateways and extends through every interaction within their respective secure portals.

3. Scope of Work: Key Epics & Features

This project is divided into two primary workstreams, which can be developed in parallel against the mock API.

Workstream A: Client Experience

Epic 1: Authentication, Access & Recovery

Goal: Implement the primary entry point for all users, prioritizing the client experience.

User Flows & Features:

Client-First Sign-In:

The main "Sign In" button on the website navigates to a dedicated Client Sign-In Page (/login/client).

This page contains a simple form (Email, Password) and a subtle text link: "Are you an advisor? Sign in here" which navigates to /login/advisor.

Advisor Sign-In:

The /login/advisor page provides a dedicated, consistently-styled login form for advisors.

"Forgot Password" Workflow:

A "Forgot Password?" link is present on both the client and advisor login pages, leading to a secure password reset flow.

Out of Scope: User "Sign Up" / registration flows are explicitly excluded.

Epic 2: Client Portal - Main Dashboard / Overview

Goal: Provide the client with an immediate, high-level summary of their financial picture upon login.

UI Components: Portfolio Summary Card, Allocation Overview Chart, Recent Activity Feed.

Epic 3: Client Portal - Detailed Portfolio View

Goal: Allow clients to perform a deep-dive into their investment accounts and holdings.

UI Components: Accounts List/Selector, Holdings Data Table, Interactive Performance Chart.

Epic 4: Client Portal - Document Center

Goal: Create a secure, organized repository for all client-related documents.

UI Components: Folder/file navigation, searchable document list, secure viewer/downloader.

Epic 5: Client Portal - Secure Communication Hub

Goal: Facilitate secure messaging between the client and their advisor.

UI Components: A simple, threaded message interface.

Workstream B: Advisor Experience

Epic 6: Advisor Portal - Code Audit & Foundation

Goal: Review the existing advisor-facing codebase to identify reusable components and establish a clean foundation for new feature development.

Tasks: Audit existing pages, components, and state management. Refactor where necessary to align with the latest architectural standards defined in this PRD.

Epic 7: Advisor Portal - Main Dashboard

Goal: Create the advisor's "single pane of glass" to manage their practice efficiently.

UI Components:

Practice Summary: Cards for total AUM, client count, and aggregate performance.

Recent Activity Feed: A log of recent client activities, trades, or communications.

Compliance Queue: A widget showing pending tasks (e.g., marketing reviews).

Epic 8: Advisor Portal - Client Management

Goal: Build the complete interface for viewing and managing all clients.

UI Components:

Client List Page: A robust, searchable, and filterable data table of all clients.

Client Detail Page: A comprehensive hub with tabs for Overview, Portfolio, Documents, and Notes/Activity.

Epic 9: Advisor Portal - Compliance Center

Goal: Provide a dedicated interface for compliance officers and advisors to manage regulatory tasks.

UI Components:

Review Queue Dashboard: A master list of all items pending review.

Review Detail Page: An interface to view content, add comments, and approve/reject.

4. Technical Requirements & API Contract

Frontend-First with Mocking: A mock service layer (MSW) must be used to simulate all API responses for both portals.

Technology Stack: Adhere to the existing monorepo stack (Next.js, Tailwind CSS, React Query/SWR, Zustand).

Component-Driven: All new and refactored UI elements must be reusable, placed in packages/ui, and documented in Storybook.

API Contract Details (Expanded):

Authentication: POST /api/auth/{client|advisor}/{login|forgot-password|reset-password}

Client Data: GET /api/client/... (Portfolio, Documents, Messages)

Advisor Data: GET /api/advisor/... (Clients, AUM, Compliance Tasks, etc.)
(A detailed TypeScript interface file for all contracts is a key deliverable.)

5. Non-Functional Requirements

Design: Strictly adhere to the company's branding and Figma design system across both portals.

Responsiveness: All interfaces must be fully responsive from mobile to desktop.

Performance: Achieve "Good" ratings on Core Web Vitals for all key pages.

Accessibility: Meet WCAG 2.1 Level AA standards.

6. Deliverables

A finalized and committed API Contract for all client and advisor features.

A fully interactive Client Portal application running against the mock service layer.

A fully audited, refactored, and interactive Advisor Portal application running against the mock service layer.

Production-ready Client and Advisor Portals fully wired to live backend APIs.

A comprehensive, documented Storybook in packages/ui for all shared components.

7. Acceptance Criteria

Login Flow: The client-first login flow with a link to the advisor page is implemented and functional.

Password Reset: The "Forgot Password" workflow is functional for both roles.

Client Portal Functionality: A client can log in and fully navigate and interact with all features of their portal using mock data.

Advisor Portal Functionality: An advisor can log in and fully navigate and interact with their dashboard, client list, and compliance center using mock data.

Responsiveness & Design: Both portals are pixel-perfect according to designs and work flawlessly on mobile and desktop.

Final Wiring: The final application successfully fetches and displays live data from the backend across both portals, ensuring smooth and perfect functionality.