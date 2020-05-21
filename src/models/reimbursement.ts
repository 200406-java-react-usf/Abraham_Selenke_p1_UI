export class Reimbursements {

    reimbId: number;
    amount: number;
    submitted: Date;
    resolved: Date;
    description: string;
    author: number;
    resolver: number;
    status: string;
    type: string;

    constructor(id: number, amount: number, sub: Date, res: Date, des: string, author: number, resovler: number, status: string, type: string) {
        this.reimbId = id;
        this.amount = amount;
        this.submitted = sub;
        this.resolved = res;
        this.description = des;
        this.author = author;
        this.resolver = resovler;
        this.status = status;
        this.type = type;
    }
}