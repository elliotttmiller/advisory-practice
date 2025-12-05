import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceService, ComplianceCheck, ComplianceRuleType } from '../compliance.service';

describe('ComplianceService', () => {
  let service: ComplianceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplianceService],
    }).compile();

    service = module.get<ComplianceService>(ComplianceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateContent - SEC Marketing Rule 206(4)-1', () => {
    it('should detect prohibited term "guaranteed"', async () => {
      const result = await service.validateContent(
        'SEC_MARKETING_206_4_1',
        'document',
        'test-id',
        'This investment is guaranteed to produce returns!'
      );

      expect(result.status).toBe('pending');
      expect(result.findings).toContain('Prohibited term "guaranteed" found - requires removal');
    });

    it('should detect prohibited term "no risk"', async () => {
      const result = await service.validateContent(
        'SEC_MARKETING_206_4_1',
        'document',
        'test-id',
        'This is a no risk investment opportunity.'
      );

      expect(result.status).toBe('pending');
      expect(result.findings).toContain('Prohibited term "no risk" found - requires removal');
    });

    it('should detect performance claims', async () => {
      const result = await service.validateContent(
        'SEC_MARKETING_206_4_1',
        'document',
        'test-id',
        'Our fund achieved 25% return last year!'
      );

      expect(result.status).toBe('pending');
      expect(result.findings).toContain(
        'Performance claim detected - requires supporting documentation and disclosures'
      );
    });

    it('should approve compliant content', async () => {
      const result = await service.validateContent(
        'SEC_MARKETING_206_4_1',
        'document',
        'test-id',
        'We provide professional financial advisory services with a focus on risk management. Past performance does not guarantee future results.'
      );

      expect(result.status).toBe('approved');
      expect(result.findings).toHaveLength(0);
    });
  });

  describe('validateContent - FINRA Rule 2210', () => {
    it('should flag missing past performance disclaimer', async () => {
      const result = await service.validateContent(
        'FINRA_2210',
        'communication',
        'test-id',
        'Our investment strategy has been very successful.'
      );

      expect(result.status).toBe('pending');
      expect(result.findings).toContain('Missing past performance disclaimer');
    });

    it('should flag superlative language', async () => {
      const result = await service.validateContent(
        'FINRA_2210',
        'communication',
        'test-id',
        'We are the best financial advisors in the industry. Past performance does not guarantee future results.'
      );

      expect(result.status).toBe('pending');
      expect(result.findings).toContain('Superlative language "best" requires substantiation');
    });

    it('should approve compliant communication', async () => {
      const result = await service.validateContent(
        'FINRA_2210',
        'communication',
        'test-id',
        'We offer financial advisory services. Past performance does not guarantee future results.'
      );

      expect(result.status).toBe('approved');
      expect(result.findings).toHaveLength(0);
    });
  });

  describe('findAllChecks', () => {
    it('should return empty array initially', async () => {
      const result = await service.findAllChecks();
      expect(result).toEqual([]);
    });

    it('should return checks filtered by status', async () => {
      await service.validateContent(
        'SEC_MARKETING_206_4_1',
        'document',
        'id1',
        'Guaranteed returns!'
      );
      await service.validateContent(
        'SEC_MARKETING_206_4_1',
        'document',
        'id2',
        'Safe compliant content. Past performance does not guarantee future results.'
      );

      const pending = await service.findAllChecks('pending');
      const approved = await service.findAllChecks('approved');

      expect(pending.length).toBe(1);
      expect(approved.length).toBe(1);
    });
  });

  describe('reviewCheck', () => {
    it('should return null for non-existent check', async () => {
      const result = await service.reviewCheck('non-existent-id', 'approved', 'reviewer-id');
      expect(result).toBeNull();
    });

    it('should update check status with review', async () => {
      const check = await service.validateContent(
        'SEC_MARKETING_206_4_1',
        'document',
        'test-id',
        'Some content to review. Past performance does not guarantee future results.'
      );

      const reviewed = await service.reviewCheck(
        check.id,
        'approved',
        'compliance-officer-123',
        'Looks good'
      );

      expect(reviewed?.status).toBe('approved');
      expect(reviewed?.reviewedBy).toBe('compliance-officer-123');
      expect(reviewed?.reviewedAt).toBeInstanceOf(Date);
      expect(reviewed?.findings).toContain('Review notes: Looks good');
    });

    it('should allow rejection with notes', async () => {
      const check = await service.validateContent(
        'SEC_MARKETING_206_4_1',
        'document',
        'test-id',
        'Guaranteed returns!' // Non-compliant
      );

      const reviewed = await service.reviewCheck(
        check.id,
        'rejected',
        'compliance-officer-123',
        'Contains prohibited terms'
      );

      expect(reviewed?.status).toBe('rejected');
      expect(reviewed?.reviewedBy).toBe('compliance-officer-123');
    });
  });

  describe('escalateCheck', () => {
    it('should return null for non-existent check', async () => {
      const result = await service.escalateCheck('non-existent-id', 'senior-compliance');
      expect(result).toBeNull();
    });

    it('should escalate check to specified person', async () => {
      const check = await service.validateContent(
        'SEC_MARKETING_206_4_1',
        'document',
        'test-id',
        'Content with issues. Guaranteed returns!'
      );

      const escalated = await service.escalateCheck(check.id, 'senior-compliance-officer');

      expect(escalated?.status).toBe('escalated');
      expect(escalated?.escalatedTo).toBe('senior-compliance-officer');
      expect(escalated?.escalatedAt).toBeInstanceOf(Date);
    });
  });

  describe('Audit Logging', () => {
    it('should create audit log entry', async () => {
      const entry = await service.createAuditLog({
        action: 'CREATE',
        entityType: 'document',
        entityId: 'doc-123',
        userId: 'user-456',
        userRole: 'advisor',
        details: { documentType: 'contract' },
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0',
      });

      expect(entry.id).toBeDefined();
      expect(entry.timestamp).toBeInstanceOf(Date);
      expect(entry.action).toBe('CREATE');
      expect(entry.entityType).toBe('document');
    });

    it('should retrieve audit logs with filters', async () => {
      await service.createAuditLog({
        action: 'CREATE',
        entityType: 'document',
        entityId: 'doc-123',
        userId: 'user-456',
        userRole: 'advisor',
        details: {},
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0',
      });

      await service.createAuditLog({
        action: 'UPDATE',
        entityType: 'client',
        entityId: 'client-789',
        userId: 'user-456',
        userRole: 'advisor',
        details: {},
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0',
      });

      const documentLogs = await service.getAuditLogs('document');
      const clientLogs = await service.getAuditLogs('client');

      expect(documentLogs.length).toBe(1);
      expect(clientLogs.length).toBe(1);
      expect(documentLogs[0]?.entityType).toBe('document');
      expect(clientLogs[0]?.entityType).toBe('client');
    });
  });
});
