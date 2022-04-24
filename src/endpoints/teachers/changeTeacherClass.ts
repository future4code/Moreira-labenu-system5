import { Request, Response } from "express";
import connection from "../../connection";

export const changeTeacherClass = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const teacherId = req.params.id;
    const newClass: string = req.body.class;

    const [classVerifier] = await connection("Turma").where(
      "turma_id",
      newClass
    );

    if (!classVerifier) {
      throw new Error("Select an existant class.");
    }

    await connection("Docente")
      .where("docente_id", teacherId)
      .update("docente_turma", newClass);

    res.status(200).send("Class updated.");
  } catch (error: any) {
    switch (error.message) {
      case "Select an existant class.":
        res.status(404).send(error.message);
        break;
      default:
        res.status(500).send("Something bad happened. Please contact support.");
        break;
    }
  }
};
