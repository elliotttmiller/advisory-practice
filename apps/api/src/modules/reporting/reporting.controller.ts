import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ReportingService, Report, DashboardMetrics } from './reporting.service';

class GenerateReportDto {
  name!: string;
  type!: 'compliance' | 'performance' | 'client' | 'marketing' | 'audit';
  format!: 'pdf' | 'csv' | 'xlsx' | 'json';
  parameters!: Record<string, unknown>;
  generatedBy!: string;
}

@ApiTags('reporting')
@ApiBearerAuth('JWT-auth')
@Controller('reporting')
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get dashboard metrics' })
  @ApiResponse({ status: 200, description: 'Dashboard metrics' })
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    return this.reportingService.getDashboardMetrics();
  }

  @Get('reports')
  @ApiOperation({ summary: 'List all reports' })
  @ApiQuery({ name: 'type', required: false })
  @ApiResponse({ status: 200, description: 'List of reports' })
  async listReports(@Query('type') type?: string): Promise<Report[]> {
    return this.reportingService.listReports(type);
  }

  @Get('reports/:id')
  @ApiOperation({ summary: 'Get report by ID' })
  @ApiResponse({ status: 200, description: 'Report details' })
  @ApiResponse({ status: 404, description: 'Report not found' })
  async getReport(@Param('id') id: string): Promise<Report | null> {
    return this.reportingService.getReport(id);
  }

  @Post('reports')
  @ApiOperation({ summary: 'Generate new report' })
  @ApiResponse({ status: 201, description: 'Report generation started' })
  async generateReport(@Body() dto: GenerateReportDto): Promise<Report> {
    return this.reportingService.generateReport(
      dto.name,
      dto.type,
      dto.format,
      dto.parameters,
      dto.generatedBy
    );
  }

  @Post('reports/compliance')
  @ApiOperation({ summary: 'Generate compliance report' })
  @ApiResponse({ status: 201, description: 'Compliance report generation started' })
  async generateComplianceReport(
    @Body('period') period: 'monthly' | 'quarterly' | 'annual',
    @Body('generatedBy') generatedBy: string
  ): Promise<Report> {
    return this.reportingService.generateComplianceReport(period, generatedBy);
  }

  @Post('reports/client/:clientId')
  @ApiOperation({ summary: 'Generate client portfolio report' })
  @ApiResponse({ status: 201, description: 'Client report generation started' })
  async generateClientReport(
    @Param('clientId') clientId: string,
    @Body('generatedBy') generatedBy: string
  ): Promise<Report> {
    return this.reportingService.generateClientReport(clientId, generatedBy);
  }

  @Post('reports/audit-trail')
  @ApiOperation({ summary: 'Export audit trail' })
  @ApiResponse({ status: 201, description: 'Audit trail export started' })
  async exportAuditTrail(
    @Body('startDate') startDate: string,
    @Body('endDate') endDate: string,
    @Body('generatedBy') generatedBy: string
  ): Promise<Report> {
    return this.reportingService.exportAuditTrail(
      new Date(startDate),
      new Date(endDate),
      generatedBy
    );
  }
}
