import express, { Express, Request, Response } from "express";
import cors from "cors";
import { AddressInfo } from "net";
import { createClass } from "./endpoints/each-class/createClass";
import { createTeacher } from "./endpoints/teachers/createTeacher";
import { changeModule } from "./endpoints/each-class/changeModule";
import { getActiveClasses } from "./endpoints/each-class/getActiveClasses";
import { createStudent } from "./endpoints/student/createStudent";
import { searchStudent } from "./endpoints/student/searchStudent";
import { changeClass } from "./endpoints/student/changeClass";
import { getTeachers } from "./endpoints/teachers/getTeachers";
import { changeTeacherClass } from "./endpoints/teachers/changeTeacherClass";

const app: Express = express();
app.use(express.json());
app.use(cors());

//Create class
app.post("/classes", createClass);

//Register a professor
app.post("/teachers", createTeacher);

//Register a student
app.post("/students", createStudent);

//Search for a student
app.get("/students", searchStudent);

//Get active classes
app.get("/classes", getActiveClasses);

//Get professors
app.get("/teachers", getTeachers);

//Change the module of a class
app.patch("/classes/:id", changeModule);

//Change the class of a student
app.patch("/students/:id", changeClass);

//Change the class of a professor
app.patch("/teachers/:id", changeTeacherClass);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
