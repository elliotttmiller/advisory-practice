import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService, Client } from '../clients.service';

describe('ClientsService', () => {
  let service: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsService],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new client', async () => {
      const clientData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        status: 'lead' as const,
        riskTolerance: 'moderate' as const,
        investmentObjectives: ['growth', 'income'],
        assetsUnderManagement: 500000,
      };

      const result = await service.create(clientData);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.firstName).toBe('John');
      expect(result.lastName).toBe('Doe');
      expect(result.email).toBe('john.doe@example.com');
      expect(result.status).toBe('lead');
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it('should assign unique IDs to different clients', async () => {
      const client1 = await service.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        status: 'lead',
        riskTolerance: 'moderate',
        investmentObjectives: ['growth'],
        assetsUnderManagement: 100000,
      });

      const client2 = await service.create({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '+0987654321',
        status: 'client',
        riskTolerance: 'aggressive',
        investmentObjectives: ['growth', 'speculation'],
        assetsUnderManagement: 250000,
      });

      expect(client1.id).not.toBe(client2.id);
    });
  });

  describe('findAll', () => {
    it('should return empty array initially', async () => {
      const result = await service.findAll();
      expect(result).toEqual([]);
    });

    it('should return all created clients', async () => {
      await service.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        status: 'lead',
        riskTolerance: 'moderate',
        investmentObjectives: ['growth'],
        assetsUnderManagement: 100000,
      });

      await service.create({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '+0987654321',
        status: 'client',
        riskTolerance: 'conservative',
        investmentObjectives: ['income'],
        assetsUnderManagement: 200000,
      });

      const result = await service.findAll();
      expect(result.length).toBe(2);
    });
  });

  describe('findById', () => {
    it('should return null for non-existent client', async () => {
      const result = await service.findById('non-existent-id');
      expect(result).toBeNull();
    });

    it('should return client by ID', async () => {
      const created = await service.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        status: 'lead',
        riskTolerance: 'moderate',
        investmentObjectives: ['growth'],
        assetsUnderManagement: 100000,
      });

      const result = await service.findById(created.id);
      expect(result).toEqual(created);
    });
  });

  describe('update', () => {
    it('should return null for non-existent client', async () => {
      const result = await service.update('non-existent-id', { firstName: 'Updated' });
      expect(result).toBeNull();
    });

    it('should update client data', async () => {
      const created = await service.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        status: 'lead',
        riskTolerance: 'moderate',
        investmentObjectives: ['growth'],
        assetsUnderManagement: 100000,
      });

      const originalUpdatedAt = created.updatedAt;

      // Small delay to ensure timestamp difference
      await new Promise((resolve) => setTimeout(resolve, 10));

      const updated = await service.update(created.id, {
        firstName: 'Johnny',
        status: 'client',
        assetsUnderManagement: 150000,
      });

      expect(updated?.firstName).toBe('Johnny');
      expect(updated?.lastName).toBe('Doe'); // Unchanged
      expect(updated?.status).toBe('client');
      expect(updated?.assetsUnderManagement).toBe(150000);
      expect(updated?.id).toBe(created.id); // ID cannot change
      expect(updated?.updatedAt.getTime()).toBeGreaterThanOrEqual(originalUpdatedAt.getTime());
    });
  });

  describe('delete (soft delete for FINRA compliance)', () => {
    it('should return false for non-existent client', async () => {
      const result = await service.delete('non-existent-id');
      expect(result).toBe(false);
    });

    it('should soft-delete client by setting status to inactive', async () => {
      const created = await service.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        status: 'client',
        riskTolerance: 'moderate',
        investmentObjectives: ['growth'],
        assetsUnderManagement: 100000,
      });

      const result = await service.delete(created.id);
      expect(result).toBe(true);

      // Verify soft delete - client should still exist but be inactive
      const deletedClient = await service.findById(created.id);
      expect(deletedClient).not.toBeNull();
      expect(deletedClient?.status).toBe('inactive');
    });
  });
});
