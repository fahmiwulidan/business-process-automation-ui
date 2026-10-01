import React, { useState } from 'react';
import { NavTab } from '../types';

interface DomainBlueprintViewProps {
  onNavigateTab: (tab: NavTab) => void;
}

export const DomainBlueprintView: React.FC<DomainBlueprintViewProps> = ({ onNavigateTab }) => {
  const [activeSubTab, setActiveSubTab] = useState<'blueprint' | 'telemetry'>('blueprint');

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      {/* Blueprint Header */}
      <section className="bg-surface-container-lowest p-6 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
              <span className="text-primary font-bold px-2 py-0.5 rounded bg-surface-container-high">
                Platform Blueprint v2.4
              </span>
              <span className="text-secondary font-bold px-2 py-0.5 rounded bg-secondary-container">
                SOX &amp; ISO 27001 Aligned
              </span>
              <span className="text-outline">SHA-256: 8f4e92a...c01</span>
            </div>

            <h1 className="font-['Hanken_Grotesk'] text-2xl font-bold text-on-surface tracking-tight">
              Information Architecture &amp; Functional Navigation Model
            </h1>
            <p className="text-[13px] text-on-surface-variant max-w-4xl">
              Hierarchical taxonomy organizing 8 core operational modules into 5 structured domains
              engineered for multi-role corporate governance (Approver, Requester, Control Owner, and Automation Operator).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-shrink-0">
            <div className="inline-flex p-0.5 rounded bg-surface-container-high text-[12px] font-semibold">
              <button
                onClick={() => setActiveSubTab('blueprint')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeSubTab === 'blueprint' ? 'bg-white text-primary shadow-xs' : 'text-on-surface-variant'
                }`}
              >
                Domain Blueprint
              </button>
              <button
                onClick={() => setActiveSubTab('telemetry')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeSubTab === 'telemetry' ? 'bg-white text-primary shadow-xs' : 'text-on-surface-variant'
                }`}
              >
                Telemetry Summary
              </button>
            </div>
            <span className="text-[10px] font-mono text-outline">Last Verified: Today, 14:32:08 UTC</span>
          </div>
        </div>

        {/* Spec Strip Indicators */}
        <div className="pt-3 border-t border-[#f2f3ff] flex flex-wrap items-center gap-4 text-[11.5px] text-on-surface-variant">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="material-symbols-outlined text-[16px] text-secondary">account_tree</span>
            <span>Structure: <strong className="text-on-surface">Grouped Hierarchy (5 Domains)</strong></span>
          </div>
          <span className="text-outline-variant">•</span>
          <div className="flex items-center gap-1.5 font-medium">
            <span className="material-symbols-outlined text-[16px] text-secondary">visibility</span>
            <span>Cognitive Load: <strong className="text-on-surface">Low / Scannable</strong></span>
          </div>
          <span className="text-outline-variant">•</span>
          <div className="flex items-center gap-1.5 font-medium">
            <span className="material-symbols-outlined text-[16px] text-secondary">speed</span>
            <span>SLA Target Tracking: <strong className="text-on-surface">Continuous Real-Time</strong></span>
          </div>
        </div>
      </section>

      {/* 5 Functional Operational Domains Header */}
      <div className="flex items-center justify-between text-[12px] font-mono text-outline uppercase font-semibold">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[17px] text-primary">layers</span>
          <span>FUNCTIONAL OPERATIONAL DOMAINS (5 GROUPS / 8 CORE MODULES)</span>
        </div>
        <span className="text-secondary font-bold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-secondary"></span>
          Zero-Drop High Availability
        </span>
      </div>

      {/* 5 Operational Domain Groups Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* GROUP 01: Home & Executive Pulse */}
        <div className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-3 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary px-2 py-0.5 rounded bg-surface-container">
                GROUP 01
              </span>
              <span className="material-symbols-outlined text-[18px] text-primary">dashboard_customize</span>
            </div>
            <h3 className="font-['Hanken_Grotesk'] text-[15px] font-bold text-on-surface">
              Home &amp; Executive Pulse
            </h3>
            <p className="text-[12px] text-on-surface-variant leading-relaxed">
              Centralized operational cockpit aggregating multi-role cross-functional alerts, SLA health gauges, and executive breach telemetry.
            </p>

            <div className="mt-2 p-3 bg-surface-container-low/60 rounded border border-[#eaedff] space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-on-surface">Main Configurable Dashboard</span>
                <span className="font-mono text-[9px] px-1 bg-surface-container text-outline rounded">MOD-01</span>
              </div>
              <p className="text-[11px] text-on-surface-variant">
                Adaptive triage hub based on active persona. Unifies breach escalations, active pending queues, and automated monitoring statistics.
              </p>
              <div className="pt-2 flex items-center justify-between text-[10.5px] font-mono text-outline">
                <span className="text-secondary font-semibold">Live Feed Real-Time</span>
                <span>Role: All Personas</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#f2f3ff] flex items-center justify-between text-[11px]">
            <span className="text-outline">Primary Focus: <strong className="text-on-surface">Urgency Triaging</strong></span>
            <button
              onClick={() => onNavigateTab('dashboard')}
              className="font-mono text-primary font-bold hover:underline"
            >
              /dashboard →
            </button>
          </div>
        </div>

        {/* GROUP 02: Workflows & Process Execution */}
        <div className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-3 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-secondary px-2 py-0.5 rounded bg-secondary-container">
                GROUP 02
              </span>
              <span className="material-symbols-outlined text-[18px] text-secondary">account_tree</span>
            </div>
            <h3 className="font-['Hanken_Grotesk'] text-[15px] font-bold text-on-surface">
              Workflows &amp; Process Execution
            </h3>
            <p className="text-[12px] text-on-surface-variant leading-relaxed">
              The high-velocity transaction engine governing end-to-end authorization gates, intake forms, lifecycle progression, and dual-layer authorization chains.
            </p>

            <div className="space-y-1.5 mt-2">
              <div className="p-2.5 bg-surface-container-low/60 rounded border border-[#eaedff]">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-on-surface">Pending Approvals</span>
                  <span className="font-mono text-[9px] px-1 bg-surface-container text-outline rounded">MOD-02</span>
                </div>
                <div className="flex items-center justify-between text-[10.5px] font-mono mt-1 text-on-surface-variant">
                  <span className="text-error font-bold">7 Escalations</span>
                  <span>/pending-approvals</span>
                </div>
              </div>

              <div className="p-2.5 bg-surface-container-low/60 rounded border border-[#eaedff]">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-on-surface">My Submitted Requests</span>
                  <span className="font-mono text-[9px] px-1 bg-surface-container text-outline rounded">MOD-03</span>
                </div>
                <div className="flex items-center justify-between text-[10.5px] font-mono mt-1 text-on-surface-variant">
                  <span className="text-secondary font-bold">3 In Flight</span>
                  <span>/my-requests</span>
                </div>
              </div>

              <div className="p-2.5 bg-surface-container-low/60 rounded border border-[#eaedff]">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-on-surface">Initiation Catalog</span>
                  <span className="font-mono text-[9px] px-1 bg-surface-container text-outline rounded">MOD-04</span>
                </div>
                <div className="flex items-center justify-between text-[10.5px] font-mono mt-1 text-on-surface-variant">
                  <span className="text-primary font-bold">42 Templates</span>
                  <span>/workflow-catalog</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#f2f3ff] flex items-center justify-between text-[11px]">
            <span className="text-outline">Primary Focus: <strong className="text-on-surface">Bottleneck Mitigation</strong></span>
            <span className="font-mono text-secondary font-bold">Domain: Workflow Engine</span>
          </div>
        </div>

        {/* GROUP 03: Controls Governance */}
        <div className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-3 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-on-tertiary-container px-2 py-0.5 rounded bg-tertiary-fixed">
                GROUP 03
              </span>
              <span className="material-symbols-outlined text-[18px] text-on-tertiary-container">verified_user</span>
            </div>
            <h3 className="font-['Hanken_Grotesk'] text-[15px] font-bold text-on-surface">
              Controls Governance
            </h3>
            <p className="text-[12px] text-on-surface-variant leading-relaxed">
              Continuous regulatory baseline surveillance. Monitors control vitality, policy decay, certificate cycles, and SOC2/ISO audit evidence.
            </p>

            <div className="mt-2 p-3 bg-surface-container-low/60 rounded border border-[#eaedff] space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-on-surface">Controls &amp; Assets Registry</span>
                <span className="font-mono text-[9px] px-1 bg-surface-container text-outline rounded">MOD-05</span>
              </div>
              <p className="text-[11px] text-on-surface-variant">
                Single source of truth for all controls: SOX key financial checks, ISO 27001 data protection controls, expiration telemetry, and automated evidence retrieval.
              </p>
              <div className="pt-2 flex items-center justify-between text-[10.5px] font-mono text-outline">
                <span className="text-tertiary-container font-semibold">2 Controls Expiring</span>
                <button
                  onClick={() => onNavigateTab('controls-registry')}
                  className="text-primary font-bold hover:underline"
                >
                  /controls-registry
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#f2f3ff] flex items-center justify-between text-[11px]">
            <span className="text-outline">Primary Focus: <strong className="text-on-surface">Zero Failures</strong></span>
            <span className="font-mono text-secondary font-bold">Audit: Compliant</span>
          </div>
        </div>

        {/* GROUP 04: Scheduled Automations */}
        <div className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-3 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary px-2 py-0.5 rounded bg-surface-container">
                GROUP 04
              </span>
              <span className="material-symbols-outlined text-[18px] text-primary">schedule</span>
            </div>
            <h3 className="font-['Hanken_Grotesk'] text-[15px] font-bold text-on-surface">
              Scheduled Automations
            </h3>
            <p className="text-[12px] text-on-surface-variant leading-relaxed">
              Autonomous orchestration fabric running background compliance checks, automated reconciliation crons, and event-driven trigger monitors.
            </p>

            <div className="mt-2 p-3 bg-surface-container-low/60 rounded border border-[#eaedff] space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-on-surface">Schedules &amp; Automation Triggers</span>
                <span className="font-mono text-[9px] px-1 bg-surface-container text-outline rounded">MOD-06</span>
              </div>
              <p className="text-[11px] text-on-surface-variant">
                Cron engine configuration, webhook listeners, automated remediation batch runs, retry queues, and dead-letter queue exception diagnostics.
              </p>
              <div className="pt-2 flex items-center justify-between text-[10.5px] font-mono text-outline">
                <span className="text-secondary font-semibold">128 Crons Active</span>
                <button
                  onClick={() => onNavigateTab('schedules-triggers')}
                  className="text-primary font-bold hover:underline"
                >
                  /schedules-triggers
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#f2f3ff] flex items-center justify-between text-[11px]">
            <span className="text-outline">Engine: <strong className="text-on-surface">Distributed Celery/Redis</strong></span>
            <span className="font-mono text-secondary font-bold">Zero Daemon Latency</span>
          </div>
        </div>

        {/* GROUP 05: Intelligence & Audit */}
        <div className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-3 relative overflow-hidden flex flex-col justify-between lg:col-span-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-secondary px-2 py-0.5 rounded bg-secondary-container">
                GROUP 05
              </span>
              <span className="material-symbols-outlined text-[18px] text-secondary">analytics</span>
            </div>
            <h3 className="font-['Hanken_Grotesk'] text-[15px] font-bold text-on-surface">
              Intelligence &amp; Audit
            </h3>
            <p className="text-[12px] text-on-surface-variant leading-relaxed">
              Post-execution validation, cryptographic immutability inspection, SLA variance histograms, and automated evidence packet generation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <div className="p-3 bg-surface-container-low/60 rounded border border-[#eaedff]">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-on-surface">SLA Reports &amp; Analytics</span>
                  <span className="font-mono text-[9px] px-1 bg-surface-container text-outline rounded">MOD-07</span>
                </div>
                <p className="text-[11px] text-on-surface-variant mt-1">
                  Mean-time-to-approve analysis, departmental throughput rankings, and predictive breach forecasts.
                </p>
                <div className="pt-2 text-right">
                  <button
                    onClick={() => onNavigateTab('sla-reports')}
                    className="text-[11px] font-mono text-primary font-bold hover:underline"
                  >
                    /sla-reports →
                  </button>
                </div>
              </div>

              <div className="p-3 bg-surface-container-low/60 rounded border border-[#eaedff]">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-on-surface">Approval Trail &amp; Audit Logs</span>
                  <span className="font-mono text-[9px] px-1 bg-surface-container text-outline rounded">MOD-08</span>
                </div>
                <p className="text-[11px] text-on-surface-variant mt-1">
                  Immutable event ledger with cryptographic hashes, signer identity stamps, and downloadable compliance packages.
                </p>
                <div className="pt-2 text-right">
                  <button
                    onClick={() => onNavigateTab('approval-trail')}
                    className="text-[11px] font-mono text-primary font-bold hover:underline"
                  >
                    /approval-trail →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#f2f3ff] flex items-center justify-between text-[11px]">
            <span className="text-outline">Primary Focus: <strong className="text-on-surface">100% Non-Repudiation</strong></span>
            <span className="font-mono text-secondary font-bold">Ledger: Synced</span>
          </div>
        </div>
      </div>

      {/* Multi-Role Governance Responsibility Matrix */}
      <section className="bg-surface-container-lowest p-6 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-['Hanken_Grotesk'] text-[16px] font-bold text-on-surface">
              Multi-Role Governance Responsibility Matrix
            </h3>
            <p className="text-[12px] text-on-surface-variant">
              Cross-mapping of user personas to functional domains, outlining interaction modes and primary accountability metrics.
            </p>
          </div>

          {/* Matrix Legend */}
          <div className="flex items-center gap-3 text-[11px] font-medium">
            <span className="flex items-center gap-1.5 text-on-surface">
              <span className="w-2.5 h-2.5 rounded bg-primary"></span>
              Primary Driver
            </span>
            <span className="flex items-center gap-1.5 text-on-surface">
              <span className="w-2.5 h-2.5 rounded bg-secondary"></span>
              Read / Execute
            </span>
            <span className="flex items-center gap-1.5 text-on-surface">
              <span className="w-2.5 h-2.5 rounded bg-surface-container-high border border-[#c5c5d3]"></span>
              Auditor / Observer
            </span>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-[12px] border-collapse">
            <thead className="bg-surface-container-low text-on-surface-variant font-mono text-[10.5px] uppercase tracking-wider border-b border-[#eaedff]">
              <tr>
                <th className="py-2.5 px-4 font-semibold">Functional Domain</th>
                <th className="py-2.5 px-4 font-semibold">Approver Persona</th>
                <th className="py-2.5 px-4 font-semibold">Requester Persona</th>
                <th className="py-2.5 px-4 font-semibold">Control Owner Persona</th>
                <th className="py-2.5 px-4 font-semibold">Automation Owner Persona</th>
                <th className="py-2.5 px-4 font-semibold">Primary SLA / Metric Focus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f2f3ff] text-on-surface">
              <tr>
                <td className="py-3 px-4 font-semibold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">speed</span>
                  <span>Executive Pulse</span>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-primary text-white font-mono text-[10.5px] font-bold">Primary Driver</span>
                </td>
                <td className="py-3 px-4 text-on-surface-variant text-[11.5px]">Auditor / Observer</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-primary text-white font-mono text-[10.5px] font-bold">Primary Driver</span>
                </td>
                <td className="py-3 px-4 text-secondary font-semibold text-[11.5px]">Read / Execute</td>
                <td className="py-3 px-4 font-mono text-[11px] text-on-surface-variant">&lt; 15 min urgent breach acknowledgment</td>
              </tr>

              <tr>
                <td className="py-3 px-4 font-semibold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">account_tree</span>
                  <span>Workflows &amp; Approvals</span>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-primary text-white font-mono text-[10.5px] font-bold">Primary Driver</span>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-primary text-white font-mono text-[10.5px] font-bold">Primary Driver</span>
                </td>
                <td className="py-3 px-4 text-secondary font-semibold text-[11.5px]">Read / Execute</td>
                <td className="py-3 px-4 text-on-surface-variant text-[11.5px]">Auditor / Observer</td>
                <td className="py-3 px-4 font-mono text-[11px] text-on-surface-variant">98.5% within 4h dual-layer SLA</td>
              </tr>

              <tr>
                <td className="py-3 px-4 font-semibold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">verified_user</span>
                  <span>Controls Governance</span>
                </td>
                <td className="py-3 px-4 text-on-surface-variant text-[11.5px]">Auditor / Observer</td>
                <td className="py-3 px-4 text-on-surface-variant text-[11.5px]">Auditor / Observer</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-primary text-white font-mono text-[10.5px] font-bold">Primary Driver</span>
                </td>
                <td className="py-3 px-4 text-secondary font-semibold text-[11.5px]">Read / Execute</td>
                <td className="py-3 px-4 font-mono text-[11px] text-on-surface-variant">Zero lapsed continuous controls (100% uptime)</td>
              </tr>

              <tr>
                <td className="py-3 px-4 font-semibold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">precision_manufacturing</span>
                  <span>Automations Engine</span>
                </td>
                <td className="py-3 px-4 text-on-surface-variant text-[11.5px]">Auditor / Observer</td>
                <td className="py-3 px-4 text-on-surface-variant text-[11.5px]">Auditor / Observer</td>
                <td className="py-3 px-4 text-secondary font-semibold text-[11.5px]">Read / Execute</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-primary text-white font-mono text-[10.5px] font-bold">Primary Driver</span>
                </td>
                <td className="py-3 px-4 font-mono text-[11px] text-on-surface-variant">&lt; 0.02% failure rate, zero dead-letter unhandled</td>
              </tr>

              <tr>
                <td className="py-3 px-4 font-semibold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">analytics</span>
                  <span>Intelligence &amp; Audit</span>
                </td>
                <td className="py-3 px-4 text-secondary font-semibold text-[11.5px]">Read / Execute</td>
                <td className="py-3 px-4 text-secondary font-semibold text-[11.5px]">Read / Execute</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-primary text-white font-mono text-[10.5px] font-bold">Primary Driver</span>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-primary text-white font-mono text-[10.5px] font-bold">Primary Driver</span>
                </td>
                <td className="py-3 px-4 font-mono text-[11px] text-on-surface-variant">100% cryptographic ledger export readiness</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3 Core UX Principles */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary px-2 py-0.5 rounded bg-surface-container">
            UX PRINCIPLE 01
          </span>
          <h4 className="font-['Hanken_Grotesk'] text-[15px] font-bold text-on-surface">
            Cognitive De-Cluttering
          </h4>
          <p className="text-[12px] text-on-surface-variant leading-relaxed">
            Eliminates flat-list menu sprawl by chunking 8 discrete modules into 5 semantic zones.
            Users process mental models in under 2 seconds without cognitive friction or sub-menu hunting.
          </p>
          <div className="pt-2 text-[11px] font-mono text-secondary font-semibold">
            Target Discovery: &lt; 2 clicks ✓
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-error px-2 py-0.5 rounded bg-error-container">
            UX PRINCIPLE 02
          </span>
          <h4 className="font-['Hanken_Grotesk'] text-[15px] font-bold text-on-surface">
            Multi-Responsibility Role Triage
          </h4>
          <p className="text-[12px] text-on-surface-variant leading-relaxed">
            Persistent urgency chips in the global rail badge actionable counters (e.g. 7 Pending Approvals, 2 Expiring Controls).
            Approvers take immediate ownership without navigating deep reports.
          </p>
          <div className="pt-2 text-[11px] font-mono text-error font-semibold">
            Active Alerts: 9 Global Chips !
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-secondary px-2 py-0.5 rounded bg-secondary-container">
            UX PRINCIPLE 03
          </span>
          <h4 className="font-['Hanken_Grotesk'] text-[15px] font-bold text-on-surface">
            Actionability Over Navigation
          </h4>
          <p className="text-[12px] text-on-surface-variant leading-relaxed">
            Immediate execution hooks embedded directly into the header bar (+ Initiate Workflow, Global Quick Search ⌘K) and row items ensure workflows proceed without requiring page traversals.
          </p>
          <div className="pt-2 text-[11px] font-mono text-secondary font-semibold">
            Global Fast Actions: Active
          </div>
        </div>
      </section>

      {/* Verification Footer */}
      <div className="p-4 bg-surface-container-low rounded-lg border border-[#dae2fd] flex items-center justify-between text-[11.5px] text-on-surface-variant font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary"></span>
          <span>Architectural Graph Verified: Continuous controls monitoring synchronized across all 8 modules</span>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-primary hover:underline flex items-center gap-1 font-sans font-semibold"
        >
          <span>Back to Top</span>
          <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
        </button>
      </div>
    </div>
  );
};
