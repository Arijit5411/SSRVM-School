import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
    api: {
        bodyParser: false,
    },
};

let newName 

const readFile = (req,saveLocally) => {
    const options = {};
    if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), "/public/uploads");
        options.filename = (name, ext, path, form) => {
            newName = Date.now().toString() + "_" + path.originalFilename;
            return newName
        };
    }
    options.maxFileSize = 5000 * 1024 * 1024;
    const form = formidable(options);
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
};

const handler = async (req, res) => {
    try {
        await fs.readdir(path.join(process.cwd() + "/public", "/uploads"));
    } catch (error) {
        await fs.mkdir(path.join(process.cwd() + "/public", "/uploads"));
    }
    const ans = await readFile(req, true);
    res.json({ done: "ok", name: newName });
};

export default handler;