import { Request, Response } from "express";
import connection from "../../connection";
import { professor } from "../../types/types";

export const getTeachers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result: professor[] = await connection("Docente");
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Something bad happened. Please contact support.");
  }
};
