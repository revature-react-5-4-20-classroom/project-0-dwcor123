import express, { Router,Request,Response, NextFunction} from "express";
import { getAllUsers, getUserById, updateUser } from "../Repository/UserDataAccess";
import User from "../Models/User";
import { authForUserFinancial} from "../MIddleware/UsersAuthMiddleware";


export const userRouter : Router = express.Router();

userRouter.use('/:id',(req:Request,res:Response,next:NextFunction) =>{
    let id = +req.params.id;
    if(!req.session || !req.session.user){
        res.status(401).send("Please login")
    }else if (req.session.user.role ==='Finance Manager' || req.session.user.userId === id){
        next()
    }else{
        res.status(401).send('The incoming token has expired');
    }
});
userRouter.patch('/:id',async (req:Request,res:Response) => {
    const id = +req.params.id;
    let {username,password,first_name,last_name,email,role} = req.body;
    if(!id || isNaN(id)){
        res.status(400).send('Must have a valid id')
    }else if(username || password || first_name || last_name || email || role){
        res.json(await updateUser(id,username,password,first_name,last_name,email,role));
    }else{
        res.status(400).send('Must have a least one field to update a user');
    }
})
userRouter.get('/:id', async (req:Request,res:Response) => {
    const id = +req.params.id;
    if(isNaN(id)){
        res.status(400).send('The id must be a number');
    }else{
        res.json(await getUserById(id));
    }
}) 
userRouter.use('/',authForUserFinancial)
userRouter.get('/', async (req : Request,res: Response) => {
    const users : User[] = await getAllUsers();
    res.json(users);
})

userRouter.use('/',authForUserFinancial);
userRouter.patch('/',async (req:Request,res:Response) => {
    let {id,username,password,first_name,last_name,email,role} = req.body;
    if(!id || isNaN(id)){
        res.status(400).send('Must have a valid id')
    }else if(username || password || first_name || last_name || email || role){
        res.json(await updateUser(id,username,password,first_name,last_name,email,role));
    }else{
        res.status(400).send('Must have a least one field to update a user');
    }
})