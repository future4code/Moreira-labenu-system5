import express, { Express, Request, Response } from "express";
import cors from "cors";
import { AddressInfo } from "net";
import { createClass } from "./endpoints/each-class/createClass";


const app: Express = express();
app.use(express.json());
app.use(cors());

//Create class
app.post("/classes", createClass);


const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});