import express, { Router, Request,Response, NextFunction } from 'express';
import { getReimbursementByStatus, getReimbursementByAuthor, updateReimbursement, addNewReimbursement } from '../Repository/ReimbursementDataAccess';
import { reimbursementAuth } from '../MIddleware/ReimbursementAuthMiddleware';

export const reimbursementRouter: Router = express.Router();


reimbursementRouter.use('/author/userId/:id',(req:Request,res:Response,next:NextFunction) =>{
    let id = +req.params.id;
    if(!req.session || !req.session.user){
        res.status(401).send("Please login")
    }else if (req.session.user.role ==='Finance Manager' || req.session.user.userId === id){
        next()
    }else{
        res.status(401).send('The incoming token has expired');
    }
});

reimbursementRouter.get('/author/userId/:userId', async (req:Request,res:Response)=>{
    const userId = +req.params.userId;
    if(isNaN(userId)) {
        throw new Error('The user id must be a number');
    }else{
        res.status(200).json(await getReimbursementByAuthor(userId));
    }
})

reimbursementRouter.use(reimbursementAuth)

reimbursementRouter.get('/status/:statusId',async (req:Request,res:Response) =>{
    const statusId = +req.params.statusId;
    if(isNaN(statusId)){
        throw new Error('The status id must be a number');
    }else{
        res.status(200).json(await getReimbursementByStatus(statusId));
    }
})

reimbursementRouter.post('/',async (req:Request,res:Response) => {
    let {id,author,amount,date_submitted,description,status,type} = req.body;
    if(author && amount && date_submitted && description && status && type){
        res.status(201).json(await addNewReimbursement(id,author,amount,date_submitted,description,status,type));
    }else{
        res.status(400).send("Must have all the required fields to add a reimbursement")
    }
})

reimbursementRouter.patch('/',async (req:Request,res:Response) => {
    let {id,amount,date_resolved,description,resolver,status,type} = req.body;
    if(!id || isNaN(id)){
        res.status(400).send('Must have a valid id')
    }else if(amount ||  date_resolved || description || resolver || status ||type){
        res.json(await updateReimbursement(id,amount,date_resolved,description,resolver,status,type));
    }else{
        res.status(400).send('Must have a least one field to update a reimbursement');
    }
})