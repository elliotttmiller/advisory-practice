import { Test, TestingModule } from '@nestjs/testing';
import { MarketingService, Lead, MarketingContent } from '../marketing.service';

describe('MarketingService', () => {
  let service: MarketingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketingService],
    }).compile();

    service = module.get<MarketingService>(MarketingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Lead Management', () => {
    describe('createLead', () => {
      it('should create a new lead with calculated score', async () => {
        const leadData = {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          source: 'referral' as const,
          status: 'new' as const,
          consentCaptured: true,
          consentTimestamp: new Date(),
        };

        const result = await service.createLead(leadData);

        expect(result.id).toBeDefined();
        expect(result.firstName).toBe('John');
        expect(result.source).toBe('referral');
        expect(result.score).toBeGreaterThan(0);
        expect(result.notes).toEqual([]);
        expect(result.createdAt).toBeInstanceOf(Date);
      });

      it('should calculate higher score for referral leads', async () => {
        const referralLead = await service.createLead({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          source: 'referral',
          status: 'new',
          consentCaptured: true,
        });

        const websiteLead = await service.createLead({
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          source: 'website',
          status: 'new',
          consentCaptured: true,
        });

        expect(referralLead.score).toBeGreaterThan(websiteLead.score);
      });

      it('should add bonus score for consent captured', async () => {
        const withConsent = await service.createLead({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          source: 'website',
          status: 'new',
          consentCaptured: true,
        });

        const withoutConsent = await service.createLead({
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          source: 'website',
          status: 'new',
          consentCaptured: false,
        });

        expect(withConsent.score).toBeGreaterThan(withoutConsent.score);
      });
    });

    describe('findAllLeads', () => {
      it('should return empty array initially', async () => {
        const result = await service.findAllLeads();
        expect(result).toEqual([]);
      });

      it('should filter leads by status', async () => {
        await service.createLead({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          source: 'website',
          status: 'new',
          consentCaptured: true,
        });

        await service.createLead({
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          source: 'referral',
          status: 'qualified',
          consentCaptured: true,
        });

        const newLeads = await service.findAllLeads('new');
        const qualifiedLeads = await service.findAllLeads('qualified');

        expect(newLeads.length).toBe(1);
        expect(qualifiedLeads.length).toBe(1);
      });
    });

    describe('updateLeadStatus', () => {
      it('should return null for non-existent lead', async () => {
        const result = await service.updateLeadStatus('non-existent-id', 'contacted');
        expect(result).toBeNull();
      });

      it('should update lead status with notes', async () => {
        const lead = await service.createLead({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          source: 'website',
          status: 'new',
          consentCaptured: true,
        });

        const updated = await service.updateLeadStatus(lead.id, 'contacted', 'Initial call made');

        expect(updated?.status).toBe('contacted');
        expect(updated?.notes.length).toBe(1);
        expect(updated?.notes[0]).toContain('Initial call made');
      });
    });

    describe('assignLead', () => {
      it('should return null for non-existent lead', async () => {
        const result = await service.assignLead('non-existent-id', 'advisor-1');
        expect(result).toBeNull();
      });

      it('should assign lead and update status to contacted', async () => {
        const lead = await service.createLead({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          source: 'website',
          status: 'new',
          consentCaptured: true,
        });

        const assigned = await service.assignLead(lead.id, 'advisor-123');

        expect(assigned?.assignedTo).toBe('advisor-123');
        expect(assigned?.status).toBe('contacted');
      });
    });
  });

  describe('Marketing Content Management', () => {
    describe('createContent', () => {
      it('should create content in draft status', async () => {
        const content = await service.createContent({
          title: 'Investment Newsletter',
          type: 'newsletter',
          content: 'Great insights about investing...',
          createdBy: 'user-123',
        });

        expect(content.id).toBeDefined();
        expect(content.status).toBe('draft');
        expect(content.title).toBe('Investment Newsletter');
        expect(content.createdAt).toBeInstanceOf(Date);
      });
    });

    describe('findAllContent', () => {
      it('should return empty array initially', async () => {
        const result = await service.findAllContent();
        expect(result).toEqual([]);
      });

      it('should filter content by status', async () => {
        await service.createContent({
          title: 'Draft Content',
          type: 'blog',
          content: 'Draft...',
          createdBy: 'user-123',
        });

        const draft = await service.createContent({
          title: 'Another Draft',
          type: 'email',
          content: 'More draft...',
          createdBy: 'user-123',
        });

        await service.submitForReview(draft.id);

        const drafts = await service.findAllContent('draft');
        const pending = await service.findAllContent('pending_review');

        expect(drafts.length).toBe(1);
        expect(pending.length).toBe(1);
      });
    });

    describe('submitForReview', () => {
      it('should return null for non-existent content', async () => {
        const result = await service.submitForReview('non-existent-id');
        expect(result).toBeNull();
      });

      it('should change status to pending_review', async () => {
        const content = await service.createContent({
          title: 'Test Content',
          type: 'blog',
          content: 'Test...',
          createdBy: 'user-123',
        });

        const submitted = await service.submitForReview(content.id);

        expect(submitted?.status).toBe('pending_review');
      });
    });

    describe('approveContent', () => {
      it('should return null for non-existent content', async () => {
        const result = await service.approveContent('non-existent-id', 'approver', 'check-id');
        expect(result).toBeNull();
      });

      it('should approve content with compliance check reference', async () => {
        const content = await service.createContent({
          title: 'Test Content',
          type: 'blog',
          content: 'Test...',
          createdBy: 'user-123',
        });

        await service.submitForReview(content.id);
        const approved = await service.approveContent(
          content.id,
          'compliance-officer',
          'compliance-check-123'
        );

        expect(approved?.status).toBe('approved');
        expect(approved?.approvedBy).toBe('compliance-officer');
        expect(approved?.complianceCheckId).toBe('compliance-check-123');
        expect(approved?.approvedAt).toBeInstanceOf(Date);
      });
    });

    describe('publishContent', () => {
      it('should return null for non-existent content', async () => {
        const result = await service.publishContent('non-existent-id');
        expect(result).toBeNull();
      });

      it('should not publish unapproved content', async () => {
        const content = await service.createContent({
          title: 'Draft Content',
          type: 'blog',
          content: 'Draft...',
          createdBy: 'user-123',
        });

        const result = await service.publishContent(content.id);
        expect(result).toBeNull();
      });

      it('should publish approved content', async () => {
        const content = await service.createContent({
          title: 'Approved Content',
          type: 'blog',
          content: 'Content...',
          createdBy: 'user-123',
        });

        await service.submitForReview(content.id);
        await service.approveContent(content.id, 'compliance-officer', 'check-id');
        const published = await service.publishContent(content.id);

        expect(published?.status).toBe('published');
        expect(published?.publishedAt).toBeInstanceOf(Date);
      });
    });
  });
});
