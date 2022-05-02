export interface LeadRow {
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;

    employed: 'oui' | 'non' | '-';
    sector: 'privé' | 'public' | '-';

    trained: 'oui' | 'non' | '-';
    connected: 'oui' | 'non' | '-';
    budget: number;

    account: 'oui' | 'non' | '-';

    callDate: string;
    callHour: 'matin' | 'après-midi' | '-';

    prospector: string;
    prospectionDate: string;
}
