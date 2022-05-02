import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { CreateLeadDto } from './lead.dto';
import { Lead } from './lead.model';
import { LeadService } from './lead.service';

@Controller('leads')
export class LeadController {
    constructor(private _leadService: LeadService) {}

    @Get('csv')
    public async exportCsv(@Res() res: Response): Promise<Response> {
        const csv = await this._leadService.getCsvData();
        const filename = this._leadService.getCsvFilename();

        res.type('text/csv');
        res.attachment(filename);

        return res.send(csv);
    }

    @Post('')
    public createLead(@Body() lead: CreateLeadDto): Promise<Lead> {
        return this._leadService.createOne(lead);
    }
}
