import React from 'react';
import { NavTab } from '../types';
import { LOGO_URL } from '../data/initialData';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  pendingCount: number;
  myRequestsCount: number;
  expiringControlsCount: number;
  currentRegion: string;
  onChangeRegion: (region: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  pendingCount,
  myRequestsCount,
  expiringControlsCount,
  currentRegion,
  onChangeRegion,
  isOpen = false,
  onClose,
}) => {
  const [showRegionMenu, setShowRegionMenu] = React.useState(false);

  const regions = [
    'Global Operations (US-East)',
    'EMEA Operations (Frankfurt)',
    'APAC Operations (Singapore)',
  ];

  return (
    <>
      <button
        className={`app-sidebar-backdrop ${isOpen ? 'is-visible' : ''}`}
        onClick={onClose}
        aria-label="Close navigation"
      />
    <aside className={`app-sidebar fixed left-0 top-0 h-screen w-64 bg-surface-container-lowest flex flex-col z-40 border-r border-[#eaedff] shadow-[0_1px_8px_rgba(0,0,0,0.04)] select-none ${isOpen ? 'is-open' : ''}`}>
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-[#f2f3ff]">
        <button
          onClick={() => onSelectTab('dashboard')}
          className="flex items-center gap-2.5 min-w-0 text-left hover:opacity-90 transition-opacity"
        >
          <img
            src={LOGO_URL}
            alt="Injani Flow Logo"
            className="h-8 w-auto object-contain flex-shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-['Hanken_Grotesk'] text-[15px] font-bold text-on-surface tracking-tight leading-tight truncate">
              Injani Flow
            </span>
            <span className="font-['Inter'] text-[10px] uppercase tracking-wider text-on-surface-variant font-medium">
              BPA &amp; Governance
            </span>
          </div>
        </button>

        <div className="flex-shrink-0 flex items-center bg-surface-container-low px-1.5 py-1 rounded text-on-surface-variant text-[11px] font-mono">
          <span>v2.4</span>
        </div>
      </div>

      {/* Region Selector */}
      <div className="px-3 py-2.5 relative border-b border-[#f2f3ff]">
        <button
          onClick={() => setShowRegionMenu(!showRegionMenu)}
          className="w-full flex items-center justify-between bg-surface-container-low hover:bg-surface-container transition-colors px-2.5 py-1.5 rounded text-on-surface text-left"
        >
          <div className="flex items-center gap-2 truncate">
            <span className="material-symbols-outlined text-[15px] text-secondary">domain</span>
            <span className="text-[11px] font-medium text-on-surface truncate">{currentRegion}</span>
          </div>
          <span className="material-symbols-outlined text-[15px] text-on-surface-variant">arrow_drop_down</span>
        </button>

        {showRegionMenu && (
          <div className="absolute left-3 right-3 top-12 bg-white rounded border border-[#dae2fd] shadow-lg py-1 z-50">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => {
                  onChangeRegion(reg);
                  setShowRegionMenu(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-[11px] flex items-center justify-between hover:bg-surface-container-low transition-colors ${
                  currentRegion === reg ? 'text-primary font-semibold bg-surface-container-low/60' : 'text-on-surface-variant'
                }`}
              >
                <span>{reg}</span>
                {currentRegion === reg && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-3">
        {/* Core Cockpit */}
        <div className="space-y-0.5">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded text-left transition-colors ${
              currentTab === 'dashboard'
                ? 'bg-primary-container text-white font-semibold shadow-xs'
                : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
              <span className="text-[13px] font-['Inter']">Dashboard</span>
            </div>
            {currentTab === 'dashboard' && <span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>}
          </button>
        </div>

        {/* Workflows Group */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-semibold text-outline uppercase tracking-wider">
            Workflows
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => onSelectTab('pending-approvals')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-left transition-colors ${
                currentTab === 'pending-approvals'
                  ? 'bg-surface-container text-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">assignment_late</span>
                <span className="text-[12.5px]">Pending Approvals</span>
              </div>
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-error-container text-on-error-container font-mono text-[10px] font-bold">
                {pendingCount}
              </span>
            </button>

            <button
              onClick={() => onSelectTab('my-requests')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-left transition-colors ${
                currentTab === 'my-requests'
                  ? 'bg-surface-container text-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">inbox</span>
                <span className="text-[12.5px]">My Requests</span>
              </div>
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-mono text-[10px] font-medium">
                {myRequestsCount}
              </span>
            </button>

            <button
              onClick={() => onSelectTab('workflow-catalog')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-left transition-colors ${
                currentTab === 'workflow-catalog'
                  ? 'bg-surface-container text-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">account_tree</span>
                <span className="text-[12.5px]">Workflow Catalog</span>
              </div>
            </button>
          </div>
        </div>

        {/* Controls Group */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-semibold text-outline uppercase tracking-wider">
            Controls
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => onSelectTab('controls-registry')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-left transition-colors ${
                currentTab === 'controls-registry'
                  ? 'bg-surface-container text-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span className="text-[12.5px]">Controls Registry</span>
              </div>
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed-variant font-mono text-[10px] font-bold">
                {expiringControlsCount} Expiring
              </span>
            </button>
          </div>
        </div>

        {/* Automations Group */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-semibold text-outline uppercase tracking-wider">
            Automations
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => onSelectTab('schedules-triggers')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-left transition-colors ${
                currentTab === 'schedules-triggers'
                  ? 'bg-surface-container text-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                <span className="text-[12.5px]">Schedules &amp; Triggers</span>
              </div>
            </button>
          </div>
        </div>

        {/* Analytics Group */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-semibold text-outline uppercase tracking-wider">
            Analytics
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => onSelectTab('sla-reports')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-left transition-colors ${
                currentTab === 'sla-reports'
                  ? 'bg-surface-container text-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">analytics</span>
                <span className="text-[12.5px]">SLA Reports</span>
              </div>
            </button>
          </div>
        </div>

        {/* Audit Group */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-semibold text-outline uppercase tracking-wider">
            Audit
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => onSelectTab('approval-trail')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-left transition-colors ${
                currentTab === 'approval-trail'
                  ? 'bg-surface-container text-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">history</span>
                <span className="text-[12.5px]">Approval Trail</span>
              </div>
            </button>
          </div>
        </div>

        {/* Blueprint & Spec Group */}
        <div className="space-y-1 pt-1 border-t border-[#f2f3ff]">
          <div className="px-3 text-[10px] font-semibold text-outline uppercase tracking-wider">
            Specifications
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => onSelectTab('blueprint')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-left transition-colors ${
                currentTab === 'blueprint'
                  ? 'bg-secondary-container/40 text-secondary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">architecture</span>
                <span className="text-[12.5px]">Domain Blueprint</span>
              </div>
              <span className="text-[10px] font-mono text-secondary font-bold">5 Grp</span>
            </button>

            <button
              onClick={() => onSelectTab('design-spec')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-left transition-colors ${
                currentTab === 'design-spec'
                  ? 'bg-secondary-container/40 text-secondary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
                <span className="text-[12.5px]">Design Rationale</span>
              </div>
              <span className="text-[10px] font-mono text-secondary font-bold">1.04</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Monitoring Footer & Settings */}
      <div className="p-3 space-y-2 border-t border-[#eaedff] bg-surface-container-lowest">
        <div className="p-2 rounded bg-surface-container-low flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-on-surface">
              Monitoring Active
            </span>
          </div>
          <div className="flex justify-between items-center text-on-surface-variant font-mono text-[10px]">
            <span>Continuous 24/7</span>
            <span className="text-secondary font-semibold">99.98% SLA</span>
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          <button
            onClick={() => onSelectTab('system-settings')}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded text-left text-[12px] transition-colors ${
              currentTab === 'system-settings'
                ? 'bg-surface-container text-primary font-medium'
                : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">settings</span>
            <span>System Settings</span>
          </button>
          <button
            onClick={() => onSelectTab('help-documentation')}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded text-left text-[12px] transition-colors ${
              currentTab === 'help-documentation'
                ? 'bg-surface-container text-primary font-medium'
                : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">help_outline</span>
            <span>Help &amp; Docs</span>
          </button>
        </div>
      </div>
    </aside>
    </>
  );
};
