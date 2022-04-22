import { Request, Response } from "express";
import { EachClass } from "../../class/eachClass";
import connection from "../../connection";
import { random_id } from "../../tools/idGenerator";
import { Module } from "../../types/types";

export const createClass = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const name: string = req.body.name;
    const id: string = random_id();

    if (!name) {
      throw new Error("Insert a name.");
    }
    if (typeof name !== "string") {
      throw new Error('Invalid entry. "Name" must contain letters.');
    }
    const newClass = new EachClass(id, name, Module.zero);

    await connection("Turma").insert({
      turma_id: newClass.getClassId(),
      turma_nome: newClass.getClassName(),
      turma_modulo: newClass.module
    });

    res.status(201).send("Class created!");
  } catch (error: any) {
    switch (error.message) {
      case "Insert a name.":
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
