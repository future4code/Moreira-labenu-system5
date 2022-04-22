import { Request, Response } from "express";
import { Student } from "../../class/student";
import connection from "../../connection";
import { random_id } from "../../tools/idGenerator";


export const createStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, birth, class_id } = req.body;
    const id: string = random_id();
    const formattedBirth = birth.split("/").reverse().join("-");
    if (!name || !email || !birth || !class_id) {
      throw new Error("Insert all fields.");
    }

    const newStudent = new Student(
      id,
      name,
      email,
      formattedBirth,
      class_id,
    );
    await connection("Estudante").insert({
      estudante_id: newStudent.getStudentId(),
      estudante_nome: newStudent.getStudentName(),
      estudante_email: newStudent.getStudentEmail(),
      estudante_data_nasc: newStudent.getStudentBirth(),
      estudante_turma: newStudent.getStudentClass_Id(),
    })
    res.status(201).send("Student created!");
  } catch (error: any) {
    switch (error.message) {
      case "Insert all fields.":
        res.status(412).send(error.message);
        break;
      case 'Invalid entry. "Name" must contain letters.':
        res.status(412).send(error.message);
        break;
      default:
        res.status(500).send("Something bad happened. Please contact support.");
    }
  }
};
