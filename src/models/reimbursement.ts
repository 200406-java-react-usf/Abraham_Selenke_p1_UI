export class Reimbursements {

    reimb_id: number;
    amount: number;
    submitted: Date;
    resolved: Date;
    description: string;
    author: number;
    resolver_id: number;
    reimb_status: string;
    reimb_type: string;

    constructor(id: number, amount: number, sub: Date, res: Date, des: string, author: number, resovler: number, status: string, type: string) {
        this.reimb_id = id;
        this.amount = amount;
        this.submitted = sub;
        this.resolved = res;
        this.description = des;
        this.author = author;
        this.resolver_id = resovler;
        this.reimb_status = status;
        this.reimb_type = type;
    }
}