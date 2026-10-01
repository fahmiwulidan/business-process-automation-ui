import React, { useState } from 'react';
import { ApprovalItem } from '../types';

interface UrgentApprovalDrawerProps {
  item: ApprovalItem | null;
  onClose: () => void;
  onApprove: (id: string, notes: string) => void;
  onReject: (id: string, notes: string) => void;
  onDelegate: (id: string, delegateTo: string) => void;
}

export const UrgentApprovalDrawer: React.FC<UrgentApprovalDrawerProps> = ({
  item,
  onClose,
  onApprove,
  onReject,
  onDelegate,
}) => {
  const [auditNotes, setAuditNotes] = useState('');
  const [delegateTarget, setDelegateTarget] = useState('David K. (DevOps Lead)');
  const [showDelegateInput, setShowDelegateInput] = useState(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Close on Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const handleApproveAction = () => {
    const note = auditNotes.trim() || 'Attested and authorized per statutory compliance guidelines by Eleanor Vance.';
    onApprove(item.id, note);
    setActionSuccessMessage('Request successfully authorized and sealed in audit ledger.');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleRejectAction = () => {
    if (!auditNotes.trim()) {
      alert('Mandatory audit rejection notes are required for statutory non-repudiation.');
      return;
    }
    onReject(item.id, auditNotes);
    setActionSuccessMessage('Request rejected with audit justification.');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleDelegateAction = () => {
    onDelegate(item.id, delegateTarget);
    setActionSuccessMessage(`Authority delegated to ${delegateTarget}.`);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Semi-transparent backdrop retaining ambient queue context */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* 560px Elevated Right Slide-Over Drawer */}
      <div className="approval-drawer relative w-full max-w-[560px] bg-white h-full shadow-2xl z-10 flex flex-col border-l border-[#c5c5d3] animate-in slide-in-from-right duration-250">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#eaedff] bg-surface-container-low/70 flex items-start justify-between">
          <div className="space-y-1 pr-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[12px] font-bold text-primary px-2 py-0.5 rounded bg-surface-container-high">
                {item.workflowId}
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container uppercase">
                {item.category}
              </span>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-error text-white">
                {item.priority}
              </span>
            </div>
            <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-on-surface leading-snug">
              {item.title}
            </h2>
            <p className="text-[12px] text-on-surface-variant">
              {item.description}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant transition-colors"
            title="Close drawer (Esc)"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Success toast if action performed */}
        {actionSuccessMessage && (
          <div className="m-4 p-3 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-[12px] font-medium flex items-center gap-2 animate-in fade-in">
            <span className="material-symbols-outlined text-[18px] text-emerald-600">verified</span>
            <span>{actionSuccessMessage}</span>
          </div>
        )}

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {/* SLA Threat Strip */}
          <div className="p-3.5 rounded bg-error-container/30 border border-error-container flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-error animate-ping"></span>
              <div>
                <div className="text-[12px] font-bold text-error">
                  {item.slaCountdown.initialDisplay}
                </div>
                <div className="text-[10px] text-error font-medium">
                  {item.slaCountdown.riskTarget}
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-outline uppercase font-semibold">Deciding Officer</span>
              <div className="text-[12px] font-bold text-on-surface">Eleanor Vance</div>
            </div>
          </div>

          {/* Requester Context */}
          <div className="p-3.5 rounded bg-surface-container-low/50 border border-[#eaedff] space-y-2">
            <div className="text-[11px] font-semibold text-outline uppercase tracking-wider">
              Requester Profile
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-container text-white font-mono text-[12px] font-bold flex items-center justify-center">
                {item.requester.initials}
              </div>
              <div>
                <div className="text-[13px] font-bold text-on-surface">{item.requester.name}</div>
                <div className="text-[11px] text-on-surface-variant">
                  {item.requester.role} • {item.requester.department}
                </div>
              </div>
            </div>
          </div>

          {/* Justification & Scope */}
          <div className="space-y-2">
            <div className="text-[11px] font-semibold text-outline uppercase tracking-wider">
              Statutory Justification &amp; Business Need
            </div>
            <div className="p-3 bg-surface-container-lowest border border-[#dae2fd] rounded text-[12.5px] leading-relaxed text-on-surface">
              {item.details.justification}
            </div>
            <div className="p-2.5 bg-surface-container-low rounded text-[11.5px] text-on-surface-variant font-mono">
              <strong className="text-on-surface font-sans">Technical Scope:</strong> {item.details.scope}
            </div>
          </div>

          {/* Metadata Parameters Grid */}
          <div className="grid grid-cols-2 gap-3 text-[12px]">
            <div className="p-2.5 rounded bg-surface-container-low border border-[#eaedff]">
              <span className="text-[10px] font-semibold text-outline uppercase">Cost Impact</span>
              <div className="font-mono font-bold text-on-surface mt-0.5">{item.details.costImpact || '$0.00'}</div>
            </div>
            <div className="p-2.5 rounded bg-surface-container-low border border-[#eaedff]">
              <span className="text-[10px] font-semibold text-outline uppercase">Permitted Window</span>
              <div className="font-mono font-bold text-on-surface mt-0.5">{item.details.requestedDuration || '4 hours'}</div>
            </div>
          </div>

          {/* Multi-tier Approval Chain (DAG view) */}
          <div className="space-y-2">
            <div className="text-[11px] font-semibold text-outline uppercase tracking-wider flex items-center justify-between">
              <span>Multi-Tier Authorization Chain</span>
              <span className="font-mono text-[10px] text-primary font-semibold">Dual-Custody Gate</span>
            </div>
            <div className="space-y-2">
              {item.details.approvalChain.map((node) => (
                <div
                  key={node.step}
                  className={`p-2.5 rounded border text-[12px] flex items-center justify-between ${
                    node.status === 'approved'
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                      : node.status === 'current'
                      ? 'bg-primary-fixed/40 border-primary text-primary font-semibold ring-1 ring-primary/20'
                      : 'bg-surface-container-low border-[#dae2fd] text-on-surface-variant'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold bg-white shadow-xs">
                      {node.status === 'approved' ? '✓' : node.step}
                    </span>
                    <div>
                      <div className="font-semibold">{node.title}</div>
                      <div className="text-[11px] opacity-80">{node.approver}</div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase font-semibold">
                    {node.status === 'approved' ? `Signed ${node.timestamp}` : node.status === 'current' ? 'Awaiting Eleanor' : 'Queued'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Automated Policy Invariants */}
          <div className="space-y-2">
            <div className="text-[11px] font-semibold text-outline uppercase tracking-wider">
              Automated Compliance Invariants
            </div>
            <div className="space-y-1.5">
              {item.details.policyInvariants.map((inv, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded bg-surface-container-low border border-[#eaedff] flex items-start gap-2 text-[11.5px]"
                >
                  <span
                    className={`material-symbols-outlined text-[16px] shrink-0 mt-0.5 ${
                      inv.status === 'passed' ? 'text-secondary' : 'text-tertiary-container'
                    }`}
                  >
                    {inv.status === 'passed' ? 'verified' : 'warning'}
                  </span>
                  <div>
                    <div className="font-semibold text-on-surface">{inv.name}</div>
                    <div className="text-on-surface-variant text-[11px]">{inv.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cryptographic Hash Evidence */}
          <div className="p-2.5 rounded bg-surface-container-low border border-[#dae2fd] text-[11px] font-mono text-outline">
            <span className="uppercase text-[9.5px] font-semibold text-on-surface-variant block mb-0.5">
              Cryptographic Audit Anchor
            </span>
            <div className="text-primary truncate select-all">{item.details.evidenceAuditHash}</div>
          </div>

          {/* Decision Notes Input */}
          <div className="space-y-1.5 pt-2 border-t border-[#eaedff]">
            <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider">
              Statutory Attestation &amp; Sign-off Notes
            </label>
            <textarea
              rows={2}
              value={auditNotes}
              onChange={(e) => setAuditNotes(e.target.value)}
              placeholder="Enter audit signing notes (e.g., 'Validated against statutory SOX control matrix, approved for 4h emergency window')..."
              className="w-full p-2.5 rounded border border-[#c5c5d3] text-[12px] placeholder:text-outline text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Delegation Option */}
          {showDelegateInput && (
            <div className="p-3 bg-surface-container-low rounded border border-[#dae2fd] space-y-2 text-[12px]">
              <span className="font-semibold text-on-surface">Delegate Escalation Authority:</span>
              <select
                value={delegateTarget}
                onChange={(e) => setDelegateTarget(e.target.value)}
                className="w-full p-2 bg-white border border-[#c5c5d3] rounded text-[12px]"
              >
                <option value="David K. (DevOps Lead)">David K. (DevOps Lead)</option>
                <option value="Alex Rivera (SecOps Principal)">Alex Rivera (SecOps Principal)</option>
                <option value="Sarah Jenkins (VP Controller)">Sarah Jenkins (VP Controller)</option>
                <option value="CISO Deputy Officer">CISO Deputy Officer</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowDelegateInput(false)}
                  className="px-2.5 py-1 text-[11px] text-on-surface-variant hover:text-on-surface"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelegateAction}
                  className="px-3 py-1 bg-primary text-white text-[11px] font-semibold rounded"
                >
                  Confirm Delegation
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Action Bar */}
        <div className="approval-drawer-actions p-4 border-t border-[#eaedff] bg-surface-container-low/90 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDelegateInput(!showDelegateInput)}
              className="px-3 py-1.5 rounded border border-[#c5c5d3] hover:bg-surface-container-high text-[12px] font-semibold text-on-surface transition-colors"
            >
              Delegate...
            </button>
            <button
              onClick={handleRejectAction}
              className="px-3.5 py-1.5 rounded border border-error text-error hover:bg-error-container/30 text-[12px] font-semibold transition-colors"
            >
              Reject
            </button>
          </div>

          <button
            onClick={handleApproveAction}
            className="flex-1 max-w-[220px] flex items-center justify-center gap-1.5 px-4 py-2 rounded bg-primary text-white hover:bg-primary-container text-[12.5px] font-bold shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[17px]">verified</span>
            <span>Approve Elevation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
