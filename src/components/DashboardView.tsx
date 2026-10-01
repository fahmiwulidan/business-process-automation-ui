import React, { useState, useEffect } from 'react';
import {
  ApprovalItem,
  SubmittedRequest,
  GovernanceControl,
  AutomationDaemon,
  RoleFilter,
} from '../types';

interface DashboardViewProps {
  approvals: ApprovalItem[];
  myRequests: SubmittedRequest[];
  controls: GovernanceControl[];
  daemons: AutomationDaemon[];
  currentRole: RoleFilter;
  onSelectRole: (role: RoleFilter) => void;
  onInspectApproval: (item: ApprovalItem) => void;
  onOpenInitiateWorkflow: () => void;
  onOpenBatchReview: () => void;
  onOpenDailyBriefing: () => void;
  onQuickApprove: (id: string) => void;
  onTriggerDaemon: (id: string) => void;
  onLaunchAttestation: (controlId: string) => void;
  onNavigateTab: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  approvals,
  myRequests,
  controls,
  daemons,
  currentRole,
  onSelectRole,
  onInspectApproval,
  onOpenInitiateWorkflow,
  onOpenBatchReview,
  onOpenDailyBriefing,
  onQuickApprove,
  onTriggerDaemon,
  onLaunchAttestation,
  onNavigateTab,
}) => {
  const [tableFilter, setTableFilter] = useState<'all' | 'at_risk' | 'standard'>('all');
  const [telemetryTimeAgo, setTelemetryTimeAgo] = useState(42);
  const [isSyncing, setIsSyncing] = useState(false);

  // Live countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetryTimeAgo((prev) => (prev >= 60 ? 1 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSyncTelemetry = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setTelemetryTimeAgo(1);
      setIsSyncing(false);
    }, 600);
  };

  // Filter approvals based on table filter and role filter
  const pendingApprovals = approvals.filter((a) => a.status === 'pending');
  const filteredApprovals = pendingApprovals.filter((item) => {
    if (tableFilter === 'at_risk') {
      return item.slaCountdown.riskTier === 'critical' || item.slaCountdown.isOverdue;
    }
    if (tableFilter === 'standard') {
      return item.slaCountdown.riskTier !== 'critical' && !item.slaCountdown.isOverdue;
    }
    return true;
  });

  const urgentCount = pendingApprovals.filter(
    (a) => a.slaCountdown.riskTier === 'critical' || a.slaCountdown.isOverdue
  ).length;

  return (
    <div className="w-full space-y-6">
      {/* 1. Header Command Banner */}
      <section className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex flex-col gap-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            {/* Urgent Status Line */}
            <div className="flex items-center flex-wrap gap-2 text-on-surface-variant text-[11px] font-mono">
              <span className="inline-block w-2 h-2 rounded-full bg-error animate-pulse"></span>
              <span className="text-error font-bold uppercase tracking-wider">
                EXECUTIVE ACTION REQUIRED
              </span>
              <span className="text-outline-variant">•</span>
              <span>Reporting Period: Today, Oct 24</span>
              <span className="text-outline-variant">•</span>
              <span>SLA Zone: UTC-4</span>
            </div>

            <h1 className="font-['Hanken_Grotesk'] text-2xl font-bold text-on-surface tracking-tight truncate">
              Good morning, Eleanor. You have{' '}
              <span className="text-error font-bold underline decoration-error/40 underline-offset-4">
                {pendingApprovals.length} urgent actions
              </span>
              ...
            </h1>
            <p className="text-[13px] text-on-surface-variant max-w-3xl">
              {urgentCount} approvals risk breaching statutory SLA thresholds within 2 hours.
              Continuous governance engines are operating in active monitoring mode.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              onClick={onOpenDailyBriefing}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-surface-container-low hover:bg-surface-container text-on-surface text-[12.5px] font-semibold transition-colors border border-[#eaedff]"
            >
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">description</span>
              <span>Export Daily Briefing</span>
            </button>
            <button
              onClick={onOpenBatchReview}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-primary hover:bg-primary-container text-white text-[12.5px] font-bold shadow-xs transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[16px]">rule</span>
              <span>Batch Review Queue ({pendingApprovals.length})</span>
            </button>
          </div>
        </div>

        {/* Persona Multi-Role Filter Chips Bar */}
        <div className="pt-2 border-t border-[#f2f3ff] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onSelectRole('all')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-[12px] transition-colors ${
                currentRole === 'all'
                  ? 'bg-primary text-white font-bold shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">grid_view</span>
              <span>All Roles (Active)</span>
              <span className="font-mono text-[10px] ml-0.5 px-1.5 py-0.2 rounded bg-black/15 font-bold">13</span>
            </button>

            <button
              onClick={() => onSelectRole('approver')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-[12px] transition-colors ${
                currentRole === 'approver'
                  ? 'bg-primary text-white font-bold shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">assignment_late</span>
              <span>Approver</span>
              <span className="font-mono text-[10px] ml-0.5 px-1.5 py-0.2 rounded bg-error-container text-on-error-container font-bold">
                {pendingApprovals.length} items
              </span>
            </button>

            <button
              onClick={() => onSelectRole('requester')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-[12px] transition-colors ${
                currentRole === 'requester'
                  ? 'bg-primary text-white font-bold shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">inbox</span>
              <span>Requester</span>
              <span className="font-mono text-[10px] ml-0.5 px-1.5 py-0.2 rounded bg-surface-container-high text-on-surface-variant font-bold">
                {myRequests.length} active
              </span>
            </button>

            <button
              onClick={() => onSelectRole('control_owner')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-[12px] transition-colors ${
                currentRole === 'control_owner'
                  ? 'bg-primary text-white font-bold shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">shield</span>
              <span>Control Owner</span>
              <span className="font-mono text-[10px] ml-0.5 px-1.5 py-0.2 rounded bg-tertiary-fixed text-on-tertiary-fixed-variant font-bold">
                2 expiring
              </span>
            </button>

            <button
              onClick={() => onSelectRole('automation_owner')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-[12px] transition-colors ${
                currentRole === 'automation_owner'
                  ? 'bg-primary text-white font-bold shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">precision_manufacturing</span>
              <span>Automation Owner</span>
              <span className="font-mono text-[10px] ml-0.5 px-1.5 py-0.2 rounded bg-surface-container-high font-bold">
                1 alert
              </span>
            </button>
          </div>

          <button
            onClick={handleSyncTelemetry}
            className="flex items-center gap-1 text-[11px] text-on-surface-variant hover:text-primary transition-colors font-mono"
            title="Click to force resync telemetry"
          >
            <span className={`material-symbols-outlined text-[15px] ${isSyncing ? 'animate-spin' : ''}`}>
              sync
            </span>
            <span>Telemetry synchronized {telemetryTimeAgo}s ago</span>
          </button>
        </div>
      </section>

      {/* 2. Top Metric Tiles (4 Cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Metric 1: Urgent Approvals */}
        <div
          onClick={() => filteredApprovals[0] && onInspectApproval(filteredApprovals[0])}
          className="bg-surface-container-lowest p-4 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
              Urgent Approvals
            </span>
            <div className="w-8 h-8 rounded bg-error-container/40 flex items-center justify-center text-error group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[18px]">assignment_late</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-['Hanken_Grotesk'] text-2xl font-bold text-on-surface">
              {pendingApprovals.length}
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-error-container text-error text-[11px] font-mono font-bold">
              3 Breaching Soon
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-on-surface-variant mt-2 pt-2 border-t border-[#f2f3ff]">
            <span className="text-error font-medium flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
              &lt; 2 hrs remaining
            </span>
            <span className="text-primary font-semibold group-hover:underline flex items-center gap-0.5">
              Open Drawer →
            </span>
          </div>
        </div>

        {/* Metric 2: SLA Compliance Rate */}
        <div
          onClick={() => onNavigateTab('sla-reports')}
          className="bg-surface-container-lowest p-4 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
              SLA Compliance Rate
            </span>
            <div className="w-8 h-8 rounded bg-secondary-container/50 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-['Hanken_Grotesk'] text-2xl font-bold text-on-surface">
              96.4%
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container text-[11px] font-mono font-bold">
              +1.8%
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-on-surface-variant mt-2 pt-2 border-t border-[#f2f3ff]">
            <span>Target: 95.0% enterprise baseline</span>
            <span className="text-secondary font-semibold font-mono">Healthy</span>
          </div>
        </div>

        {/* Metric 3: Control Attestations */}
        <div
          onClick={() => onNavigateTab('controls-registry')}
          className="bg-surface-container-lowest p-4 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
              Control Attestations
            </span>
            <div className="w-8 h-8 rounded bg-tertiary-fixed/60 flex items-center justify-center text-on-tertiary-container group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[18px]">shield</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-['Hanken_Grotesk'] text-2xl font-bold text-on-surface">
              2 Active
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed-variant text-[11px] font-mono font-bold">
              Expiring Soon
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-on-surface-variant mt-2 pt-2 border-t border-[#f2f3ff]">
            <span className="truncate max-w-[200px] font-mono">SOC2-CC6.1 (14d) • ISO-A.1...</span>
            <span className="material-symbols-outlined text-[14px] text-outline">open_in_new</span>
          </div>
        </div>

        {/* Metric 4: Active Daemons */}
        <div
          onClick={() => onNavigateTab('schedules-triggers')}
          className="bg-surface-container-lowest p-4 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
              Active Daemons
            </span>
            <div className="w-8 h-8 rounded bg-primary-fixed/50 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[18px]">precision_manufacturing</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-['Hanken_Grotesk'] text-2xl font-bold text-on-surface">
              14 / 14
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant text-[11px] font-mono font-bold">
              Operational
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-on-surface-variant mt-2 pt-2 border-t border-[#f2f3ff]">
            <span className="font-mono">Next: SOC2 Scrape in 18m</span>
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
          </div>
        </div>
      </section>

      {/* 3. Urgent Approval Queue Approaching SLA (Table) */}
      <section className="bg-surface-container-lowest rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Table Toolbar Header */}
        <div className="p-4 bg-surface-container-low/40 border-b border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-primary">warning</span>
            <div>
              <h2 className="font-['Hanken_Grotesk'] text-[15px] font-bold text-on-surface">
                Urgent Approval Queue Approaching SLA
              </h2>
              <p className="text-[11px] text-on-surface-variant">
                Items where Eleanor Vance is designated as Primary Deciding Officer or Executive Escalation Authority
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex p-0.5 rounded bg-surface-container-high text-[11px]">
              <button
                onClick={() => setTableFilter('all')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  tableFilter === 'all'
                    ? 'bg-white text-on-surface font-bold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                All ({pendingApprovals.length})
              </button>
              <button
                onClick={() => setTableFilter('at_risk')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  tableFilter === 'at_risk'
                    ? 'bg-white text-on-surface font-bold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                SLA At Risk ({urgentCount})
              </button>
              <button
                onClick={() => setTableFilter('standard')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  tableFilter === 'standard'
                    ? 'bg-white text-on-surface font-bold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Standard ({pendingApprovals.length - urgentCount})
              </button>
            </div>

            <button
              className="h-7 w-7 rounded bg-surface-container-low hover:bg-surface-container text-on-surface-variant flex items-center justify-center border border-[#dae2fd]"
              title="Filter columns"
            >
              <span className="material-symbols-outlined text-[15px]">tune</span>
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-[12px] border-collapse">
            <thead className="bg-surface-container-low text-on-surface-variant font-mono text-[10.5px] uppercase tracking-wider border-b border-[#eaedff]">
              <tr>
                <th className="py-2.5 px-4 font-semibold">Workflow &amp; ID</th>
                <th className="py-2.5 px-4 font-semibold">Requester</th>
                <th className="py-2.5 px-4 font-semibold">Role Context</th>
                <th className="py-2.5 px-4 font-semibold">SLA Status &amp; Countdown</th>
                <th className="py-2.5 px-4 font-semibold">Risk Rating</th>
                <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f2f3ff] text-on-surface">
              {filteredApprovals.map((item) => {
                const isOverdue = item.slaCountdown.isOverdue;
                const isCritical = item.slaCountdown.riskTier === 'critical';

                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-surface-container-low/70 transition-colors ${
                      isOverdue ? 'bg-error-container/15' : ''
                    }`}
                  >
                    {/* Workflow & ID */}
                    <td className="py-3 px-4 max-w-sm">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`font-mono text-[11px] font-bold ${
                              isOverdue ? 'text-error' : 'text-primary'
                            }`}
                          >
                            {item.workflowId}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface-container font-medium text-on-surface-variant">
                            {item.category}
                          </span>
                        </div>
                        <button
                          onClick={() => onInspectApproval(item)}
                          className="text-left font-['Hanken_Grotesk'] text-[13px] font-bold text-on-surface hover:text-primary transition-colors truncate mt-0.5"
                        >
                          {item.title}
                        </button>
                        <span className="text-[11px] text-on-surface-variant truncate">
                          {item.description}
                        </span>
                      </div>
                    </td>

                    {/* Requester */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center font-mono text-[10px] font-bold text-on-surface">
                          {item.requester.initials}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-[12px] text-on-surface leading-tight">
                            {item.requester.name}
                          </span>
                          <span className="text-[10.5px] text-on-surface-variant">
                            {item.requester.role} • {item.requester.department}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Role Context */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-semibold text-[12px] text-on-surface">
                          {item.roleContext.roleTitle}
                        </span>
                        <span className="text-[10.5px] text-on-surface-variant font-mono">
                          {item.roleContext.stepInfo}
                        </span>
                      </div>
                    </td>

                    {/* SLA Status & Countdown */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex flex-col gap-0.5">
                        <span
                          className={`inline-flex items-center gap-1.5 w-max px-2 py-0.5 rounded font-mono text-[11px] font-bold ${
                            isOverdue
                              ? 'bg-error-container text-on-error-container'
                              : isCritical
                              ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                              : 'bg-surface-container-high text-on-surface'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isOverdue ? 'bg-error animate-ping' : isCritical ? 'bg-error animate-pulse' : 'bg-secondary'
                            }`}
                          ></span>
                          {item.slaCountdown.initialDisplay}
                        </span>
                        <span
                          className={`text-[10px] font-medium ${
                            isOverdue ? 'text-error' : isCritical ? 'text-tertiary-container' : 'text-on-surface-variant'
                          }`}
                        >
                          {item.slaCountdown.riskTarget}
                        </span>
                      </div>
                    </td>

                    {/* Risk Rating */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded font-mono text-[10.5px] font-bold ${
                          item.priority.includes('CRITICAL')
                            ? 'bg-error text-white'
                            : item.priority.includes('HIGH')
                            ? 'bg-tertiary-container text-white'
                            : 'bg-surface-container-highest text-on-surface'
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => onInspectApproval(item)}
                          className="px-2.5 py-1 rounded bg-primary hover:bg-primary-container text-white font-semibold text-[11.5px] transition-colors shadow-xs"
                        >
                          Review &amp; Decide
                        </button>
                        <button
                          onClick={() => onQuickApprove(item.id)}
                          className="h-7 w-7 rounded bg-surface-container hover:bg-secondary-container text-on-surface hover:text-on-secondary-container flex items-center justify-center transition-colors"
                          title="Quick Approve"
                        >
                          <span className="material-symbols-outlined text-[16px]">check</span>
                        </button>
                        <button
                          onClick={() => onInspectApproval(item)}
                          className="h-7 w-7 rounded hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors"
                          title="More Actions"
                        >
                          <span className="material-symbols-outlined text-[16px]">more_vert</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="py-2.5 px-4 bg-surface-container-low flex items-center justify-between text-[11px] text-on-surface-variant border-t border-[#eaedff]">
          <span>
            Showing {filteredApprovals.length} of {pendingApprovals.length} priority items awaiting Eleanor's explicit attestation
          </span>
          <button
            onClick={() => onNavigateTab('pending-approvals')}
            className="font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <span>View All {pendingApprovals.length} Requests in Audit Ledger</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* 4. Split Two-Column Grid: Workflows/Daemons & Controls/Benchmarks */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Module: My Submitted Requests & Tracking */}
          <div className="bg-surface-container-lowest p-4 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[19px] text-secondary">inbox</span>
                <div>
                  <h3 className="font-['Hanken_Grotesk'] text-[14px] font-bold text-on-surface">
                    My Submitted Requests &amp; Tracking
                  </h3>
                  <p className="text-[11px] text-on-surface-variant">
                    Workflows authored by Eleanor Vance currently in multi-stage approval pipelines
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenInitiateWorkflow}
                className="text-[11.5px] font-bold text-primary hover:underline"
              >
                + New Request
              </button>
            </div>

            <div className="space-y-2">
              {myRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-3 rounded bg-surface-container-low/60 hover:bg-surface-container-low transition-colors border border-[#eaedff] flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] font-bold text-primary">{req.id}</span>
                      <span className="font-semibold text-[12.5px] text-on-surface">{req.title}</span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10.5px] font-semibold ${
                        req.status === 'Approved & Sealed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : req.status === 'In Progress'
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {req.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-[11px] text-on-surface-variant gap-1">
                    <div>
                      <span>Stage: <strong className="text-on-surface">{req.stageText}</strong></span>
                      <span className="mx-1.5 text-outline-variant">•</span>
                      <span>Assigned: {req.reviewerText}</span>
                    </div>
                    <span className="font-mono text-[10px]">{req.submittedDate}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-[#dae2fd] rounded-full h-1.5 mt-1 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${
                        req.status === 'Approved & Sealed' ? 'bg-secondary' : 'bg-primary'
                      }`}
                      style={{ width: `${req.progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Module: Owned Automation Daemons & Triggers */}
          <div className="bg-surface-container-lowest p-4 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[19px] text-primary">schedule</span>
                <div>
                  <h3 className="font-['Hanken_Grotesk'] text-[14px] font-bold text-on-surface">
                    Owned Automation Daemons &amp; Triggers
                  </h3>
                  <p className="text-[11px] text-on-surface-variant">
                    Automated continuous evidence collectors supervised by Eleanor Vance
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-secondary font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                All Active
              </span>
            </div>

            <div className="space-y-2">
              {daemons.map((daemon) => (
                <div
                  key={daemon.id}
                  className="p-3 rounded bg-surface-container-low/60 border border-[#eaedff] flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-primary shadow-xs border border-[#dae2fd]">
                      <span className="material-symbols-outlined text-[18px]">precision_manufacturing</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[12.5px] text-on-surface">{daemon.name}</div>
                      <div className="text-[11px] text-on-surface-variant font-mono">
                        Cron: {daemon.cronExpression} • Last: {daemon.lastExecution}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-outline block">NEXT EXECUTION</span>
                      <span className="font-mono text-[12px] font-bold text-on-surface">
                        {daemon.nextExecutionIn}
                      </span>
                    </div>
                    <button
                      onClick={() => onTriggerDaemon(daemon.id)}
                      className="h-8 w-8 rounded bg-white hover:bg-primary hover:text-white text-on-surface-variant flex items-center justify-center border border-[#dae2fd] shadow-xs transition-colors"
                      title="Trigger immediate execution"
                    >
                      <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Module: Continuous Controls Governance */}
          <div className="bg-surface-container-lowest p-4 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[19px] text-on-tertiary-container">
                  verified_user
                </span>
                <div>
                  <h3 className="font-['Hanken_Grotesk'] text-[14px] font-bold text-on-surface">
                    Continuous Controls Governance
                  </h3>
                  <p className="text-[11px] text-on-surface-variant">
                    2 controls approaching periodic attestation deadline
                  </p>
                </div>
              </div>
              <span className="font-mono text-[10.5px] font-bold px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed-variant">
                2 Critical
              </span>
            </div>

            <div className="space-y-2.5">
              {/* Control 1: SOX */}
              <div className="p-3 rounded bg-surface-container-low/60 border border-[#eaedff] flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-primary">CTL-SOX-301</span>
                  <span className="font-mono text-[10.5px] text-error font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    Expires in 14 days
                  </span>
                </div>
                <div className="font-semibold text-[13px] text-on-surface">
                  Privileged Access Re-certification
                </div>
                <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                  <span>Health: <strong className="text-secondary font-mono">98.2% Passing</strong></span>
                  <span className="font-mono">Deadline: Nov 7, 2024</span>
                </div>
                <button
                  onClick={() => onLaunchAttestation('CTL-SOX-301')}
                  className="w-full mt-1 py-1.5 rounded bg-primary hover:bg-primary-container text-white text-[11.5px] font-bold transition-colors shadow-xs"
                >
                  Launch Attestation Cycle
                </button>
              </div>

              {/* Control 2: ISO */}
              <div className="p-3 rounded bg-surface-container-low/60 border border-[#eaedff] flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-primary">CTL-ISO-112</span>
                  <span className="font-mono text-[10.5px] text-tertiary-container font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    Expires in 22 days
                  </span>
                </div>
                <div className="font-semibold text-[13px] text-on-surface">
                  Cryptographic Key Lifecycle Review
                </div>
                <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                  <span>Health: <strong className="text-secondary font-mono">100% Compliant</strong></span>
                  <span className="font-mono">Deadline: Nov 15, 2024</span>
                </div>
                <button
                  onClick={() => onLaunchAttestation('CTL-ISO-112')}
                  className="w-full mt-1 py-1.5 rounded bg-surface-container-high hover:bg-surface-variant text-on-surface text-[11.5px] font-bold transition-colors"
                >
                  Review Evidence Artifacts
                </button>
              </div>

              {/* Control 3: NIST */}
              <div className="p-3 rounded bg-error-container/20 border border-error-container/40 flex flex-col gap-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono font-bold text-error">CTL-NIST-044</span>
                  <span className="font-mono text-[10px] text-on-surface-variant">Expires in 39 days (Dec 02)</span>
                </div>
                <div className="font-semibold text-[12.5px] text-on-surface">
                  Third-Party Vendor Risk Re-scoring
                </div>
                <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                  <span className="text-secondary font-medium">Status: Fully Compliant</span>
                  <span className="font-mono">12 vendors evaluated</span>
                </div>
              </div>
            </div>
          </div>

          {/* Module: Turnaround Benchmarks (Eleanor Vance) */}
          <div className="bg-surface-container-lowest p-4 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[19px] text-primary">speed</span>
                <div>
                  <h3 className="font-['Hanken_Grotesk'] text-[14px] font-bold text-on-surface">
                    Turnaround Benchmarks (Eleanor Vance)
                  </h3>
                  <p className="text-[11px] text-on-surface-variant">
                    Personal approval velocity over past 30 days
                  </p>
                </div>
              </div>
              <div className="text-right font-mono text-[11px]">
                <span className="text-outline uppercase text-[10px] block">MTTD:</span>
                <span className="font-bold text-on-surface">2.4h</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded bg-surface-container-low border border-[#eaedff]">
                <span className="text-[10px] font-semibold text-outline uppercase tracking-wider">
                  AVG TURNAROUND
                </span>
                <div className="font-['Hanken_Grotesk'] text-xl font-bold text-on-surface mt-1">
                  2.4 Hours
                </div>
                <span className="text-[10.5px] text-on-surface-variant font-mono mt-0.5 block">
                  Target: &lt; 4.0 Hours
                </span>
              </div>

              <div className="p-3 rounded bg-surface-container-low border border-[#eaedff]">
                <span className="text-[10px] font-semibold text-outline uppercase tracking-wider">
                  DECISIONS (OCT)
                </span>
                <div className="font-['Hanken_Grotesk'] text-xl font-bold text-on-surface mt-1">
                  142 Handled
                </div>
                <span className="text-[10.5px] text-secondary font-mono font-medium mt-0.5 block">
                  98.6% within SLA
                </span>
              </div>
            </div>

            {/* Turnaround Distribution Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-on-surface-variant font-medium">Decision Response Distribution</span>
                <span className="font-mono text-error font-bold">1.4% Breach Rate</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-surface-container flex overflow-hidden">
                <div className="bg-secondary h-full" style={{ width: '62%' }} title="< 1h (62%)"></div>
                <div className="bg-primary h-full" style={{ width: '34%' }} title="1-4h (34%)"></div>
                <div className="bg-error h-full" style={{ width: '4%' }} title="> 4h (4%)"></div>
              </div>
              <div className="grid grid-cols-3 text-center text-[10.5px] font-mono pt-0.5">
                <div className="flex items-center justify-center gap-1 text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span>&lt; 1h (62%)</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span>1-4h (34%)</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-error font-bold">
                  <span className="w-2 h-2 rounded-full bg-error"></span>
                  <span>&gt; 4h (4%)</span>
                </div>
              </div>
            </div>

            {/* Quick Navigation Footer */}
            <div className="pt-2 border-t border-[#f2f3ff] flex flex-wrap items-center justify-between text-[11px]">
              <span className="text-outline">Quick Navigation:</span>
              <div className="flex items-center gap-2 font-semibold">
                <button
                  onClick={() => onNavigateTab('sla-reports')}
                  className="text-primary hover:underline"
                >
                  View SLA Reports
                </button>
                <span className="text-outline-variant">•</span>
                <button
                  onClick={() => onNavigateTab('my-requests')}
                  className="text-primary hover:underline"
                >
                  View All Requests
                </button>
                <span className="text-outline-variant">•</span>
                <button
                  onClick={() => onNavigateTab('controls-registry')}
                  className="text-primary hover:underline"
                >
                  Controls Registry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
