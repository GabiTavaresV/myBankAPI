import express, { application } from "express";
import winston from "winston";
import accountRouter from "./routes/account.js";
import {promises as fs} from "fs";
import cors from "cors";

const { readFile, writeFile } = fs;

global.fileName = "account.json";

const { combine, timestamp, label, printf} = winston.format;
const myFormat = printf(({ level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
})

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "my-bank-api.log"})
    ],
    format: combine(
        label({ label: "my-bank-api"}),
        timestamp(),
        myFormat
    )
});


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/account", accountRouter);

app.listen(3002, async () => {
    try {
        await readFile(global.fileName);
        logger.info("API Started!");
    } catch (err) {
        const initialJson = {
            nextId: 1,
            account: []
    }

    //write File é usado para sobrescrever o conteudo anterior
    writeFile(global.fileName, JSON.stringify(initialJson)).then(() => {
        logger.info("API Started and File Created!");
    }).catch(err => {
        logger.error();(err);
    });
}

});