export abstract class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private birth: string,
    private classId: string
  ) {}

  public getId = (): string => {
    return this.id;
  };
  public getName = (): string => {
    return this.name;
  };
  public getEmail = (): string => {
    return this.email;
  };
  public getBirth = (): string => {
    return this.birth;
  };
  public getClassId = (): string => {
    return this.classId;
  };
}
