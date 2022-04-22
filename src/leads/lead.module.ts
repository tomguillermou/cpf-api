import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from 'src/auth';
import { UserModule } from 'src/users';

import { LeadController } from './lead.controller';
import { Lead, LeadSchema } from './lead.model';
import { LeadService } from './lead.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Lead.name, schema: LeadSchema }]),
        AuthModule,
        UserModule,
    ],
    controllers: [LeadController],
    providers: [LeadService],
    exports: [LeadService],
})
export class LeadModule {}
