import dotenv from 'dotenv';
import pkg from 'pg';


dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
const {Pool} = pkg;

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

pool.on('connect',()=>{
    console.log('databse is connected successfuly!')
})

pool.on('error',(err)=>{
    console.log('Error on connecting to databse',err)
})


export const query = (text,params) => pool.query (text,params);
