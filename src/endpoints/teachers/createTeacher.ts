import { Request, Response } from "express";
import { Professor } from "../../class/professor";
import connection from "../../connection";
import { getExpertiseId } from "../../functions";
import { random_id } from "../../tools/idGenerator";

export const createTeacher = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, birth, class_id, expertise } = req.body;
    const id: string = random_id();
    const teacherAndExpertiseId: string = random_id();
    const formattedBirth = birth.split("/").reverse().join("-");
    if (!name || !email || !birth || !class_id || !expertise) {
      throw new Error("Insert all fields.");
    }

    const newTeacher = new Professor(
      id,
      name,
      email,
      formattedBirth,
      class_id,
      expertise
    );
    await connection("Docente").insert({
      docente_id: newTeacher.getTeacherId(),
      docente_nome: newTeacher.getTeacherName(),
      docente_email: newTeacher.getTeacherEmail(),
      docente_data_nasc: newTeacher.getTeacherBirth(),
      docente_turma: newTeacher.getTeacherClass_Id(),
    });

    const expertiseId = await getExpertiseId(newTeacher.expertise);
    await connection("Docente_Especialidade").insert({
      vinculoDocenteEspecialidade_id: teacherAndExpertiseId,
      docente_id: newTeacher.getTeacherId(),
      especialidade_id: expertiseId,
    });

    res.status(201).send("Teacher created!");
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
