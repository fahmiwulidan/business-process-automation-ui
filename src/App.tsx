/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ApprovalItem,
  SubmittedRequest,
  GovernanceControl,
  AutomationDaemon,
  RoleFilter,
  NavTab,
} from './types';
import {
  INITIAL_APPROVALS,
  INITIAL_MY_REQUESTS,
  INITIAL_CONTROLS,
  INITIAL_DAEMONS,
} from './data/initialData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { DomainBlueprintView } from './components/DomainBlueprintView';
import { DesignRationaleView } from './components/DesignRationaleView';
import { UrgentApprovalDrawer } from './components/UrgentApprovalDrawer';
import { InitiateWorkflowModal } from './components/InitiateWorkflowModal';
import { BatchReviewModal } from './components/BatchReviewModal';
import { DailyBriefingModal } from './components/DailyBriefingModal';
import { SearchCommandModal } from './components/SearchCommandModal';
import {
  PendingApprovalsView,
  MyRequestsView,
  ControlsRegistryView,
  SchedulesTriggersView,
  SLAReportsView,
  ApprovalTrailView,
  WorkflowCatalogView,
} from './components/SubViews';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [currentRole, setCurrentRole] = useState<RoleFilter>('all');
  const [currentRegion, setCurrentRegion] = useState('Global Operations (US-East)');

  // Main entity states
  const [approvals, setApprovals] = useState<ApprovalItem[]>(INITIAL_APPROVALS);
  const [myRequests, setMyRequests] = useState<SubmittedRequest[]>(INITIAL_MY_REQUESTS);
  const [controls, setControls] = useState<GovernanceControl[]>(INITIAL_CONTROLS);
  const [daemons, setDaemons] = useState<AutomationDaemon[]>(INITIAL_DAEMONS);

  // Modals & Drawer
  const [selectedApproval, setSelectedApproval] = useState<ApprovalItem | null>(null);
  const [isInitiateModalOpen, setIsInitiateModalOpen] = useState(false);
  const [isBatchReviewModalOpen, setIsBatchReviewModalOpen] = useState(false);
  const [isDailyBriefingModalOpen, setIsDailyBriefingModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Keyboard shortcut for Command Palette (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Real-time SLA Countdown ticking simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setApprovals((prevApprovals) =>
        prevApprovals.map((item) => {
          if (item.status !== 'pending') return item;
          const newSeconds = item.slaCountdown.remainingSeconds - 1;

          // Format new time
          let display = item.slaCountdown.initialDisplay;
          let isOverdue = item.slaCountdown.isOverdue;

          if (newSeconds <= 0) {
            isOverdue = true;
            const overdueMin = Math.abs(Math.floor(newSeconds / 60));
            display = `Exceeded by ${overdueMin}m (OVERDUE)`;
          } else {
            const h = Math.floor(newSeconds / 3600);
            const m = Math.floor((newSeconds % 3600) / 60);
            display = `${h > 0 ? `${h}h ` : ''}${m}m remaining`;
          }

          return {
            ...item,
            slaCountdown: {
              ...item.slaCountdown,
              remainingSeconds: newSeconds,
              initialDisplay: display,
              isOverdue,
            },
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handlers for approvals
  const handleApprove = (id: string, notes: string) => {
    setApprovals((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'approved' as const } : item
      )
    );
    showToast(`✓ Workflow ${id} attested and authorized in immutable ledger.`);
  };

  const handleReject = (id: string, notes: string) => {
    setApprovals((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'rejected' as const } : item
      )
    );
    showToast(`✕ Workflow ${id} rejected with audit justification.`);
  };

  const handleDelegate = (id: string, delegateTo: string) => {
    setApprovals((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'delegated' as const } : item
      )
    );
    showToast(`→ Authority for ${id} delegated to ${delegateTo}.`);
  };

  const handleBatchApprove = (ids: string[]) => {
    setApprovals((prev) =>
      prev.map((item) =>
        ids.includes(item.id) ? { ...item, status: 'approved' as const } : item
      )
    );
    showToast(`✓ Batch authorized ${ids.length} workflow items.`);
  };

  const handleBatchReject = (ids: string[]) => {
    setApprovals((prev) =>
      prev.map((item) =>
        ids.includes(item.id) ? { ...item, status: 'rejected' as const } : item
      )
    );
    showToast(`✕ Batch rejected ${ids.length} workflow items.`);
  };

  const handleQuickApprove = (id: string) => {
    handleApprove(id, 'Quick approved via dashboard action by Eleanor Vance.');
  };

  // Trigger daemon execution
  const handleTriggerDaemon = (daemonId: string) => {
    setDaemons((prev) =>
      prev.map((d) =>
        d.id === daemonId
          ? {
              ...d,
              lastExecution: 'Success (Triggered just now · 0 drift)',
              nextExecutionIn: 'in 59m',
            }
          : d
      )
    );
    showToast(`⚡ Manual trigger executed for daemon ${daemonId}.`);
  };

  // Launch attestation
  const handleLaunchAttestation = (controlId: string) => {
    setControls((prev) =>
      prev.map((c) =>
        c.id === controlId
          ? {
              ...c,
              urgency: 'healthy',
              complianceHealth: '100% Attested Today',
              deadline: 'Dec 15, 2024',
            }
          : c
      )
    );
    showToast(`🛡 Attestation cycle launched for ${controlId}.`);
  };

  // New workflow created from modal
  const handleCreateWorkflow = (newItem: ApprovalItem) => {
    setApprovals((prev) => [newItem, ...prev]);

    // Also add to My Requests
    const newReq: SubmittedRequest = {
      id: newItem.workflowId,
      title: newItem.title,
      category: newItem.category,
      status: 'In Progress',
      stageText: 'Step 1 of 2: Executive Review',
      reviewerText: 'Eleanor Vance (Compliance)',
      submittedDate: 'Oct 24, 2024',
      progressPercent: 50,
      remainingText: 'Within SLA',
    };
    setMyRequests((prev) => [newReq, ...prev]);
    showToast(`+ New workflow ${newItem.workflowId} registered into authorization queue.`);
  };

  // Counters
  const pendingApprovalsCount = approvals.filter((a) => a.status === 'pending').length;
  const expiringControlsCount = controls.filter((c) => c.urgency !== 'healthy').length;

  const handleSelectTab = (tab: NavTab) => {
    setCurrentTab(tab);
    setIsSidebarOpen(false);
  };

  // Breadcrumb mapping
  const breadcrumbMap: Record<NavTab, string> = {
    dashboard: 'Governance > Controls Matrix',
    blueprint: 'System Architecture / Domain Blueprint',
    'design-spec': 'Design Challenge / Architectural Foundations',
    'pending-approvals': 'Workflows / Pending Approvals',
    'my-requests': 'Workflows / My Requests',
    'workflow-catalog': 'Workflows / Workflow Catalog',
    'controls-registry': 'Controls / Controls Registry',
    'schedules-triggers': 'Automations / Schedules & Triggers',
    'sla-reports': 'Analytics / SLA Reports',
    'approval-trail': 'Audit / Approval Trail',
    'system-settings': 'System / System Settings',
    'help-documentation': 'System / Help & Documentation',
  };

  return (
    <div className="app-shell min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-['Inter']">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-18 right-8 z-50 bg-[#00236f] text-white px-4 py-2.5 rounded-lg shadow-xl border border-[#3b5998] flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-200 text-[12.5px] font-medium">
          <span className="material-symbols-outlined text-[18px] text-[#86f2e4]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        pendingCount={pendingApprovalsCount}
        myRequestsCount={myRequests.length}
        expiringControlsCount={expiringControlsCount}
        currentRegion={currentRegion}
        onChangeRegion={setCurrentRegion}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="app-main-shell pl-64 flex flex-col flex-1">
        {/* Top Header */}
        <Header
          currentRole={currentRole}
          onSelectRole={setCurrentRole}
          onOpenInitiateWorkflow={() => setIsInitiateModalOpen(true)}
          onOpenSearch={() => setIsSearchModalOpen(true)}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          breadcrumbZone={breadcrumbMap[currentTab]}
          urgentCount={pendingApprovalsCount}
        />

        {/* Dynamic Route Content */}
        <main className="app-main-content pt-20 pb-12 px-6 max-w-7xl w-full mx-auto flex-1">
          {currentTab === 'dashboard' && (
            <DashboardView
              approvals={approvals}
              myRequests={myRequests}
              controls={controls}
              daemons={daemons}
              currentRole={currentRole}
              onSelectRole={setCurrentRole}
              onInspectApproval={(item) => setSelectedApproval(item)}
              onOpenInitiateWorkflow={() => setIsInitiateModalOpen(true)}
              onOpenBatchReview={() => setIsBatchReviewModalOpen(true)}
              onOpenDailyBriefing={() => setIsDailyBriefingModalOpen(true)}
              onQuickApprove={handleQuickApprove}
              onTriggerDaemon={handleTriggerDaemon}
              onLaunchAttestation={handleLaunchAttestation}
              onNavigateTab={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'blueprint' && (
            <DomainBlueprintView onNavigateTab={(tab) => setCurrentTab(tab)} />
          )}

          {currentTab === 'design-spec' && <DesignRationaleView />}

          {currentTab === 'pending-approvals' && (
            <PendingApprovalsView
              approvals={approvals}
              onInspect={(item) => setSelectedApproval(item)}
              onOpenBatchReview={() => setIsBatchReviewModalOpen(true)}
              onQuickApprove={handleQuickApprove}
            />
          )}

          {currentTab === 'my-requests' && (
            <MyRequestsView
              requests={myRequests}
              onOpenInitiateWorkflow={() => setIsInitiateModalOpen(true)}
            />
          )}

          {currentTab === 'workflow-catalog' && (
            <WorkflowCatalogView
              onOpenInitiateWorkflow={() => setIsInitiateModalOpen(true)}
            />
          )}

          {currentTab === 'controls-registry' && (
            <ControlsRegistryView
              controls={controls}
              onLaunchAttestation={handleLaunchAttestation}
            />
          )}

          {currentTab === 'schedules-triggers' && (
            <SchedulesTriggersView
              daemons={daemons}
              onTriggerDaemon={handleTriggerDaemon}
            />
          )}

          {currentTab === 'sla-reports' && <SLAReportsView />}

          {currentTab === 'approval-trail' && <ApprovalTrailView />}

          {currentTab === 'system-settings' && (
            <div className="bg-white p-6 rounded-lg border border-[#eaedff] space-y-4 max-w-2xl">
              <h2 className="font-['Hanken_Grotesk'] text-xl font-bold text-on-surface">
                System &amp; Governance Settings
              </h2>
              <div className="space-y-3 text-[12.5px]">
                <div className="p-3 bg-surface-container-low rounded flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-on-surface">Current Active Region</div>
                    <div className="text-on-surface-variant text-[11px]">{currentRegion}</div>
                  </div>
                  <span className="font-mono text-[11px] text-secondary font-bold">Primary Live</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-on-surface">Cryptographic Token Attestation</div>
                    <div className="text-on-surface-variant text-[11px]">Hardware Token: YubiKey 5 FIPS (Oct 2024 Verified)</div>
                  </div>
                  <span className="font-mono text-[11px] text-primary font-bold">Enabled</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-on-surface">Audit Engine Version</div>
                    <div className="text-on-surface-variant text-[11px]">Injani Core v4.12 • SHA-256 Anchored</div>
                  </div>
                  <span className="font-mono text-[11px] text-outline">Up to date</span>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'help-documentation' && (
            <div className="bg-white p-6 rounded-lg border border-[#eaedff] space-y-4 max-w-3xl">
              <h2 className="font-['Hanken_Grotesk'] text-xl font-bold text-on-surface">
                Injani Flow Documentation &amp; User Manual
              </h2>
              <p className="text-[13px] text-on-surface-variant leading-relaxed">
                Injani Flow provides an enterprise-grade multi-role operational cockpit designed to eliminate context-switching for compliance officers and department leads.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px]">
                <div className="p-3 bg-surface-container-low rounded">
                  <div className="font-bold text-primary mb-1">Dual-Custody Approvals</div>
                  <p className="text-on-surface-variant">Learn how multi-signature authorization chains prevent unauthorized infrastructure modifications.</p>
                </div>
                <div className="p-3 bg-surface-container-low rounded">
                  <div className="font-bold text-primary mb-1">SOX 404 &amp; ISO 27001 Controls</div>
                  <p className="text-on-surface-variant">Review automated continuous evidence scraping and periodic re-certification workflows.</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* 560px Progressive Disclosure Slide-Over Drawer */}
      <UrgentApprovalDrawer
        item={selectedApproval}
        onClose={() => setSelectedApproval(null)}
        onApprove={handleApprove}
        onReject={handleReject}
        onDelegate={handleDelegate}
      />

      {/* Interactive Modals */}
      <InitiateWorkflowModal
        isOpen={isInitiateModalOpen}
        onClose={() => setIsInitiateModalOpen(false)}
        onSubmit={handleCreateWorkflow}
      />

      <BatchReviewModal
        isOpen={isBatchReviewModalOpen}
        onClose={() => setIsBatchReviewModalOpen(false)}
        approvals={approvals}
        onBatchApprove={handleBatchApprove}
        onBatchReject={handleBatchReject}
      />

      <DailyBriefingModal
        isOpen={isDailyBriefingModalOpen}
        onClose={() => setIsDailyBriefingModalOpen(false)}
        approvals={approvals}
        controls={controls}
        daemons={daemons}
      />

      <SearchCommandModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        approvals={approvals}
        controls={controls}
        daemons={daemons}
        onSelectApproval={(item) => setSelectedApproval(item)}
        onNavigateTab={(tab) => setCurrentTab(tab)}
      />
    </div>
  );
}
