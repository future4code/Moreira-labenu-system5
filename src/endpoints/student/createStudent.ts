import { Request, Response } from "express";
import { Student } from "../../class/student";
import connection from "../../connection";
import { random_id } from "../../tools/idGenerator";

export const createStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, birth, class_id, hobbies } = req.body;
    const id: string = random_id();
    const formattedBirth: string = birth.split("/").reverse().join("-");

    if (!name || !email || !birth || !class_id) {
      throw new Error("Insert all fields.");
    }

    const newStudent = new Student(
      id,
      name,
      email,
      formattedBirth,
      class_id,
      hobbies
    );

    await connection("Estudante").insert({
      estudante_id: newStudent.getId(),
      estudante_nome: newStudent.getName(),
      estudante_email: newStudent.getEmail(),
      estudante_data_nasc: formattedBirth,
      estudante_turma: newStudent.getClassId(),
    });

    const hobbiesList = newStudent.getHobbies();

    for (let hobby of hobbiesList) {
      const hobbyId: string = random_id();
      const hobbyStudentId: string = random_id();

      await connection("Hobby").insert({
        hobby_id: hobbyId,
        hobby_nome: hobby,
      });

      await connection("Estudante_Hobby").insert({
        relacaoEstudanteHobby_id: hobbyStudentId,
        estudante_id: newStudent.getId(),
        hobby_id: hobbyId,
      });
    }
    res.status(201).send("Student created!");
  } catch (error: any) {
    console.log(error.message);
    switch (error.message) {
      case "Insert all fields.":
        res.status(412).send(error.message);
        break;
      default:
        res.status(500).send("Something bad happened. Please contact support.");
        break;
    }
  }
};
