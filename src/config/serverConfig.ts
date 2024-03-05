import dotenv from 'dotenv';
dotenv.config();

export const SERVICES_URI = process.env.SERVICES_URI ?? '';
export const API_SECRET = process.env.SECRET ?? '';