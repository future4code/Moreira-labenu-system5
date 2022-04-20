import connection from "../connection";
import { random_id } from "../tools/idGenerator";
import { Module, professor, student } from "../types/types";

export class EachClass {
  constructor(
    private id: string,
    private name: string,
    public module: Module
  ) {}

  public getClassId = (): string => {
    return this.id;
  };

  public getClassName = (): string => {
    return this.name;
  };

  public getClassModule = (): Module => {
    return this.module;
  };
}
