import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { parse } from 'json2csv';
import * as moment from 'moment';
import { Model } from 'mongoose';

import { LeadRow } from './interfaces';

import { CreateLeadDto } from './lead.dto';
import { Lead, LeadDocument } from './lead.model';

@Injectable()
export class LeadService {
    constructor(@InjectModel(Lead.name) private _model: Model<LeadDocument>) {}

    public async getCsvData(): Promise<unknown> {
        const fields = [
            { value: 'firstname', label: 'Prénom' },
            { value: 'lastname', label: 'Nom' },
            { value: 'email', label: 'Email' },
            { value: 'phonenumber', label: 'Téléphone' },
            { value: 'employed', label: 'Employé' },
            { value: 'sector', label: 'Secteur' },
            { value: 'trained', label: 'Formé' },
            { value: 'budget', label: 'Budget' },
            { value: 'connected', label: 'CPF' },
            { value: 'account', label: 'FranceConnect' },
            { value: 'callDate', label: "Date d'appel" },
            { value: 'callHour', label: "Plage horaire d'appel" },
            { value: 'prospector', label: 'Prospecté par' },
            { value: 'prospectionDate', label: 'Prospecté le' },
        ];

        const leads = await this._model.find().populate('prospector').lean().exec();

        return parse(
            leads.map((lead) => this.getRowFromLead(lead)),
            { fields },
        );
    }

    public getCsvFilename(): string {
        return `Prospects_CPF_${new Date().toISOString()}.csv`;
    }

    public createOne(lead: CreateLeadDto): Promise<Lead> {
        return this._model.create(lead);
    }

    private getRowFromLead(lead: Lead): LeadRow {
        return {
            ...lead,
            employed: this.translateBoolean(lead.employed),
            sector: this.translateSector(lead.sector),
            trained: this.translateBoolean(lead.trained),
            connected: this.translateBoolean(lead.connected),
            account: this.translateBoolean(lead.account),
            callDate: moment.utc(lead.callDate).format('dddd D MMMM YYYY'),
            callHour: this.translateDayPeriod(lead.callHour),
            prospector: `${lead.prospector.firstname} ${lead.prospector.lastname}`,
            prospectionDate: moment(lead.prospectionDate).format('dddd D MMMM YYYY [à] HH:mm'),
        };
    }

    private translateBoolean(value: boolean): 'oui' | 'non' | '-' {
        switch (value) {
            case true:
                return 'oui';
            case false:
                return 'non';
            default:
                return '-';
        }
    }

    private translateSector(value: string): 'privé' | 'public' | '-' {
        switch (value) {
            case 'private':
                return 'privé';
            case 'public':
                return 'public';
            default:
                return '-';
        }
    }

    private translateDayPeriod(value: string): 'matin' | 'après-midi' | '-' {
        switch (value) {
            case 'morning':
                return 'matin';
            case 'afternoon':
                return 'après-midi';
            default:
                return '-';
        }
    }
}
