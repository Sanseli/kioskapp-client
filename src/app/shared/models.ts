import { StringifyOptions } from 'querystring';

export interface Employee {
    id?: number;
    name: string;
    firstname?: string;
    email: string;
    user_token: string;
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
}

export interface User {
    id?: number;
    name: string;
    email?: string;
    password?: string;
    //c_password?: string;
}
