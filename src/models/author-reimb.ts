export class UserReimbursements {

    reimb_id: number;
    first_name: string;
    amount: number;
    description: string;
    submitted: Date;
    resolved: Date;
    resolver_id: number;
    reimb_status: string;
    reimb_type: string;

    constructor(id: number, firstName: string, amount: number, sub: Date, res: Date, des: string, resovler: number, status: string, type: string) {
        this.reimb_id = id;
        this.first_name = firstName;
        this.amount = amount;
        this.submitted = sub;
        this.resolved = res;
        this.description = des;
        this.resolver_id = resovler;
        this.reimb_status = status;
        this.reimb_type = type;
    }
}