import { drizzle } from "drizzle-orm/singlestore/driver";
import { Pool } from "pg";
import * as schema from "./schema";
import { ENV } from "../config/env";

if(!ENV.DATABASE_URL){
    throw new Error("DATABASE_URL is not set in environment variable");
};

const pool = new Pool({ connectionString: ENV.DATABASE_URL});

pool.on("connect", () => {
    console.error("Database connected successfully ✅");
});

pool.on("error", (err)=>{
    console.error("Database connection error❌:", err);
});

export const db = drizzle({ client: pool, schema });