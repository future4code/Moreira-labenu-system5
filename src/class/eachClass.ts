import { Module } from "../types/types";

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
}
