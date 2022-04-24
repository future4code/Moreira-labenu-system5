import { Request, Response } from "express";
import connection from "../../connection";

export const changeClass = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const studentId = req.params.id;
    const newClassId = req.body.class;

    const [classVerifier] = await connection("Turma").where(
      "turma_id",
      newClassId
    );

    const [studentVerifier] = await connection("Estudante").where(
      "estudante_id",
      studentId
    );

    if (!newClassId) {
      throw new Error("Please insert a class.");
    }
    if (!classVerifier) {
      throw new Error("Please select an existant class.");
    }
    if (!studentVerifier) {
      throw new Error("Please select a registered student.");
    }

    await connection("Estudante")
      .where("estudante_id", studentId)
      .update("estudante_turma", newClassId);

    res.status(200).send("Class updated.");
  } catch (error: any) {
    switch (error.message) {
      case "Please insert a class.":
        res.status(412).send(error.message);
        break;
      case "Please select an existant class.":
        res.status(404).send(error.message);
        break;
      case "Please select a registered student.":
        res.status(404).send(error.message);
        break;
      default:
        res.status(500).send("Something bad happened. Please contact support.");
        break;
    }
  }
};
