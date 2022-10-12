import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import fs from "fs";

import { AUTH_SECRET } from '../config.js';

import { getByCategory } from './categories.js';

const DB_FILE_CONTENTS = fs.readFileSync("db.txt", "utf8");

const USERS = [];
DB_FILE_CONTENTS.split("\n").map(
    line => {
        const [userName, encryptedPassword, passwordSalt, permission] = line.split(" ");
        const user = {
            username: userName, 
            password: encryptedPassword,
            salt: passwordSalt, 
            businessPermission: permission
        };

        USERS.push(user);
    }
);
// console.log("USERS=", USERS);

const hashPassword = (password, salt) => {
    return (
        crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512")
              .toString("hex")
    );
};

export const register = async(req, res, next) => {
    try{     
        const user = req.query.user;
        const password = req.query.pass;

        const userIndex = USERS.findIndex(
            u => u.username === user
        );

        if(user === '' || password === '')
            return res.status(400).send("Enter username or password.");

        if(userIndex != -1)
            return res.status(409).send("User already exists.");

        const salt = crypto.randomBytes(16).toString("hex");
        const hash = hashPassword(password, salt);

        fs.appendFileSync("db.txt", `\n${user} ${hash} ${salt} 0`);

        USERS.push({
            username: user, 
            password: hash,
            salt: salt, 
            businessPermission: '0'
        });

        const token = jwt.sign({ username: user }, AUTH_SECRET, {});

        res.status(201).send(token); 
    } catch(e) {
        next(e);
    }
};

export const login = (req, res, next) => {
    const userIndex = USERS.findIndex(
        u => u.username === req.query.user
    );

    try{    
        // return unauthorized if user not found 
        if(userIndex == -1)
            return res.status(401).send("User does not exist.");

        // return unauthorized if password is wrong
        if(USERS.at(userIndex).password != hashPassword(req.query.pass, USERS.at(userIndex).salt)) 
            return res.status(401).send("Wrong password.");

        const token = jwt.sign(
            { username: req.query.user }, 
            AUTH_SECRET, {}
        );
        
        res.status(201).json({ "token": token, "business": USERS.at(userIndex).permission }); 
    } catch(e) {
        next(e);
    }
};

export const getBusiness = (req, res, next) => {
    const token = req.headers.authorization;
    try {  
        jwt.verify(token, AUTH_SECRET);
    } catch(e) {
        next(e);
    }

    const jwtDecoded = jwt.decode(token);

    const user = USERS.find(
        u => jwtDecoded.username === u.username
    );

    if(!user.businessPermission.includes("1"))
        return res.status(403).send("Authorized users only! Log in as admin.");

    req.query.categ = 'Business';
    getByCategory(req, res, next);
}