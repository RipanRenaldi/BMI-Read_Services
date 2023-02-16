import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const getTokenFromHeaders = (header) => {
    return header.split(" ")[1]
}

export const compareToken = ( token ) => {
    return jwt.verify(token, process.env.SECRET_KEY);
}