import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export type ComplianceRuleType =
  | 'SEC_MARKETING_206_4_1'
  | 'FINRA_2210'
  | 'GLBA_SAFEGUARDS'
  | 'SEC_REG_S_P'
  | 'AML_KYC';

export interface ComplianceCheck {
  id: string;
  type: ComplianceRuleType;
  targetType: 'document' | 'communication' | 'client' | 'transaction';
  targetId: string;
  status: 'pending' | 'approved' | 'rejected' | 'escalated';
  findings: string[];
  reviewedBy?: string;
  reviewedAt?: Date;
  escalatedTo?: string;
  escalatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  userId: string;
  userRole: string;
  details: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

@Injectable()
export class ComplianceService {
  private complianceChecks: ComplianceCheck[] = [];
  private auditLogs: AuditLogEntry[] = [];

  // Compliance rule validation
  async validateContent(
    type: ComplianceRuleType,
    targetType: string,
    targetId: string,
    content: string
  ): Promise<ComplianceCheck> {
    const findings: string[] = [];

    // SEC Marketing Rule 206(4)-1 checks
    if (type === 'SEC_MARKETING_206_4_1') {
      if (content.toLowerCase().includes('guaranteed')) {
        findings.push('Prohibited term "guaranteed" found - requires removal');
      }
      if (content.toLowerCase().includes('no risk')) {
        findings.push('Misleading term "no risk" found - requires disclosure');
      }
      if (content.match(/\d+% return/i)) {
        findings.push('Performance claim detected - requires supporting documentation and disclosures');
      }
    }

    // FINRA 2210 communication checks
    if (type === 'FINRA_2210') {
      if (!content.includes('past performance')) {
        findings.push('Missing past performance disclaimer');
      }
      if (content.toLowerCase().includes('best') || content.toLowerCase().includes('top')) {
        findings.push('Superlative language requires substantiation');
      }
    }

    const check: ComplianceCheck = {
      id: uuidv4(),
      type,
      targetType: targetType as ComplianceCheck['targetType'],
      targetId,
      status: findings.length > 0 ? 'pending' : 'approved',
      findings,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.complianceChecks.push(check);

    // Log compliance check for audit trail
    console.log(
      `[AUDIT] Compliance check: ${check.id} (${type}) - ${check.status} at ${new Date().toISOString()}`
    );

    return check;
  }

  async findAllChecks(status?: string): Promise<ComplianceCheck[]> {
    if (status) {
      return this.complianceChecks.filter((check) => check.status === status);
    }
    return this.complianceChecks;
  }

  async reviewCheck(
    id: string,
    status: 'approved' | 'rejected' | 'escalated',
    reviewedBy: string,
    notes?: string
  ): Promise<ComplianceCheck | null> {
    const check = this.complianceChecks.find((c) => c.id === id);
    if (!check) {
      return null;
    }

    check.status = status;
    check.reviewedBy = reviewedBy;
    check.reviewedAt = new Date();
    check.updatedAt = new Date();

    if (notes) {
      check.findings.push(`Review notes: ${notes}`);
    }

    // Log compliance review for audit trail
    console.log(
      `[AUDIT] Compliance review: ${id} - ${status} by ${reviewedBy} at ${new Date().toISOString()}`
    );

    return check;
  }

  async escalateCheck(id: string, escalatedTo: string): Promise<ComplianceCheck | null> {
    const check = this.complianceChecks.find((c) => c.id === id);
    if (!check) {
      return null;
    }

    check.status = 'escalated';
    check.escalatedTo = escalatedTo;
    check.escalatedAt = new Date();
    check.updatedAt = new Date();

    console.log(`[AUDIT] Compliance escalation: ${id} to ${escalatedTo} at ${new Date().toISOString()}`);

    return check;
  }

  // Audit logging
  async createAuditLog(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<AuditLogEntry> {
    const auditEntry: AuditLogEntry = {
      ...entry,
      id: uuidv4(),
      timestamp: new Date(),
    };

    this.auditLogs.push(auditEntry);

    // In production, this would write to an immutable audit log store
    console.log(
      `[AUDIT] ${auditEntry.action}: ${auditEntry.entityType}/${auditEntry.entityId} by ${auditEntry.userId}`
    );

    return auditEntry;
  }

  async getAuditLogs(
    entityType?: string,
    entityId?: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<AuditLogEntry[]> {
    let logs = this.auditLogs;

    if (entityType) {
      logs = logs.filter((log) => log.entityType === entityType);
    }
    if (entityId) {
      logs = logs.filter((log) => log.entityId === entityId);
    }
    if (startDate) {
      logs = logs.filter((log) => log.timestamp >= startDate);
    }
    if (endDate) {
      logs = logs.filter((log) => log.timestamp <= endDate);
    }

    return logs;
  }
}
