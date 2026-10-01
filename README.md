<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Injani Flow — Enterprise BPA & Controls Governance

Frontend prototype for an enterprise Business Process Automation (BPA) and Continuous Controls Governance platform.

This project was created as a frontend implementation of a UI/UX design challenge for PT. INJANI SYSTEMS. It focuses on workflow management, approval processes, controls governance, automation schedules, SLA analytics, and audit history.

## Project Overview

Injani Flow is designed as an enterprise platform where users can manage and monitor business workflows, approvals, controls, and automated processes from a centralized dashboard.

The prototype includes:

- Personalized End-User Dashboard
- Pending Approvals & Urgent Actions
- Workflow Catalog
- My Requests
- Controls Registry
- Automation Schedules
- SLA Reports & Analytics
- Approval History & Audit Trail
- Approval Review Drawer
- Batch Approval
- Dashboard Customization
- Design Rationale & Information Architecture

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- Dummy / Mock Data

## Project Structure

```text
src/
├── components/
│   ├── BatchReviewModal.tsx
│   ├── DashboardView.tsx
│   ├── DesignRationaleView.tsx
│   ├── DomainBlueprintView.tsx
│   ├── Header.tsx
│   ├── InitiateWorkflowModal.tsx
│   ├── SearchCommandModal.tsx
│   ├── Sidebar.tsx
│   ├── SubViews.tsx
│   └── UrgentApprovalDrawer.tsx
├── data/
│   └── initialData.ts
├── types/
│   └── index.ts
├── App.tsx
├── index.css
└── main.tsx
