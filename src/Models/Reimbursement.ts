import User from "./User";

export default class Reimbursement {
    private reimbursementId : number;
    private author : User;
    private amount : number;
    private dateSubmitted : string;
    private dateResolved : string | null;
    private description : string;
    private resolver : User | null;
    private status : string;
    private type : string;

    constructor(reimId:number,author:User,amount:number,dateSub:string,dateRes:string|null,desc:string,resolver:User|null,status:string,type:string){
        this.reimbursementId = reimId;
        this.author = author;
        this.amount = amount;
        this.dateSubmitted = dateSub;
        this.dateResolved = dateRes || null;
        this.description = desc;
        this.resolver = resolver || null;
        this.status = status;
        this.type = type;
    }

    public getReimbursementId() :number{
        return this.reimbursementId;
    }

    public setReimbursementId(reimId : number) : void{
        this.reimbursementId = reimId;
    }

    public getAuthor() : User{
        return this.author;
    }

    public setAuthor(author:User) : void {
        this.author = author;
    }
    
    public getAmount() : number {
        return this.amount;
    }

    public setAmount(amount : number) : void {
        this.amount = amount;
    }

    public getDateSubmitted() : string {
        return this.dateSubmitted;
    }

    public setDateSubmitted(dateSub : string) : void {
        this.dateSubmitted = dateSub;
    }

    public getDateResolved() : string | null{
        return this.dateResolved;
    }

    public setDateResolved(dateRes : string) : void{
        this.dateResolved = dateRes;
    }

    public getDescription() : string {
        return this.description;
    }

    public setDescription(desc : string) : void {
        this.description = desc;
    }

    public getResolver() : User | null{
        return this.resolver;
    }

    public setResolver(resolver : User) : void{
        this.resolver = resolver;
    }

    public getStatus() : string {
        return this.status;
    }

    public setStatus(status : string) : void {
        this.status = status;
    }

    public getType() : string{
        return this.type;
    }

    public setType(type : string) : void{
        this.type = type;
    }
}