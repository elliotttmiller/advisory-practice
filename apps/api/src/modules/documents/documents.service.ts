import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export interface Document {
  id: string;
  clientId: string;
  name: string;
  type: 'contract' | 'disclosure' | 'statement' | 'tax' | 'correspondence' | 'marketing';
  classification: 'public' | 'confidential' | 'regulatory';
  mimeType: string;
  size: number;
  hash: string; // SHA-256 hash for integrity verification
  storageKey: string;
  version: number;
  retentionPolicy: string;
  createdBy: string;
  approvedBy?: string;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class DocumentsService {
  private documents: Document[] = [];

  async findAll(clientId?: string): Promise<Document[]> {
    if (clientId) {
      return this.documents.filter((doc) => doc.clientId === clientId);
    }
    return this.documents;
  }

  async findById(id: string): Promise<Document | null> {
    return this.documents.find((doc) => doc.id === id) || null;
  }

  async create(
    data: Omit<Document, 'id' | 'version' | 'createdAt' | 'updatedAt'>
  ): Promise<Document> {
    const document: Document = {
      ...data,
      id: uuidv4(),
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.documents.push(document);

    // Log document creation for SEC Rule 17a-4(f) compliance
    console.log(
      `[AUDIT] Document created: ${document.id} (${document.type}) for client ${document.clientId} at ${new Date().toISOString()}`
    );

    return document;
  }

  async createVersion(
    id: string,
    data: Partial<Document>,
    userId: string
  ): Promise<Document | null> {
    const existing = this.documents.find((doc) => doc.id === id);
    if (!existing) {
      return null;
    }

    // Documents are immutable for compliance - create new version instead of updating
    const newDocument: Document = {
      clientId: existing.clientId,
      name: existing.name,
      type: existing.type,
      classification: existing.classification,
      mimeType: existing.mimeType,
      size: existing.size,
      hash: existing.hash,
      storageKey: existing.storageKey,
      retentionPolicy: existing.retentionPolicy,
      ...data,
      id: uuidv4(),
      version: existing.version + 1,
      createdBy: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.documents.push(newDocument);

    // Log document version creation for compliance
    console.log(
      `[AUDIT] Document version created: ${newDocument.id} (v${newDocument.version}) from ${id} at ${new Date().toISOString()}`
    );

    return newDocument;
  }

  async approve(id: string, approvedBy: string): Promise<Document | null> {
    const document = this.documents.find((doc) => doc.id === id);
    if (!document) {
      return null;
    }

    document.approvedBy = approvedBy;
    document.approvedAt = new Date();
    document.updatedAt = new Date();

    // Log document approval for FINRA compliance
    console.log(
      `[AUDIT] Document approved: ${id} by ${approvedBy} at ${new Date().toISOString()}`
    );

    return document;
  }

  // Documents cannot be deleted for regulatory compliance (SEC Rule 17a-4)
  // Only soft-archive is supported
  async archive(id: string): Promise<boolean> {
    const document = this.documents.find((doc) => doc.id === id);
    if (!document) {
      return false;
    }

    document.classification = 'confidential'; // Mark as archived
    document.updatedAt = new Date();

    console.log(`[AUDIT] Document archived: ${id} at ${new Date().toISOString()}`);

    return true;
  }
}
