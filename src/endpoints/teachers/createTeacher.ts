import { Request, Response } from "express";
import { Professor } from "../../class/professor";
import connection from "../../connection";
import { random_id } from "../../tools/idGenerator";
import { Expertise } from "../../types/types";

export const createTeacher = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, birth, class_id, expertise } = req.body;
    const id: string = random_id();
    const teacherAndExpertiseId: string = random_id();
    const formattedBirth: string = birth.split("/").reverse().join("-");

    if (!name || !email || !birth || !class_id || !expertise) {
      throw new Error("Insert all fields.");
    };

    let expertiseId;
    switch (expertise) {
      case "JS":
        expertiseId = 1;
        break;
      case "CSS":
        expertiseId = 2;
        break;
      case "React":
        expertiseId = 3;
        break;
      case "Typescript":
        expertiseId = 4;
        break;
      case "POO":
        expertiseId = 5;
        break;
      default:
        expertiseId = 1;
        break;
    }

    const [expertiseVerifier]: Expertise[] = await connection(
      "Especialidade"
    ).where("especialidade_nome", expertise);

    if (!expertiseVerifier) {
      throw new Error(
        "Select a valid expertise ('CSS', 'JS', 'POO', 'React' or 'Typescript')."
      );
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
      docente_id: newTeacher.getId(),
      docente_nome: newTeacher.getName(),
      docente_email: newTeacher.getEmail(),
      docente_data_nasc: newTeacher.getBirth(),
      docente_turma: newTeacher.getClassId(),
    });

    await connection("Docente_Especialidade").insert({
      vinculoDocenteEspecialidade_id: teacherAndExpertiseId,
      docente_id: newTeacher.getId(),
      especialidade_id: expertiseId,
    });

    res.status(201).send("Teacher created!");
  } catch (error: any) {
    console.log(error.message);
    switch (error.message) {
      case "Insert all fields.":
        res.status(412).send(error.message);
        break;
      case "Select a valid expertise ('CSS', 'JS', 'POO', 'React' or 'Typescript').":
        res.status(412).send(error.message);
        break;
      default:
        res.status(500).send("Something bad happened. Please contact support.");
    }
  }
};
