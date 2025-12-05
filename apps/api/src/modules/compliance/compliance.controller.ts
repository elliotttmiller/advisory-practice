import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ComplianceService, ComplianceCheck, ComplianceRuleType } from './compliance.service';

class ValidateContentDto {
  type!: ComplianceRuleType;
  targetType!: string;
  targetId!: string;
  content!: string;
}

class ReviewCheckDto {
  status!: 'approved' | 'rejected' | 'escalated';
  reviewedBy!: string;
  notes?: string;
}

@ApiTags('compliance')
@ApiBearerAuth('JWT-auth')
@Controller('compliance')
export class ComplianceController {
  constructor(private readonly complianceService: ComplianceService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get compliance statistics' })
  @ApiResponse({ status: 200, description: 'Compliance statistics for dashboard' })
  async getStats() {
    return this.complianceService.getComplianceStats();
  }

  @Get('checks')
  @ApiOperation({ summary: 'Get all compliance checks' })
  @ApiQuery({ name: 'status', required: false, description: 'Filter by status' })
  @ApiResponse({ status: 200, description: 'List of compliance checks' })
  async findAllChecks(@Query('status') status?: string): Promise<ComplianceCheck[]> {
    return this.complianceService.findAllChecks(status);
  }

  @Get('checks/:id')
  @ApiOperation({ summary: 'Get compliance check by ID' })
  @ApiResponse({ status: 200, description: 'Compliance check details' })
  @ApiResponse({ status: 404, description: 'Check not found' })
  async findCheckById(@Param('id') id: string): Promise<ComplianceCheck | null> {
    return this.complianceService.findCheckById(id);
  }

  @Post('validate')
  @ApiOperation({ summary: 'Validate content against compliance rules' })
  @ApiResponse({ status: 200, description: 'Compliance check result' })
  async validateContent(@Body() dto: ValidateContentDto): Promise<ComplianceCheck> {
    return this.complianceService.validateContent(dto.type, dto.targetType, dto.targetId, dto.content);
  }

  @Post('checks/:id/review')
  @ApiOperation({ summary: 'Review compliance check' })
  @ApiResponse({ status: 200, description: 'Check reviewed' })
  @ApiResponse({ status: 404, description: 'Check not found' })
  async reviewCheck(
    @Param('id') id: string,
    @Body() dto: ReviewCheckDto
  ): Promise<ComplianceCheck | null> {
    return this.complianceService.reviewCheck(id, dto.status, dto.reviewedBy, dto.notes);
  }

  @Post('checks/:id/escalate')
  @ApiOperation({ summary: 'Escalate compliance check' })
  @ApiResponse({ status: 200, description: 'Check escalated' })
  @ApiResponse({ status: 404, description: 'Check not found' })
  async escalateCheck(
    @Param('id') id: string,
    @Body('escalatedTo') escalatedTo: string
  ): Promise<ComplianceCheck | null> {
    return this.complianceService.escalateCheck(id, escalatedTo);
  }

  @Get('audit-logs')
  @ApiOperation({ summary: 'Get audit logs' })
  @ApiQuery({ name: 'entityType', required: false })
  @ApiQuery({ name: 'entityId', required: false })
  @ApiResponse({ status: 200, description: 'List of audit logs' })
  async getAuditLogs(
    @Query('entityType') entityType?: string,
    @Query('entityId') entityId?: string
  ) {
    return this.complianceService.getAuditLogs(entityType, entityId);
  }
}
