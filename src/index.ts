import express, { Express, Request, Response } from "express";
import cors from "cors";
import { AddressInfo } from "net";
import { createClass } from "./endpoints/each-class/createClass";
import { createTeacher } from "./endpoints/teachers/createTeacher";
import { changeModule } from "./endpoints/each-class/changeModule";
import { getActiveClasses } from "./endpoints/each-class/getActiveClasses";
import { createStudent } from "./endpoints/student/createStudent";
import { getActiveStudents } from "./endpoints/student/getActiveStudents";

const app: Express = express();
app.use(express.json());
app.use(cors());

//Create class
app.post("/classes", createClass);

//Register a professor
app.post("/teachers", createTeacher);

//Register a student
app.post("/students",createStudent);

//Get active classes
app.get("/classes", getActiveClasses);

//Get active students
app.get("/students", getActiveStudents)

//Change the module of a class
app.patch("/classes/:id", changeModule);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
