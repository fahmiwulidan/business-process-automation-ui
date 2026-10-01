import React from 'react';
import { RoleFilter } from '../types';
import { AVATAR_URL } from '../data/initialData';

interface HeaderProps {
  currentRole: RoleFilter;
  onSelectRole: (role: RoleFilter) => void;
  onOpenInitiateWorkflow: () => void;
  onOpenSearch: () => void;
  onOpenSidebar: () => void;
  breadcrumbZone?: string;
  urgentCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onSelectRole,
  onOpenInitiateWorkflow,
  onOpenSearch,
  onOpenSidebar,
  breadcrumbZone = 'Governance > Controls Matrix',
  urgentCount,
}) => {
  const [showRoleMenu, setShowRoleMenu] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  const roleLabels: Record<RoleFilter, string> = {
    all: 'Multi-Role View: All (Approver, Requester, Owner)',
    approver: 'Role Focus: Approver (7 items)',
    requester: 'Role Focus: Requester (3 active)',
    control_owner: 'Role Focus: Control Owner (2 expiring)',
    automation_owner: 'Role Focus: Automation Owner (1 alert)',
  };

  return (
    <header className="app-header fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/95 backdrop-blur-md z-30 flex items-center justify-between px-6 border-b border-[#eaedff] shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <button
        onClick={onOpenSidebar}
        className="app-menu-button h-10 w-10 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low"
        aria-label="Open navigation"
      >
        <span className="material-symbols-outlined text-[21px]">menu</span>
      </button>
      {/* Left: Breadcrumb & Search */}
      <div className="header-leading flex items-center gap-5 flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-on-surface-variant text-[12px] flex-shrink-0">
          <span className="text-on-surface font-semibold">Injani Flow</span>
          <span className="text-outline-variant font-mono">/</span>
          <span className="text-primary font-medium">{breadcrumbZone}</span>
        </div>

        {/* Global Search Affordance */}
        <button
          onClick={onOpenSearch}
          className="header-search relative flex-1 min-w-0 flex items-center justify-between h-9 px-3 rounded bg-surface-container-low hover:bg-surface-container text-on-surface placeholder:text-on-surface-variant text-[13px] border border-transparent hover:border-[#dae2fd] transition-all cursor-pointer text-left"
          title="Open search palette (⌘K)"
        >
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[17px]">search</span>
            <span className="text-[12.5px] truncate">Search workflows, controls, request IDs, or automations...</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="font-mono text-[10px] text-on-surface-variant bg-white px-1.5 py-0.5 rounded border border-[#dae2fd] shadow-xs">
              ⌘K
            </kbd>
          </div>
        </button>
      </div>

      {/* Right: Role Switcher, Primary CTA, Notifications & Profile */}
      <div className="header-actions flex items-center gap-3 flex-shrink-0">
        {/* Multi-Role View Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="header-role-switcher hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface text-[12px] border border-[#eaedff] transition-colors"
          >
            <span className="material-symbols-outlined text-[15px] text-secondary">badge</span>
            <span className="font-medium truncate max-w-[280px]">{roleLabels[currentRole]}</span>
            <span className="material-symbols-outlined text-[15px]">expand_more</span>
          </button>

          {showRoleMenu && (
            <div className="header-popover absolute right-0 top-10 w-72 bg-white rounded-lg border border-[#dae2fd] shadow-xl py-1.5 z-50">
              <div className="px-3 py-1.5 border-b border-[#f2f3ff] text-[10px] font-semibold uppercase tracking-wider text-outline">
                Filter Persona Cockpit
              </div>
              {(['all', 'approver', 'requester', 'control_owner', 'automation_owner'] as RoleFilter[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    onSelectRole(r);
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-[12px] flex items-center justify-between hover:bg-surface-container-low transition-colors ${
                    currentRole === r ? 'bg-surface-container-low text-primary font-semibold' : 'text-on-surface'
                  }`}
                >
                  <span className="capitalize">{roleLabels[r]}</span>
                  {currentRole === r && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Primary Action: Initiate Workflow */}
        <button
          onClick={onOpenInitiateWorkflow}
          className="flex items-center gap-1.5 h-8 px-3.5 rounded bg-primary text-white text-[12.5px] font-semibold hover:bg-primary-container transition-all shadow-xs active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span className="header-initiate-label">Initiate Workflow</span>
        </button>

        {/* Notifications Icon */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative h-8 w-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            aria-label="View notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {urgentCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-white"></span>
            )}
          </button>

          {showNotifications && (
            <div className="header-popover absolute right-0 top-10 w-80 bg-white rounded-lg border border-[#dae2fd] shadow-xl py-2 z-50">
              <div className="px-3.5 py-1.5 border-b border-[#f2f3ff] flex items-center justify-between">
                <span className="text-[12px] font-bold text-on-surface">Urgent Escalations</span>
                <span className="text-[10px] font-mono text-error font-semibold bg-error-container px-1.5 py-0.5 rounded">
                  {urgentCount} actions
                </span>
              </div>
              <div className="divide-y divide-[#f2f3ff] max-h-64 overflow-y-auto">
                <div className="p-3 hover:bg-surface-container-low transition-colors cursor-pointer">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-semibold text-error">IT Security #894</span>
                    <span className="text-error font-mono font-bold">OVERDUE</span>
                  </div>
                  <p className="text-[12px] font-medium text-on-surface mt-0.5">Firewall Egress Rule Bypass</p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">Statutory SLA breached 38m ago</p>
                </div>
                <div className="p-3 hover:bg-surface-container-low transition-colors cursor-pointer">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-semibold text-primary">CapEx #1024</span>
                    <span className="text-tertiary-container font-mono font-bold">1h 42m</span>
                  </div>
                  <p className="text-[12px] font-medium text-on-surface mt-0.5">Engineering Laptop Procurement</p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">Final Executive Sign-off required</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Eleanor Vance User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 pl-1.5 py-1 rounded hover:bg-surface-container-low transition-colors text-left"
          >
            <div className="header-profile-copy flex flex-col text-right hidden sm:flex">
              <span className="text-[12.5px] font-semibold text-on-surface leading-tight">Eleanor Vance</span>
              <span className="text-[10px] text-on-surface-variant leading-none">Director of Compliance</span>
            </div>
            <img
              src={AVATAR_URL}
              alt="Eleanor Vance"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#dae2fd]"
              referrerPolicy="no-referrer"
            />
          </button>

          {showProfileMenu && (
            <div className="header-popover absolute right-0 top-12 w-64 bg-white rounded-lg border border-[#dae2fd] shadow-xl py-2 z-50 text-[12px]">
              <div className="px-3.5 py-2 border-b border-[#f2f3ff]">
                <div className="font-semibold text-on-surface">Eleanor Vance</div>
                <div className="text-[11px] text-on-surface-variant">Director of Compliance &amp; Risk</div>
                <div className="mt-1 text-[10px] font-mono text-secondary font-medium">Eleanor.vance@injaniflow.internal</div>
              </div>
              <div className="py-1">
                <div className="px-3.5 py-1.5 text-on-surface-variant hover:bg-surface-container-low cursor-pointer flex items-center justify-between">
                  <span>Delegation of Authority</span>
                  <span className="text-[10px] font-mono text-secondary font-semibold">Active</span>
                </div>
                <div className="px-3.5 py-1.5 text-on-surface-variant hover:bg-surface-container-low cursor-pointer flex items-center justify-between">
                  <span>Cryptographic Key (YubiKey)</span>
                  <span className="text-[10px] font-mono text-primary font-semibold">FIPS Verified</span>
                </div>
                <div className="px-3.5 py-1.5 text-on-surface-variant hover:bg-surface-container-low cursor-pointer">
                  <span>Notification Preferences</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
