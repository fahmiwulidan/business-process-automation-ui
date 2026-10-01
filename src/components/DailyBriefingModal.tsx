import React, { useState } from 'react';
import { ApprovalItem, GovernanceControl, AutomationDaemon } from '../types';

interface DailyBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  approvals: ApprovalItem[];
  controls: GovernanceControl[];
  daemons: AutomationDaemon[];
}

export const DailyBriefingModal: React.FC<DailyBriefingModalProps> = ({
  isOpen,
  onClose,
  approvals,
  controls,
  daemons,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const pendingApprovals = approvals.filter((a) => a.status === 'pending');
  const criticalApprovals = pendingApprovals.filter(
    (a) => a.slaCountdown.riskTier === 'critical' || a.slaCountdown.isOverdue
  );
  const expiringControls = controls.filter((c) => c.urgency !== 'healthy');

  const briefingText = `
INJANI FLOW - DAILY STATUTORY GOVERNANCE BRIEFING
Generated: Today, Oct 24, 2024 · 14:32 UTC
Officer: Eleanor Vance, Director of Compliance
Zone: Global Operations (US-East) · SLA Compliance: 96.4%

1. EXECUTIVE ESCALATIONS & APPROVAL QUEUE
- Total Pending: ${pendingApprovals.length} items
- Critical / Breached SLA: ${criticalApprovals.length} items
  * #WF-9042 Dual-Custody: Production Database Access Elevation (< 1h 12m remaining)
  * IT Security Exception #894: Firewall Egress Rule Bypass (OVERDUE by 38m)
  * CapEx Request #1024: Engineering Laptop Procurement (< 1h 42m remaining)

2. CONTROLS VITALITY & ATTESTATION STATUS
- Expiring / Overdue: ${expiringControls.length} controls
  * CTL-SOX-301: Privileged Access Re-certification (Expires in 14 days, Nov 7)
  * CTL-ISO-112: Cryptographic Key Lifecycle Review (Expires in 22 days, Nov 15)
  * CTL-NIST-044: Third-Party Vendor Risk Re-scoring (Overdue by 2 days)

3. CONTINUOUS AUTOMATION ENGINES
- Active Daemons: 14 / 14 Operational
- Drift Findings: 0
- Next scheduled execution: SOX Evidence Collector in 24m

Cryptographically Anchored Audit Hash: sha256:8f4e92ac412b9981a8b9e0210f019a
`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(briefingText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([briefingText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `InjaniFlow_DailyBriefing_Oct24_EleanorVance.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-[#c5c5d3] z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#eaedff] bg-surface-container-low/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[18px]">description</span>
            </div>
            <div>
              <h3 className="font-['Hanken_Grotesk'] text-[16px] font-bold text-on-surface">
                Executive Daily Briefing Report
              </h3>
              <p className="text-[11px] text-on-surface-variant font-mono">
                Reporting Period: Today, Oct 24 • SLA Zone: UTC-4
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

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="p-4 bg-surface-container-lowest rounded border border-[#dae2fd] font-mono text-[11px] leading-relaxed text-on-surface max-h-96 overflow-y-auto whitespace-pre-wrap select-all">
            {briefingText}
          </div>
        </div>

        {/* Action Bar */}
        <div className="p-4 border-t border-[#eaedff] bg-surface-container-low/80 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[12px] font-semibold text-on-surface-variant hover:text-on-surface"
          >
            Close
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded border border-[#c5c5d3] bg-white hover:bg-surface-container text-on-surface text-[12px] font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Copied to Clipboard' : 'Copy Briefing'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded bg-primary hover:bg-primary-container text-white text-[12px] font-bold shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Download Signed Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
