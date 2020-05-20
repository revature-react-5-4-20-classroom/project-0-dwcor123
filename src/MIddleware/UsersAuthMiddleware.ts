import express, { Request,Response,NextFunction } from "express";

export const authForUserFinancial = ((req:Request,res:Response,next:NextFunction) => {
    if(!req.session || !req.session.user){
        res.status(401).send("Please login")
    }else if (req.method === 'GET'){
        if(req.session.user.role === 'Finance Manager'){
            next()
        }else{
            res.status(401).send('The incoming token has expired')
        }
    }else if (req.method === 'PATCH'){
        if(req.session.user.role === 'Admin'){
            next();
        }else{
            res.status(401).send('The incoming token has expired')
        }
    }else{
        res.status(401).send('The incoming token has expired');
    }
})