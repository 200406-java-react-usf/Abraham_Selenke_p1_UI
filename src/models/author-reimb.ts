export class UserReimbursements {

    reimb_id: number;
    author: number;
    amount: number;
    description: string;
    submitted: Date;
    resolved: Date;
    resolver_id: number;
    reimb_status: string;
    reimb_type: string;

    constructor(id: number, firstName: number, amount: number, sub: Date, res: Date, des: string, resovler: number, status: string, type: string) {
        this.reimb_id = id;
        this.author = firstName;
        this.amount = amount;
        this.submitted = sub;
        this.resolved = res;
        this.description = des;
        this.resolver_id = resovler;
        this.reimb_status = status;
        this.reimb_type = type;
    }
}