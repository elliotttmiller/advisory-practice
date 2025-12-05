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
  severity: 'low' | 'medium' | 'high' | 'critical';
  findings: string[];
  recommendations: string[];
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

// Prohibited terms under SEC Marketing Rule 206(4)-1
const SEC_PROHIBITED_TERMS = [
  'guaranteed',
  'no risk',
  'risk-free',
  'safe investment',
  'cannot lose',
  'sure thing',
  'certain return',
  'always profitable',
  'never lose money',
  'foolproof',
  'fail-safe',
];

// Terms requiring substantiation
const TERMS_REQUIRING_SUBSTANTIATION = [
  'best',
  'top',
  'leading',
  '#1',
  'number one',
  'first',
  'highest',
  'lowest fees',
  'superior',
  'award-winning',
  'exclusive',
];

@Injectable()
export class ComplianceService {
  private complianceChecks: ComplianceCheck[] = [];
  private auditLogs: AuditLogEntry[] = [];

  /**
   * Validate content against compliance rules
   * Implements SEC Marketing Rule 206(4)-1 and FINRA Rule 2210
   */
  async validateContent(
    type: ComplianceRuleType,
    targetType: string,
    targetId: string,
    content: string
  ): Promise<ComplianceCheck> {
    const findings: string[] = [];
    const recommendations: string[] = [];
    let severity: ComplianceCheck['severity'] = 'low';

    const lowerContent = content.toLowerCase();

    // SEC Marketing Rule 206(4)-1 checks
    if (type === 'SEC_MARKETING_206_4_1') {
      // Check for prohibited terms
      for (const term of SEC_PROHIBITED_TERMS) {
        if (lowerContent.includes(term)) {
          findings.push(`Prohibited term "${term}" found - requires removal`);
          severity = 'critical';
        }
      }

      // Check for terms requiring substantiation
      for (const term of TERMS_REQUIRING_SUBSTANTIATION) {
        if (lowerContent.includes(term)) {
          findings.push(`Superlative/comparative term "${term}" requires substantiation`);
          recommendations.push(`Provide supporting evidence for "${term}" claim or remove`);
          if (severity !== 'critical') {
            severity = 'high';
          }
        }
      }

      // Check for performance claims
      if (content.match(/\d+%\s*(return|gain|profit|yield)/i)) {
        findings.push(
          'Performance claim detected - requires supporting documentation and disclosures'
        );
        recommendations.push(
          'Add required disclosure: "Past performance is not indicative of future results"'
        );
        if (severity === 'low') {
          severity = 'medium';
        }
      }

      // Check for testimonials without disclosure
      if (
        lowerContent.includes('testimonial') ||
        lowerContent.includes('review') ||
        lowerContent.includes('client said')
      ) {
        if (!lowerContent.includes('compensated') && !lowerContent.includes('paid')) {
          findings.push('Testimonial detected - requires compensation disclosure if applicable');
          recommendations.push('Add disclosure if testimonial provider was compensated');
        }
        if (!lowerContent.includes('conflict') && !lowerContent.includes('material connection')) {
          recommendations.push('Consider adding material connection disclosure');
        }
      }

      // Check for hypothetical performance
      if (
        lowerContent.includes('hypothetical') ||
        lowerContent.includes('backtested') ||
        lowerContent.includes('simulated')
      ) {
        if (!lowerContent.includes('disclaimer') && !lowerContent.includes('limitations')) {
          findings.push(
            'Hypothetical performance detected without required limitations disclaimer'
          );
          recommendations.push('Add hypothetical performance limitations disclosure');
          if (severity === 'low') {
            severity = 'medium';
          }
        }
      }

      // Check for third-party ratings
      if (content.match(/rated|ranking|star|rating/i)) {
        findings.push(
          'Third-party rating reference detected - verify current rating and methodology disclosure'
        );
        recommendations.push('Include date of rating and criteria used');
      }
    }

    // FINRA 2210 communication checks
    if (type === 'FINRA_2210') {
      // Missing past performance disclaimer
      if (!lowerContent.includes('past performance')) {
        findings.push('Missing past performance disclaimer');
        recommendations.push('Add: "Past performance does not guarantee future results"');
        severity = 'high';
      }

      // Superlative language check
      for (const term of TERMS_REQUIRING_SUBSTANTIATION) {
        if (lowerContent.includes(term)) {
          findings.push(`Superlative language "${term}" requires substantiation`);
          if (severity === 'low') {
            severity = 'medium';
          }
        }
      }

      // Check for balanced presentation
      if (
        lowerContent.includes('benefit') ||
        lowerContent.includes('advantage') ||
        lowerContent.includes('opportunity')
      ) {
        if (
          !lowerContent.includes('risk') &&
          !lowerContent.includes('loss') &&
          !lowerContent.includes('volatility')
        ) {
          findings.push('Content may lack balanced presentation of risks and benefits');
          recommendations.push('Consider adding discussion of material risks');
          if (severity === 'low') {
            severity = 'medium';
          }
        }
      }

      // Check for projections
      if (
        lowerContent.includes('will') ||
        lowerContent.includes('expect') ||
        lowerContent.includes('project')
      ) {
        if (content.match(/will\s+(earn|make|return|grow|increase)/i)) {
          findings.push('Forward-looking statement detected - may imply certainty');
          recommendations.push('Use language like "may" or "could" instead of definitive claims');
        }
      }
    }

    // GLBA Safeguards Rule checks
    if (type === 'GLBA_SAFEGUARDS') {
      // Check for PII exposure risks
      if (content.match(/\b\d{3}-\d{2}-\d{4}\b/)) {
        findings.push('Potential SSN pattern detected - ensure proper handling');
        severity = 'critical';
      }
      if (content.match(/\b\d{16}\b/)) {
        findings.push('Potential credit card number detected - ensure proper handling');
        severity = 'critical';
      }
    }

    // SEC Regulation S-P checks
    if (type === 'SEC_REG_S_P') {
      // Check for privacy notice requirements
      if (lowerContent.includes('share') && lowerContent.includes('information')) {
        if (!lowerContent.includes('opt-out') && !lowerContent.includes('privacy')) {
          findings.push('Information sharing mentioned without privacy notice reference');
          recommendations.push('Ensure privacy notice and opt-out rights are communicated');
        }
      }
    }

    // AML/KYC checks
    if (type === 'AML_KYC') {
      // This would typically check against CIP requirements
      if (lowerContent.includes('verify') || lowerContent.includes('identity')) {
        recommendations.push('Ensure CIP documentation requirements are met');
      }
    }

    const check: ComplianceCheck = {
      id: uuidv4(),
      type,
      targetType: targetType as ComplianceCheck['targetType'],
      targetId,
      status: findings.length > 0 ? 'pending' : 'approved',
      severity: findings.length > 0 ? severity : 'low',
      findings,
      recommendations,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.complianceChecks.push(check);

    // Log compliance check for audit trail
    console.log(
      `[AUDIT] Compliance check: ${check.id} (${type}) - ${check.status} [${check.severity}] at ${new Date().toISOString()}`
    );

    return check;
  }

  async findAllChecks(status?: string): Promise<ComplianceCheck[]> {
    if (status) {
      return this.complianceChecks.filter((check) => check.status === status);
    }
    return this.complianceChecks;
  }

  async findCheckById(id: string): Promise<ComplianceCheck | null> {
    return this.complianceChecks.find((c) => c.id === id) || null;
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

    console.log(
      `[AUDIT] Compliance escalation: ${id} to ${escalatedTo} at ${new Date().toISOString()}`
    );

    return check;
  }

  /**
   * Get compliance statistics for dashboard
   */
  async getComplianceStats(): Promise<{
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    escalated: number;
    bySeverity: Record<string, number>;
    byType: Record<string, number>;
  }> {
    const stats = {
      total: this.complianceChecks.length,
      pending: this.complianceChecks.filter((c) => c.status === 'pending').length,
      approved: this.complianceChecks.filter((c) => c.status === 'approved').length,
      rejected: this.complianceChecks.filter((c) => c.status === 'rejected').length,
      escalated: this.complianceChecks.filter((c) => c.status === 'escalated').length,
      bySeverity: {} as Record<string, number>,
      byType: {} as Record<string, number>,
    };

    for (const check of this.complianceChecks) {
      stats.bySeverity[check.severity] = (stats.bySeverity[check.severity] || 0) + 1;
      stats.byType[check.type] = (stats.byType[check.type] || 0) + 1;
    }

    return stats;
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
