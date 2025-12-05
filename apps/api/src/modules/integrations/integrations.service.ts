import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

/**
 * Integration provider types supported by the platform
 */
export type IntegrationProviderType = 'TAMP' | 'CRM' | 'MARKET_DATA' | 'DOCUMENT' | 'IDP';

/**
 * Supported integration providers
 */
export type IntegrationProvider =
  | 'LPL'
  | 'ENVESTNET'
  | 'SEI'
  | 'REDTAIL'
  | 'WEALTHBOX'
  | 'MORNINGSTAR'
  | 'REFINITIV'
  | 'DOCUSIGN'
  | 'ADOBE_SIGN'
  | 'AUTH0'
  | 'OKTA';

/**
 * Integration configuration interface
 */
export interface IntegrationConfig {
  id: string;
  provider: IntegrationProvider;
  type: IntegrationProviderType;
  name: string;
  enabled: boolean;
  apiBaseUrl: string;
  authType: 'oauth2' | 'api_key' | 'basic';
  credentials?: {
    clientId?: string;
    // Note: clientSecret stored securely via environment/vault
    apiKey?: string;
    accessToken?: string;
    refreshToken?: string;
    tokenExpiresAt?: Date;
  };
  rateLimits: {
    requestsPerSecond: number;
    requestsPerMinute: number;
    burstLimit: number;
  };
  webhookConfig?: {
    endpointUrl: string;
    secret: string;
    events: string[];
  };
  status: 'active' | 'inactive' | 'error' | 'pending_setup';
  lastSyncAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Integration request tracking
 */
export interface IntegrationRequest {
  id: string;
  integrationId: string;
  provider: IntegrationProvider;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  endpoint: string;
  requestBody?: Record<string, unknown>;
  responseStatus?: number;
  responseBody?: unknown;
  duration?: number;
  error?: string;
  createdAt: Date;
  completedAt?: Date;
}

/**
 * Webhook event interface
 */
export interface WebhookEvent {
  id: string;
  integrationId: string;
  provider: IntegrationProvider;
  eventType: string;
  payload: Record<string, unknown>;
  status: 'pending' | 'processed' | 'failed';
  processedAt?: Date;
  error?: string;
  createdAt: Date;
}

/**
 * Data sync status
 */
export interface SyncStatus {
  integrationId: string;
  provider: IntegrationProvider;
  entityType: string;
  lastSyncAt: Date;
  recordsSynced: number;
  status: 'success' | 'partial' | 'failed';
  nextSyncAt?: Date;
}

/**
 * Integration Orchestration Service
 *
 * This service manages connections to external APIs (TAMP, CRM, Market Data providers).
 * It implements:
 * - Data normalization across providers
 * - Secure credential management
 * - Webhook handling
 * - API rate limiting and fallbacks
 * - Reusable adapter patterns
 */
@Injectable()
export class IntegrationsService {
  private readonly logger = new Logger(IntegrationsService.name);
  private integrations: IntegrationConfig[] = [];
  private requestLog: IntegrationRequest[] = [];
  private webhookEvents: WebhookEvent[] = [];
  private syncStatuses: SyncStatus[] = [];
  private rateLimitCounters: Map<string, { count: number; resetAt: Date }> = new Map();

  constructor(private readonly configService: ConfigService) {
    this.initializeDefaultIntegrations();
  }

  /**
   * Initialize default integration configurations
   */
  private initializeDefaultIntegrations(): void {
    // Default TAMP integration placeholder
    this.integrations.push({
      id: 'int-tamp-001',
      provider: 'LPL',
      type: 'TAMP',
      name: 'LPL Financial TAMP',
      enabled: false,
      apiBaseUrl: 'https://api.lpl.com/v1',
      authType: 'oauth2',
      rateLimits: {
        requestsPerSecond: 10,
        requestsPerMinute: 300,
        burstLimit: 50,
      },
      status: 'pending_setup',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Default CRM integration placeholder
    this.integrations.push({
      id: 'int-crm-001',
      provider: 'REDTAIL',
      type: 'CRM',
      name: 'Redtail CRM',
      enabled: false,
      apiBaseUrl: 'https://api.redtailtechnology.com/crm/v1',
      authType: 'api_key',
      rateLimits: {
        requestsPerSecond: 5,
        requestsPerMinute: 150,
        burstLimit: 25,
      },
      status: 'pending_setup',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Default Market Data integration placeholder
    this.integrations.push({
      id: 'int-market-001',
      provider: 'MORNINGSTAR',
      type: 'MARKET_DATA',
      name: 'Morningstar Market Data',
      enabled: false,
      apiBaseUrl: 'https://api.morningstar.com/v1',
      authType: 'api_key',
      rateLimits: {
        requestsPerSecond: 20,
        requestsPerMinute: 500,
        burstLimit: 100,
      },
      status: 'pending_setup',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  /**
   * Get all integration configurations
   */
  async getIntegrations(type?: IntegrationProviderType): Promise<IntegrationConfig[]> {
    if (type) {
      return this.integrations.filter((int) => int.type === type);
    }
    return this.integrations;
  }

  /**
   * Get integration by ID
   */
  async getIntegrationById(id: string): Promise<IntegrationConfig | null> {
    return this.integrations.find((int) => int.id === id) || null;
  }

  /**
   * Create new integration configuration
   */
  async createIntegration(
    data: Omit<IntegrationConfig, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<IntegrationConfig> {
    const integration: IntegrationConfig = {
      ...data,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.integrations.push(integration);

    this.logger.log(
      `[AUDIT] Integration created: ${integration.id} (${integration.provider}) at ${new Date().toISOString()}`
    );

    return integration;
  }

  /**
   * Update integration configuration
   */
  async updateIntegration(
    id: string,
    data: Partial<IntegrationConfig>
  ): Promise<IntegrationConfig | null> {
    const index = this.integrations.findIndex((int) => int.id === id);
    if (index === -1) {return null;}

    const integration = this.integrations[index];
    if (!integration) {return null;}

    const updated: IntegrationConfig = {
      ...integration,
      ...data,
      id, // Prevent ID change
      updatedAt: new Date(),
    };

    this.integrations[index] = updated;

    this.logger.log(
      `[AUDIT] Integration updated: ${id} (${updated.provider}) at ${new Date().toISOString()}`
    );

    return updated;
  }

  /**
   * Enable/disable integration
   */
  async toggleIntegration(id: string, enabled: boolean): Promise<IntegrationConfig | null> {
    return this.updateIntegration(id, { enabled, status: enabled ? 'active' : 'inactive' });
  }

  /**
   * Check rate limits before making request
   */
  private checkRateLimits(integration: IntegrationConfig): boolean {
    const key = integration.id;
    const now = new Date();
    const counter = this.rateLimitCounters.get(key);

    if (!counter || counter.resetAt < now) {
      this.rateLimitCounters.set(key, {
        count: 1,
        resetAt: new Date(now.getTime() + 60000), // Reset in 1 minute
      });
      return true;
    }

    if (counter.count >= integration.rateLimits.requestsPerMinute) {
      this.logger.warn(
        `Rate limit exceeded for integration ${integration.id} (${integration.provider})`
      );
      return false;
    }

    counter.count++;
    return true;
  }

  /**
   * Make external API request with rate limiting and error handling
   */
  async makeRequest<T>(
    integrationId: string,
    method: IntegrationRequest['method'],
    endpoint: string,
    body?: Record<string, unknown>
  ): Promise<{ success: boolean; data?: T; error?: string }> {
    const integration = await this.getIntegrationById(integrationId);
    if (!integration) {
      return { success: false, error: 'Integration not found' };
    }

    if (!integration.enabled || integration.status !== 'active') {
      return { success: false, error: 'Integration is not active' };
    }

    // Check rate limits
    if (!this.checkRateLimits(integration)) {
      return { success: false, error: 'Rate limit exceeded. Please try again later.' };
    }

    // Create request log entry
    const request: IntegrationRequest = {
      id: uuidv4(),
      integrationId,
      provider: integration.provider,
      method,
      endpoint,
      requestBody: body,
      createdAt: new Date(),
    };

    const startTime = Date.now();

    try {
      // In production, this would make actual API calls
      // For now, return mock success response
      const mockResponse = this.getMockResponse<T>(integration, endpoint, method);

      request.responseStatus = 200;
      request.responseBody = mockResponse;
      request.duration = Date.now() - startTime;
      request.completedAt = new Date();

      this.requestLog.push(request);

      this.logger.log(
        `[AUDIT] Integration request: ${request.id} ${method} ${endpoint} - 200 (${request.duration}ms)`
      );

      return { success: true, data: mockResponse };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      request.responseStatus = 500;
      request.error = errorMessage;
      request.duration = Date.now() - startTime;
      request.completedAt = new Date();

      this.requestLog.push(request);

      this.logger.error(
        `[AUDIT] Integration request failed: ${request.id} ${method} ${endpoint} - ${errorMessage}`
      );

      return { success: false, error: errorMessage };
    }
  }

  /**
   * Get mock response for development mode
   */
  private getMockResponse<T>(
    integration: IntegrationConfig,
    _endpoint: string,
    _method: string
  ): T {
    // Return mock data based on integration type
    switch (integration.type) {
      case 'TAMP':
        return { portfolios: [], models: [], status: 'mock' } as T;
      case 'CRM':
        return { contacts: [], activities: [], status: 'mock' } as T;
      case 'MARKET_DATA':
        return { quotes: [], securities: [], status: 'mock' } as T;
      default:
        return { status: 'mock' } as T;
    }
  }

  /**
   * Handle incoming webhook event
   */
  async handleWebhook(
    integrationId: string,
    eventType: string,
    payload: Record<string, unknown>
  ): Promise<WebhookEvent> {
    const integration = await this.getIntegrationById(integrationId);

    if (!integration) {
      throw new Error(`Integration ${integrationId} not found`);
    }

    const event: WebhookEvent = {
      id: uuidv4(),
      integrationId,
      provider: integration.provider,
      eventType,
      payload,
      status: 'pending',
      createdAt: new Date(),
    };

    this.webhookEvents.push(event);

    // Process webhook asynchronously
    this.processWebhook(event.id);

    this.logger.log(
      `[AUDIT] Webhook received: ${event.id} (${eventType}) from ${event.provider} at ${new Date().toISOString()}`
    );

    return event;
  }

  /**
   * Process webhook event
   */
  private async processWebhook(eventId: string): Promise<void> {
    const event = this.webhookEvents.find((e) => e.id === eventId);
    if (!event) {return;}

    try {
      // Process based on event type
      // In production, this would trigger appropriate handlers
      event.status = 'processed';
      event.processedAt = new Date();

      this.logger.log(
        `[AUDIT] Webhook processed: ${event.id} (${event.eventType}) at ${new Date().toISOString()}`
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      event.status = 'failed';
      event.error = errorMessage;

      this.logger.error(`[AUDIT] Webhook processing failed: ${event.id} - ${errorMessage}`);
    }
  }

  /**
   * Get webhook events
   */
  async getWebhookEvents(integrationId?: string): Promise<WebhookEvent[]> {
    if (integrationId) {
      return this.webhookEvents.filter((e) => e.integrationId === integrationId);
    }
    return this.webhookEvents;
  }

  /**
   * Sync data from external provider
   */
  async syncData(
    integrationId: string,
    entityType: string
  ): Promise<SyncStatus> {
    const integration = await this.getIntegrationById(integrationId);
    if (!integration) {
      throw new Error('Integration not found');
    }

    const syncStatus: SyncStatus = {
      integrationId,
      provider: integration.provider,
      entityType,
      lastSyncAt: new Date(),
      recordsSynced: 0,
      status: 'success',
      nextSyncAt: new Date(Date.now() + 3600000), // Next sync in 1 hour
    };

    try {
      // In production, this would fetch and sync data
      // For now, simulate successful sync
      syncStatus.recordsSynced = Math.floor(Math.random() * 100) + 1;
      syncStatus.status = 'success';

      // Update integration last sync time
      await this.updateIntegration(integrationId, { lastSyncAt: new Date() });

      this.logger.log(
        `[AUDIT] Data sync completed: ${integrationId} (${entityType}) - ${syncStatus.recordsSynced} records`
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      syncStatus.status = 'failed';

      this.logger.error(`[AUDIT] Data sync failed: ${integrationId} (${entityType}) - ${errorMessage}`);
    }

    // Update or add sync status
    const existingIndex = this.syncStatuses.findIndex(
      (s) => s.integrationId === integrationId && s.entityType === entityType
    );
    if (existingIndex >= 0) {
      this.syncStatuses[existingIndex] = syncStatus;
    } else {
      this.syncStatuses.push(syncStatus);
    }

    return syncStatus;
  }

  /**
   * Get sync statuses
   */
  async getSyncStatuses(integrationId?: string): Promise<SyncStatus[]> {
    if (integrationId) {
      return this.syncStatuses.filter((s) => s.integrationId === integrationId);
    }
    return this.syncStatuses;
  }

  /**
   * Get integration health status
   */
  async getIntegrationHealth(): Promise<{
    total: number;
    active: number;
    inactive: number;
    error: number;
    pendingSetup: number;
    byType: Record<string, number>;
  }> {
    const health = {
      total: this.integrations.length,
      active: 0,
      inactive: 0,
      error: 0,
      pendingSetup: 0,
      byType: {} as Record<string, number>,
    };

    for (const integration of this.integrations) {
      switch (integration.status) {
        case 'active':
          health.active++;
          break;
        case 'inactive':
          health.inactive++;
          break;
        case 'error':
          health.error++;
          break;
        case 'pending_setup':
          health.pendingSetup++;
          break;
      }

      health.byType[integration.type] = (health.byType[integration.type] || 0) + 1;
    }

    return health;
  }

  /**
   * Get request history
   */
  async getRequestHistory(
    integrationId?: string,
    limit = 100
  ): Promise<IntegrationRequest[]> {
    let requests = [...this.requestLog];

    if (integrationId) {
      requests = requests.filter((r) => r.integrationId === integrationId);
    }

    return requests.slice(-limit);
  }
}
