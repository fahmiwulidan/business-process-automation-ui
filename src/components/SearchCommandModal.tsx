import React, { useState, useEffect } from 'react';
import { ApprovalItem, GovernanceControl, AutomationDaemon, NavTab } from '../types';

interface SearchCommandModalProps {
  isOpen: boolean;
  onClose: () => void;
  approvals: ApprovalItem[];
  controls: GovernanceControl[];
  daemons: AutomationDaemon[];
  onSelectApproval: (item: ApprovalItem) => void;
  onNavigateTab: (tab: NavTab) => void;
}

export const SearchCommandModal: React.FC<SearchCommandModalProps> = ({
  isOpen,
  onClose,
  approvals,
  controls,
  daemons,
  onSelectApproval,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open handled by parent
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingApprovals = approvals.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.workflowId.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.requester.name.toLowerCase().includes(q)
  );

  const matchingControls = controls.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.standard.toLowerCase().includes(q)
  );

  const matchingDaemons = daemons.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.cronExpression.toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-[#c5c5d3] z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col">
        {/* Search Bar */}
        <div className="p-3 border-b border-[#eaedff] flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[20px] text-outline">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search workflows, controls, daemons (e.g. 'SOX', '9042', 'RDS')..."
            className="w-full text-[13px] text-on-surface placeholder:text-outline focus:outline-none"
          />
          <kbd className="font-mono text-[10px] text-outline bg-surface-container-high px-1.5 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-3 text-[12px]">
          {/* Quick Nav Suggestions */}
          {!q && (
            <div className="space-y-1">
              <div className="px-2 text-[10px] font-mono uppercase text-outline font-semibold">
                Quick Navigation
              </div>
              <button
                onClick={() => {
                  onNavigateTab('blueprint');
                  onClose();
                }}
                className="w-full text-left p-2 rounded hover:bg-surface-container-low flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-secondary">architecture</span>
                  <span>View Domain Blueprint &amp; Information Architecture</span>
                </div>
                <span className="font-mono text-[10px] text-outline">/blueprint</span>
              </button>
              <button
                onClick={() => {
                  onNavigateTab('design-spec');
                  onClose();
                }}
                className="w-full text-left p-2 rounded hover:bg-surface-container-low flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-secondary">menu_book</span>
                  <span>View Design Rationale &amp; Decision Matrix</span>
                </div>
                <span className="font-mono text-[10px] text-outline">/design-spec</span>
              </button>
            </div>
          )}

          {/* Approvals */}
          {matchingApprovals.length > 0 && (
            <div className="space-y-1">
              <div className="px-2 text-[10px] font-mono uppercase text-outline font-semibold">
                Workflows &amp; Approvals
              </div>
              {matchingApprovals.map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    onSelectApproval(a);
                    onClose();
                  }}
                  className="w-full text-left p-2 rounded hover:bg-surface-container-low flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono text-[11px] font-bold text-primary">{a.workflowId}</span>
                    <span className="font-medium text-on-surface truncate">{a.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-error font-semibold shrink-0 ml-2">
                    {a.slaCountdown.initialDisplay}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Controls */}
          {matchingControls.length > 0 && (
            <div className="space-y-1">
              <div className="px-2 text-[10px] font-mono uppercase text-outline font-semibold">
                Controls Registry
              </div>
              {matchingControls.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onNavigateTab('controls-registry');
                    onClose();
                  }}
                  className="w-full text-left p-2 rounded hover:bg-surface-container-low flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono text-[11px] font-bold text-secondary">{c.id}</span>
                    <span className="font-medium text-on-surface truncate">{c.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-on-surface-variant shrink-0 ml-2">
                    {c.complianceHealth}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Daemons */}
          {matchingDaemons.length > 0 && (
            <div className="space-y-1">
              <div className="px-2 text-[10px] font-mono uppercase text-outline font-semibold">
                Automation Daemons
              </div>
              {matchingDaemons.map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    onNavigateTab('schedules-triggers');
                    onClose();
                  }}
                  className="w-full text-left p-2 rounded hover:bg-surface-container-low flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="material-symbols-outlined text-[15px] text-primary">schedule</span>
                    <span className="font-medium text-on-surface truncate">{d.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-outline shrink-0 ml-2">
                    {d.nextExecutionIn}
                  </span>
                </button>
              ))}
            </div>
          )}

          {q && matchingApprovals.length === 0 && matchingControls.length === 0 && matchingDaemons.length === 0 && (
            <div className="py-6 text-center text-outline text-[12px]">
              No results found for "{query}".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-[#eaedff] bg-surface-container-low flex items-center justify-between text-[11px] text-outline font-mono">
          <span>Navigate with arrow keys or click</span>
          <span>Esc to exit</span>
        </div>
      </div>
    </div>
  );
};
