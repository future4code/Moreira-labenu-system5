import { User } from "./user";

export class Student extends User {
  constructor(
    id: string,
    name: string,
    email: string,
    birth: string,
    class_id: string,
    protected hobbies: string[]
  ) {
    super(id, name, email, birth, class_id);
  }

  public getHobbies = (): string[] => {
    return this.hobbies;
  };
}
