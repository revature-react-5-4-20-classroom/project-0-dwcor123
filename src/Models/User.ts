//import Role from './Role';

export default class User {
    private userId : number;
    private username : string;
    private password : string;
    private firstName : string;
    private lastName : string;
    private email : string;
    private role : string;

    constructor(userId:number,username:string,password:string,firstName:string,lastName:string,email:string,role:string){
        this.userId = userId ;
        this.username = username;
        this.password = password
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
    }

    public getUserId() : number {
        return this.userId;
    }

    public setUserId(userId : number) : void{
        this.userId = userId;
    }

    public getUsername() : string {
        return this.username;
    }

    public setUsername(username : string) : void{
        this.username = username;
    }

    public getPassword() : string {
        return this.password;
    }

    public setPassword(password:string) :void{
        this.password = password;
    }
    public getFirstName() : string {
        return this.firstName;
    }

    public setFirstName(firstName : string) :void{
        this.firstName = firstName;
    }

    public getLastName() : string {
        return this.lastName;
    }

    public setLastName(lastName : string) : void {
        this.lastName = lastName;
    }

    public getEmail() : string {
        return this.email;
    }

    public setEmail(email : string) : void {
        this.email = email;
    }

    public getRole() : string {
        return this.role;
    }

    public setRole(role : string) : void {
        this.role = role;
    }
}