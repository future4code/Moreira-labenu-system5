import { Request, Response } from "express";
import connection from "../../connection";
import { Module } from "../../types/types";

export const changeModule = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const classId = req.params.id;
    const newModule: Module = req.body.module;

    if (!newModule) {
      throw new Error("Please insert a module.");
    }

    if (newModule > 6) {
      throw new Error("There are only 6 modules. Choose from 1 to 6.");
    }

    await connection("Turma")
      .where("turma_id", classId)
      .update("turma_modulo", newModule);

    res.status(200).send("Module successfully updated!");
  } catch (error: any) {
    switch (error.message) {
      case "Please insert a module.":
        res.status(412).send(error.message);
        break;
      case "There are only 6 modules. Choose from 1 to 6.":
        res.status(412).send(error.message);
        break;
      default:
        res.status(500).send("Something bad happened. Please contact support.");
        break;
    }
  }
};
