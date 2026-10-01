import React, { useState } from 'react';
import { ApprovalItem } from '../types';

interface BatchReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  approvals: ApprovalItem[];
  onBatchApprove: (ids: string[]) => void;
  onBatchReject: (ids: string[]) => void;
}

export const BatchReviewModal: React.FC<BatchReviewModalProps> = ({
  isOpen,
  onClose,
  approvals,
  onBatchApprove,
  onBatchReject,
}) => {
  const pendingItems = approvals.filter((a) => a.status === 'pending');
  const [selectedIds, setSelectedIds] = useState<string[]>(pendingItems.map((a) => a.id));
  const [signingKeyVerified, setSigningKeyVerified] = useState(true);

  if (!isOpen) return null;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => setSelectedIds(pendingItems.map((a) => a.id));
  const selectNone = () => setSelectedIds([]);

  const handleApproveSelected = () => {
    if (selectedIds.length === 0) return;
    onBatchApprove(selectedIds);
    onClose();
  };

  const handleRejectSelected = () => {
    if (selectedIds.length === 0) return;
    onBatchReject(selectedIds);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-[#c5c5d3] z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#eaedff] bg-surface-container-low/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[18px]">rule</span>
            </div>
            <div>
              <h3 className="font-['Hanken_Grotesk'] text-[16px] font-bold text-on-surface">
                Batch Review Queue ({selectedIds.length} of {pendingItems.length} selected)
              </h3>
              <p className="text-[11px] text-on-surface-variant">
                Attest and sign multiple priority items with Eleanor Vance cryptographic delegation
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

        {/* Toolbar */}
        <div className="px-6 py-2.5 bg-surface-container-low/40 border-b border-[#eaedff] flex items-center justify-between text-[11.5px]">
          <div className="flex items-center gap-2">
            <button
              onClick={selectAll}
              className="text-primary font-semibold hover:underline"
            >
              Select All
            </button>
            <span className="text-outline-variant">•</span>
            <button
              onClick={selectNone}
              className="text-on-surface-variant hover:text-on-surface"
            >
              Deselect All
            </button>
          </div>
          <div className="flex items-center gap-1.5 text-secondary font-mono text-[11px]">
            <span className="material-symbols-outlined text-[15px]">key</span>
            <span>YubiKey FIPS Token Verified</span>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-3 divide-y divide-[#f2f3ff]">
          {pendingItems.length === 0 ? (
            <div className="py-8 text-center text-on-surface-variant text-[13px]">
              No pending approvals in queue.
            </div>
          ) : (
            pendingItems.map((item) => {
              const isChecked = selectedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleSelect(item.id)}
                  className={`py-3 px-2 flex items-start gap-3 rounded cursor-pointer transition-colors ${
                    isChecked ? 'bg-primary-fixed/20' : 'hover:bg-surface-container-low/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-primary">{item.workflowId}</span>
                      <span className="text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded bg-surface-container text-on-surface-variant">
                        {item.category}
                      </span>
                      <span className="font-mono text-[10.5px] font-bold text-error">
                        {item.slaCountdown.initialDisplay}
                      </span>
                    </div>
                    <div className="font-semibold text-[13px] text-on-surface truncate mt-0.5">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-on-surface-variant">
                      Requester: {item.requester.name} ({item.requester.role})
                    </div>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface-container text-outline font-bold">
                    {item.priority}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#eaedff] bg-surface-container-low/80 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[12px] font-semibold text-on-surface-variant hover:text-on-surface"
          >
            Cancel
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRejectSelected}
              disabled={selectedIds.length === 0}
              className="px-3.5 py-1.5 rounded border border-error text-error hover:bg-error-container/20 text-[12px] font-semibold disabled:opacity-40"
            >
              Reject Selected ({selectedIds.length})
            </button>
            <button
              onClick={handleApproveSelected}
              disabled={selectedIds.length === 0}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded bg-primary hover:bg-primary-container text-white font-bold text-[12px] shadow-sm disabled:opacity-40 transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Batch Authorize ({selectedIds.length})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
