import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { parse } from 'json2csv';
import { Model, Types } from 'mongoose';

import { User, UserService } from 'src/users';

import { CreateLeadDto } from './lead.dto';
import { Lead, LeadDocument } from './lead.model';

@Injectable()
export class LeadService {
    constructor(
        @InjectModel(Lead.name) private _model: Model<LeadDocument>,
        private _userService: UserService,
    ) {}

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
            { value: 'prospector', label: 'Prospecteur' },
        ];

        const leads = await this._model.find().populate('prospector').lean().exec();

        return parse(
            leads.map((lead) => ({
                ...lead,
                prospector: `${lead.prospector.firstname} ${lead.prospector.lastname}`,
            })),
            { fields },
        );
    }

    public getCsvFilename(): string {
        return `Prospects_CPF_${new Date().toISOString()}.csv`;
    }

    public createOne(lead: CreateLeadDto): Promise<Lead> {
        return this._model.create(lead);
    }

    // public async deleteOneById(id: string | Types.ObjectId): Promise<void> {
    //     await this._model.deleteOne({ _id: id }).exec();
    // }
}
