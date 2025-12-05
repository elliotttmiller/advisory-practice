import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { DocumentsService, Document } from './documents.service';

class CreateDocumentDto {
  clientId!: string;
  name!: string;
  type!: 'contract' | 'disclosure' | 'statement' | 'tax' | 'correspondence' | 'marketing';
  classification!: 'public' | 'confidential' | 'regulatory';
  mimeType!: string;
  size!: number;
  hash!: string;
  storageKey!: string;
  retentionPolicy!: string;
  createdBy!: string;
}

@ApiTags('documents')
@ApiBearerAuth('JWT-auth')
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all documents' })
  @ApiQuery({ name: 'clientId', required: false, description: 'Filter by client ID' })
  @ApiResponse({ status: 200, description: 'List of documents' })
  async findAll(@Query('clientId') clientId?: string): Promise<Document[]> {
    return this.documentsService.findAll(clientId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get document by ID' })
  @ApiResponse({ status: 200, description: 'Document found' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async findById(@Param('id') id: string): Promise<Document | null> {
    return this.documentsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new document' })
  @ApiResponse({ status: 201, description: 'Document created' })
  async create(@Body() createDocumentDto: CreateDocumentDto): Promise<Document> {
    return this.documentsService.create(createDocumentDto);
  }

  @Post(':id/approve')
  @ApiOperation({ summary: 'Approve document (compliance workflow)' })
  @ApiResponse({ status: 200, description: 'Document approved' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async approve(
    @Param('id') id: string,
    @Body('approvedBy') approvedBy: string
  ): Promise<Document | null> {
    return this.documentsService.approve(id, approvedBy);
  }

  @Post(':id/archive')
  @ApiOperation({ summary: 'Archive document (no deletion for compliance)' })
  @ApiResponse({ status: 200, description: 'Document archived' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async archive(@Param('id') id: string): Promise<{ success: boolean }> {
    const result = await this.documentsService.archive(id);
    return { success: result };
  }
}
