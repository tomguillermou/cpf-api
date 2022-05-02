import { IsEmail, IsEnum, IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateLeadDto {
    @IsString()
    firstname: string;

    @IsString()
    lastname: string;

    @IsEmail()
    email: string;

    @IsString()
    phonenumber: string;

    // professional activity

    @IsString()
    employed: string;

    @IsEnum(['public', 'private', 'none'])
    sector: string;

    // training

    @IsString()
    trained: string;

    @IsString()
    connected: string;

    @IsNumber()
    budget: number;

    // misc

    @IsString()
    account: string;

    // call availability

    @IsString()
    callDate: string;

    @IsEnum(['morning', 'afternoon'])
    callHour: string;

    // prospection

    @IsMongoId()
    prospector: string;

    @IsString()
    prospectionDate: string;
}
