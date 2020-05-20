import dotenv from 'dotenv';
import {Pool} from 'pg';
dotenv.config();
export const connectionPool : Pool = new Pool({
    host: process.env['PG_HOST'],
    user: process.env['PG_USER'],
    password: process.env['PG_PASSWORD'],
    database: process.env['PG_DATABASE'],
    port: 5432,
    max: 5
});