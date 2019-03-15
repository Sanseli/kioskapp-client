export interface Visitor {
    id?: number;
    name: string;
    firstname: string;
    company?: string;
    reason?: string;
    email: string;
    telnr?: string;
    day: string;
}

export interface Employee {
    id?: number;
    name: string;
    firstname?: string;
    email: string;
}

export interface Appointment {
    id?: number;
    subject: string;
    employee_id: BigInteger;
    visitor_id: BigInteger;
    start: Date;
    end?: Date;
    location?: string;
}

export interface Visit {
    id?: number;
    visitor_id: number;
    visitor?: Visitor;
    name: string;
}
