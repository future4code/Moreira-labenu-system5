import { Request, Response } from "express";
import connection from "../../connection";

export const searchStudent = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const studentName = req.query.name as string;
    if (!studentName) {
      throw new Error("Please insert a name.");
    }

    const response = await connection("Estudante").whereILike(
      "estudante_nome",
      `%${studentName}%`
    );

    res.status(200).send(response);
  } catch (error: any) {
      console.log(error.message)
    switch (error.message) {
      case "Please insert a name.":
        res.status(412).send(error.message);
        break;
      case "Student not found.":
        res.status(404).send(error.message);
        break;
      default:
        res.status(500).send("Something bad happened. Please contact support.");
    }
  }
};
