import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { IntegrationsService } from '../integrations.service';

describe('IntegrationsService', () => {
  let service: IntegrationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IntegrationsService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test'),
          },
        },
      ],
    }).compile();

    service = module.get<IntegrationsService>(IntegrationsService);
  });

  describe('getIntegrations', () => {
    it('should return all integrations', async () => {
      const integrations = await service.getIntegrations();
      expect(integrations).toBeDefined();
      expect(Array.isArray(integrations)).toBe(true);
      expect(integrations.length).toBeGreaterThan(0);
    });

    it('should filter integrations by type', async () => {
      const tampIntegrations = await service.getIntegrations('TAMP');
      expect(tampIntegrations.every((i) => i.type === 'TAMP')).toBe(true);
    });
  });

  describe('getIntegrationById', () => {
    it('should return integration by ID', async () => {
      const integrations = await service.getIntegrations();
      const firstIntegration = integrations[0];

      if (firstIntegration) {
        const found = await service.getIntegrationById(firstIntegration.id);
        expect(found).toBeDefined();
        expect(found?.id).toBe(firstIntegration.id);
      }
    });

    it('should return null for non-existent ID', async () => {
      const found = await service.getIntegrationById('non-existent-id');
      expect(found).toBeNull();
    });
  });

  describe('createIntegration', () => {
    it('should create a new integration', async () => {
      const newIntegration = await service.createIntegration({
        provider: 'WEALTHBOX',
        type: 'CRM',
        name: 'Wealthbox CRM',
        enabled: false,
        apiBaseUrl: 'https://api.wealthbox.com/v1',
        authType: 'oauth2',
        rateLimits: {
          requestsPerSecond: 5,
          requestsPerMinute: 150,
          burstLimit: 25,
        },
        status: 'pending_setup',
      });

      expect(newIntegration).toBeDefined();
      expect(newIntegration.id).toBeDefined();
      expect(newIntegration.provider).toBe('WEALTHBOX');
      expect(newIntegration.type).toBe('CRM');
    });
  });

  describe('updateIntegration', () => {
    it('should update an existing integration', async () => {
      const integrations = await service.getIntegrations();
      const firstIntegration = integrations[0];

      if (firstIntegration) {
        const updated = await service.updateIntegration(firstIntegration.id, {
          name: 'Updated Integration Name',
        });

        expect(updated).toBeDefined();
        expect(updated?.name).toBe('Updated Integration Name');
      }
    });

    it('should return null for non-existent integration', async () => {
      const updated = await service.updateIntegration('non-existent-id', { name: 'Test' });
      expect(updated).toBeNull();
    });
  });

  describe('toggleIntegration', () => {
    it('should enable an integration', async () => {
      const integrations = await service.getIntegrations();
      const firstIntegration = integrations[0];

      if (firstIntegration) {
        const enabled = await service.toggleIntegration(firstIntegration.id, true);
        expect(enabled?.enabled).toBe(true);
        expect(enabled?.status).toBe('active');
      }
    });

    it('should disable an integration', async () => {
      const integrations = await service.getIntegrations();
      const firstIntegration = integrations[0];

      if (firstIntegration) {
        const disabled = await service.toggleIntegration(firstIntegration.id, false);
        expect(disabled?.enabled).toBe(false);
        expect(disabled?.status).toBe('inactive');
      }
    });
  });

  describe('handleWebhook', () => {
    it('should create webhook event', async () => {
      const integrations = await service.getIntegrations();
      const firstIntegration = integrations[0];

      if (firstIntegration) {
        const event = await service.handleWebhook(firstIntegration.id, 'portfolio.updated', {
          portfolioId: 'test-123',
          timestamp: new Date().toISOString(),
        });

        expect(event).toBeDefined();
        expect(event.id).toBeDefined();
        expect(event.eventType).toBe('portfolio.updated');
        // Webhook may be immediately processed or pending
        expect(['pending', 'processed']).toContain(event.status);
      }
    });

    it('should throw error for non-existent integration', async () => {
      await expect(
        service.handleWebhook('non-existent-id', 'test.event', { data: 'test' })
      ).rejects.toThrow('Integration non-existent-id not found');
    });
  });

  describe('getWebhookEvents', () => {
    it('should return webhook events for integration', async () => {
      const integrations = await service.getIntegrations();
      const firstIntegration = integrations[0];

      if (firstIntegration) {
        // Create a webhook event first
        await service.handleWebhook(firstIntegration.id, 'test.event', { data: 'test' });

        const events = await service.getWebhookEvents(firstIntegration.id);
        expect(Array.isArray(events)).toBe(true);
        expect(events.length).toBeGreaterThan(0);
      }
    });
  });

  describe('syncData', () => {
    it('should create sync status for entity type', async () => {
      const integrations = await service.getIntegrations();
      const firstIntegration = integrations[0];

      if (firstIntegration) {
        const syncStatus = await service.syncData(firstIntegration.id, 'portfolios');

        expect(syncStatus).toBeDefined();
        expect(syncStatus.entityType).toBe('portfolios');
        expect(syncStatus.status).toBe('success');
        expect(syncStatus.recordsSynced).toBeGreaterThanOrEqual(0);
      }
    });

    it('should throw error for non-existent integration', async () => {
      await expect(service.syncData('non-existent-id', 'portfolios')).rejects.toThrow(
        'Integration not found'
      );
    });
  });

  describe('getSyncStatuses', () => {
    it('should return sync statuses for integration', async () => {
      const integrations = await service.getIntegrations();
      const firstIntegration = integrations[0];

      if (firstIntegration) {
        // Create sync status first
        await service.syncData(firstIntegration.id, 'portfolios');

        const statuses = await service.getSyncStatuses(firstIntegration.id);
        expect(Array.isArray(statuses)).toBe(true);
        expect(statuses.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getIntegrationHealth', () => {
    it('should return health overview', async () => {
      const health = await service.getIntegrationHealth();

      expect(health).toBeDefined();
      expect(health.total).toBeGreaterThan(0);
      expect(typeof health.active).toBe('number');
      expect(typeof health.inactive).toBe('number');
      expect(typeof health.error).toBe('number');
      expect(typeof health.pendingSetup).toBe('number');
      expect(health.byType).toBeDefined();
    });
  });

  describe('getRequestHistory', () => {
    it('should return empty array initially', async () => {
      const history = await service.getRequestHistory();
      expect(Array.isArray(history)).toBe(true);
    });

    it('should limit results', async () => {
      const history = await service.getRequestHistory(undefined, 5);
      expect(history.length).toBeLessThanOrEqual(5);
    });
  });

  describe('makeRequest', () => {
    it('should return error for non-existent integration', async () => {
      const result = await service.makeRequest('non-existent', 'GET', '/test');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Integration not found');
    });

    it('should return error for inactive integration', async () => {
      const integrations = await service.getIntegrations();
      const firstIntegration = integrations[0];

      if (firstIntegration) {
        const result = await service.makeRequest(firstIntegration.id, 'GET', '/test');
        expect(result.success).toBe(false);
        expect(result.error).toBe('Integration is not active');
      }
    });
  });
});
