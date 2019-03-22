export interface Appointment {
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
}

export interface Employee {
    id?: number;
    name: string;
    firstname?: string;
    email: string;
}


export interface Visitor {
    id?: number;
    appointment_id: number;
    name: string;
}
