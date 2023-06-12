import { LabelDTO } from "./label-dto";

export interface Card {
    "id": string,
    "name": string,
    "description": string,
    "dueDate": string,
    "createdDate": string,
    "labels": Array<LabelDTO>,
}
