import React from 'react';

export const DesignRationaleView: React.FC = () => {
  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      {/* Header & Document Manifest Metadata */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[11.5px] font-mono text-outline uppercase tracking-wider mb-1">
              <span>Injani Flow</span>
              <span>/</span>
              <span>Design Challenge</span>
              <span>/</span>
              <span className="text-primary font-bold">Architectural Foundations</span>
            </div>
            <h1 className="font-['Hanken_Grotesk'] text-3xl font-bold text-on-surface tracking-tight">
              Design Rationale
            </h1>
            <p className="text-[13px] text-on-surface-variant max-w-4xl mt-1 leading-relaxed">
              Key architectural decisions, trade-offs, and interaction principles underpinning Injani Flow's enterprise workflow and controls governance interface.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-surface-container-high text-primary font-mono text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Spec Rev 1.04
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded bg-secondary-container text-on-secondary-container font-mono text-[11px] font-bold">
              Standard Compliance Tier
            </span>
          </div>
        </div>

        {/* Structured Metadata Strip */}
        <div className="bg-surface-container-lowest p-4 rounded-lg border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex flex-wrap items-center justify-between gap-4 text-[12px] text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[17px] text-outline">timer</span>
            <span className="text-[10.5px] font-mono uppercase text-outline font-semibold">Challenge Scope:</span>
            <span className="font-semibold text-on-surface">3–4 Hour Design Sprint</span>
          </div>

          <div className="hidden lg:block w-px h-4 bg-[#dae2fd]"></div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[17px] text-outline">layers</span>
            <span className="text-[10.5px] font-mono uppercase text-outline font-semibold">Platform:</span>
            <span className="font-semibold text-on-surface">Injani Flow Enterprise SaaS</span>
          </div>

          <div className="hidden lg:block w-px h-4 bg-[#dae2fd]"></div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[17px] text-outline">badge</span>
            <span className="text-[10.5px] font-mono uppercase text-outline font-semibold">Target User:</span>
            <span className="font-semibold text-on-surface">Multi-Role Operator / Approver</span>
          </div>

          <div className="hidden lg:block w-px h-4 bg-[#dae2fd]"></div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[17px] text-outline">palette</span>
            <span className="text-[10.5px] font-mono uppercase text-outline font-semibold">Design System:</span>
            <span className="font-semibold text-on-surface">Injani Flow Standard Light</span>
          </div>
        </div>
      </section>

      {/* 5 Core Architectural Rationale Modules */}
      <div className="space-y-5">
        {/* Card 1: Action-First Dashboard */}
        <article className="bg-surface-container-lowest rounded-lg p-6 border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pl-2">
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-primary px-2 py-0.5 bg-surface-container-high rounded">
                  ARCH-DEC-01
                </span>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-outline">
                  Operational Priority Matrix
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[11px] font-medium">
                  Priority Ranking: P0/P1 Apex
                </span>
              </div>

              <h2 className="font-['Hanken_Grotesk'] text-xl font-bold text-on-surface">
                1. Action-First Dashboard
              </h2>

              <div className="bg-surface-container-low p-3.5 rounded border border-[#eaedff]">
                <div className="text-[10.5px] font-mono uppercase font-semibold text-outline mb-1">
                  Design Decision
                </div>
                <p className="font-semibold text-[13px] text-primary">
                  Operational urgency explicitly outranks passive compliance telemetry.
                </p>
              </div>

              <div>
                <div className="text-[10.5px] font-mono uppercase font-semibold text-outline mb-1">
                  Architectural Reasoning &amp; System Constraints
                </div>
                <p className="text-[12.5px] text-on-surface-variant leading-relaxed">
                  Enterprise operators face daily notification fatigue. When time-critical items breach SLAs, organizational risk spikes.
                  Therefore, urgent pending approvals with imminent SLA countdowns (P0/P1 items, &lt;2h breach windows) sit at the apex of the viewport directly beneath the scannable KPI strip.
                  Long-term compliance obligations (e.g. controls expiring in 25 days) remain visible and accessible, but are positioned in secondary modules so immediate operational triage is never obscured.
                </p>
              </div>
            </div>

            {/* Architectural Visual Schema: Viewport Hierarchy Diagram */}
            <div className="w-full lg:w-80 bg-surface-container-low p-4 rounded border border-[#eaedff] flex flex-col gap-2 shrink-0 justify-center">
              <div className="flex items-center justify-between text-[10.5px] font-mono text-outline pb-1 border-b border-[#dae2fd]">
                <span>VIEWPORT HIERARCHY</span>
                <span>SCAN FREQUENCY</span>
              </div>
              <div className="bg-surface-container-lowest p-2 rounded shadow-xs flex items-center justify-between text-[11.5px] border border-[#eaedff]">
                <span className="font-bold text-primary flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-error"></span> Tier 0: Critical SLA Breaches
                </span>
                <span className="font-mono text-error font-bold">&lt;2h Left</span>
              </div>
              <div className="bg-surface-container-lowest p-2 rounded shadow-xs flex items-center justify-between text-[11.5px] border border-[#eaedff]">
                <span className="font-semibold text-on-surface flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> Tier 1: Actionable Approvals
                </span>
                <span className="font-mono text-on-surface-variant">Immediate</span>
              </div>
              <div className="bg-surface-container-high p-2 rounded flex items-center justify-between text-[11.5px] opacity-80">
                <span className="text-on-surface-variant">Tier 2: Outbound Trackers</span>
                <span className="font-mono text-outline">Hourly</span>
              </div>
              <div className="bg-surface-container-high p-2 rounded flex items-center justify-between text-[11.5px] opacity-60">
                <span className="text-on-surface-variant">Tier 3: Passive Controls Baseline</span>
                <span className="font-mono text-outline">25-30 Days</span>
              </div>
            </div>
          </div>
        </article>

        {/* Card 2: Role-Aware Dashboard */}
        <article className="bg-surface-container-lowest rounded-lg p-6 border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pl-2">
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-secondary px-2 py-0.5 bg-secondary-container rounded">
                  ARCH-DEC-02
                </span>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-outline">
                  Unified Persona Modeling
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[11px] font-medium">
                  Zero Context Switching
                </span>
              </div>

              <h2 className="font-['Hanken_Grotesk'] text-xl font-bold text-on-surface">
                2. Role-Aware Dashboard
              </h2>

              <div className="bg-surface-container-low p-3.5 rounded border border-[#eaedff]">
                <div className="text-[10.5px] font-mono uppercase font-semibold text-outline mb-1">
                  Design Decision
                </div>
                <p className="font-semibold text-[13px] text-secondary">
                  Multi-responsibility consolidation into a single coherent workspace.
                </p>
              </div>

              <div>
                <div className="text-[10.5px] font-mono uppercase font-semibold text-outline mb-1">
                  Architectural Reasoning &amp; System Constraints
                </div>
                <p className="text-[12.5px] text-on-surface-variant leading-relaxed">
                  In modern enterprises, a single individual rarely occupies a single siloed persona; an executive like a Director of Compliance frequently acts simultaneously as an Approver (triaging incoming CapeX and IT exceptions), a Requester (tracking outbound hardware and auditor access tickets), a Control Owner (monitoring continuous ISO/SOX controls health), and an Automation Owner (observing scheduled trigger pipelines). Rather than forcing context switching across disjointed administrative portals, the dashboard organizes these responsibilities into dedicated visual zones that coexist without mutual interference.
                </p>
              </div>
            </div>

            {/* Architectural Visual Schema: Coexistence Map */}
            <div className="w-full lg:w-80 bg-surface-container-low p-4 rounded border border-[#eaedff] flex flex-col gap-2 shrink-0 justify-center">
              <div className="flex items-center justify-between text-[10.5px] font-mono text-outline pb-1 border-b border-[#dae2fd]">
                <span>OPERATIONAL COEXISTENCE</span>
                <span>PARALLEL ZONES</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-surface-container-lowest rounded shadow-xs text-center border border-[#eaedff]">
                  <span className="material-symbols-outlined text-[19px] text-primary">gavel</span>
                  <div className="font-bold text-[12px] text-on-surface mt-0.5">Approver</div>
                  <div className="text-[10px] text-outline font-mono">Inbound Triage</div>
                </div>
                <div className="p-2.5 bg-surface-container-lowest rounded shadow-xs text-center border border-[#eaedff]">
                  <span className="material-symbols-outlined text-[19px] text-secondary">send</span>
                  <div className="font-bold text-[12px] text-on-surface mt-0.5">Requester</div>
                  <div className="text-[10px] text-outline font-mono">Outbound Tracking</div>
                </div>
                <div className="p-2.5 bg-surface-container-lowest rounded shadow-xs text-center border border-[#eaedff]">
                  <span className="material-symbols-outlined text-[19px] text-secondary">verified_user</span>
                  <div className="font-bold text-[12px] text-on-surface mt-0.5">Control Owner</div>
                  <div className="text-[10px] text-outline font-mono">SOX &amp; ISO Audit</div>
                </div>
                <div className="p-2.5 bg-surface-container-lowest rounded shadow-xs text-center border border-[#eaedff]">
                  <span className="material-symbols-outlined text-[19px] text-primary">precision_manufacturing</span>
                  <div className="font-bold text-[12px] text-on-surface mt-0.5">Automation</div>
                  <div className="text-[10px] text-outline font-mono">Scheduled DAGs</div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Card 3: Grouped Information Architecture */}
        <article className="bg-surface-container-lowest rounded-lg p-6 border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-container"></div>
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pl-2">
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-primary px-2 py-0.5 bg-surface-container-high rounded">
                  ARCH-DEC-03
                </span>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-outline">
                  Cognitive Load Regulation
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[11px] font-medium">
                  Miller's Law (7 ± 2 Rule)
                </span>
              </div>

              <h2 className="font-['Hanken_Grotesk'] text-xl font-bold text-on-surface">
                3. Grouped Information Architecture
              </h2>

              <div className="bg-surface-container-low p-3.5 rounded border border-[#eaedff]">
                <div className="text-[10.5px] font-mono uppercase font-semibold text-outline mb-1">
                  Design Decision
                </div>
                <p className="font-semibold text-[13px] text-primary">
                  5-domain categorical taxonomy over flat navigational sprawl.
                </p>
              </div>

              <div>
                <div className="text-[10.5px] font-mono uppercase font-semibold text-outline mb-1">
                  Architectural Reasoning &amp; System Constraints
                </div>
                <p className="text-[12.5px] text-on-surface-variant leading-relaxed">
                  The eight required functional modules (Pending Approvals, My Requests, Workflow Catalog, Controls Registry, Schedules &amp; Triggers, SLA Reports, Approval Trail, System Settings) are grouped into 5 clear semantic domains: Workflows, Controls, Automations, Analytics, and Audit. This structure caps cognitive load, keeps primary navigation within a 7±2 boundary, establishes clear domain boundaries, and enables sub-2-click task discovery across the application.
                </p>
              </div>
            </div>

            {/* Architectural Visual Schema: Taxonomy Mapping */}
            <div className="w-full lg:w-80 bg-surface-container-low p-4 rounded border border-[#eaedff] flex flex-col gap-2 shrink-0 justify-center">
              <div className="flex items-center justify-between text-[10.5px] font-mono text-outline pb-1 border-b border-[#dae2fd]">
                <span>TAXONOMY MAPPING</span>
                <span>8 MODULES → 5 DOMAINS</span>
              </div>
              <div className="space-y-1.5 text-[11.5px] text-on-surface">
                <div className="bg-surface-container-lowest p-2 rounded flex items-center justify-between border border-[#eaedff]">
                  <span className="font-bold">1. Workflows</span>
                  <span className="font-mono text-[10px] text-outline">Approvals • Requests • Catalog</span>
                </div>
                <div className="bg-surface-container-lowest p-2 rounded flex items-center justify-between border border-[#eaedff]">
                  <span className="font-bold">2. Controls</span>
                  <span className="font-mono text-[10px] text-outline">Controls Registry</span>
                </div>
                <div className="bg-surface-container-lowest p-2 rounded flex items-center justify-between border border-[#eaedff]">
                  <span className="font-bold">3. Automations</span>
                  <span className="font-mono text-[10px] text-outline">Schedules &amp; Triggers</span>
                </div>
                <div className="bg-surface-container-lowest p-2 rounded flex items-center justify-between border border-[#eaedff]">
                  <span className="font-bold">4. Analytics</span>
                  <span className="font-mono text-[10px] text-outline">SLA &amp; Compliance Reports</span>
                </div>
                <div className="bg-surface-container-lowest p-2 rounded flex items-center justify-between border border-[#eaedff]">
                  <span className="font-bold">5. Audit</span>
                  <span className="font-mono text-[10px] text-outline">Immutable Approval Trail</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Card 4: Progressive Disclosure */}
        <article className="bg-surface-container-lowest rounded-lg p-6 border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary-fixed-dim"></div>
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pl-2">
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-secondary px-2 py-0.5 bg-secondary-container rounded">
                  ARCH-DEC-04
                </span>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-outline">
                  Context Retention Strategy
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[11px] font-medium">
                  560px Drawer Architecture
                </span>
              </div>

              <h2 className="font-['Hanken_Grotesk'] text-xl font-bold text-on-surface">
                4. Progressive Disclosure
              </h2>

              <div className="bg-surface-container-low p-3.5 rounded border border-[#eaedff]">
                <div className="text-[10.5px] font-mono uppercase font-semibold text-outline mb-1">
                  Design Decision
                </div>
                <p className="font-semibold text-[13px] text-secondary">
                  Slide-over drawer pattern for in-context decision making.
                </p>
              </div>

              <div>
                <div className="text-[10.5px] font-mono uppercase font-semibold text-outline mb-1">
                  Architectural Reasoning &amp; System Constraints
                </div>
                <p className="text-[12.5px] text-on-surface-variant leading-relaxed">
                  Navigating to a separate full page for every approval review destroys the user's ambient mental model of their daily queue. The dashboard presents high-level triage summaries (requester, amount, SLA timer, policy tags), while deep item inspection, policy check attestation, and multi-tier approval chains open in an elevated right-hand slide-over drawer (approx. 560px). Users make informed decisions (Approve, Reject, Delegate) with full audit notes while the dashboard background remains softly visible, ensuring zero context loss.
                </p>
              </div>
            </div>

            {/* Architectural Visual Schema: Drawer Layout Visualizer */}
            <div className="w-full lg:w-80 bg-surface-container-low p-4 rounded border border-[#eaedff] flex flex-col gap-2 shrink-0 justify-center">
              <div className="flex items-center justify-between text-[10.5px] font-mono text-outline pb-1 border-b border-[#dae2fd]">
                <span>PROGRESSIVE DEPTH</span>
                <span>IN-CANVAS INSPECTOR</span>
              </div>
              <div className="flex h-32 gap-2">
                <div className="flex-1 bg-surface-container-lowest rounded p-2 opacity-40 flex flex-col gap-1.5 border border-[#eaedff]">
                  <div className="h-2 w-12 bg-outline-variant rounded"></div>
                  <div className="h-2 w-full bg-surface-container rounded"></div>
                  <div className="h-2 w-full bg-surface-container rounded"></div>
                  <div className="h-2 w-3/4 bg-surface-container rounded"></div>
                  <div className="mt-auto text-[10px] font-mono text-outline">Queue Retained</div>
                </div>
                <div className="w-36 bg-surface-container-lowest rounded shadow-md p-2 flex flex-col justify-between border border-primary/30">
                  <div>
                    <div className="flex items-center justify-between pb-1">
                      <span className="font-bold text-[10px] text-primary">560px Drawer</span>
                      <span className="material-symbols-outlined text-[13px] text-outline">close</span>
                    </div>
                    <div className="text-[9px] font-mono text-outline-variant">Audit DAG &amp; Logs</div>
                  </div>
                  <div className="flex gap-1">
                    <span className="bg-primary text-white text-[9px] px-1.5 py-0.5 rounded font-bold">Approve</span>
                    <span className="bg-surface-container text-on-surface-variant text-[9px] px-1.5 py-0.5 rounded">Reject</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Card 5: Lightweight Customization */}
        <article className="bg-surface-container-lowest rounded-lg p-6 border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-tertiary"></div>
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pl-2">
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-tertiary px-2 py-0.5 bg-tertiary-fixed rounded">
                  ARCH-DEC-05
                </span>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-outline">
                  Ergonomic Personalization
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[11px] font-medium">
                  Zero Config Default
                </span>
              </div>

              <h2 className="font-['Hanken_Grotesk'] text-xl font-bold text-on-surface">
                5. Lightweight Customization
              </h2>

              <div className="bg-surface-container-low p-3.5 rounded border border-[#eaedff]">
                <div className="text-[10.5px] font-mono uppercase font-semibold text-outline mb-1">
                  Design Decision
                </div>
                <p className="font-semibold text-[13px] text-tertiary">
                  Zero-configuration default with optional drag-and-drop personalization.
                </p>
              </div>

              <div>
                <div className="text-[10.5px] font-mono uppercase font-semibold text-outline mb-1">
                  Architectural Reasoning &amp; System Constraints
                </div>
                <p className="text-[12.5px] text-on-surface-variant leading-relaxed">
                  Casual users should never face an intimidating "blank canvas" or complex dashboard configuration wizard; they receive a finely calibrated default layout with the 5 core widgets enabled out of the box. Conversely, power users requiring specialized telemetry can open a lightweight customization screen to toggle visibility and reorder widgets via simple drag-and-drop handles without needing an enterprise layout builder.
                </p>
              </div>
            </div>

            {/* Architectural Visual Schema: Default vs Personalized Toggle */}
            <div className="w-full lg:w-80 bg-surface-container-low p-4 rounded border border-[#eaedff] flex flex-col gap-2 shrink-0 justify-center">
              <div className="flex items-center justify-between text-[10.5px] font-mono text-outline pb-1 border-b border-[#dae2fd]">
                <span>MODULAR TILES</span>
                <span>QUICK TOGGLES</span>
              </div>
              <div className="bg-surface-container-lowest p-2 rounded shadow-xs flex items-center justify-between text-[11.5px] border border-[#eaedff]">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-outline">drag_indicator</span>
                  Pending Triage
                </span>
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
              </div>
              <div className="bg-surface-container-lowest p-2 rounded shadow-xs flex items-center justify-between text-[11.5px] border border-[#eaedff]">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-outline">drag_indicator</span>
                  Active Controls
                </span>
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
              </div>
              <div className="bg-surface-container-lowest p-2 rounded shadow-xs flex items-center justify-between text-[11.5px] border border-[#eaedff]">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-outline">drag_indicator</span>
                  Execution DAGs
                </span>
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Design Principles & Decision Matrix Table */}
      <section className="bg-surface-container-lowest rounded-lg p-6 border border-[#eaedff] shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="font-['Hanken_Grotesk'] text-[16px] font-bold text-on-surface">
              Design Principles &amp; Decision Matrix
            </h3>
            <p className="text-[12px] text-on-surface-variant">
              Comparative evaluation of traditional enterprise BPA paradigms versus Injani Flow architectural implementations.
            </p>
          </div>
          <span className="font-mono text-[11px] text-outline">
            Standard vs Injani Engine
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[12px]">
            <thead className="bg-surface-container-low text-on-surface-variant font-mono text-[10.5px] uppercase tracking-wider border-b border-[#eaedff]">
              <tr>
                <th className="py-2.5 px-4 font-semibold">Architectural Vector</th>
                <th className="py-2.5 px-4 font-semibold">Traditional Enterprise BPA</th>
                <th className="py-2.5 px-4 font-semibold text-primary">Injani Flow Architectural Choice</th>
                <th className="py-2.5 px-4 font-semibold">Cognitive &amp; Business Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f2f3ff] text-on-surface">
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="py-3 px-4 font-bold text-on-surface">Workspace Consolidation</td>
                <td className="py-3 px-4 text-on-surface-variant">
                  Siloed tools (approvals in email, controls in GRC portal, runs in Jenkins)
                </td>
                <td className="py-3 px-4 text-primary font-bold">
                  Unified Role-Aware Cockpit (tri-panel operational matrix)
                </td>
                <td className="py-3 px-4 text-secondary font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">trending_down</span>
                  <span>Zero portal hopping</span>
                </td>
              </tr>

              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="py-3 px-4 font-bold text-on-surface">Inspection Flow</td>
                <td className="py-3 px-4 text-on-surface-variant">
                  Disorienting full-page redirection on item selection
                </td>
                <td className="py-3 px-4 text-primary font-bold">
                  Context-Preserving 560px Drawer with ambient queue backdrops
                </td>
                <td className="py-3 px-4 text-secondary font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>100% queue state retention</span>
                </td>
              </tr>

              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="py-3 px-4 font-bold text-on-surface">Dashboard Customization</td>
                <td className="py-3 px-4 text-on-surface-variant">
                  Rigid monolithic screens or mandatory empty "build-your-own" canvases
                </td>
                <td className="py-3 px-4 text-primary font-bold">
                  Opinionated Zero-Config default with lightweight drag-and-drop toggles
                </td>
                <td className="py-3 px-4 text-secondary font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">speed</span>
                  <span>Zero onboarding friction</span>
                </td>
              </tr>

              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="py-3 px-4 font-bold text-on-surface">Navigation Hierarchy</td>
                <td className="py-3 px-4 text-on-surface-variant">
                  Flat list of 8–14 uncategorized sidebar links creating navigational sprawl
                </td>
                <td className="py-3 px-4 text-primary font-bold">
                  5-Domain Categorical IA Taxonomy (Workflows, Controls, Exec, SLA, Audit)
                </td>
                <td className="py-3 px-4 text-secondary font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  <span>&lt; 2 click destination access</span>
                </td>
              </tr>

              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="py-3 px-4 font-bold text-on-surface">Triage Urgency Handling</td>
                <td className="py-3 px-4 text-on-surface-variant">
                  Generic FIFO sorting without visibility of SLA expiration threats
                </td>
                <td className="py-3 px-4 text-primary font-bold">
                  Urgency-First prioritization with prominent real-time countdown chips
                </td>
                <td className="py-3 px-4 text-secondary font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">shield</span>
                  <span>Near-zero breach risk</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Document Sign-off Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-outline border-t border-[#eaedff] pt-3 pb-6 font-mono">
        <div className="flex items-center gap-1.5 mb-1 sm:mb-0">
          <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
          <span>System Architecture Specification validated against Injani Flow Standard Light</span>
        </div>
        <div>
          ID: SPEC-2025-ARCH-RATIONALE
        </div>
      </div>
    </div>
  );
};
