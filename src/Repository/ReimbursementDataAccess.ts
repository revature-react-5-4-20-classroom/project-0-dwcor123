import { PoolClient, QueryResult } from 'pg';
import Reimbursement from '../Models/Reimbursement';
import { connectionPool } from '.';
import User from '../Models/User';


export async function getReimbursementByStatus(id: number): Promise<Reimbursement[]> {
    const client: PoolClient = await connectionPool.connect();
    console.log(id)
    try {
        if (id === 1) {
            const resultOfAuthor: QueryResult = await client.query(`SELECT u1.id,u1.username,u1."password",u1.first_name,u1.last_name,u1.email,roles.role_name 
                                                FROM revature_p0.reimbursement 
                                                INNER JOIN revature_p0.users u1 ON author = u1.id
                                                INNER JOIN revature_p0.reimbursement_status ON reimbursement_status.id = reimbursement.status
                                                INNER JOIN revature_p0.roles ON u1.role_id = roles.id
                                                WHERE reimbursement_status.id = $1;`, [id]);

            const usersMatchingAuthor: User[] = resultOfAuthor.rows.map((user) => {
                // console.log(reim.id)
                const author = new User(user.id, user.username, user.password, user.first_name, user.last_name, user.email, user.role_name);
                return author;
            });
            const resultOfReimbursement: QueryResult = await client.query(`SELECT reimbursement.id,reimbursement.amount,reimbursement.date_submitted,reimbursement.description,
                                                                            reimbursement_status.status,reimbursement_type."type"
                                                                            FROM revature_p0.reimbursement
                                                                            INNER JOIN revature_p0.reimbursement_status ON reimbursement_status.id = reimbursement.status
                                                                            INNER JOIN revature_p0.reimbursement_type ON reimbursement_type.id = reimbursement."type"
                                                                            WHERE reimbursement_status.id = $1;`, [id])
            const reimbursementArray: Reimbursement[] = [];
            for (let i = 0; i < resultOfReimbursement.rows.length; i++) {
                let reim = new Reimbursement(resultOfReimbursement.rows[i].id, usersMatchingAuthor[i], resultOfReimbursement.rows[i].amount,
                    resultOfReimbursement.rows[i].date_submitted, null, resultOfReimbursement.rows[i].description, null, resultOfReimbursement.rows[i].status,
                    resultOfReimbursement.rows[i].type);
                reimbursementArray.push(reim);
            }
            return reimbursementArray;
        } else {
            const resultOfAuthor: QueryResult = await client.query(`SELECT u1.id,u1.username,u1."password",u1.first_name,u1.last_name,u1.email,roles.role_name 
                                                FROM revature_p0.reimbursement 
                                                INNER JOIN revature_p0.users u1 ON author = u1.id
                                                INNER JOIN revature_p0.reimbursement_status ON reimbursement_status.id = reimbursement.status
                                                INNER JOIN revature_p0.roles ON u1.role_id = roles.id
                                                WHERE reimbursement_status.id = $1;`, [id]);

            const usersMatchingAuthor: User[] = resultOfAuthor.rows.map((user) => {
                // console.log(reim.id)
                const author = new User(user.id, user.username, user.password, user.first_name, user.last_name, user.email, user.role_name);
                return author;
            });
            const resultOfResolver: QueryResult = await client.query(`SELECT u1.id,u1.username,u1."password",u1.first_name,u1.last_name,u1.email,roles.role_name 
                                                FROM revature_p0.reimbursement 
                                                INNER JOIN revature_p0.users u1 ON resolver = u1.id
                                                INNER JOIN revature_p0.reimbursement_status ON reimbursement_status.id = reimbursement.status
                                                INNER JOIN revature_p0.roles ON u1.role_id = roles.id
                                                WHERE reimbursement_status.id = $1;`, [id]);

            const usersMatchingResolver: User[] = resultOfResolver.rows.map((user) => {
                // console.log(reim.id)
                const resolver = new User(user.id, user.username, user.password, user.first_name, user.last_name, user.email, user.role_name);
                return resolver;
            });
            const resultOfReimbursement: QueryResult = await client.query(`SELECT reimbursement.id,reimbursement.amount,reimbursement.date_submitted,reimbursement.date_resolved,reimbursement.description,                                    
                                                                            reimbursement_status.status,reimbursement_type."type"
                                                                            FROM revature_p0.reimbursement
                                                                            INNER JOIN revature_p0.reimbursement_status ON reimbursement_status.id = reimbursement.status
                                                                            INNER JOIN revature_p0.reimbursement_type ON reimbursement_type.id = reimbursement."type"
                                                                            WHERE reimbursement_status.id = $1;`, [id])
            const reimbursementArray: Reimbursement[] = [];
            for (let i = 0; i < resultOfReimbursement.rows.length; i++) {
                let reim = new Reimbursement(resultOfReimbursement.rows[i].id, usersMatchingAuthor[i], resultOfReimbursement.rows[i].amount,
                    resultOfReimbursement.rows[i].date_submitted, resultOfReimbursement.rows[i].date_resolved, resultOfReimbursement.rows[i].description, usersMatchingResolver[i], resultOfReimbursement.rows[i].status,
                    resultOfReimbursement.rows[i].type);
                reimbursementArray.push(reim);
            }
            return reimbursementArray;
        }
    } catch (err) {
        throw new Error(`Faliure to get a Reimbursement by status id of ${id}: 
        ${err.message}`);
    } finally {
        client && client.release();
    }
}

export async function getReimbursementByAuthor(id: number) : Promise<Reimbursement[]>{
    const client : PoolClient = await connectionPool.connect();
    try{
        const resultOfReimbursement : QueryResult = await client.query(`SELECT reimbursement.id, reimbursement.amount, reimbursement.date_submitted, 
                                                    reimbursement.date_resolved, reimbursement.description, u1.id AS author_id, u1.username AS author_username, 
                                                    u1."password" AS author_password,u1.first_name AS author_first, u1.last_name AS author_last,u1.email AS author_email, u2.id AS resolver_id, 
                                                    u2.username AS resolver_username,u2."password" AS resolver_password,
                                                    u2.first_name AS resolver_first,u2.last_name AS resolver_last, u2.email AS resolver_email, r1.role_name AS author_role, 
                                                    reimbursement_type."type", r2.role_name AS resolver_role, reimbursement_status.status
                                                    FROM revature_p0.reimbursement 
                                                    INNER JOIN revature_p0.users AS u1 ON reimbursement.author = u1.id
                                                    LEFT JOIN revature_p0.users AS u2 ON reimbursement.resolver = u2.id
                                                    INNER JOIN revature_p0.reimbursement_status ON reimbursement_status.id = reimbursement.status
                                                    INNER JOIN revature_p0.reimbursement_type ON reimbursement_type.id = reimbursement."type"
                                                    INNER JOIN revature_p0.roles r1 ON u1.role_id = r1.id 
                                                    LEFT JOIN revature_p0.roles r2 ON u2.role_id = r2.id
                                                    WHERE u1.id = $1;`,[id]);
        const reimbursementArray : Reimbursement[] = resultOfReimbursement.rows.map((reim) => {
            const author : User = new User(reim.author_id,reim.author_username,reim.author_password,reim.author_first,reim.author_last,reim.author_email,reim.author_role);
            const resolver : User = new User(reim.resolver_id,reim.resolver_username,reim.resolver_password,reim.resolver_first,reim.resolver_last,reim.resolver_email,reim.resolver_role);
            return new Reimbursement(reim.id,author,reim.amount,reim.date_submitted,reim.date_resolved,reim.description,resolver,reim.status,reim.type)
        })
        return reimbursementArray;
    }catch(err){
        throw new Error(`Failed to get Reimbursements by Author id of ${id}:
        ${err.message}`);
    }finally{
        client && client.release();
    }
}

export async function updateReimbursement(id:number,amount:number,date_resolved:string,description:string,resolver:number,status:string,type:string) : Promise<Reimbursement>{
    const client : PoolClient= await connectionPool.connect();
    try{
        if(amount){
            await client.query('UPDATE revature_p0.reimbursement SET amount = $1 WHERE id = $2;',[amount,id]);
        }
        if(date_resolved){
            await client.query('UPDATE revature_p0.reimbursement SET date_resolved = $1 WHERE id = $2;',[date_resolved,id]);
        }
        if(description){
            await client.query('UPDATE revature_p0.reimbursement SET description = $1 WHERE id = $2;', [description,id]);
        }
        if(resolver){
                const resultOfRoleName : QueryResult = await client.query(`SELECT role_name FROM revature_p0.users
                                                                            INNER JOIN revature_p0.roles ON users.role_id = roles.id
                                                                            WHERE users.id = $1;`,[resolver])
            console.log(resultOfRoleName.rows[0])
            if(resultOfRoleName.rows[0].role_name === 'Finance Manager'){
                await client.query('UPDATE revature_p0.reimbursement SET resolver = $1 WHERE id = $2;',[resolver,id]);
            }else{
                throw new Error('Resolver must have a role of Finance Manger');
            }

        }
        if(status){
            const resultOfStatus : QueryResult = await client.query(`SELECT id FROM revature_p0.reimbursement_status WHERE status = $1;`,[status]);
            await client.query('UPDATE revature_p0.reimbursement SET status = $1 WHERE id = $2;',[resultOfStatus.rows[0].id,id]);
        }
        if(type) {
            const resultOFType : QueryResult = await client.query('SELECT id FROM revature_p0.reimbursement_type WHERE "type" = $1;',[type]);
            await client.query('UPDATE revature_p0.reimbursement SET "type" = $1 WHERE id = $2;',[resultOFType.rows[0].id,id]);
        }
        console.log(status,type)
        const resultOfID : QueryResult = await client.query(`SELECT reimbursement.id, reimbursement.amount, reimbursement.date_submitted, 
                                                            reimbursement.date_resolved, reimbursement.description, u1.id AS author_id, u1.username AS author_username, 
                                                            u1."password" AS author_password,u1.first_name AS author_first, u1.last_name AS author_last,u1.email AS author_email, u2.id AS resolver_id, 
                                                            u2.username AS resolver_username,u2."password" AS resolver_password,
                                                            u2.first_name AS resolver_first,u2.last_name AS resolver_last, u2.email AS resolver_email, r1.role_name AS author_role, 
                                                            reimbursement_type."type", r2.role_name AS resolver_role, reimbursement_status.status
                                                            FROM revature_p0.reimbursement 
                                                            INNER JOIN revature_p0.users AS u1 ON reimbursement.author = u1.id
                                                            LEFT JOIN revature_p0.users AS u2 ON reimbursement.resolver = u2.id
                                                            INNER JOIN revature_p0.reimbursement_status ON reimbursement_status.id = reimbursement.status
                                                            INNER JOIN revature_p0.reimbursement_type ON reimbursement_type.id = reimbursement."type"
                                                            INNER JOIN revature_p0.roles r1 ON u1.role_id = r1.id 
                                                            LEFT JOIN revature_p0.roles r2 ON u2.role_id = r2.id
                                                            WHERE reimbursement.id = $1;`,[id]);
            
        const reimbursementArray : Reimbursement[] = resultOfID.rows.map((reim) => {
                const author : User = new User(reim.author_id,reim.author_username,reim.author_password,reim.author_first,reim.author_last,reim.author_email,reim.author_role);
                const resolver : User = new User(reim.resolver_id,reim.resolver_username,reim.resolver_password,reim.resolver_first,reim.resolver_last,reim.resolver_email,reim.resolver_role);
                return new Reimbursement(reim.id,author,reim.amount,reim.date_submitted,reim.date_resolved,reim.description,resolver,reim.status,reim.type)
        })
    
            return reimbursementArray[0];
    }catch(err){
        throw new Error(`Failed to update reimbursement of id ${id}:
        ${err.message}`);
    }finally{
        client && client.release();
    }
}

export async function addNewReimbursement(id:number,author_id:number,amount:number,date_submitted:string,description:string,status:string,type:string) : Promise<Reimbursement>{
    const client : PoolClient = await connectionPool.connect();
    try{
        const resultOfStatus : QueryResult = await client.query('SELECT id FROM revature_p0.reimbursement_status WHERE status = $1;',[status]);
        const resultOFType : QueryResult = await client.query('SELECT id FROM revature_p0.reimbursement_type WHERE "type" = $1;',[type]);
        await client.query('INSERT INTO revature_p0.reimbursement (author,amount,date_submitted,description,status,"type") VALUES ($1,$2,$3,$4,$5,$6);',
                                                                [author_id,amount,date_submitted,description,resultOfStatus.rows[0].id,resultOFType.rows[0].id]);   
        const resultOfId : QueryResult = await client.query('SELECT MAX(id) FROM revature_p0.reimbursement;');
        const result : QueryResult = await client.query(`SELECT reimbursement.id, reimbursement.amount, reimbursement.date_submitted, 
                                                            reimbursement.date_resolved, reimbursement.description, u1.id AS author_id, u1.username AS author_username, 
                                                            u1."password" AS author_password,u1.first_name AS author_first, u1.last_name AS author_last,u1.email AS author_email, u2.id AS resolver_id, 
                                                            u2.username AS resolver_username,u2."password" AS resolver_password,
                                                            u2.first_name AS resolver_first,u2.last_name AS resolver_last, u2.email AS resolver_email, r1.role_name AS author_role, 
                                                            reimbursement_type."type", r2.role_name AS resolver_role, reimbursement_status.status
                                                            FROM revature_p0.reimbursement 
                                                            INNER JOIN revature_p0.users AS u1 ON reimbursement.author = u1.id
                                                            LEFT JOIN revature_p0.users AS u2 ON reimbursement.resolver = u2.id
                                                            INNER JOIN revature_p0.reimbursement_status ON reimbursement_status.id = reimbursement.status
                                                            INNER JOIN revature_p0.reimbursement_type ON reimbursement_type.id = reimbursement."type"
                                                            INNER JOIN revature_p0.roles r1 ON u1.role_id = r1.id 
                                                            LEFT JOIN revature_p0.roles r2 ON u2.role_id = r2.id
                                                            WHERE reimbursement.id = $1;`,[resultOfId.rows[0].max]);
        const reimbursementArray : Reimbursement[] = result.rows.map((reim) => {
                const author : User = new User(reim.author_id,reim.author_username,reim.author_password,reim.author_first,reim.author_last,reim.author_email,reim.author_role);
                const resolver : User = new User(reim.resolver_id,reim.resolver_username,reim.resolver_password,reim.resolver_first,reim.resolver_last,reim.resolver_email,reim.resolver_role);
                return new Reimbursement(reim.id,author,reim.amount,reim.date_submitted,reim.date_resolved,reim.description,resolver,reim.status,reim.type)
        });
        return reimbursementArray[0];
    }catch(err){
        throw new Error(`Something went wrong with adding a new Reimbursement: 
                        ${err.message}`)
    }finally{
        client && client.release();
    }
}