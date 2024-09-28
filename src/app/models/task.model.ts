import { Person } from "./person.model";

export interface Task {
    id: number;
    title: string;
    deadline: Date;
    completed: boolean;
    people: Person[];
}
