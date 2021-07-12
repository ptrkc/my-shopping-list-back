import express from "express";
import cors from "cors";
import connection from "./database.js";
import { checkItem } from "./functions/checkItems.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/items", async (req, res) => {
    try {
        const list = await connection.query("SELECT * FROM list");
        res.send(list.rows);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

app.post("/items", async (req, res) => {
    try {
        const text = checkItem(req.body);
        if (!text) {
            return res.sendStatus(400);
        }
        await connection.query("INSERT INTO list (text) VALUES ($1)", [text]);
        res.sendStatus(201);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default app;
