import { Expertise } from "../types/types";

export class Professor {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private birth: string,
    private class_id: string,
    public expertise: Expertise
  ) {}

  public getTeacherId = (): string => {
    return this.id;
  };

  public getTeacherName = (): string => {
    return this.name;
  };

  public getTeacherEmail = (): string => {
    return this.email;
  };

  public getTeacherBirth = (): string => {
    return this.birth;
  };

  public getTeacherClass_Id = (): string => {
    return this.class_id;
  };
}
