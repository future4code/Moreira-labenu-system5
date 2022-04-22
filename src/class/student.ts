

export class Student {
  constructor(
    private id: string,
    private name: string,
    private email:string,
    private birth: string,
    private class_id: string,
    ) {}

  public getStudentId = (): string => {
    return this.id;
  };

  public getStudentName = (): string => {
    return this.name;
  };

  public getStudentEmail = (): string => {
    return this.email;
  };

  public getStudentBirth = (): string => {
    return this.birth;
  };

  public getStudentClass_Id = (): string => {
    return this.class_id;
  };
}