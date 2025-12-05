import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  source: 'website' | 'referral' | 'social' | 'advertisement' | 'event';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  score: number;
  assignedTo?: string;
  notes: string[];
  consentCaptured: boolean;
  consentTimestamp?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface MarketingContent {
  id: string;
  title: string;
  type: 'email' | 'social' | 'blog' | 'newsletter' | 'advertisement';
  content: string;
  status: 'draft' | 'pending_review' | 'approved' | 'published' | 'archived';
  approvedBy?: string;
  approvedAt?: Date;
  publishedAt?: Date;
  complianceCheckId?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class MarketingService {
  private leads: Lead[] = [];
  private content: MarketingContent[] = [];

  // Lead Management
  async createLead(
    data: Omit<Lead, 'id' | 'score' | 'notes' | 'createdAt' | 'updatedAt'>
  ): Promise<Lead> {
    const lead: Lead = {
      ...data,
      id: uuidv4(),
      score: this.calculateLeadScore(data),
      notes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.leads.push(lead);

    console.log(
      `[AUDIT] Lead created: ${lead.id} from ${lead.source} at ${new Date().toISOString()}`
    );

    return lead;
  }

  async findAllLeads(status?: string): Promise<Lead[]> {
    if (status) {
      return this.leads.filter((lead) => lead.status === status);
    }
    return this.leads;
  }

  async updateLeadStatus(id: string, status: Lead['status'], notes?: string): Promise<Lead | null> {
    const lead = this.leads.find((l) => l.id === id);
    if (!lead) {
      return null;
    }

    lead.status = status;
    lead.updatedAt = new Date();

    if (notes) {
      lead.notes.push(`${new Date().toISOString()}: ${notes}`);
    }

    console.log(`[AUDIT] Lead status updated: ${id} to ${status} at ${new Date().toISOString()}`);

    return lead;
  }

  async assignLead(id: string, assignedTo: string): Promise<Lead | null> {
    const lead = this.leads.find((l) => l.id === id);
    if (!lead) {
      return null;
    }

    lead.assignedTo = assignedTo;
    lead.status = 'contacted';
    lead.updatedAt = new Date();

    console.log(`[AUDIT] Lead assigned: ${id} to ${assignedTo} at ${new Date().toISOString()}`);

    return lead;
  }

  private calculateLeadScore(data: Partial<Lead>): number {
    let score = 0;

    // Source scoring
    if (data.source === 'referral') {
      score += 30;
    }
    if (data.source === 'website') {
      score += 20;
    }
    if (data.source === 'event') {
      score += 25;
    }

    // Completeness scoring
    if (data.email) {
      score += 20;
    }
    if (data.phone) {
      score += 15;
    }

    // Consent scoring (higher priority for compliant leads)
    if (data.consentCaptured) {
      score += 15;
    }

    return Math.min(score, 100);
  }

  // Marketing Content Management (FINRA 2210 compliant)
  async createContent(
    data: Omit<MarketingContent, 'id' | 'status' | 'createdAt' | 'updatedAt'>
  ): Promise<MarketingContent> {
    const content: MarketingContent = {
      ...data,
      id: uuidv4(),
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.content.push(content);

    console.log(
      `[AUDIT] Marketing content created: ${content.id} (${content.type}) at ${new Date().toISOString()}`
    );

    return content;
  }

  async findAllContent(status?: string): Promise<MarketingContent[]> {
    if (status) {
      return this.content.filter((c) => c.status === status);
    }
    return this.content;
  }

  async submitForReview(id: string): Promise<MarketingContent | null> {
    const content = this.content.find((c) => c.id === id);
    if (!content) {
      return null;
    }

    content.status = 'pending_review';
    content.updatedAt = new Date();

    console.log(`[AUDIT] Content submitted for review: ${id} at ${new Date().toISOString()}`);

    return content;
  }

  async approveContent(
    id: string,
    approvedBy: string,
    complianceCheckId: string
  ): Promise<MarketingContent | null> {
    const content = this.content.find((c) => c.id === id);
    if (!content) {
      return null;
    }

    content.status = 'approved';
    content.approvedBy = approvedBy;
    content.approvedAt = new Date();
    content.complianceCheckId = complianceCheckId;
    content.updatedAt = new Date();

    console.log(`[AUDIT] Content approved: ${id} by ${approvedBy} at ${new Date().toISOString()}`);

    return content;
  }

  async publishContent(id: string): Promise<MarketingContent | null> {
    const content = this.content.find((c) => c.id === id);
    if (!content || content.status !== 'approved') {
      return null; // Can only publish approved content
    }

    content.status = 'published';
    content.publishedAt = new Date();
    content.updatedAt = new Date();

    console.log(`[AUDIT] Content published: ${id} at ${new Date().toISOString()}`);

    return content;
  }
}
