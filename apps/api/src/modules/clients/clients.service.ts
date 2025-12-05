import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: 'lead' | 'prospect' | 'client' | 'inactive';
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  investmentObjectives: string[];
  assetsUnderManagement: number;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ClientsService {
  private clients: Client[] = [];

  async findAll(): Promise<Client[]> {
    // TODO: Implement actual database query
    return this.clients;
  }

  async findById(id: string): Promise<Client | null> {
    return this.clients.find((client) => client.id === id) || null;
  }

  async create(data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> {
    const client: Client = {
      ...data,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.clients.push(client);

    // Log client creation for compliance audit trail
    console.log(`[AUDIT] Client created: ${client.id} at ${new Date().toISOString()}`);

    return client;
  }

  async update(id: string, data: Partial<Client>): Promise<Client | null> {
    const index = this.clients.findIndex((client) => client.id === id);
    if (index === -1) {
      return null;
    }

    this.clients[index] = {
      ...this.clients[index],
      ...data,
      id, // Ensure ID cannot be changed
      updatedAt: new Date(),
    };

    // Log client update for compliance audit trail
    console.log(`[AUDIT] Client updated: ${id} at ${new Date().toISOString()}`);

    return this.clients[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.clients.findIndex((client) => client.id === id);
    if (index === -1) {
      return false;
    }

    // For FINRA compliance, we soft-delete clients instead of hard delete
    this.clients[index].status = 'inactive';
    this.clients[index].updatedAt = new Date();

    // Log client deletion for compliance audit trail
    console.log(`[AUDIT] Client soft-deleted: ${id} at ${new Date().toISOString()}`);

    return true;
  }
}
