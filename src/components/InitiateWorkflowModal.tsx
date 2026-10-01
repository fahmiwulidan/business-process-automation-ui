import React, { useState } from 'react';
import { ApprovalItem, WorkflowCategory, PriorityLevel } from '../types';

interface InitiateWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newItem: ApprovalItem) => void;
}

export const InitiateWorkflowModal: React.FC<InitiateWorkflowModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [category, setCategory] = useState<WorkflowCategory>('Dual-Custody');
  const [title, setTitle] = useState('');
  const [justification, setJustification] = useState('');
  const [scope, setScope] = useState('');
  const [department, setDepartment] = useState('DevOps Engineering');
  const [costImpact, setCostImpact] = useState('$0.00');
  const [priority, setPriority] = useState<PriorityLevel>('P1 - HIGH');
  const [dualCustody, setDualCustody] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !justification.trim()) {
      alert('Please fill out the Title and Justification fields.');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newWorkflow: ApprovalItem = {
      id: `WF-${randomNum}`,
      workflowId: `#WF-${randomNum}`,
      category,
      title: title.trim(),
      description: `${scope || 'Infrastructure System'} • Justification: ${justification.slice(0, 45)}...`,
      requester: {
        name: 'Eleanor Vance',
        initials: 'EV',
        role: 'Director of Compliance',
        department: department,
      },
      roleContext: {
        roleTitle: 'Initiating Authority',
        stepInfo: 'Step 1 of 2 (Submitted)',
        isFinal: false,
      },
      slaCountdown: {
        remainingSeconds: priority === 'P0 - CRITICAL' ? 3600 : priority === 'P1 - HIGH' ? 7200 : 28800,
        initialDisplay: priority === 'P0 - CRITICAL' ? '1h 00m remaining' : priority === 'P1 - HIGH' ? '2h 00m remaining' : '8h 00m remaining',
        riskTarget: priority === 'P0 - CRITICAL' ? 'Critical SLA Risk (< 2h target)' : 'Within SLA standard',
        riskTier: priority === 'P0 - CRITICAL' ? 'critical' : priority === 'P1 - HIGH' ? 'warning' : 'track',
      },
      priority,
      status: 'pending',
      details: {
        justification: justification.trim(),
        scope: scope.trim() || 'Global Production Infrastructure (US-East)',
        impactedSystems: ['k8s-cluster-prod', 'vault-secrets-east', 'datadog-telemetry'],
        costImpact: costImpact || '$0.00',
        requestedDuration: '24 hours standard window',
        evidenceAuditHash: `sha256:${Math.random().toString(16).substring(2, 34)}`,
        createdTimestamp: 'Just now',
        policyInvariants: [
          { name: 'Dual-Custody Requirement', status: dualCustody ? 'passed' : 'warning', detail: dualCustody ? 'Dual authorization policy enforced' : 'Single approver bypass requested' },
          { name: 'Audit Trail Signature Registration', status: 'passed', detail: 'Cryptographic nonce reserved in ledger' },
        ],
        approvalChain: [
          { step: 1, totalSteps: 2, title: 'Department Lead Endorsement', approver: 'Eleanor Vance (Author)', status: 'approved', timestamp: 'Just now' },
          { step: 2, totalSteps: 2, title: 'Secondary Executive Sign-off', approver: 'CISO / Risk Committee', status: 'current' },
        ],
      },
    };

    onSubmit(newWorkflow);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-[#c5c5d3] z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#eaedff] bg-surface-container-low/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[18px]">add_task</span>
            </div>
            <div>
              <h3 className="font-['Hanken_Grotesk'] text-[16px] font-bold text-on-surface">
                Initiate Governance Workflow
              </h3>
              <p className="text-[11px] text-on-surface-variant">
                Enforces automated policy checks, dual-custody invariants, and immutable ledger registration
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-[12.5px]">
          {/* Category & Priority Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-1">
                Workflow Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as WorkflowCategory)}
                className="w-full h-9 px-3 bg-surface-container-low border border-[#c5c5d3] rounded text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="Dual-Custody">Dual-Custody DB Access</option>
                <option value="SOX Audit">SOX Audit Control Exception</option>
                <option value="Vendor Risk">Vendor Security Assessment</option>
                <option value="FinOps">Enterprise Cloud Spend Override</option>
                <option value="Security Exception">IT Security Firewall Exception</option>
                <option value="CapEx Request">CapEx Hardware Procurement</option>
                <option value="IT Access">Privileged IT Access Grant</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-1">
                Target SLA Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                className="w-full h-9 px-3 bg-surface-container-low border border-[#c5c5d3] rounded text-on-surface focus:outline-none focus:ring-1 focus:ring-primary font-mono"
              >
                <option value="P0 - CRITICAL">P0 - CRITICAL (&lt; 2h SLA)</option>
                <option value="P1 - HIGH">P1 - HIGH (&lt; 4h SLA)</option>
                <option value="P2 - MEDIUM">P2 - MEDIUM (&lt; 24h SLA)</option>
                <option value="P3 - STANDARD">P3 - STANDARD (&lt; 48h SLA)</option>
              </select>
            </div>
          </div>

          {/* Workflow Title */}
          <div>
            <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-1">
              Workflow Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Emergency Production Hotfix DB Access for Aurora Cluster"
              className="w-full h-9 px-3 bg-white border border-[#c5c5d3] rounded text-on-surface focus:outline-none focus:ring-1 focus:ring-primary text-[13px]"
            />
          </div>

          {/* Scope and Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-1">
                Target Systems / Scope
              </label>
              <input
                type="text"
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                placeholder="e.g., rds-cluster-prod-01, port 5432"
                className="w-full h-9 px-3 bg-white border border-[#c5c5d3] rounded text-on-surface focus:outline-none focus:ring-1 focus:ring-primary text-[12px]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-1">
                Budget / Cost Impact
              </label>
              <input
                type="text"
                value={costImpact}
                onChange={(e) => setCostImpact(e.target.value)}
                placeholder="e.g., $15,000.00"
                className="w-full h-9 px-3 bg-white border border-[#c5c5d3] rounded text-on-surface focus:outline-none focus:ring-1 focus:ring-primary font-mono text-[12px]"
              />
            </div>
          </div>

          {/* Justification */}
          <div>
            <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-1">
              Statutory Business Justification *
            </label>
            <textarea
              required
              rows={3}
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Provide explicit business rationale, incident ticket numbers, or statutory compliance context..."
              className="w-full p-2.5 bg-white border border-[#c5c5d3] rounded text-on-surface focus:outline-none focus:ring-1 focus:ring-primary text-[12px] leading-relaxed"
            />
          </div>

          {/* Dual-Custody Checkbox */}
          <div className="p-3 rounded bg-surface-container-low/60 border border-[#eaedff] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="dualCustodyCheck"
                checked={dualCustody}
                onChange={(e) => setDualCustody(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary"
              />
              <label htmlFor="dualCustodyCheck" className="text-[12px] font-semibold text-on-surface cursor-pointer">
                Enforce Dual-Custody Multi-Signer Requirement
              </label>
            </div>
            <span className="font-mono text-[10px] text-secondary font-bold">SOX-404 Mandated</span>
          </div>

          {/* Action Bar */}
          <div className="pt-3 border-t border-[#eaedff] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[12px] text-on-surface-variant hover:text-on-surface font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded bg-primary hover:bg-primary-container text-white font-bold text-[12.5px] shadow-sm transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[17px]">send</span>
              <span>Submit to Authorization Chain</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
