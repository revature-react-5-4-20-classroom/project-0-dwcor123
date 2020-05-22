import express, { request } from 'express';
import { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import  User  from './Models/User';
//import { users } from './fake-database';
import { userRouter } from './Routers/UserRouter';
import {reimbursementRouter} from './Routers/ReimbursementRouter';
import { sessionMiddleware } from './MIddleware/SessionMiddleware';
import { getUserByUsernamePassword } from './Repository/UserDataAccess';
const app : Application = express();
app.get('/new-endpoint', (req:Request,res:Response) => {
    res.send('Webhooks worked');
})
app.use(bodyParser.json());
app.use(sessionMiddleware)



app.post('/login',async (req:Request,res:Response) =>{
    let {username,password} = req.body;
    if(!username || !password){
        res.status(400).send('Please include username and password fields for login')
    }else{
        try{
            const user : User = await getUserByUsernamePassword(username,password);
            if(req.session){
                req.session.user = user;
            }
            res.send(user);
        }catch(err){
            console.log(err.message)
            res.status(400).send('Invalid Credentials')
        }
    }
})


app.use('/users',userRouter);
app.use('/reimbursements',reimbursementRouter);

app.get('/hello',(req:Request,res:Response) => {
    res.send("hello from new app");
})


app.listen(2000,()=>{
    console.log("app started")
    console.log(process.env.PG_DATABASE);
});

