import { Request, Response } from "express";
import connection from "../../connection";
import { eachClass } from "../../types/types";

export const getActiveClasses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response: eachClass[] = await connection("Turma").whereIn(
      "turma_modulo",
      [1, 2, 3, 4, 5, 6]
    );
    res.status(200).send(response);
  } catch (error: any) {
    res.status(500).send("Something bad happened. Please contact support.");
  }
};
