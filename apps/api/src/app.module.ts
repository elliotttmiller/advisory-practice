import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { ClientsModule } from './modules/clients/clients.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { ComplianceModule } from './modules/compliance/compliance.module';
import { MarketingModule } from './modules/marketing/marketing.module';
import { ReportingModule } from './modules/reporting/reporting.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    AuthModule,
    ClientsModule,
    DocumentsModule,
    ComplianceModule,
    MarketingModule,
    ReportingModule,
    IntegrationsModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
