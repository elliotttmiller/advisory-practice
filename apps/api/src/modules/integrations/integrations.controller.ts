import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import {
  IntegrationsService,
  IntegrationConfig,
  IntegrationProviderType,
  WebhookEvent,
  SyncStatus,
} from './integrations.service';

/**
 * Integration Orchestration Controller
 *
 * Provides REST API endpoints for managing external integrations
 * (TAMP, CRM, Market Data, Document, IDP providers)
 */
@Controller('api/v1/integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  /**
   * Get all integrations
   */
  @Get()
  async getIntegrations(
    @Query('type') type?: IntegrationProviderType
  ): Promise<{ success: boolean; data: IntegrationConfig[] }> {
    const integrations = await this.integrationsService.getIntegrations(type);
    return { success: true, data: integrations };
  }

  /**
   * Get integration by ID
   */
  @Get(':id')
  async getIntegrationById(
    @Param('id') id: string
  ): Promise<{ success: boolean; data: IntegrationConfig | null; error?: string }> {
    const integration = await this.integrationsService.getIntegrationById(id);
    if (!integration) {
      return { success: false, data: null, error: 'Integration not found' };
    }
    return { success: true, data: integration };
  }

  /**
   * Create new integration
   */
  @Post()
  async createIntegration(
    @Body() data: Omit<IntegrationConfig, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<{ success: boolean; data: IntegrationConfig }> {
    const integration = await this.integrationsService.createIntegration(data);
    return { success: true, data: integration };
  }

  /**
   * Update integration
   */
  @Put(':id')
  async updateIntegration(
    @Param('id') id: string,
    @Body() data: Partial<IntegrationConfig>
  ): Promise<{ success: boolean; data: IntegrationConfig | null; error?: string }> {
    const integration = await this.integrationsService.updateIntegration(id, data);
    if (!integration) {
      return { success: false, data: null, error: 'Integration not found' };
    }
    return { success: true, data: integration };
  }

  /**
   * Enable/disable integration
   */
  @Post(':id/toggle')
  async toggleIntegration(
    @Param('id') id: string,
    @Body('enabled') enabled: boolean
  ): Promise<{ success: boolean; data: IntegrationConfig | null; error?: string }> {
    const integration = await this.integrationsService.toggleIntegration(id, enabled);
    if (!integration) {
      return { success: false, data: null, error: 'Integration not found' };
    }
    return { success: true, data: integration };
  }

  /**
   * Handle incoming webhook
   */
  @Post(':id/webhook')
  async handleWebhook(
    @Param('id') id: string,
    @Body() body: { eventType: string; payload: Record<string, unknown> }
  ): Promise<{ success: boolean; data: WebhookEvent }> {
    const event = await this.integrationsService.handleWebhook(id, body.eventType, body.payload);
    return { success: true, data: event };
  }

  /**
   * Get webhook events
   */
  @Get(':id/webhooks')
  async getWebhookEvents(
    @Param('id') id: string
  ): Promise<{ success: boolean; data: WebhookEvent[] }> {
    const events = await this.integrationsService.getWebhookEvents(id);
    return { success: true, data: events };
  }

  /**
   * Trigger data sync
   */
  @Post(':id/sync')
  async syncData(
    @Param('id') id: string,
    @Body('entityType') entityType: string
  ): Promise<{ success: boolean; data: SyncStatus }> {
    const status = await this.integrationsService.syncData(id, entityType);
    return { success: true, data: status };
  }

  /**
   * Get sync statuses
   */
  @Get(':id/sync-status')
  async getSyncStatuses(
    @Param('id') id: string
  ): Promise<{ success: boolean; data: SyncStatus[] }> {
    const statuses = await this.integrationsService.getSyncStatuses(id);
    return { success: true, data: statuses };
  }

  /**
   * Get integration health overview
   */
  @Get('health/overview')
  async getIntegrationHealth(): Promise<{
    success: boolean;
    data: {
      total: number;
      active: number;
      inactive: number;
      error: number;
      pendingSetup: number;
      byType: Record<string, number>;
    };
  }> {
    const health = await this.integrationsService.getIntegrationHealth();
    return { success: true, data: health };
  }

  /**
   * Get request history
   */
  @Get(':id/requests')
  async getRequestHistory(
    @Param('id') id: string,
    @Query('limit') limit?: number
  ): Promise<{ success: boolean; data: unknown[] }> {
    const requests = await this.integrationsService.getRequestHistory(id, limit);
    return { success: true, data: requests };
  }
}
