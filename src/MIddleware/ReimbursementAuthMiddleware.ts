import express, { Request,Response,NextFunction } from "express";

export const reimbursementAuth = ((req:Request,res:Response,next:NextFunction) =>{
    if(!req.session || !req.session.user){
        res.status(401).send("Please login")
    }else if(req.method == 'POST'){
        next();
    }else if(req.session.user.role === 'Finance Manager'){
        next();
    }else{
        res.status(401).send('The incoming token has expired');
    }
})