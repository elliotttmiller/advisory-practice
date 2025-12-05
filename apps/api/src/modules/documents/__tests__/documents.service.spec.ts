import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsService, Document } from '../documents.service';

describe('DocumentsService', () => {
  let service: DocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentsService],
    }).compile();

    service = module.get<DocumentsService>(DocumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new document', async () => {
      const documentData = {
        clientId: 'client-123',
        name: 'Investment Agreement.pdf',
        type: 'contract' as const,
        classification: 'confidential' as const,
        mimeType: 'application/pdf',
        size: 1024000,
        hash: 'abc123hash',
        storageKey: 's3://bucket/documents/doc-123.pdf',
        retentionPolicy: '6_years',
        createdBy: 'user-456',
      };

      const result = await service.create(documentData);

      expect(result.id).toBeDefined();
      expect(result.version).toBe(1);
      expect(result.name).toBe('Investment Agreement.pdf');
      expect(result.clientId).toBe('client-123');
      expect(result.classification).toBe('confidential');
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('findAll', () => {
    it('should return empty array initially', async () => {
      const result = await service.findAll();
      expect(result).toEqual([]);
    });

    it('should filter documents by clientId', async () => {
      await service.create({
        clientId: 'client-1',
        name: 'Doc1.pdf',
        type: 'contract',
        classification: 'confidential',
        mimeType: 'application/pdf',
        size: 1000,
        hash: 'hash1',
        storageKey: 'key1',
        retentionPolicy: '6_years',
        createdBy: 'user-1',
      });

      await service.create({
        clientId: 'client-2',
        name: 'Doc2.pdf',
        type: 'disclosure',
        classification: 'public',
        mimeType: 'application/pdf',
        size: 2000,
        hash: 'hash2',
        storageKey: 'key2',
        retentionPolicy: '3_years',
        createdBy: 'user-1',
      });

      const client1Docs = await service.findAll('client-1');
      const client2Docs = await service.findAll('client-2');
      const allDocs = await service.findAll();

      expect(client1Docs.length).toBe(1);
      expect(client2Docs.length).toBe(1);
      expect(allDocs.length).toBe(2);
    });
  });

  describe('findById', () => {
    it('should return null for non-existent document', async () => {
      const result = await service.findById('non-existent-id');
      expect(result).toBeNull();
    });

    it('should find document by ID', async () => {
      const created = await service.create({
        clientId: 'client-123',
        name: 'Test Document.pdf',
        type: 'statement',
        classification: 'confidential',
        mimeType: 'application/pdf',
        size: 5000,
        hash: 'testhash',
        storageKey: 'testkey',
        retentionPolicy: '7_years',
        createdBy: 'user-789',
      });

      const found = await service.findById(created.id);
      expect(found).toEqual(created);
    });
  });

  describe('createVersion (immutable documents for compliance)', () => {
    it('should return null for non-existent document', async () => {
      const result = await service.createVersion('non-existent-id', { name: 'Updated' }, 'user-1');
      expect(result).toBeNull();
    });

    it('should create new version instead of updating (SEC Rule 17a-4 compliance)', async () => {
      const original = await service.create({
        clientId: 'client-123',
        name: 'Original Document.pdf',
        type: 'contract',
        classification: 'confidential',
        mimeType: 'application/pdf',
        size: 1000,
        hash: 'originalhash',
        storageKey: 'originalkey',
        retentionPolicy: '6_years',
        createdBy: 'user-1',
      });

      const newVersion = await service.createVersion(
        original.id,
        { name: 'Updated Document.pdf', size: 1500, hash: 'newhash' },
        'user-2'
      );

      // New version should have different ID
      expect(newVersion?.id).not.toBe(original.id);
      // Version should be incremented
      expect(newVersion?.version).toBe(2);
      // New properties should be applied
      expect(newVersion?.name).toBe('Updated Document.pdf');
      expect(newVersion?.size).toBe(1500);
      // Creator should be updated
      expect(newVersion?.createdBy).toBe('user-2');
      // Inherited properties should remain
      expect(newVersion?.clientId).toBe(original.clientId);
      expect(newVersion?.type).toBe(original.type);

      // Original document should still exist
      const originalStillExists = await service.findById(original.id);
      expect(originalStillExists).not.toBeNull();
      expect(originalStillExists?.version).toBe(1);
    });
  });

  describe('approve', () => {
    it('should return null for non-existent document', async () => {
      const result = await service.approve('non-existent-id', 'approver-1');
      expect(result).toBeNull();
    });

    it('should approve document with approver info', async () => {
      const doc = await service.create({
        clientId: 'client-123',
        name: 'Needs Approval.pdf',
        type: 'marketing',
        classification: 'public',
        mimeType: 'application/pdf',
        size: 3000,
        hash: 'approvalhash',
        storageKey: 'approvalkey',
        retentionPolicy: '6_years',
        createdBy: 'user-1',
      });

      expect(doc.approvedBy).toBeUndefined();
      expect(doc.approvedAt).toBeUndefined();

      const approved = await service.approve(doc.id, 'compliance-officer-123');

      expect(approved?.approvedBy).toBe('compliance-officer-123');
      expect(approved?.approvedAt).toBeInstanceOf(Date);
    });
  });

  describe('archive (SEC Rule 17a-4 - no hard delete)', () => {
    it('should return false for non-existent document', async () => {
      const result = await service.archive('non-existent-id');
      expect(result).toBe(false);
    });

    it('should archive document instead of deleting for regulatory compliance', async () => {
      const doc = await service.create({
        clientId: 'client-123',
        name: 'To Archive.pdf',
        type: 'correspondence',
        classification: 'public',
        mimeType: 'application/pdf',
        size: 2000,
        hash: 'archivehash',
        storageKey: 'archivekey',
        retentionPolicy: '3_years',
        createdBy: 'user-1',
      });

      const result = await service.archive(doc.id);
      expect(result).toBe(true);

      // Document should still exist but be marked as confidential (archived)
      const archived = await service.findById(doc.id);
      expect(archived).not.toBeNull();
      expect(archived?.classification).toBe('confidential');
    });
  });
});
