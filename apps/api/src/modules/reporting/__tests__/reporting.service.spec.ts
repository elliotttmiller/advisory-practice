import { Test, TestingModule } from '@nestjs/testing';
import { ReportingService, Report, DashboardMetrics } from '../reporting.service';

describe('ReportingService', () => {
  let service: ReportingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportingService],
    }).compile();

    service = module.get<ReportingService>(ReportingService);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDashboardMetrics', () => {
    it('should return dashboard metrics', async () => {
      const metrics = await service.getDashboardMetrics();

      expect(metrics.totalClients).toBeDefined();
      expect(metrics.activeClients).toBeDefined();
      expect(metrics.totalAUM).toBeDefined();
      expect(metrics.leadsThisMonth).toBeDefined();
      expect(metrics.conversionRate).toBeDefined();
      expect(metrics.complianceScore).toBeDefined();
      expect(metrics.pendingReviews).toBeDefined();
    });

    it('should return numeric values', async () => {
      const metrics = await service.getDashboardMetrics();

      expect(typeof metrics.totalClients).toBe('number');
      expect(typeof metrics.activeClients).toBe('number');
      expect(typeof metrics.totalAUM).toBe('number');
      expect(metrics.conversionRate).toBeGreaterThanOrEqual(0);
      expect(metrics.conversionRate).toBeLessThanOrEqual(1);
      expect(metrics.complianceScore).toBeGreaterThanOrEqual(0);
      expect(metrics.complianceScore).toBeLessThanOrEqual(1);
    });
  });

  describe('generateReport', () => {
    it('should create a report and begin processing', async () => {
      const report = await service.generateReport(
        'Test Report',
        'compliance',
        'pdf',
        { period: 'monthly' },
        'user-123'
      );

      expect(report.id).toBeDefined();
      expect(report.name).toBe('Test Report');
      expect(report.type).toBe('compliance');
      expect(report.format).toBe('pdf');
      // Report starts as pending then immediately moves to processing
      expect(['pending', 'processing']).toContain(report.status);
      expect(report.generatedBy).toBe('user-123');
      expect(report.createdAt).toBeInstanceOf(Date);
    });

    it('should accept different report types', async () => {
      const types: Report['type'][] = ['compliance', 'performance', 'client', 'marketing', 'audit'];

      for (const type of types) {
        const report = await service.generateReport(`${type} Report`, type, 'pdf', {}, 'user-123');
        expect(report.type).toBe(type);
      }
    });

    it('should accept different formats', async () => {
      const formats: Report['format'][] = ['pdf', 'csv', 'xlsx', 'json'];

      for (const format of formats) {
        const report = await service.generateReport(
          'Test Report',
          'compliance',
          format,
          {},
          'user-123'
        );
        expect(report.format).toBe(format);
      }
    });
  });

  describe('getReport', () => {
    it('should return null for non-existent report', async () => {
      const result = await service.getReport('non-existent-id');
      expect(result).toBeNull();
    });

    it('should return report by ID', async () => {
      const created = await service.generateReport(
        'Test Report',
        'compliance',
        'pdf',
        { test: true },
        'user-123'
      );

      const found = await service.getReport(created.id);
      expect(found?.id).toBe(created.id);
      expect(found?.name).toBe('Test Report');
    });
  });

  describe('listReports', () => {
    it('should return empty array initially', async () => {
      const result = await service.listReports();
      expect(result).toEqual([]);
    });

    it('should filter reports by type', async () => {
      await service.generateReport('Compliance Report', 'compliance', 'pdf', {}, 'user-1');
      await service.generateReport('Performance Report', 'performance', 'pdf', {}, 'user-1');
      await service.generateReport('Audit Report', 'audit', 'csv', {}, 'user-1');

      const complianceReports = await service.listReports('compliance');
      const auditReports = await service.listReports('audit');

      expect(complianceReports.length).toBe(1);
      expect(auditReports.length).toBe(1);
    });

    it('should return all reports when no filter', async () => {
      await service.generateReport('Report 1', 'compliance', 'pdf', {}, 'user-1');
      await service.generateReport('Report 2', 'performance', 'pdf', {}, 'user-1');

      const allReports = await service.listReports();
      expect(allReports.length).toBe(2);
    });
  });

  describe('generateComplianceReport', () => {
    it('should generate compliance report with correct parameters', async () => {
      const report = await service.generateComplianceReport('monthly', 'user-123');

      expect(report.type).toBe('compliance');
      expect(report.format).toBe('pdf');
      expect(report.name).toContain('Compliance Report');
      expect(report.name).toContain('Monthly');
      expect(report.parameters).toHaveProperty('period', 'monthly');
    });

    it('should support quarterly and annual periods', async () => {
      const quarterly = await service.generateComplianceReport('quarterly', 'user-1');
      const annual = await service.generateComplianceReport('annual', 'user-2');

      expect(quarterly.name).toContain('Quarterly');
      expect(annual.name).toContain('Annual');
    });
  });

  describe('generateClientReport', () => {
    it('should generate client portfolio report', async () => {
      const report = await service.generateClientReport('client-123', 'advisor-456');

      expect(report.type).toBe('client');
      expect(report.format).toBe('pdf');
      expect(report.name).toContain('Client Portfolio');
      expect(report.parameters).toHaveProperty('clientId', 'client-123');
    });
  });

  describe('exportAuditTrail', () => {
    it('should generate audit trail export report', async () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-12-31');

      const report = await service.exportAuditTrail(startDate, endDate, 'compliance-officer');

      expect(report.type).toBe('audit');
      expect(report.format).toBe('csv');
      expect(report.name).toContain('Audit Trail Export');
      expect(report.parameters).toHaveProperty('startDate');
      expect(report.parameters).toHaveProperty('endDate');
    });
  });
});
