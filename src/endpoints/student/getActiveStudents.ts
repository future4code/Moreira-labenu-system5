import { Request, Response } from "express";
import connection from "../../connection";
import { student } from "../../types/types";

export const getActiveStudents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {name} = req.params;  
    const response: student[] = await connection("Estudante").where (
     `${name}`
    );
    res.status(200).send(response);
  } catch (error: any) {
    res.status(500).send("Something bad happened. Please contact support.");
  }
};