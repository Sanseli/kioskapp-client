import { StringifyOptions } from 'querystring';

export interface Employee {
    id?: number;
    name: string;
    firstname?: string;
    email: string;
}

export interface Visitor {
    id?: number;
    name: string;
    firstname: string;
    company?: string;
    email: string;
    telnr?: string;
    day: string;
    subject?: string;
    employee_id: number;
    location?: string;
    loggedIn: boolean;
}

export interface EmailModel {
    vName: string;
    vFirstname: string;
    // vCompany?: string;
    // vSubject: string;
    // eFirstname: string;
    // eEmail: string;
}
