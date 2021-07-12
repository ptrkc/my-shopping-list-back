import app from "../src/app.js";
import supertest from "supertest";
import connection from "../src/database";

beforeAll(async () => {
    await connection.query(`
        DELETE FROM list;
        insert into list (text) VALUES ('Pão'), ('Salsicha'), ('Ketchup');        
        `);
});

afterAll(async () => {
    connection.end();
});

describe("GET /items", () => {
    it("returns an array of objects for valid params", async () => {
        const res = await supertest(app).get("/items");
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    text: expect.any(String),
                }),
            ])
        );
    });
});

describe("POST /items", () => {
    it("returns 201 for valid params", async () => {
        const body = { text: "Abacate" };
        const res = await supertest(app).post("/items").send(body);
        expect(res.status).toEqual(201);
        const newItem = await connection.query(
            `SELECT * FROM list WHERE text = 'Abacate'`
        );
        expect((newItem.rows[0].text = "Abacate"));
    });

    it("returns 400 for invalid params", async () => {
        const body = { what: "Is this?" };
        const res = await supertest(app).post("/items").send(body);
        expect(res.status).toEqual(400);
    });

    it("returns 400 for empty text", async () => {
        const body = { text: "" };
        const res = await supertest(app).post("/items").send(body);
        expect(res.status).toEqual(400);
    });
});
