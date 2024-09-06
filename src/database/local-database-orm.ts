import path from "node:path";
import fs from "node:fs/promises";
import { IDatabase } from "./database.interface";

export class LocalDatabaseOrm {
    constructor(
        private readonly filePath = path.join(__dirname, "/", "db.json")
    ) { }

    async open(): Promise<IDatabase> {
        try {
            const data = await fs.readFile(this.filePath, "utf-8");
            const database: IDatabase = JSON.parse(data);
            return database;
        } catch (error: any) {
            throw new Error("Erro ao abrir conexão com banco de dados");
        }
    }

    async save(database: IDatabase): Promise<void> {
        await fs.writeFile(this.filePath, JSON.stringify(database))
    }
}