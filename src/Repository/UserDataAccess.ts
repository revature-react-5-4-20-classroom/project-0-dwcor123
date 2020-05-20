import { PoolClient, QueryResult } from 'pg'
import User from "../Models/User";
import { connectionPool } from '.';
import { userRouter } from '../Routers/UserRouter';


export async function getAllUsers() : Promise<User[]> {
    let client : PoolClient = await connectionPool.connect();
    try{
        const result : QueryResult = await client.query(`SELECT revature_p0.users.id,username,"password",first_name,last_name,email,roles.role_name 
                                                        FROM revature_p0.users 
                                                        INNER JOIN revature_p0.roles ON users.role_id = roles.id;`);
        return result.rows.map((user) => {
            return new User(user.id,user.username,user.password,user.first_name,user.last_name,user.email,user.role_name)
        });
    }catch(err) {
        throw new Error(`Failure to get all Users: 
        ${err.message}`);
    }finally{
        client && client.release();
    }
}

export async function getUserById(id:number) : Promise<User>{
    let client : PoolClient = await connectionPool.connect();
    try{
        const result : QueryResult = await client.query(`SELECT revature_p0.users.id,username,"password",first_name,last_name,email,roles.role_name 
                                                        FROM revature_p0.users 
                                                        INNER JOIN revature_p0.roles ON revature_p0.users.role_id = revature_p0.roles.id
                                                        WHERE revature_p0.users.id = $1;`,[id]);
        const usersMatchingId : User[] = result.rows.map((user) => {
            return new User(user.id,user.username,user.password,user.first_name,user.last_name,user.email,user.role_name);
        });    
        if(usersMatchingId.length > 0){
            return usersMatchingId[0];
        }else{
            throw new Error(`User of id ${id} not found`);
        }                                         
    }catch(err) {
        throw new Error(`Failure to get a User by id of ${id}: 
        ${err.message}`);
    }finally{
        client && client.release();
    }
}
export async function getUserByUsernamePassword(username:string,password:string) : Promise<User> {
    let client : PoolClient = await connectionPool.connect();
    try{
        const result : QueryResult = await client.query(`SELECT revature_p0.users.id,username,"password",first_name,last_name,email,roles.role_name 
                                                        FROM revature_p0.users 
                                                        INNER JOIN revature_p0.roles ON revature_p0.users.role_id = revature_p0.roles.id
                                                        WHERE revature_p0.users.username = $1 AND revature_p0.users."password" = $2;`,[username,password]);
        const usersMatchingId : User[] = result.rows.map((user) => {
            return new User(user.id,user.username,user.password,user.first_name,user.last_name,user.email,user.role_name);
        });    
        if(usersMatchingId.length > 0){
            return usersMatchingId[0];
        }else{
            throw new Error(`User of username ${username} and password ${password} not found`);
        }        
    }catch(err){
        throw new Error(`Failure to get user: ${err.messsage}`);
    }finally{
        client && client.release();
    }
}
export async function updateUser(id:number,username:string,password:string,firstName:string,lastName:string,email:string,role:string) : Promise<User>{
    const client : PoolClient = await connectionPool.connect();
    try{
        if(username){
            await client.query('UPDATE revature_p0.users SET username = $1 WHERE id = $2;',[username,id]);
        }
        if(password){
           await client.query('UPDATE revature_p0.users SET password = $1 WHERE id = $2;',[password,id]);
        }
        if(firstName){
           await client.query('UPDATE revature_p0.users SET first_name = $1 WHERE id = $2;',[firstName,id]);
        }
        if(lastName){
           await client.query('UPDATE revature_p0.users SET last_name = $1 WHERE id = $2;',[lastName,id]);
        }
        if(email) {
           await client.query('UPDATE revature_p0.users SET email = $1 WHERE id = $2;',[email,id]);
        }
        if(role){
            try{
                role = role[0].toUpperCase() + role.slice(1);
                const resultOfId : QueryResult = await client.query('SELECT id FROM revature_p0.roles WHERE role_name = $1;',[role]);
                const role_id = resultOfId.rows[0].id;
                await client.query('UPDATE revature_p0.users SET role_id = $1 WHERE id = $2;',[role_id,id]);
            }catch(err){
                throw new Error(`Something went wrong with the role ${role},
                ${err.message}`);
            }
        }
        return await getUserById(id);
    }catch(err){
        throw new Error(`Something went wrong with updating fields.
        ${err.message}`);
    }finally{
        client && client.release();
    }
}