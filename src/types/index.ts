export type PriorityLevel = 'P0 - CRITICAL' | 'P1 - HIGH' | 'P2 - MEDIUM' | 'P3 - STANDARD';

export type WorkflowCategory = 
  | 'Dual-Custody' 
  | 'SOX Audit' 
  | 'Vendor Risk' 
  | 'FinOps' 
  | 'Security Exception' 
  | 'CapEx Request' 
  | 'IT Access';

export interface Requester {
  name: string;
  initials: string;
  role: string;
  department: string;
}

export interface PolicyInvariant {
  name: string;
  status: 'passed' | 'warning' | 'pending';
  detail: string;
}

export interface ApprovalChainNode {
  step: number;
  totalSteps: number;
  title: string;
  approver: string;
  status: 'approved' | 'current' | 'pending';
  timestamp?: string;
  auditSigner?: string;
}

export interface ApprovalItem {
  id: string;
  workflowId: string;
  category: WorkflowCategory;
  title: string;
  description: string;
  requester: Requester;
  roleContext: {
    roleTitle: string;
    stepInfo: string;
    isFinal?: boolean;
    threshold?: string;
  };
  slaCountdown: {
    remainingSeconds: number; // Decrements in real-time
    initialDisplay: string;
    isOverdue?: boolean;
    overdueNotice?: string;
    riskTarget: string;
    riskTier: 'critical' | 'warning' | 'track';
  };
  priority: PriorityLevel;
  status: 'pending' | 'approved' | 'rejected' | 'delegated';
  details: {
    justification: string;
    scope: string;
    impactedSystems: string[];
    costImpact?: string;
    requestedDuration?: string;
    evidenceAuditHash: string;
    createdTimestamp: string;
    policyInvariants: PolicyInvariant[];
    approvalChain: ApprovalChainNode[];
  };
}

export interface SubmittedRequest {
  id: string;
  title: string;
  category: string;
  status: 'In Progress' | 'Under Review' | 'Awaiting Final Sign-off' | 'Approved & Sealed' | 'Rejected';
  stageText: string;
  reviewerText: string;
  submittedDate: string;
  progressPercent: number;
  remainingText?: string;
  auditHash?: string;
}

export interface GovernanceControl {
  id: string;
  title: string;
  standard: 'SOX' | 'ISO 27001' | 'NIST CSF' | 'SOC2 Type II';
  status: 'Healthy / In Attestation' | 'Attestation Pending' | 'Requires Immediate Attestation' | 'Fully Compliant';
  urgency: 'healthy' | 'expiring_soon' | 'overdue' | 'critical';
  expirationDays: number;
  deadline: string;
  complianceHealth: string;
  owner: string;
  scopeNote: string;
  evidenceItemsCount: number;
}

export interface AutomationDaemon {
  id: string;
  name: string;
  cronExpression: string;
  cadence: string;
  lastExecution: string;
  nextExecutionIn: string;
  status: 'operational' | 'alert' | 'syncing';
  driftFindings: number;
  assetsValidated?: number;
  lastRunTimestamp: string;
}

export type RoleFilter = 'all' | 'approver' | 'requester' | 'control_owner' | 'automation_owner';

export type NavTab = 
  | 'dashboard'
  | 'pending-approvals'
  | 'my-requests'
  | 'workflow-catalog'
  | 'controls-registry'
  | 'schedules-triggers'
  | 'sla-reports'
  | 'approval-trail'
  | 'blueprint'
  | 'design-spec'
  | 'system-settings'
  | 'help-documentation';
