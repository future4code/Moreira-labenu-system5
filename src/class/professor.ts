import connection from "../connection";
import { Expertise } from "../types/types";
import { User } from "./user";

export class Professor extends User {
  constructor(
    id: string,
    name: string,
    email: string,
    birth: string,
    class_id: string,
    protected expertise: Expertise
  ) {
    super(id, name, email, birth, class_id);
  }

  public getExpertise = (): Expertise => {
    return this.expertise;
  };
}
