import React, { useState } from 'react';
import {
  ApprovalItem,
  SubmittedRequest,
  GovernanceControl,
  AutomationDaemon,
} from '../types';

/* -------------------------------------------------------------------------- */
/* 1. Dedicated Pending Approvals View                                       */
/* -------------------------------------------------------------------------- */
export const PendingApprovalsView: React.FC<{
  approvals: ApprovalItem[];
  onInspect: (item: ApprovalItem) => void;
  onOpenBatchReview: () => void;
  onQuickApprove: (id: string) => void;
}> = ({ approvals, onInspect, onOpenBatchReview, onQuickApprove }) => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'medium'>('all');
  const pending = approvals.filter((a) => a.status === 'pending');
  const filtered = pending.filter((a) => {
    if (filter === 'critical') return a.priority.includes('CRITICAL');
    if (filter === 'high') return a.priority.includes('HIGH');
    if (filter === 'medium') return a.priority.includes('MEDIUM');
    return true;
  });

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-outline uppercase tracking-wider mb-1">
            Workflows / Execution Hub
          </div>
          <h1 className="font-['Hanken_Grotesk'] text-2xl font-bold text-on-surface">
            Pending Approvals Queue
          </h1>
          <p className="text-[13px] text-on-surface-variant">
            Items awaiting Eleanor Vance's statutory review, executive authorization, or delegation
          </p>
        </div>
        <button
          onClick={onOpenBatchReview}
          className="flex items-center gap-1.5 px-4 py-2 rounded bg-primary text-white text-[12.5px] font-bold shadow-xs hover:bg-primary-container"
        >
          <span className="material-symbols-outlined text-[17px]">rule</span>
          <span>Batch Sign Queue ({pending.length})</span>
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="p-3.5 bg-surface-container-low border-b border-[#eaedff] flex items-center justify-between text-[12px]">
          <div className="inline-flex p-0.5 rounded bg-surface-container-high">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded font-semibold ${filter === 'all' ? 'bg-white shadow-xs text-primary' : 'text-on-surface-variant'}`}
            >
              All ({pending.length})
            </button>
            <button
              onClick={() => setFilter('critical')}
              className={`px-3 py-1 rounded font-semibold ${filter === 'critical' ? 'bg-white shadow-xs text-error' : 'text-on-surface-variant'}`}
            >
              P0 Critical
            </button>
            <button
              onClick={() => setFilter('high')}
              className={`px-3 py-1 rounded font-semibold ${filter === 'high' ? 'bg-white shadow-xs text-tertiary-container' : 'text-on-surface-variant'}`}
            >
              P1 High
            </button>
            <button
              onClick={() => setFilter('medium')}
              className={`px-3 py-1 rounded font-semibold ${filter === 'medium' ? 'bg-white shadow-xs text-on-surface' : 'text-on-surface-variant'}`}
            >
              P2 Medium
            </button>
          </div>
          <span className="font-mono text-[11px] text-outline">
            Showing {filtered.length} priority items
          </span>
        </div>

        <div className="divide-y divide-[#f2f3ff]">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-4 hover:bg-surface-container-low/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11.5px] font-bold text-primary">{item.workflowId}</span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.2 rounded bg-surface-container text-on-surface-variant">
                    {item.category}
                  </span>
                  <span className="font-mono text-[10.5px] font-bold px-2 py-0.2 rounded bg-error-container text-on-error-container">
                    {item.slaCountdown.initialDisplay}
                  </span>
                </div>
                <h3
                  onClick={() => onInspect(item)}
                  className="font-bold text-[14px] text-on-surface hover:text-primary cursor-pointer"
                >
                  {item.title}
                </h3>
                <p className="text-[12px] text-on-surface-variant">{item.description}</p>
                <div className="flex items-center gap-3 text-[11px] text-outline font-mono pt-1">
                  <span>Requester: {item.requester.name} ({item.requester.department})</span>
                  <span>•</span>
                  <span>{item.roleContext.stepInfo}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onQuickApprove(item.id)}
                  className="h-8 px-3 rounded bg-secondary-container hover:bg-secondary hover:text-white text-on-secondary-container font-semibold text-[11.5px] transition-colors"
                >
                  Quick Sign
                </button>
                <button
                  onClick={() => onInspect(item)}
                  className="h-8 px-4 rounded bg-primary hover:bg-primary-container text-white font-bold text-[12px] shadow-xs transition-colors"
                >
                  Inspect &amp; Decide
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. My Requests View                                                       */
/* -------------------------------------------------------------------------- */
export const MyRequestsView: React.FC<{
  requests: SubmittedRequest[];
  onOpenInitiateWorkflow: () => void;
}> = ({ requests, onOpenInitiateWorkflow }) => {
  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex items-center justify-between">
        <div>
          <div className="text-[11px] font-mono text-outline uppercase tracking-wider mb-1">
            Workflows / Outbound Tracking Desk
          </div>
          <h1 className="font-['Hanken_Grotesk'] text-2xl font-bold text-on-surface">
            My Submitted Requests
          </h1>
          <p className="text-[13px] text-on-surface-variant">
            Live multi-stage progression tracking for tickets authored by Eleanor Vance
          </p>
        </div>
        <button
          onClick={onOpenInitiateWorkflow}
          className="flex items-center gap-1.5 px-4 py-2 rounded bg-primary text-white text-[12.5px] font-bold shadow-xs hover:bg-primary-container"
        >
          <span className="material-symbols-outlined text-[17px]">add</span>
          <span>New Request</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] font-bold text-primary">{req.id}</span>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container">
                {req.status}
              </span>
            </div>
            <h3 className="font-bold text-[15px] text-on-surface">{req.title}</h3>
            <div className="space-y-1 text-[12px] text-on-surface-variant">
              <div>Current Stage: <strong className="text-on-surface">{req.stageText}</strong></div>
              <div>Assignee: {req.reviewerText}</div>
              <div>Submitted: {req.submittedDate}</div>
            </div>
            <div className="space-y-1 pt-2 border-t border-[#f2f3ff]">
              <div className="flex justify-between text-[11px] font-mono text-outline">
                <span>Progress: {req.progressPercent}%</span>
                <span>{req.remainingText || 'Active'}</span>
              </div>
              <div className="w-full bg-[#eaedff] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all"
                  style={{ width: `${req.progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. Controls Registry View                                                 */
/* -------------------------------------------------------------------------- */
export const ControlsRegistryView: React.FC<{
  controls: GovernanceControl[];
  onLaunchAttestation: (id: string) => void;
}> = ({ controls, onLaunchAttestation }) => {
  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
        <div className="text-[11px] font-mono text-outline uppercase tracking-wider mb-1">
          Governance / Controls &amp; Assets Registry
        </div>
        <h1 className="font-['Hanken_Grotesk'] text-2xl font-bold text-on-surface">
          Continuous Controls Registry
        </h1>
        <p className="text-[13px] text-on-surface-variant max-w-3xl">
          Single source of truth for SOX 404 financial checks, ISO 27001 data protection controls, and NIST cybersecurity compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {controls.map((ctrl) => (
          <div
            key={ctrl.id}
            className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11.5px] font-bold text-primary px-2 py-0.5 rounded bg-surface-container">
                  {ctrl.id}
                </span>
                <span className="text-[11px] font-mono uppercase font-bold text-secondary">
                  {ctrl.standard}
                </span>
              </div>
              <h3 className="font-bold text-[15px] text-on-surface">{ctrl.title}</h3>
              <p className="text-[12px] text-on-surface-variant leading-relaxed">
                {ctrl.scopeNote}
              </p>
              <div className="p-2.5 rounded bg-surface-container-low text-[11.5px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-outline">Health Baseline:</span>
                  <span className="font-mono font-bold text-secondary">{ctrl.complianceHealth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Attestation Deadline:</span>
                  <span className="font-mono text-on-surface font-semibold">{ctrl.deadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Evidence Artifacts:</span>
                  <span className="font-mono text-primary font-semibold">{ctrl.evidenceItemsCount} verified objects</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#f2f3ff] flex items-center justify-between">
              <span className="text-[11px] text-outline">Owner: {ctrl.owner}</span>
              <button
                onClick={() => onLaunchAttestation(ctrl.id)}
                className="px-3.5 py-1.5 rounded bg-primary hover:bg-primary-container text-white text-[11.5px] font-bold transition-colors shadow-xs"
              >
                Launch Attestation
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. Schedules & Triggers View                                              */
/* -------------------------------------------------------------------------- */
export const SchedulesTriggersView: React.FC<{
  daemons: AutomationDaemon[];
  onTriggerDaemon: (id: string) => void;
}> = ({ daemons, onTriggerDaemon }) => {
  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
        <div className="text-[11px] font-mono text-outline uppercase tracking-wider mb-1">
          Automations / Autonomous Orchestration Fabric
        </div>
        <h1 className="font-['Hanken_Grotesk'] text-2xl font-bold text-on-surface">
          Schedules &amp; Automation Triggers
        </h1>
        <p className="text-[13px] text-on-surface-variant">
          Cron engine configuration, continuous evidence collectors, and automated remediation daemons
        </p>
      </div>

      <div className="space-y-3">
        {daemons.map((d) => (
          <div
            key={d.id}
            className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="font-bold text-[14px] text-on-surface">{d.name}</span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-bold">
                  {d.cadence}
                </span>
              </div>
              <p className="text-[12px] text-on-surface-variant font-mono">
                Cron: {d.cronExpression} • Last Execution: {d.lastExecution}
              </p>
              <div className="text-[11px] text-outline font-mono">
                Next scheduled window: <strong className="text-on-surface">{d.nextExecutionIn}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onTriggerDaemon(d.id)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-primary text-white font-bold text-[12px] shadow-xs hover:bg-primary-container"
              >
                <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                <span>Execute Trigger</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 5. SLA Reports & Analytics View                                           */
/* -------------------------------------------------------------------------- */
export const SLAReportsView: React.FC = () => {
  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
        <div className="text-[11px] font-mono text-outline uppercase tracking-wider mb-1">
          Analytics &amp; Intelligence
        </div>
        <h1 className="font-['Hanken_Grotesk'] text-2xl font-bold text-on-surface">
          SLA Reports &amp; Turnaround Velocity
        </h1>
        <p className="text-[13px] text-on-surface-variant">
          Statistical modeling of approval latency, statutory breach probability, and departmental throughput
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff]">
          <span className="text-[11px] font-mono uppercase text-outline">Mean Time to Approve (MTTA)</span>
          <div className="font-['Hanken_Grotesk'] text-3xl font-bold text-on-surface mt-1">2.4h</div>
          <span className="text-[11px] text-secondary font-mono font-semibold">-1.2h vs last month</span>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff]">
          <span className="text-[11px] font-mono uppercase text-outline">Statutory Breach Rate</span>
          <div className="font-['Hanken_Grotesk'] text-3xl font-bold text-error mt-1">1.4%</div>
          <span className="text-[11px] text-outline font-mono">Industry benchmark: 4.8%</span>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff]">
          <span className="text-[11px] font-mono uppercase text-outline">Total Handled Decisions (Q4)</span>
          <div className="font-['Hanken_Grotesk'] text-3xl font-bold text-primary mt-1">482</div>
          <span className="text-[11px] text-secondary font-mono font-semibold">98.6% compliance rate</span>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 6. Approval Trail & Audit Logs View                                       */
/* -------------------------------------------------------------------------- */
export const ApprovalTrailView: React.FC = () => {
  const auditLogs = [
    { id: 'LOG-9921', action: 'Dual-Custody Key Touch', actor: 'Eleanor Vance', target: '#WF-9042', hash: 'sha256:7f81bc2891901ddfa9091e0a8b9e4a8109', time: '14:28:12 UTC' },
    { id: 'LOG-9920', action: 'Control Review Certified', actor: 'Eleanor Vance', target: 'CTL-ISO-112', hash: 'sha256:1029baec390012e88a10901e9124018fec', time: '13:10:45 UTC' },
    { id: 'LOG-9919', action: 'Automated Daemon Run', actor: 'Daemon-SOX-Collector', target: '1,420 assets validated', hash: 'sha256:5890abce910248ff110034a81098de241a', time: '12:00:00 UTC' },
    { id: 'LOG-9918', action: 'Workflow Initiated', actor: 'Marcus Chen', target: '#WF-9042', hash: 'sha256:44810fe1239aa80219cde4710298a091bb', time: '06:48:02 UTC' },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex items-center justify-between">
        <div>
          <div className="text-[11px] font-mono text-outline uppercase tracking-wider mb-1">
            Audit &amp; Compliance / Immutable Ledger
          </div>
          <h1 className="font-['Hanken_Grotesk'] text-2xl font-bold text-on-surface">
            Cryptographic Approval Trail
          </h1>
          <p className="text-[13px] text-on-surface-variant">
            SHA-256 anchored non-repudiation event stream verifying all sign-offs and attestations
          </p>
        </div>
        <span className="font-mono text-[11px] text-secondary font-bold px-2.5 py-1 rounded bg-secondary-container">
          Ledger: Synced &amp; Sealed
        </span>
      </div>

      <div className="table-scroll bg-surface-container-lowest rounded-lg border border-[#eaedff] overflow-hidden">
        <table className="w-full min-w-[720px] text-left text-[12px] border-collapse">
          <thead className="bg-surface-container-low font-mono text-[10.5px] uppercase tracking-wider border-b border-[#eaedff] text-on-surface-variant">
            <tr>
              <th className="py-2.5 px-4 font-semibold">Event ID</th>
              <th className="py-2.5 px-4 font-semibold">Action &amp; Target</th>
              <th className="py-2.5 px-4 font-semibold">Actor / Signer</th>
              <th className="py-2.5 px-4 font-semibold">Cryptographic Hash</th>
              <th className="py-2.5 px-4 font-semibold">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f2f3ff]">
            {auditLogs.map((log) => (
              <tr key={log.id} className="hover:bg-surface-container-low/50">
                <td className="py-3 px-4 font-mono font-bold text-primary">{log.id}</td>
                <td className="py-3 px-4 font-semibold text-on-surface">
                  {log.action} <span className="text-outline font-normal">({log.target})</span>
                </td>
                <td className="py-3 px-4 text-on-surface-variant">{log.actor}</td>
                <td className="py-3 px-4 font-mono text-[11px] text-primary truncate max-w-xs">{log.hash}</td>
                <td className="py-3 px-4 font-mono text-[11px] text-outline">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 7. Workflow Catalog View                                                  */
/* -------------------------------------------------------------------------- */
export const WorkflowCatalogView: React.FC<{
  onOpenInitiateWorkflow: () => void;
}> = ({ onOpenInitiateWorkflow }) => {
  const templates = [
    { title: 'Production Database Access Elevation', cat: 'Dual-Custody', time: '< 2h SLA', desc: 'Temporary root elevation for live triage with automated session logging.' },
    { title: 'Quarterly SOX Control Exception Waiver', cat: 'SOX 404', time: '< 4h SLA', desc: 'Statutory exemption request with interim compensatory spreadsheet audit.' },
    { title: 'Vendor Security Assessment Sign-off', cat: 'Vendor Risk', time: '< 24h SLA', desc: 'Annual SOC2 report audit, GDPR DPA addendum, and risk matrix scoring.' },
    { title: 'Enterprise Cloud Spend Override', cat: 'FinOps', time: '< 24h SLA', desc: 'Exceed standard budget envelope for GPU cluster reservations.' },
    { title: 'IT Security Firewall Egress Rule Bypass', cat: 'Security', time: '< 2h SLA', desc: 'Emergency port 443 egress override for legacy migration gateway.' },
    { title: 'Engineering Hardware Procurement', cat: 'CapEx', time: '< 4h SLA', desc: 'Batch hardware refresh for new engineering hires with Jamf MDM setup.' },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex items-center justify-between">
        <div>
          <div className="text-[11px] font-mono text-outline uppercase tracking-wider mb-1">
            Workflows / Initiation Catalog (MOD-04)
          </div>
          <h1 className="font-['Hanken_Grotesk'] text-2xl font-bold text-on-surface">
            Workflow Template Catalog
          </h1>
          <p className="text-[13px] text-on-surface-variant">
            42 pre-approved schema-validated templates with pre-configured dual-custody authorization DAGs
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((tpl, i) => (
          <div
            key={i}
            className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-surface-container uppercase text-primary">
                  {tpl.cat}
                </span>
                <span className="font-mono text-[10.5px] text-outline font-semibold">{tpl.time}</span>
              </div>
              <h3 className="font-bold text-[14px] text-on-surface">{tpl.title}</h3>
              <p className="text-[12px] text-on-surface-variant leading-relaxed">{tpl.desc}</p>
            </div>
            <button
              onClick={onOpenInitiateWorkflow}
              className="w-full py-1.5 rounded bg-surface-container hover:bg-primary hover:text-white text-primary font-bold text-[12px] transition-colors"
            >
              Configure &amp; Launch →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
