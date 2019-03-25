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
