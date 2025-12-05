import { Controller, Get, Post, Put, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MarketingService, Lead, MarketingContent } from './marketing.service';

class CreateLeadDto {
  firstName!: string;
  lastName!: string;
  email!: string;
  phone?: string;
  source!: 'website' | 'referral' | 'social' | 'advertisement' | 'event';
  status!: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  consentCaptured!: boolean;
  consentTimestamp?: Date;
}

class CreateContentDto {
  title!: string;
  type!: 'email' | 'social' | 'blog' | 'newsletter' | 'advertisement';
  content!: string;
  createdBy!: string;
}

@ApiTags('marketing')
@ApiBearerAuth('JWT-auth')
@Controller('marketing')
export class MarketingController {
  constructor(private readonly marketingService: MarketingService) {}

  // Lead endpoints
  @Get('leads')
  @ApiOperation({ summary: 'Get all leads' })
  @ApiQuery({ name: 'status', required: false })
  @ApiResponse({ status: 200, description: 'List of leads' })
  async findAllLeads(@Query('status') status?: string): Promise<Lead[]> {
    return this.marketingService.findAllLeads(status);
  }

  @Post('leads')
  @ApiOperation({ summary: 'Create new lead' })
  @ApiResponse({ status: 201, description: 'Lead created' })
  async createLead(@Body() dto: CreateLeadDto): Promise<Lead> {
    return this.marketingService.createLead(dto);
  }

  @Put('leads/:id/status')
  @ApiOperation({ summary: 'Update lead status' })
  @ApiResponse({ status: 200, description: 'Lead status updated' })
  async updateLeadStatus(
    @Param('id') id: string,
    @Body('status') status: Lead['status'],
    @Body('notes') notes?: string
  ): Promise<Lead | null> {
    return this.marketingService.updateLeadStatus(id, status, notes);
  }

  @Put('leads/:id/assign')
  @ApiOperation({ summary: 'Assign lead to advisor' })
  @ApiResponse({ status: 200, description: 'Lead assigned' })
  async assignLead(
    @Param('id') id: string,
    @Body('assignedTo') assignedTo: string
  ): Promise<Lead | null> {
    return this.marketingService.assignLead(id, assignedTo);
  }

  // Content endpoints
  @Get('content')
  @ApiOperation({ summary: 'Get all marketing content' })
  @ApiQuery({ name: 'status', required: false })
  @ApiResponse({ status: 200, description: 'List of content' })
  async findAllContent(@Query('status') status?: string): Promise<MarketingContent[]> {
    return this.marketingService.findAllContent(status);
  }

  @Post('content')
  @ApiOperation({ summary: 'Create new marketing content' })
  @ApiResponse({ status: 201, description: 'Content created' })
  async createContent(@Body() dto: CreateContentDto): Promise<MarketingContent> {
    return this.marketingService.createContent(dto);
  }

  @Post('content/:id/submit-review')
  @ApiOperation({ summary: 'Submit content for compliance review' })
  @ApiResponse({ status: 200, description: 'Content submitted for review' })
  async submitForReview(@Param('id') id: string): Promise<MarketingContent | null> {
    return this.marketingService.submitForReview(id);
  }

  @Post('content/:id/approve')
  @ApiOperation({ summary: 'Approve marketing content' })
  @ApiResponse({ status: 200, description: 'Content approved' })
  async approveContent(
    @Param('id') id: string,
    @Body('approvedBy') approvedBy: string,
    @Body('complianceCheckId') complianceCheckId: string
  ): Promise<MarketingContent | null> {
    return this.marketingService.approveContent(id, approvedBy, complianceCheckId);
  }

  @Post('content/:id/publish')
  @ApiOperation({ summary: 'Publish approved content' })
  @ApiResponse({ status: 200, description: 'Content published' })
  async publishContent(@Param('id') id: string): Promise<MarketingContent | null> {
    return this.marketingService.publishContent(id);
  }
}
