import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClientsService, Client } from './clients.service';

class CreateClientDto {
  firstName!: string;
  lastName!: string;
  email!: string;
  phone!: string;
  status!: 'lead' | 'prospect' | 'client' | 'inactive';
  riskTolerance!: 'conservative' | 'moderate' | 'aggressive';
  investmentObjectives!: string[];
  assetsUnderManagement!: number;
}

@ApiTags('clients')
@ApiBearerAuth('JWT-auth')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: 200, description: 'List of clients' })
  async findAll(): Promise<Client[]> {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get client by ID' })
  @ApiResponse({ status: 200, description: 'Client found' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async findById(@Param('id') id: string): Promise<Client | null> {
    return this.clientsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new client' })
  @ApiResponse({ status: 201, description: 'Client created' })
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientsService.create(createClientDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update client' })
  @ApiResponse({ status: 200, description: 'Client updated' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: Partial<CreateClientDto>
  ): Promise<Client | null> {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete client (soft delete for compliance)' })
  @ApiResponse({ status: 200, description: 'Client deleted' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async delete(@Param('id') id: string): Promise<{ success: boolean }> {
    const result = await this.clientsService.delete(id);
    return { success: result };
  }
}
