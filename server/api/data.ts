import fs from "fs";
import path from "path";
import { defineEventHandler, readBody } from "h3";

const DATA_FILE = path.join(process.cwd(), "server/data.json");

// Helper function to read data
const readData = () => {
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data);
};

// Helper function to write data
const writeData = (data: any) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

export default defineEventHandler(async (event) => {
  // GET request to fetch data
  if (event.method === "GET") {
    return readData();
  }

  // POST request to update data
  if (event.method === "POST") {
    const body = await readBody(event);
    writeData(body);
    return { success: true };
  }
});
