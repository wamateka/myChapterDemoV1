// import { sql } from "./db/dbConnection.js";
import bcrypt, { hash } from 'bcrypt';
async function  changePwords(){
    const hash = await bcrypt.hash('pass123', 5)
    console.log(hash)
}

changePwords();