import { ListDTO } from "./list-dto";

export interface Group {
    "id": string,
    "name": string,
    "description": string,
    "lists": Array<ListDTO>
}[]