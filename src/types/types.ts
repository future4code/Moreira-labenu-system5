export enum Expertise {
    JS = "JS",
    CSS = "CSS",
    React = "React",
    Typescript = "Typescript",
    POO = "POO"
}

export enum Module {
    zero = 0,
    one = 1,
    two = 2,
    three = 3,
    four = 4,
    five = 5,
    six = 6
}

export type student = {
    id: string,
    name: string,
    email: string, 
    birth: string,
    class_id: string,
    hobbies: string[]
}
export type professor = {
    id: string,
    name: string,
    email: string, 
    birth: string,
    class_id: string,
    expertise: Expertise
}

export type eachClass = {
    id: string,
    name: string,
    professors: professor[],
    students: student[],
    module: Module
}